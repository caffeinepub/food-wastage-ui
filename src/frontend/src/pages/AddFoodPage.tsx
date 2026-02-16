import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddFoodCardForm from '@/components/add-food/forms/AddFoodCardForm';
import AddFoodWizardForm from '@/components/add-food/forms/AddFoodWizardForm';
import AddFoodDrawerForm from '@/components/add-food/forms/AddFoodDrawerForm';

export default function AddFoodPage() {
  return (
    <div className="space-y-5 p-6">
      <h2 className="text-2xl font-bold text-earth-900">Add Food Donation</h2>

      <Tabs defaultValue="card" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-earth-100">
          <TabsTrigger value="card" className="data-[state=active]:bg-leaf data-[state=active]:text-white">
            Card
          </TabsTrigger>
          <TabsTrigger value="wizard" className="data-[state=active]:bg-leaf data-[state=active]:text-white">
            Wizard
          </TabsTrigger>
          <TabsTrigger value="drawer" className="data-[state=active]:bg-leaf data-[state=active]:text-white">
            Drawer
          </TabsTrigger>
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
