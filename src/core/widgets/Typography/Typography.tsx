import React from "react";

type TypographyVariant = "h1" | "h2" | "body" | "caption";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  color?: "main" | "muted" | "critical";
  className?: string;
  style?: React.CSSProperties; // <-- 1. Добавляем тип для style
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  color = "main",
  className = "",
  style, // <-- 2. Достаем style из пропсов
}) => {
  const colorVar = `var(--color-${color === "main" ? "text-main" : color === "muted" ? "text-muted" : "critical"})`;

  const baseStyles: Record<TypographyVariant, React.CSSProperties> = {
    h1: {
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "var(--space-sm)",
      color: colorVar,
    },
    h2: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "var(--space-xs)",
      color: colorVar,
    },
    body: { fontSize: "16px", fontWeight: 400, color: colorVar },
    caption: { fontSize: "14px", fontWeight: 400, color: colorVar },
  };

  const Component = variant === "body" || variant === "caption" ? "p" : variant;

  return (
    <Component
      style={{ ...baseStyles[variant], ...style }}
      className={className}
    >
      {children}
    </Component>
  );
};
