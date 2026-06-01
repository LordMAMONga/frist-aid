import type { HospitalEntity } from "../entities/HospitalEntity";

export interface IHospitalRepository {
  getHospitals(): HospitalEntity[];
}
