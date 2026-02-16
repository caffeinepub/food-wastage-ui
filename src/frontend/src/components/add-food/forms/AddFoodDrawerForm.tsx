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
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { useAddFoodValidation } from '../useAddFoodValidation';
import { Plus } from 'lucide-react';

export default function AddFoodDrawerForm() {
  const navigate = useNavigate();
  const addPost = useFoodPostsStore((state) => state.addPost);
  const { validateForm, errors } = useAddFoodValidation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm(formData)) {
      addPost({
        title: formData.title,
        quantity: parseInt(formData.quantity),
        date: formData.date,
        time: formData.time,
      });
      setOpen(false);
      navigate({ to: '/ngo-alert' });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-12">
          <img
            src="/assets/generated/food-placeholder.dim_900x600.png"
            alt="Food"
            className="h-40 w-full rounded-lg object-cover"
          />
          <p className="text-center text-neutral-600">
            Click the button below to open the drawer form and add your food donation.
          </p>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="w-full bg-eco-green py-6 text-lg font-semibold hover:bg-eco-green-dark">
            <Plus className="mr-2 h-5 w-5" />
            Open Drawer Form
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Add Food Donation</SheetTitle>
            <SheetDescription>Fill in the details of your food donation below.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drawer-title">Title</Label>
              <Input
                id="drawer-title"
                placeholder="e.g., Leftover pasta"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="drawer-quantity">Quantity</Label>
              <Input
                id="drawer-quantity"
                type="number"
                placeholder="e.g., 2"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={errors.quantity ? 'border-destructive' : ''}
              />
              {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="drawer-date">Date</Label>
                <Input
                  id="drawer-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={errors.date ? 'border-destructive' : ''}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="drawer-time">Time</Label>
                <Input
                  id="drawer-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={errors.time ? 'border-destructive' : ''}
                />
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full bg-eco-green py-6 text-lg font-semibold hover:bg-eco-green-dark">
              Post
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
