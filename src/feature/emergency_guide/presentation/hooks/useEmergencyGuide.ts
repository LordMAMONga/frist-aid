import { useState, useEffect } from "react";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { emergencyRepository } from "../../data/repositories/EmergencyRepositoryImpl";

export const useEmergencyGuide = () => {
  const [guides, setGuides] = useState<EmergencyCaseEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setIsLoading(true);
        const data = await emergencyRepository.getAllEmergencies();
        setGuides(data);
      } catch (e) {
        setError("Не удалось загрузить справочник");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Отдаем данные и методы наружу
  return {
    guides,
    isLoading,
    error,
  };
};
