import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 50,
  height = 50,
  color = '#3498db',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Основная форма - экран */}
      <rect x="5" y="10" width="40" height="30" rx="2" fill={color} />

      {/* Подставка */}
      <path d="M15 40H35L30 45H20L15 40Z" fill={color} />

      {/* Символ стриминга */}
      <path
        d="M20 20V30L32 25L20 20Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />

      {/* Волны стриминга */}
      <path
        d="M35 18C37.5 20.5 38.5 23.5 38.5 25C38.5 26.5 37.5 29.5 35 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 15C41.5 18.5 43 22.5 43 25C43 27.5 41.5 31.5 38 35"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
