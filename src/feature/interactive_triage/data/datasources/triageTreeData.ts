import type { TriageNode } from "../../domain/entities/TriageEntity";

export const triageTree: Record<string, TriageNode> = {
  start: {
    id: "start",
    question: {
      ru: "Человек в сознании (отвечает на голос/касание)?",
      ky: "Адам эсиндеби (үнүңүзгө/тийгениңизге жооп береби)?",
    },
    yesNextNodeId: "check_bleeding",
    noNextNodeId: "check_breathing",
  },

  // ВЕТКА: БЕЗ СОЗНАНИЯ
  check_breathing: {
    id: "check_breathing",
    question: {
      ru: "Положите руку на грудь. Он дышит?",
      ky: "Колуңузду көкүрөгүнө коюңуз. Ал дем алып жатабы?",
    },
    yesNextNodeId: "result_fainting",
    noNextNodeId: "result_cpr",
  },
  result_fainting: {
    id: "result_fainting",
    question: { ru: "", ky: "" },
    resultGuideId: "fainting",
  },
  result_cpr: {
    id: "result_cpr",
    question: { ru: "", ky: "" },
    resultGuideId: "cpr",
  },

  // ВЕТКА: В СОЗНАНИИ
  check_bleeding: {
    id: "check_bleeding",
    question: {
      ru: "Есть ли сильное кровотечение (кровь бьет струей)?",
      ky: "Катуу кан кетип жатабы (кан атырылып чыгып жатабы)?",
    },
    yesNextNodeId: "result_bleeding",
    noNextNodeId: "check_choking",
  },
  result_bleeding: {
    id: "result_bleeding",
    question: { ru: "", ky: "" },
    resultGuideId: "bleeding",
  },

  check_choking: {
    id: "check_choking",
    question: {
      ru: "Человек держится за горло, задыхается?",
      ky: "Адам тамагын кармап, деми кыстыгып жатабы?",
    },
    yesNextNodeId: "result_choking",
    noNextNodeId: "result_all",
  },
  result_choking: {
    id: "result_choking",
    question: { ru: "", ky: "" },
    resultGuideId: "choking",
  },
  result_all: {
    id: "result_all",
    question: { ru: "", ky: "" },
    resultGuideId: "all",
  },
};
