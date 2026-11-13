type BrandLogoVariant = 'light' | 'dark';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

const variantColors = {
  light: {
    top: '#9CCCF7',
    left: '#4D98DD',
    right: '#0752A5',
    detail: '#E7F3FF',
  },
  dark: {
    top: '#B7DCFF',
    left: '#62A8E8',
    right: '#FFFFFF',
    detail: '#DCEEFF',
  },
};

export function BrandLogo({
  variant = 'light',
  className,
}: BrandLogoProps) {
  const colors = variantColors[variant];

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 5 55 18 32 31 9 18 32 5Z"
        fill={colors.top}
      />

      <path
        d="M9 18 32 31 32 58 9 45V18Z"
        fill={colors.left}
      />

      <path
        d="M55 18 32 31 32 58 55 45V18Z"
        fill={colors.right}
      />

      <path
        d="M9 18 32 31 55 18"
        fill="none"
        stroke={colors.detail}
        strokeWidth="2"
      />
    </svg>
  );
}