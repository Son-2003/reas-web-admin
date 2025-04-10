import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TypeSubscriptionPlan } from '@/common/enums/typeSubscriptionPlan';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { createSubscriptionPlan } from '../thunk';
import { useNavigate } from 'react-router-dom';
import { SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE } from '@/common/constants/router';

const subscriptionPlanSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.')
    .max(1000),
  price: z.number().min(0, 'Price must be a positive value'),
  imageUrl: z.string().default('abc'),
  typeSubscriptionPlan: z.enum([
    TypeSubscriptionPlan.PREMIUM_PLAN,
    TypeSubscriptionPlan.ITEM_EXTENSION,
  ]),
  duration: z.number().min(1, 'Duration must be at least 1 month'),
});

type SubscriptionPlanFormValues = z.infer<typeof subscriptionPlanSchema>;

export const CreateSubscriptionPlan = () => {
  const form = useForm<SubscriptionPlanFormValues>({
    resolver: zodResolver(subscriptionPlanSchema),
    mode: 'onChange',
    defaultValues: {
      imageUrl: 'abc',
    },
  });

  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE);
  };

  async function onSubmit(formData: SubscriptionPlanFormValues) {
    try {
      const payload = {
        ...formData,
        price: formData.price,
        duration: Number(formData.duration),
        imageUrl: 'abc',
      };

      await dispatch(createSubscriptionPlan(payload));

      toast({
        title: 'Subscription Plan Created Successfully!',
        description: 'Your new plan has been saved.',
      });

      form.reset();
      navigate(SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE);
    } catch (error) {
      toast({
        title: 'Error creating plan',
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-full h-full">
      <h1 className="text-2xl font-bold">Create subscription plan</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full h-full"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Basic Plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeSubscriptionPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TypeSubscriptionPlan.PREMIUM_PLAN}>
                        Premium Plan
                      </SelectItem>
                      <SelectItem value={TypeSubscriptionPlan.ITEM_EXTENSION}>
                        Item Extension
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (VND)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          ? parseFloat(e.target.value)
                          : '';
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="3.5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Plan features and benefits..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 justify-end">
            <Button type="submit">Create Plan</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
