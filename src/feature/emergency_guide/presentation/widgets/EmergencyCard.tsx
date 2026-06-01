import React from "react";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { useLanguage } from "../../../../core/localization/LanguageContext";

interface EmergencyCardProps {
  data: EmergencyCaseEntity;
  onClick: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  data,
  onClick,
}) => {
  const { t } = useLanguage(); // Подключаем локализацию

  return (
    <div className="card" onClick={onClick}>
      <div
        style={{
          display: "flex",
          gap: "var(--space-md)",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "32px" }}>{data.icon}</span>
        <div>
          {/* Пропускаем объект перевода через функцию t() */}
          <Typography variant="h2" style={{ marginBottom: "4px" }}>
            {t(data.title)}
          </Typography>
          <Typography variant="body" color="muted">
            {t(data.shortDescription)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
