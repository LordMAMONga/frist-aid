import { useState, useEffect } from "react";
import type { HospitalEntity } from "../../domain/entities/HospitalEntity";
import { HospitalRepositoryImpl } from "../../data/repositories/HospitalRepositoryImpl";

const hospitalRepository = new HospitalRepositoryImpl();

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<HospitalEntity[]>([]);

  useEffect(() => {
    const data = hospitalRepository.getHospitals();
    setHospitals(data);
  }, []);

  return { hospitals };
};
