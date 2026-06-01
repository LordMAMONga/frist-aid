import React from "react";
import { Routes, Route } from "react-router-dom";

// Импорты страниц (Pages) из слоя Presentation
import { GuideListPage } from "../../feature/emergency_guide/presentation/pages/GuideListPage";
import { GuideDetailPage } from "../../feature/emergency_guide/presentation/pages/GuideDetailPage";
import { TriagePage } from "../../feature/interactive_triage/presentation/pages/TriagePage";
import { MapPage } from "../../feature/hospitals_map/presentation/pages/MapPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Модуль: Справочник */}
      <Route path="/" element={<GuideListPage />} />
      <Route path="/guide/:id" element={<GuideDetailPage />} />

      {/* Модуль: Интерактивный помощник */}
      <Route path="/triage" element={<TriagePage />} />

      {/* Модуль: Карта больниц */}
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
};
