import { Card, CardContent } from '@/components/ui/card';
import { useGetMyPosts } from '@/hooks/useQueries';
import { Calendar, Package } from 'lucide-react';

export default function HistoryPage() {
  const { data: posts, isLoading } = useGetMyPosts();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-earth-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-6">
      <h2 className="text-2xl font-bold text-earth-900">History</h2>

      {!posts || posts.length === 0 ? (
        <Card className="border-earth-200 bg-card shadow-soft">
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-16 w-16 text-earth-300" />
            <p className="mt-4 text-earth-600">No food posts yet. Add your first donation!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id.toString()} className="border-earth-200 bg-card shadow-soft transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex-1">
                  <h3 className="font-semibold text-earth-900">{post.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-earth-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {post.expiryDate}
                    </span>
                    <span>{post.pickupTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-2">
                  <Package className="h-4 w-4 text-leaf" />
                  <span className="font-semibold text-leaf">{post.quantity.toString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
