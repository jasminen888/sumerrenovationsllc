interface SectionAccentProps {
  variant?: 'gold' | 'blue';
}

export default function SectionAccent({ variant = 'gold' }: SectionAccentProps) {
  return (
    <span
      className={variant === 'blue' ? 'section-accent-blue' : 'section-accent'}
      aria-hidden="true"
    />
  );
}
