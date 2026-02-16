import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddFoodCardForm from '@/components/add-food/forms/AddFoodCardForm';
import AddFoodWizardForm from '@/components/add-food/forms/AddFoodWizardForm';
import AddFoodDrawerForm from '@/components/add-food/forms/AddFoodDrawerForm';

export default function AddFoodPage() {
  const [activeTab, setActiveTab] = useState('card');

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold text-neutral-800">Add Food</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="wizard">Wizard</TabsTrigger>
          <TabsTrigger value="drawer">Drawer</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="mt-6">
          <AddFoodCardForm />
        </TabsContent>

        <TabsContent value="wizard" className="mt-6">
          <AddFoodWizardForm />
        </TabsContent>

        <TabsContent value="drawer" className="mt-6">
          <AddFoodDrawerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
