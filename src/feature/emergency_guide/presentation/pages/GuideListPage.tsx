import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmergencyGuide } from "../hooks/useEmergencyGuide";
import { EmergencyCard } from "../widgets/EmergencyCard";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { Input } from "../../../../core/widgets/Input/Input";
import { useLanguage } from "../../../../core/localization/LanguageContext";

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
            <span style={{ fontSize: "28px" }}>⚕️</span>
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
                backgroundColor:
                  language === "ru" ? "var(--color-surface)" : "transparent",
                color:
                  language === "ru"
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                cursor: "pointer",
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
                backgroundColor:
                  language === "ky" ? "var(--color-surface)" : "transparent",
                color:
                  language === "ky"
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                cursor: "pointer",
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

      {/* Кнопки интерактивных инструментов (Помощник и Карта) */}
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
          style={{ padding: "16px", fontSize: "18px" }}
        >
          🆘 {t({ ru: "Интерактивный помощник", ky: "Интерактивдүү жардамчы" })}
        </Button>

        {/* НОВАЯ: Кнопка Карты */}
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate("/map")}
          style={{
            padding: "16px",
            fontSize: "18px",
            backgroundColor: "var(--color-surface)",
          }}
        >
          📍{" "}
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
