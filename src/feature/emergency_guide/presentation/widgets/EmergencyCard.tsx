import React from "react";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { Card } from "../../../../core/widgets/Card/Card";
import { Typography } from "../../../../core/widgets/Typography/Typography";

interface EmergencyCardProps {
  data: EmergencyCaseEntity;
  onClick: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  data,
  onClick,
}) => {
  // Временная логика для иконок-эмодзи (пока нет настоящих SVG)
  const getIcon = (id: string) => {
    switch (id) {
      case "bleeding":
        return "🩸";
      case "choking":
        return "🫁";
      case "burn":
        return "🔥";
      default:
        return "🚑";
    }
  };

  return (
    <Card
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-md)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-md)",
        }}
      >
        {/* Контейнер для иконки */}
        <div
          style={{
            fontSize: "24px",
            backgroundColor: "var(--color-bg)",
            minWidth: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {getIcon(data.id)}
        </div>

        {/* Текстовый блок */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Typography variant="h2" style={{ marginBottom: 0 }}>
            {data.title}
          </Typography>
          <Typography variant="caption" color="muted">
            {data.shortDescription}
          </Typography>
        </div>
      </div>

      {/* Индикатор перехода (Стрелочка) */}
      <div
        style={{
          color: "var(--color-text-muted)",
          fontSize: "24px",
          paddingLeft: "var(--space-sm)",
        }}
      >
        ›
      </div>
    </Card>
  );
};
