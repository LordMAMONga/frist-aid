import type { TriageNode } from "../../domain/entities/TriageEntity";

export const triageTree: Record<string, TriageNode> = {
  start: {
    id: "start",
    question: {
      ru: "Безопасно ли подходить к человеку (нет огня, оборванных проводов)?",
      ky: "Адамга жакындоо коопсузбу (от, үзүлгөн зымдар жокпу)?",
    },
    yesNextNodeId: "check_consciousness",
    noNextNodeId: "result_electric_shock",
  },
  check_consciousness: {
    id: "check_consciousness",
    question: {
      ru: "Человек в сознании (отвечает на голос или касание)?",
      ky: "Адам эсиндеби (үнүңүзгө/тийгениңизге жооп береби)?",
    },
    yesNextNodeId: "check_bleeding",
    noNextNodeId: "check_breathing",
  },

  // ВЕТКА: БЕЗ СОЗНАНИЯ
  check_breathing: {
    id: "check_breathing",
    question: {
      ru: "Положите руку на грудь/послушайте. Он нормально дышит?",
      ky: "Колуңузду көкүрөгүнө коюңуз. Ал нормалдуу дем алып жатабы?",
    },
    yesNextNodeId: "check_seizure",
    noNextNodeId: "result_cpr",
  },
  check_seizure: {
    id: "check_seizure",
    question: {
      ru: "Его трясет, есть ли судороги или пена изо рта?",
      ky: "Калтырап, талма же оозунан көбүк чыгып жатабы?",
    },
    yesNextNodeId: "result_seizures",
    noNextNodeId: "result_fainting",
  },

  // ВЕТКА: В СОЗНАНИИ
  check_bleeding: {
    id: "check_bleeding",
    question: {
      ru: "Есть ли сильное, фонтанирующее кровотечение?",
      ky: "Катуу, атырылып чыккан кан кетип жатабы?",
    },
    yesNextNodeId: "result_bleeding",
    noNextNodeId: "check_choking",
  },
  check_choking: {
    id: "check_choking",
    question: {
      ru: "Человек держится за горло, не может дышать или говорить?",
      ky: "Адам тамагын кармап, дем ала албай же сүйлөй албай жатабы?",
    },
    yesNextNodeId: "result_choking",
    noNextNodeId: "check_stroke",
  },
  check_stroke: {
    id: "check_stroke",
    question: {
      ru: "Лицо перекошено, речь невнятная, или не может поднять руку?",
      ky: "Бети кыйшайып, сүйлөөсү түшүнүксүз же колун көтөрө албай жатабы?",
    },
    yesNextNodeId: "result_stroke",
    noNextNodeId: "check_chest_pain",
  },
  check_chest_pain: {
    id: "check_chest_pain",
    question: {
      ru: "Жалуется на резкую, сдавливающую боль в груди?",
      ky: "Көкүрөгүндө катуу, кысылган ооруга даттанып жатабы?",
    },
    yesNextNodeId: "result_heart_attack",
    noNextNodeId: "result_all",
  },

  // ИТОГОВЫЕ УЗЛЫ
  result_electric_shock: {
    id: "result_electric_shock",
    question: { ru: "", ky: "" },
    resultGuideId: "electric_shock",
  },
  result_cpr: {
    id: "result_cpr",
    question: { ru: "", ky: "" },
    resultGuideId: "cpr",
  },
  result_seizures: {
    id: "result_seizures",
    question: { ru: "", ky: "" },
    resultGuideId: "seizures",
  },
  result_fainting: {
    id: "result_fainting",
    question: { ru: "", ky: "" },
    resultGuideId: "fainting",
  },
  result_bleeding: {
    id: "result_bleeding",
    question: { ru: "", ky: "" },
    resultGuideId: "bleeding",
  },
  result_choking: {
    id: "result_choking",
    question: { ru: "", ky: "" },
    resultGuideId: "choking",
  },
  result_stroke: {
    id: "result_stroke",
    question: { ru: "", ky: "" },
    resultGuideId: "stroke",
  },
  result_heart_attack: {
    id: "result_heart_attack",
    question: { ru: "", ky: "" },
    resultGuideId: "heart_attack",
  },
  result_all: {
    id: "result_all",
    question: { ru: "", ky: "" },
    resultGuideId: "all",
  },
};
