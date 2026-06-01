import React from "react";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties; // <-- 1. Добавляем тип для style
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  style,
}) => {
  return (
    <div
      className={`card ${className}`.trim()}
      onClick={onClick}
      // 2. Объединяем дефолтные стили курсора с теми, что пришли из props
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
    >
      {children}
    </div>
  );
};
