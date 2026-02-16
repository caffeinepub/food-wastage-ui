import { useState } from 'react';

interface FormData {
  title: string;
  quantity: string;
  date: string;
  time: string;
}

interface ValidationErrors {
  title?: string;
  quantity?: string;
  date?: string;
  time?: string;
}

export function useAddFoodValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validateForm, errors };
}
