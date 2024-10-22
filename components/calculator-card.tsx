import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface CalculatorCardProps {
  title: string;
  category: string;
  description: string;
  url: string;
  icon: LucideIcon;
}

export const CalculatorCard = ({
  title,
  category,
  description,
  url,
  icon: Icon,
}: CalculatorCardProps) => {
  return (
    <Link href={url} className="block no-underline">
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm text-orange-600">
                {category}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};