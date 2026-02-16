import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMostRecentPost } from '@/hooks/useQueries';
import { MapPin, Package } from 'lucide-react';

export default function NgoAlertPage() {
  const navigate = useNavigate();
  const { data: mostRecent, isLoading } = useGetMostRecentPost();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-earth-500">Loading...</p>
      </div>
    );
  }

  if (!mostRecent) {
    return (
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-earth-900">NGO Alert</h2>
        
        <Card className="border-earth-200 bg-card shadow-soft">
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-16 w-16 text-earth-300" />
            <p className="mt-4 text-lg font-semibold text-earth-700">No Donation Found</p>
            <p className="mt-2 text-earth-600">
              Please add a food donation first.
            </p>
            <Button
              className="mt-6 bg-leaf text-white hover:bg-leaf-dark"
              onClick={() => navigate({ to: '/add-food' })}
            >
              Add Food Donation
            </Button>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full border-earth-300 py-6 text-lg font-semibold text-earth-700"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-earth-900">NGO Alert</h2>

      <div className="space-y-4">
        <div className="rounded-xl bg-leaf/10 p-5 shadow-soft">
          <h3 className="text-xl font-bold text-earth-900">NGO</h3>
          <p className="mt-2 text-lg font-semibold text-earth-800">Food donation received</p>
          <p className="mt-1 text-sm text-earth-600">
            A pickup truck is on the way to collect the food - {mostRecent.title}
          </p>
        </div>

        <Card className="overflow-hidden border-earth-200 shadow-soft">
          <CardContent className="p-0">
            <img
              src="/assets/generated/map-placeholder-route.dim_900x600.png"
              alt="Route Map"
              className="h-64 w-full object-cover"
            />
          </CardContent>
        </Card>

        <Button
          className="w-full bg-leaf py-6 text-lg font-semibold text-white hover:bg-leaf-dark"
          onClick={() => navigate({ to: '/track' })}
        >
          <MapPin className="mr-2 h-5 w-5" />
          Track
        </Button>

        <Button
          variant="outline"
          className="w-full border-earth-300 py-6 text-lg font-semibold text-earth-700"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
