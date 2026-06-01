import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmergencyGuide } from "../hooks/useEmergencyGuide";
import { EmergencyCard } from "../widgets/EmergencyCard";
import { Typography } from "../../../../core/widgets/Typography/Typography";

export const GuideListPage: React.FC = () => {
  const { guides, isLoading, error } = useEmergencyGuide();
  const navigate = useNavigate();

  // Красивое состояние загрузки по центру экрана
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="body" color="muted">
          Загрузка справочника...
        </Typography>
      </div>
    );

  // Красивое состояние ошибки
  if (error)
    return (
      <div
        style={{
          padding: "var(--space-lg)",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <Typography variant="h2" color="critical">
          ⚠️ Ошибка
        </Typography>
        <Typography variant="body" color="muted">
          {error}
        </Typography>
      </div>
    );

  return (
    <div style={{ paddingBottom: "var(--space-lg)" }}>
      {/* Улучшенная шапка (Header) */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "var(--space-lg) var(--space-md)",
          borderBottom: "4px solid var(--color-critical)",
          marginBottom: "var(--space-lg)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "28px" }}>⚕️</span>
          <Typography variant="h1" style={{ marginBottom: 0 }}>
            Первая помощь
          </Typography>
        </div>
        <Typography variant="body" color="muted">
          Выберите экстренную ситуацию для получения четких пошаговых
          инструкций. Действуйте быстро.
        </Typography>
      </div>

      {/* Список карточек с увеличенными отступами */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)", // Сделали расстояние между карточками чуть больше
          padding: "0 var(--space-md)",
        }}
      >
        {guides.map((guide) => (
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
