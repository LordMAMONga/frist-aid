export interface LocalizedString {
  ru: string;
  ky: string;
}

export interface EmergencyStepEntity {
  id: number;
  text: LocalizedString; // Теперь текст шага локализован
  isCritical: boolean;
}

export interface EmergencyCaseEntity {
  id: string;
  title: LocalizedString; // Титул локализован
  shortDescription: LocalizedString; // Описание локализовано
  icon: string;
  steps: EmergencyStepEntity[];
}
