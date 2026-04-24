
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function StatCard({ title, value, description, icon, color, className, style }: StatCardProps) {
  return (
    <Card
      className={cn(
        'border-[1px] border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl',
        className
      )}
      style={{ ...style, backgroundColor: color }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">{title}</CardTitle>
        <span className="text-2xl">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
}
