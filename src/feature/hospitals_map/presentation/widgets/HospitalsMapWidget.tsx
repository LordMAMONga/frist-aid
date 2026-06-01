import React, { useState, useEffect, useMemo, useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  type MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import type { HospitalEntity } from "../../domain/entities/HospitalEntity";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { useLanguage } from "../../../../core/localization/LanguageContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface HospitalsMapWidgetProps {
  hospitals: HospitalEntity[];
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const HospitalsMapWidget: React.FC<HospitalsMapWidgetProps> = ({
  hospitals,
}) => {
  const { t } = useLanguage();
  const mapRef = useRef<MapRef>(null);

  const [selectedHospital, setSelectedHospital] =
    useState<HospitalEntity | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Доступ к геолокации отклонен", error);
        },
        { enableHighAccuracy: true },
      );
    }
  }, []);

  const sortedHospitals = useMemo(() => {
    if (!userLocation) {
      return hospitals.map((h) => ({ ...h, distance: null }));
    }

    return hospitals
      .map((hospital) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.lat,
          hospital.lng,
        );
        return { ...hospital, distance };
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [hospitals, userLocation]);

  const handleHospitalSelect = (hospital: HospitalEntity) => {
    setSelectedHospital(hospital);
    mapRef.current?.flyTo({
      center: [hospital.lng, hospital.lat],
      zoom: 14,
      essential: true,
      duration: 1500,
    });
  };

  return (
    // Главный контейнер теперь relative, чтобы карта и панель накладывались друг на друга
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Карта теперь занимает 100% пространства */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 74.59,
          latitude: 42.875,
          zoom: 13.5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Кнопки перенесли в верхний правый угол */}
        <NavigationControl position="top-right" showCompass={false} />

        <GeolocateControl
          position="top-right"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          onGeolocate={(e) => {
            if (e.coords) {
              setUserLocation({
                lat: e.coords.latitude,
                lng: e.coords.longitude,
              });
            }
          }}
        />

        {sortedHospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            longitude={hospital.lng}
            latitude={hospital.lat}
            anchor="bottom"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleHospitalSelect(hospital);
              }}
              style={{
                fontSize: "36px",
                cursor: "pointer",
                filter:
                  selectedHospital?.id === hospital.id
                    ? "drop-shadow(0 0 8px var(--color-critical))"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                transform:
                  selectedHospital?.id === hospital.id
                    ? "scale(1.2)"
                    : "scale(1)",
                transition: "transform 0.2s ease",
              }}
            >
              🏥
            </div>
          </Marker>
        ))}

        {selectedHospital && (
          <Popup
            longitude={selectedHospital.lng}
            latitude={selectedHospital.lat}
            anchor="top"
            onClose={() => setSelectedHospital(null)}
            closeButton={true}
            closeOnClick={false}
            maxWidth="260px"
          >
            <div style={{ padding: "4px", color: "#000" }}>
              <Typography
                variant="h2"
                style={{ fontSize: "16px", color: "#000", marginBottom: "4px" }}
              >
                {t(selectedHospital.name)}
              </Typography>
              <Typography
                variant="body"
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginBottom: "12px",
                }}
              >
                📍 {t(selectedHospital.address)}
              </Typography>
              <Button
                variant="critical"
                fullWidth
                onClick={() =>
                  (window.location.href = `tel:${selectedHospital.phone}`)
                }
                style={{ padding: "8px", fontSize: "14px" }}
              >
                📞 {t({ ru: "Позвонить", ky: "Чалуу" })}
              </Button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Всплывающая панель (Bottom Sheet) поверх карты */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "40%", // Панель занимает максимум 40% высоты экрана
          backgroundColor: "var(--color-surface)",
          borderTopLeftRadius: "20px", // Закругленные углы сверху
          borderTopRightRadius: "20px",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.3)", // Тень, падающая на карту
          overflowY: "auto",
          padding: "var(--space-md)",
          zIndex: 10, // Чтобы панель была выше карты
          boxSizing: "border-box",
        }}
      >
        {/* Декоративная полоска ("ручка" для красоты) */}
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "var(--color-border)",
            borderRadius: "2px",
            margin: "0 auto 16px auto",
          }}
        />

        <Typography
          variant="h2"
          style={{ marginBottom: "var(--space-sm)", fontSize: "18px" }}
        >
          {userLocation
            ? t({ ru: "Ближайшие отделения", ky: "Эң жакын бөлүмдөр" })
            : t({
                ru: "Все отделения (включите геопозицию)",
                ky: "Бардык бөлүмдөр (геопозицияны күйгүзүңүз)",
              })}
        </Typography>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {sortedHospitals.map((hospital) => {
            const isSelected = selectedHospital?.id === hospital.id;
            return (
              <div
                key={hospital.id}
                onClick={() => handleHospitalSelect(hospital)}
                style={{
                  padding: "var(--space-sm)",
                  backgroundColor: isSelected
                    ? "var(--color-bg)"
                    : "transparent",
                  borderRadius: "var(--radius-sm)",
                  border: isSelected
                    ? "1px solid var(--color-critical)"
                    : "1px solid transparent",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ flex: 1, paddingRight: "var(--space-sm)" }}>
                  <Typography
                    variant="h2"
                    style={{ fontSize: "15px", marginBottom: "2px" }}
                  >
                    {t(hospital.name)}
                  </Typography>
                  <Typography
                    variant="body"
                    color="muted"
                    style={{ fontSize: "12px" }}
                  >
                    {t(hospital.address)}
                  </Typography>
                </div>

                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "6px",
                  }}
                >
                  {hospital.distance !== null && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "var(--color-primary)",
                        backgroundColor: "rgba(0, 122, 255, 0.1)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {hospital.distance.toFixed(1)} км
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${hospital.phone}`;
                    }}
                    style={{
                      border: "none",
                      background: "var(--color-critical)",
                      color: "white",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    📞
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
