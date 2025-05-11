import { Collapsed, Expanded, Locked } from "./BadgeVariants";

type BadgeVariant = "Collapsed" | "Expanded" | "Locked";

export interface BadgeProps {
  variant: BadgeVariant;
  title: string;
  description?: string;
  date?: string;
  icon: string;
}

export default function Badge({
  variant,
  title,
  description,
  date,
  icon,
}: BadgeProps) {
  switch (variant) {
    case "Expanded":
      return (
        <Expanded
          title={title}
          description={description ? description : "No Description"}
          date={date ? date : "no date"}
          icon={icon}
        />
      );
    case "Locked":
      return <Locked title={title} icon={icon} />;
    case "Collapsed":
    default:
      return <Collapsed title={title} icon={icon} />;
  }
}
