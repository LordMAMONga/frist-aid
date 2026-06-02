import React from "react";
import { useNavigate } from "react-router-dom";
import { useHospitals } from "../hooks/useHospitals";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { useLanguage } from "../../../../core/localization/LanguageContext";
import { HospitalsMapWidget } from "../widgets/HospitalsMapWidget";

export const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { hospitals } = useHospitals();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <div
        style={{
          padding: "var(--space-md)",
          backgroundColor: "var(--color-surface)",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
          }}
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            style={{ padding: "8px 12px" }}
          >
            ← {t({ ru: "Назад", ky: "Артка" })}
          </Button>
          <Typography variant="h2" style={{ marginBottom: 0 }}>
            {t({ ru: "Экстренные службы", ky: "Тез жардам кызматтары" })}
          </Typography>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <HospitalsMapWidget hospitals={hospitals} />
      </div>
    </div>
  );
};
