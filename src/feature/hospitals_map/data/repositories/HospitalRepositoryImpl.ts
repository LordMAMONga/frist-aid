import type { IHospitalRepository } from "../../domain/repositories/IHospitalRepository";
import type { HospitalEntity } from "../../domain/entities/HospitalEntity";
import { hospitalsData } from "../datasources/hospitalsData";

export class HospitalRepositoryImpl implements IHospitalRepository {
  getHospitals(): HospitalEntity[] {
    return hospitalsData;
  }
}
