
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // Fix: Added onClick to support clickable cards.
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 transition-shadow hover:shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
