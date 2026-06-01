import { useState, useEffect } from "react";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { emergencyRepository } from "../../data/repositories/EmergencyRepositoryImpl";

export const useEmergencyDetail = (id?: string) => {
  const [guide, setGuide] = useState<EmergencyCaseEntity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      const data = await emergencyRepository.getEmergencyById(id);
      setGuide(data);
      setIsLoading(false);
    };

    fetchDetail();
  }, [id]);

  return { guide, isLoading };
};
