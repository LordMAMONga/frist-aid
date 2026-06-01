export interface AidStepEntity {
  id: number;
  text: string;
  isCritical: boolean;
}

export interface EmergencyCaseEntity {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  steps: AidStepEntity[];
}
