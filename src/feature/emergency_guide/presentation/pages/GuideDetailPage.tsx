import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmergencyDetail } from "../hooks/useEmergencyDetail";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { Card } from "../../../../core/widgets/Card/Card";
import { useLanguage } from "../../../../core/localization/LanguageContext";

export const GuideDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { guide, isLoading } = useEmergencyDetail(id);

  const { t } = useLanguage();

  if (isLoading)
    return (
      <div style={{ padding: "var(--space-md)" }}>
        <Typography variant="body">Загрузка...</Typography>
      </div>
    );

  if (!guide)
    return (
      <div style={{ padding: "var(--space-md)" }}>
        <Typography variant="body">Инструкция не найдена</Typography>
      </div>
    );

  return (
    <div
      style={{
        padding: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        style={{
          alignSelf: "flex-start",
          padding: "var(--space-xs) var(--space-md)",
        }}
      >
        ← {t({ ru: "Назад", ky: "Артка" })}
      </Button>

      <div>
        <Typography variant="h1">{t(guide.title)}</Typography>
        <Typography variant="body" color="muted">
          {/* 3. Оборачиваем описание в t() */}
          {t(guide.shortDescription)}
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        {guide.steps.map((step) => (
          <Card
            key={step.id}
            style={{
              borderLeft: step.isCritical
                ? "4px solid var(--color-critical)"
                : "4px solid var(--color-primary)",
            }}
          >
            <Typography
              variant="body"
              color={step.isCritical ? "critical" : "main"}
              style={{ fontWeight: step.isCritical ? "bold" : "normal" }}
            >
              {/* 4. Оборачиваем текст шага в t() */}
              {t({ ru: "Шаг", ky: "Кадам" })} {step.id}: {t(step.text)}
            </Typography>
          </Card>
        ))}
      </div>

      <Button
        variant="critical"
        fullWidth
        onClick={() => (window.location.href = "tel:103")}
      >
        {t({ ru: "Вызвать скорую (103)", ky: "Тез жардам чакыруу (103)" })}
      </Button>
    </div>
  );
};
