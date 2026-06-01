import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTriage } from "../hooks/useTriage";
import { Typography } from "../../../../core/widgets/Typography/Typography";
import { Button } from "../../../../core/widgets/Button/Button";
import { useLanguage } from "../../../../core/localization/LanguageContext";

export const TriagePage: React.FC = () => {
  const { currentNode, handleAnswer, resetTriage } = useTriage();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (currentNode?.resultGuideId) {
      if (currentNode.resultGuideId === "all") {
        navigate("/");
      } else {
        navigate(`/guide/${currentNode.resultGuideId}`);
      }
    }
  }, [currentNode, navigate]);

  if (!currentNode) {
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
          {t({ ru: "Загрузка помощника...", ky: "Жардамчы жүктөлүүдө..." })}
        </Typography>
      </div>
    );
  }

  if (currentNode.resultGuideId) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-md)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Typography variant="h2" style={{ marginBottom: 0 }}>
          {t({ ru: "Помощник", ky: "Жардамчы" })}
        </Typography>
        <Button
          variant="outline"
          onClick={() => {
            resetTriage();
            navigate("/");
          }}
        >
          {/* Переводим кнопку закрытия */}✖ {t({ ru: "Закрыть", ky: "Жабуу" })}
        </Button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" style={{ fontSize: "32px" }}>
          {t(currentNode.question)}
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          gap: "var(--space-md)",
          paddingBottom: "var(--space-lg)",
        }}
      >
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleAnswer("no")}
          style={{ height: "80px", fontSize: "24px" }}
        >
          {t({ ru: "НЕТ", ky: "ЖОК" })}
        </Button>
        <Button
          variant="critical"
          fullWidth
          onClick={() => handleAnswer("yes")}
          style={{ height: "80px", fontSize: "24px" }}
        >
          {t({ ru: "ДА", ky: "ООБА" })}
        </Button>
      </div>
    </div>
  );
};
