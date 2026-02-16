import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFoodPostsStore } from '@/state/foodPostsStore';
import { useAddFoodValidation } from '../useAddFoodValidation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AddFoodWizardForm() {
  const navigate = useNavigate();
  const addPost = useFoodPostsStore((state) => state.addPost);
  const { validateForm, errors } = useAddFoodValidation();

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
        <CardHeader>
          <CardTitle className="text-center">
            Step {step} of 2
          </CardTitle>
          <div className="mt-2 flex gap-2">
            <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-eco-green' : 'bg-neutral-200'}`} />
            <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-eco-green' : 'bg-neutral-200'}`} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          {step === 1 && (
            <>
              <div className="flex justify-center">
                <img
                  src="/assets/generated/food-placeholder.dim_900x600.png"
                  alt="Food"
                  className="h-40 w-full rounded-lg object-cover"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wizard-title">Title</Label>
                <Input
                  id="wizard-title"
                  placeholder="e.g., Leftover pasta"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wizard-quantity">Quantity</Label>
                <Input
                  id="wizard-quantity"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <Button
                type="button"
                onClick={handleNext}
                className="w-full bg-eco-green py-6 text-lg font-semibold hover:bg-eco-green-dark"
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
                  <Label htmlFor="wizard-date">Date</Label>
                  <Input
                    id="wizard-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={errors.date ? 'border-destructive' : ''}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wizard-time">Time</Label>
                  <Input
                    id="wizard-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={errors.time ? 'border-destructive' : ''}
                  />
                  {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 py-6 text-lg font-semibold"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>

                <Button type="submit" className="flex-1 bg-eco-green py-6 text-lg font-semibold hover:bg-eco-green-dark">
                  Post
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
