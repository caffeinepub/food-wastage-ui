import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { MapPin } from 'lucide-react';

export default function NgoAlertPage() {
  const navigate = useNavigate();
  const mostRecent = useFoodPostsStore((state) => state.getMostRecent());

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-800">NGO Alert</h2>

      <div className="space-y-4">
        <div className="rounded-lg bg-eco-green/10 p-4">
          <h3 className="text-xl font-bold text-neutral-800">NGO</h3>
          <p className="mt-2 text-lg font-semibold text-neutral-700">Food donation received</p>
          <p className="mt-1 text-sm text-neutral-600">
            A pickup truck is on the way to collect the food
            {mostRecent && ` - ${mostRecent.title}`}
          </p>
        </div>

        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <img
              src="/assets/generated/map-placeholder-route.dim_900x600.png"
              alt="Route Map"
              className="h-64 w-full object-cover"
            />
          </CardContent>
        </Card>

        <Button
          className="w-full bg-eco-green py-6 text-lg font-semibold text-white hover:bg-eco-green-dark"
          onClick={() => navigate({ to: '/track' })}
        >
          <MapPin className="mr-2 h-5 w-5" />
          Track
        </Button>

        <Button
          variant="outline"
          className="w-full py-6 text-lg font-semibold"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
