import { Collapsed, Expanded, Locked } from './BadgeVariants';

type BadgeVariant = 'Collapsed' | 'Expanded' | 'Locked';
type Tier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface BadgeProps {
  variant: BadgeVariant;
  title: string;
  description?: string;
  date?: string;
  icon: string;
  tier: Tier;
  progress?: number;
}

export default function Badge({
  variant,
  title,
  description,
  date,
  icon,
  tier,
  progress,
}: BadgeProps) {
  switch (variant) {
    case 'Expanded':
      return (
        <Expanded
          title={title}
          description={description ? description : 'No Description'}
          date={date ? date : 'No Date'}
          icon={icon}
          tier={tier}
          progress={progress}
        />
      );
    case 'Locked':
      return (
        <Locked
          title={title}
          icon={icon}
          tier={tier}
          progress={progress}
        />
      );
    default:
      return (
        <Collapsed
          title={title}
          icon={icon}
          tier={tier}
        />
      );
  }
}
