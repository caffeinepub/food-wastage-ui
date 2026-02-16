import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddFoodValidation } from '../useAddFoodValidation';
import { useCreatePost } from '@/hooks/useQueries';
import { Category } from '@/backend';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function AddFoodWizardForm() {
  const navigate = useNavigate();
  const { validateForm, errors } = useAddFoodValidation();
  const createPost = useCreatePost();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    date: '',
    time: '',
  });

  const handleNext = () => {
    if (step === 1) {
      if (formData.title && formData.quantity) {
        setStep(2);
      }
    }
  };

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
        <CardHeader>
          <CardTitle className="text-center text-earth-900">
            Step {step} of 2
          </CardTitle>
          <div className="mt-3 flex gap-2">
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-leaf' : 'bg-earth-200'}`} />
            <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-leaf' : 'bg-earth-200'}`} />
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          {step === 1 && (
            <>
              <div className="flex justify-center">
                <img
                  src="/assets/generated/food-placeholder.dim_900x600.png"
                  alt="Food"
                  className="h-40 w-full rounded-xl object-cover"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wizard-title" className="text-earth-800">Title</Label>
                <Input
                  id="wizard-title"
                  placeholder="e.g., Leftover pasta"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-earth-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wizard-quantity" className="text-earth-800">Quantity</Label>
                <Input
                  id="wizard-quantity"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="border-earth-200"
                />
              </div>

              <Button
                type="button"
                onClick={handleNext}
                className="w-full bg-leaf py-6 text-lg font-semibold text-white hover:bg-leaf-dark"
                disabled={!formData.title || !formData.quantity}
              >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wizard-date" className="text-earth-800">Date</Label>
                  <Input
                    id="wizard-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={errors.date ? 'border-destructive' : 'border-earth-200'}
                    disabled={createPost.isPending}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wizard-time" className="text-earth-800">Time</Label>
                  <Input
                    id="wizard-time"
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

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-earth-300 py-6 text-lg font-semibold text-earth-700 hover:bg-earth-50"
                  disabled={createPost.isPending}
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>

                <Button 
                  type="submit" 
                  className="flex-1 bg-leaf py-6 text-lg font-semibold text-white hover:bg-leaf-dark"
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
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
