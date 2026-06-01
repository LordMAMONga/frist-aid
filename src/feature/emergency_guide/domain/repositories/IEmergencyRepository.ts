import type { EmergencyCaseEntity } from "../entities/EmergencyEntity";

export interface IEmergencyRepository {
  getAllEmergencies(): Promise<EmergencyCaseEntity[]>;
  getEmergencyById(id: string): Promise<EmergencyCaseEntity | null>;
}
