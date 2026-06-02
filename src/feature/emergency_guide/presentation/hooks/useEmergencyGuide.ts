import { useState, useEffect, useMemo } from "react";
import type { EmergencyCaseEntity } from "../../domain/entities/EmergencyEntity";
import { emergencyRepository } from "../../data/repositories/EmergencyRepositoryImpl";
import { useLanguage } from "../../../../core/localization/LanguageContext";

export const useEmergencyGuide = () => {
  const [guides, setGuides] = useState<EmergencyCaseEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useLanguage();

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

  const filteredGuides = useMemo(() => {
    if (!searchQuery.trim()) return guides;

    const query = searchQuery.toLowerCase();
    return guides.filter(
      (guide) =>
        t(guide.title).toLowerCase().includes(query) ||
        t(guide.shortDescription).toLowerCase().includes(query),
    );
  }, [guides, searchQuery]);

  return {
    guides: filteredGuides,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  };
};
