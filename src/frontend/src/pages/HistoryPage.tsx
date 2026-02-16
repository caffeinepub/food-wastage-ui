import { Card, CardContent } from '@/components/ui/card';
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { Calendar, Package } from 'lucide-react';

export default function HistoryPage() {
  const posts = useFoodPostsStore((state) => state.posts);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold text-neutral-800">History</h2>

      {posts.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-neutral-500">No food posts yet. Add your first donation!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800">{post.title}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-neutral-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-eco-green/10 px-3 py-1">
                  <Package className="h-4 w-4 text-eco-green" />
                  <span className="font-semibold text-eco-green">{post.quantity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
