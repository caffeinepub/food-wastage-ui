import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { CheckCircle2, Circle, MapPin, Package, Calendar, Clock } from 'lucide-react';

export default function TrackPage() {
  const navigate = useNavigate();
  const mostRecent = useFoodPostsStore((state) => state.getMostRecent());
  const isHydrated = useFoodPostsStore((state) => state.isHydrated);

  const trackingSteps = [
    { label: 'Request Received', completed: true },
    { label: 'Driver Assigned', completed: true },
    { label: 'On the Way', completed: true },
    { label: 'Arrived', completed: false },
  ];

  if (!isHydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!mostRecent) {
    return (
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-neutral-800">Track Donation</h2>
        
        <Card className="shadow-sm">
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-16 w-16 text-neutral-300" />
            <p className="mt-4 text-lg font-semibold text-neutral-700">No Active Donation</p>
            <p className="mt-2 text-neutral-500">
              You need to add a food donation first before tracking.
            </p>
            <Button
              className="mt-6 bg-eco-green hover:bg-eco-green-dark"
              onClick={() => navigate({ to: '/add-food' })}
            >
              Add Food Donation
            </Button>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-800">Track Donation</h2>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Donation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 h-5 w-5 text-eco-green" />
            <div>
              <p className="font-semibold text-neutral-800">{mostRecent.title}</p>
              <p className="text-sm text-neutral-600">Quantity: {mostRecent.quantity}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Calendar className="h-4 w-4" />
            <span>{mostRecent.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Clock className="h-4 w-4" />
            <span>{mostRecent.time}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Tracking Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-eco-green" />
                  ) : (
                    <Circle className="h-6 w-6 text-neutral-300" />
                  )}
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`mt-1 h-12 w-0.5 ${
                        step.completed ? 'bg-eco-green' : 'bg-neutral-200'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p
                    className={`font-semibold ${
                      step.completed ? 'text-neutral-800' : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.completed && index === trackingSteps.findIndex((s) => !s.completed) - 1 && (
                    <p className="mt-1 text-sm text-eco-green">Current Status</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <img
            src="/assets/generated/map-placeholder-route.dim_900x600.png"
            alt="Route Map"
            className="h-64 w-full object-cover"
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate({ to: '/ngo-alert' })}
        >
          Back to Alert
        </Button>
        <Button
          className="flex-1 bg-eco-green hover:bg-eco-green-dark"
          onClick={() => navigate({ to: '/' })}
        >
          <MapPin className="mr-2 h-4 w-4" />
          View on Map
        </Button>
      </div>
    </div>
  );
}
