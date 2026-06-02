import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmergencyGuide } from "../hooks/useEmergencyGuide";
import { EmergencyCard } from "../widgets/EmergencyCard";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { Input } from "../../../../core/widgets/Input/Input";
import { useLanguage } from "../../../../core/localization/LanguageContext";

// --- SVG ИКОНКИ ДЛЯ ГЛАВНОГО ЭКРАНА ---
const MedicCrossIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-primary)">
    {/* Чаша и ножка */}
    <path d="M3 7h12a6 6 0 0 1-12 0z" />
    <path d="M8 13h2v6h3v2H5v-2h3z" />

    {/* Тело змеи */}
    <path
      d="M10 3 C16 -1, 21 5, 17 10 C14 14, 12 15, 12 18 C12 20, 14 21, 15 21"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Голова змеи */}
    <circle cx="9.5" cy="3.5" r="2" />
  </svg>
);

const SosIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const MapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
// --------------------------------------

export const GuideListPage: React.FC = () => {
  const { guides, isLoading } = useEmergencyGuide();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { language, setLanguage, t } = useLanguage();

  if (isLoading) return null;

  const filteredGuides = guides.filter(
    (guide) =>
      t(guide.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(guide.shortDescription)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        paddingBottom: "100px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "var(--space-lg) var(--space-md)",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "var(--space-md)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MedicCrossIcon />
            <Typography variant="h1" style={{ marginBottom: 0 }}>
              {t({ ru: "Первая помощь", ky: "Биринчи жардам" })}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              gap: "4px",
              backgroundColor: "var(--color-bg)",
              padding: "4px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <button
              onClick={() => setLanguage("ru")}
              style={{
                padding: "6px 10px",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor:
                  language === "ru" ? "var(--color-surface)" : "transparent",
                color:
                  language === "ru"
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage("ky")}
              style={{
                padding: "6px 10px",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor:
                  language === "ky" ? "var(--color-surface)" : "transparent",
                color:
                  language === "ky"
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              KY
            </button>
          </div>
        </div>

        <Input
          type="text"
          placeholder={t({ ru: "Поиск ситуации...", ky: "Кырдаалды издөө..." })}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div
        style={{
          padding: "0 var(--space-md) var(--space-md)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Button
          variant="critical"
          fullWidth
          onClick={() => navigate("/triage")}
          style={{
            padding: "16px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SosIcon />{" "}
          {t({ ru: "Интерактивный помощник", ky: "Интерактивдүү жардамчы" })}
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate("/map")}
          style={{
            padding: "16px",
            fontSize: "16px",
            backgroundColor: "var(--color-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapIcon />{" "}
          {t({
            ru: "Карта дежурных больниц",
            ky: "Нөөмөттөгү ооруканалар картасы",
          })}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          padding: "0 var(--space-md)",
        }}
      >
        {filteredGuides.map((guide) => (
          <EmergencyCard
            key={guide.id}
            data={guide}
            onClick={() => navigate(`/guide/${guide.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
