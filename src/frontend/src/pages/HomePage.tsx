import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-800">Welcome, user!</h2>

        <Button
          className="w-full bg-eco-green py-6 text-lg font-semibold text-white hover:bg-eco-green-dark"
          onClick={() => navigate({ to: '/add-food' })}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Food
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-700">Nearby NGOs</h3>
        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <img
              src="/assets/generated/map-placeholder-home.dim_900x600.png"
              alt="Nearby NGOs Map"
              className="h-48 w-full object-cover"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
