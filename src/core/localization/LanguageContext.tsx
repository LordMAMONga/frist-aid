import React, { createContext, useContext, useState } from "react";

export type Language = "ru" | "ky";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { ru: string; ky: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Пытаемся достать сохраненный язык из кэша, иначе ставим 'ru' по умолчанию
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("app_lang") as Language) || "ru";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  // Хелпер для быстрого выбора строки на нужном языке в компонентах
  const t = (translations: { ru: string; ky: string }) => {
    return translations[language] || translations["ru"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage должен использоваться внутри LanguageProvider",
    );
  }
  return context;
};
