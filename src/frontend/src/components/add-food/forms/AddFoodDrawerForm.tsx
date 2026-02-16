import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAddFoodValidation } from '../useAddFoodValidation';
import { useCreatePost } from '@/hooks/useQueries';
import { Category } from '@/backend';
import { Plus, Loader2 } from 'lucide-react';

export default function AddFoodDrawerForm() {
  const navigate = useNavigate();
  const { validateForm, errors } = useAddFoodValidation();
  const createPost = useCreatePost();

  const [open, setOpen] = useState(false);
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
        setOpen(false);
        navigate({ to: '/ngo-alert' });
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-earth-200 bg-card shadow-soft">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-12">
          <img
            src="/assets/generated/food-placeholder.dim_900x600.png"
            alt="Food"
            className="h-40 w-full rounded-xl object-cover"
          />
          <p className="text-center text-earth-600">
            Click the button below to open the drawer form and add your food donation.
          </p>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="w-full bg-leaf py-6 text-lg font-semibold text-white hover:bg-leaf-dark">
            <Plus className="mr-2 h-5 w-5" />
            Open Drawer Form
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] bg-background">
          <SheetHeader>
            <SheetTitle className="text-earth-900">Add Food Donation</SheetTitle>
            <SheetDescription className="text-earth-600">Fill in the details of your food donation below.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drawer-title" className="text-earth-800">Title</Label>
              <Input
                id="drawer-title"
                placeholder="e.g., Leftover pasta"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-destructive' : 'border-earth-200'}
                disabled={createPost.isPending}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="drawer-quantity" className="text-earth-800">Quantity</Label>
              <Input
                id="drawer-quantity"
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
                <Label htmlFor="drawer-date" className="text-earth-800">Date</Label>
                <Input
                  id="drawer-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={errors.date ? 'border-destructive' : 'border-earth-200'}
                  disabled={createPost.isPending}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="drawer-time" className="text-earth-800">Time</Label>
                <Input
                  id="drawer-time"
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
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
