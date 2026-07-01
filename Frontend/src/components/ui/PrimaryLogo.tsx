// Imports
import { RoboticWrenchIcon, WrenchIcon } from "../../constants";

// Icon registry
const icons = {
  primaryIcon: WrenchIcon,
  secondaryIcon: RoboticWrenchIcon,
};

//
interface PrimaryLogoProps {
  icon: keyof typeof icons;
  iconStyle: string;
  label: string;
  labelStyle: string;
}

//
export const PrimaryLogo = ({
  icon,
  iconStyle,
  label,
  labelStyle,
}: PrimaryLogoProps) => {
  const Icon = icons[icon];

  return (
    <div className="flex items-center gap-x-4">
      <Icon className={iconStyle} />
      <h2 className={labelStyle}>{label.toUpperCase()}</h2>
    </div>
  );
};
