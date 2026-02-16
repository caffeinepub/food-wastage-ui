import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { useAddFoodValidation } from '../useAddFoodValidation';

export default function AddFoodCardForm() {
  const navigate = useNavigate();
  const addPost = useFoodPostsStore((state) => state.addPost);
  const { validateForm, errors } = useAddFoodValidation();

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
      navigate({ to: '/ngo-alert' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-md">
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-center">
            <img
              src="/assets/generated/food-placeholder.dim_900x600.png"
              alt="Food"
              className="h-40 w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Leftover pasta"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
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
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={errors.date ? 'border-destructive' : ''}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
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
        </CardContent>
      </Card>
    </form>
  );
}
