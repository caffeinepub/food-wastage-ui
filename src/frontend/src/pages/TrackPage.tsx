import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMostRecentPost, useGetCurrentTracking } from '@/hooks/useQueries';
import { CheckCircle2, Circle, MapPin, Package, Calendar, Clock } from 'lucide-react';

export default function TrackPage() {
  const navigate = useNavigate();
  const { data: mostRecent, isLoading: postLoading } = useGetMostRecentPost();
  const { data: trackingSteps, isLoading: trackingLoading } = useGetCurrentTracking();

  const isLoading = postLoading || trackingLoading;

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
        <h2 className="text-2xl font-bold text-earth-900">Track Donation</h2>
        
        <Card className="border-earth-200 bg-card shadow-soft">
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-16 w-16 text-earth-300" />
            <p className="mt-4 text-lg font-semibold text-earth-800">No Active Donation</p>
            <p className="mt-2 text-earth-600">
              You need to add a food donation first before tracking.
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
          className="w-full border-earth-300 text-earth-700"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  if (!trackingSteps || trackingSteps.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-earth-900">Track Donation</h2>
        
        <Card className="border-earth-200 bg-card shadow-soft">
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-16 w-16 text-earth-300" />
            <p className="mt-4 text-lg font-semibold text-earth-800">Tracking Unavailable</p>
            <p className="mt-2 text-earth-600">
              Tracking information is not available for this donation yet.
            </p>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full border-earth-300 text-earth-700"
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-earth-900">Track Donation</h2>

      <Card className="border-earth-200 bg-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg text-earth-900">Donation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 h-5 w-5 text-leaf" />
            <div>
              <p className="font-semibold text-earth-900">{mostRecent.title}</p>
              <p className="text-sm text-earth-600">Quantity: {mostRecent.quantity.toString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-earth-600">
            <Calendar className="h-4 w-4" />
            <span>{mostRecent.expiryDate}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-earth-600">
            <Clock className="h-4 w-4" />
            <span>{mostRecent.pickupTime}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-earth-200 bg-card shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg text-earth-900">Tracking Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => {
              const isCompleted = step.status !== 'pending';
              const isLast = index === trackingSteps.length - 1;
              
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-leaf" />
                    ) : (
                      <Circle className="h-6 w-6 text-earth-300" />
                    )}
                    {!isLast && (
                      <div
                        className={`mt-1 h-12 w-0.5 ${
                          isCompleted ? 'bg-leaf' : 'bg-earth-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p
                      className={`font-semibold ${
                        isCompleted ? 'text-earth-900' : 'text-earth-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    {isCompleted && (
                      <p className="mt-1 text-xs text-earth-500">
                        {formatTimestamp(step.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-earth-200 shadow-soft">
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
          className="flex-1 border-earth-300 text-earth-700"
          onClick={() => navigate({ to: '/ngo-alert' })}
        >
          Back to Alert
        </Button>
        <Button
          className="flex-1 bg-leaf text-white hover:bg-leaf-dark"
          onClick={() => navigate({ to: '/' })}
        >
          <MapPin className="mr-2 h-4 w-4" />
          View on Map
        </Button>
      </div>
    </div>
  );
}
