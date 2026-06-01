import type { IEmergencyRepository } from "../../domain/repositories/IEmergencyRepository";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { localEmergenciesData } from "../datasources/localEmergencyData";

export class EmergencyRepositoryImpl implements IEmergencyRepository {
  async getAllEmergencies(): Promise<EmergencyCaseEntity[]> {
    return Promise.resolve(localEmergenciesData);
  }

  async getEmergencyById(id: string): Promise<EmergencyCaseEntity | null> {
    const found = localEmergenciesData.find((emergency) => emergency.id === id);
    return Promise.resolve(found || null);
  }
}

export const emergencyRepository = new EmergencyRepositoryImpl();
