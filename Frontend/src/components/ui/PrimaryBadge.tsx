//
interface PrimaryBadgeProps {
  label: string;
  badgeStyle?: string;
}

//
export const PrimaryBadge = ({ label, badgeStyle }: PrimaryBadgeProps) => {
  return (
    <div className={`primary-badge ${badgeStyle}`}>
      <span className="w-2 h-2 rounded-full bg-brand-blue-light animate-pulse" />
      {label.toUpperCase()}
    </div>
  );
};
