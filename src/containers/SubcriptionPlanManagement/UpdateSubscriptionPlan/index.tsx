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
import { updateSubscriptionPlan } from '../thunk';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const UpdateSubscriptionPlan = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  console.log('Current ID from useParams:', id);
  const location = useLocation();
  const subscriptionPlan = location.state?.subscriptionPlan;

  const subscriptionPlanSchema = z.object({
    name: z
      .string()
      .min(3, 'subscriptionPlan.createSubscriptionPlan.validate.nameMin'),
    description: z
      .string()
      .min(
        10,
        'subscriptionPlan.createSubscriptionPlan.validate.descriptionMin',
      )
      .max(1000),
    price: z
      .number()
      .min(0, 'subscriptionPlan.createSubscriptionPlan.validate.priceMin'),
    imageUrl: z.string().default('abc'),
    typeSubscriptionPlan: z.enum([
      TypeSubscriptionPlan.PREMIUM_PLAN,
      TypeSubscriptionPlan.ITEM_EXTENSION,
    ]),
    duration: z
      .number()
      .min(1, 'subscriptionPlan.createSubscriptionPlan.validate.durationMin'),
  });

  type SubscriptionPlanFormValues = z.infer<typeof subscriptionPlanSchema>;

  const form = useForm<SubscriptionPlanFormValues>({
    resolver: zodResolver(subscriptionPlanSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      duration: 1,
      typeSubscriptionPlan: TypeSubscriptionPlan.PREMIUM_PLAN,
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (subscriptionPlan) {
      form.reset({
        name: subscriptionPlan.name,
        description: subscriptionPlan.description,
        price: subscriptionPlan.price,
        duration: subscriptionPlan.duration,
        typeSubscriptionPlan: subscriptionPlan.typeSubscriptionPlan,
        imageUrl: subscriptionPlan.imageUrl || 'abc',
      });
    }
  }, [subscriptionPlan, form]);

  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE);
  };

  async function onSubmit(formData: SubscriptionPlanFormValues) {
    try {
      const payload = {
        id: id,
        ...formData,
      };

      await dispatch(updateSubscriptionPlan(payload));

      toast({
        title: t('subscriptionPlan.createSubscriptionPlan.updateSuccessTitle'),
        description: t(
          'subscriptionPlan.createSubscriptionPlan.updateSuccessDescription',
        ),
      });

      navigate(SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE);
    } catch (error) {
      toast({
        title: t('subscriptionPlan.createSubscriptionPlan.updateErrorTitle'),
        description:
          error instanceof Error
            ? error.message
            : t(
                'subscriptionPlan.createSubscriptionPlan.updateErrorDescription',
              ),
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-full h-full">
      <h1 className="text-2xl font-bold">
        {t('subscriptionPlan.updateSubscriptionPlan')}
      </h1>

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
                  <FormLabel>
                    {t('subscriptionPlan.createSubscriptionPlan.planName')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        'subscriptionPlan.createSubscriptionPlan.planName',
                      )}
                      {...field}
                    />
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
                  <FormLabel>
                    {t('subscriptionPlan.createSubscriptionPlan.planType')}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'subscriptionPlan.createSubscriptionPlan.selectType',
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TypeSubscriptionPlan.PREMIUM_PLAN}>
                        {t(
                          'subscriptionPlan.createSubscriptionPlan.typePremium',
                        )}
                      </SelectItem>
                      <SelectItem value={TypeSubscriptionPlan.ITEM_EXTENSION}>
                        {t(
                          'subscriptionPlan.createSubscriptionPlan.typeItemExtension',
                        )}
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
                  <FormLabel>
                    {t('subscriptionPlan.createSubscriptionPlan.price')}
                  </FormLabel>
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
                  <FormLabel>
                    {t('subscriptionPlan.createSubscriptionPlan.duration')}
                  </FormLabel>
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
                <FormLabel>
                  {t('subscriptionPlan.createSubscriptionPlan.description')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t(
                      'subscriptionPlan.createSubscriptionPlan.descriptionPlaceholder',
                    )}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 justify-end">
            <Button type="submit">{t('button.update')}</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              {t('subscriptionPlan.createSubscriptionPlan.cancelButton')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
