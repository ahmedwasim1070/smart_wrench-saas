// Imports
import { RoboticWrenchIcon, WrenchIcon } from "../../constants";

// Icon registry
const icons = {
  primaryIcon: WrenchIcon,
  secondaryIcon: RoboticWrenchIcon,
};

//
interface PrimaryHeadingProps {
  icon: keyof typeof icons;
  iconStyle: string;
  label: string;
  labelStyle: string;
}

//
export const PrimaryHeading = ({
  icon,
  iconStyle,
  label,
  labelStyle,
}: PrimaryHeadingProps) => {
  const Icon = icons[icon];

  return (
    <div className="flex items-center gap-x-4">
      <Icon className={iconStyle} />
      <h2 className={labelStyle}>{label.toUpperCase()}</h2>
    </div>
  );
};
