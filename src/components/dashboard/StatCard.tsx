import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}