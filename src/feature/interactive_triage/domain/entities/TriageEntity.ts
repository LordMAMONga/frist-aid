export interface LocalizedString {
  ru: string;
  ky: string;
}

export interface TriageNode {
  id: string;
  question: LocalizedString;
  yesNextNodeId?: string; // Куда идти при ответе "Да"
  noNextNodeId?: string; // Куда идти при ответе "Нет"
  resultGuideId?: string; // ID инструкции, если мы нашли проблему
}
