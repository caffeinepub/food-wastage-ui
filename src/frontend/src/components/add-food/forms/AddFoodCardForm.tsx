import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddFoodValidation } from '../useAddFoodValidation';
import { useCreatePost } from '@/hooks/useQueries';
import { Category } from '@/backend';
import { Loader2 } from 'lucide-react';

export default function AddFoodCardForm() {
  const navigate = useNavigate();
  const { validateForm, errors } = useAddFoodValidation();
  const createPost = useCreatePost();

  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    date: '',
    time: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        await createPost.mutateAsync({
          title: formData.title,
          location: 'Default Location',
          foodType: 'General',
          state: 'Available',
          quantity: parseInt(formData.quantity),
          expiryDate: formData.date,
          pickupTime: formData.time,
          image: '/assets/generated/food-placeholder.dim_900x600.png',
          category: Category.other,
          description: formData.title,
        });
        navigate({ to: '/ngo-alert' });
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-earth-200 bg-card shadow-soft">
        <CardContent className="space-y-5 p-6">
          <div className="flex justify-center">
            <img
              src="/assets/generated/food-placeholder.dim_900x600.png"
              alt="Food"
              className="h-40 w-full rounded-xl object-cover"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-earth-800">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Leftover pasta"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-destructive' : 'border-earth-200'}
              disabled={createPost.isPending}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-earth-800">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="e.g., 2"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className={errors.quantity ? 'border-destructive' : 'border-earth-200'}
              disabled={createPost.isPending}
            />
            {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-earth-800">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={errors.date ? 'border-destructive' : 'border-earth-200'}
                disabled={createPost.isPending}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-earth-800">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={errors.time ? 'border-destructive' : 'border-earth-200'}
                disabled={createPost.isPending}
              />
              {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
            </div>
          </div>

          {createPost.isError && (
            <p className="text-sm text-destructive">Failed to create post. Please try again.</p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-leaf py-6 text-lg font-semibold text-white hover:bg-leaf-dark"
            disabled={createPost.isPending}
          >
            {createPost.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Posting...
              </>
            ) : (
              'Post'
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
