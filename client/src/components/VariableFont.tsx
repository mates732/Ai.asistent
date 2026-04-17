import React, { useEffect, useRef, useState } from 'react';

interface VariableFontProps {
  children: React.ReactNode;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  minDistance?: number;
  maxDistance?: number;
}

export const VariableFont: React.FC<VariableFontProps> = ({
  children,
  className = '',
  minWeight = 300,
  maxWeight = 900,
  minDistance = 0,
  maxDistance = 500,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [fontWeight, setFontWeight] = useState(minWeight);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - elementCenterX;
      const dy = e.clientY - elementCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Map distance to font weight
      let weight = minWeight;
      if (distance < maxDistance) {
        const ratio = 1 - distance / maxDistance;
        weight = minWeight + (maxWeight - minWeight) * ratio;
      }

      setFontWeight(Math.round(weight));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [minWeight, maxWeight, maxDistance]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        fontVariationSettings: `'wght' ${fontWeight}`,
        transition: 'font-variation-settings 0.05s ease-out',
      }}
    >
      {children}
    </div>
  );
};
