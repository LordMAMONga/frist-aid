import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";

export const localEmergenciesData: EmergencyCaseEntity[] = [
  {
    id: "bleeding",
    title: "Сильное кровотечение",
    shortDescription: "Остановка артериального или венозного кровотечения",
    icon: "blood-drop",
    steps: [
      {
        id: 1,
        text: "Убедитесь в собственной безопасности.",
        isCritical: true,
      },
      {
        id: 2,
        text: "Надавите на рану руками через чистую ткань.",
        isCritical: false,
      },
      {
        id: 3,
        text: "Если кровь пульсирует — наложите жгут ВЫШЕ раны.",
        isCritical: true,
      },
      {
        id: 4,
        text: "Запишите точное время наложения жгута.",
        isCritical: false,
      },
    ],
  },
  {
    id: "choking",
    title: "Удушье (Подавился)",
    shortDescription: "Прием Геймлиха для освобождения дыхательных путей",
    icon: "lungs",
    steps: [
      {
        id: 1,
        text: "Спросите: «Ты подавился? Можешь говорить?»",
        isCritical: false,
      },
      {
        id: 2,
        text: "Встаньте сзади, обхватите человека руками.",
        isCritical: false,
      },
      {
        id: 3,
        text: "Сделайте 5 резких толчков кулаком в живот (между пупком и ребрами) по направлению внутрь и вверх.",
        isCritical: true,
      },
    ],
  },
];
