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
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const CreateSubscriptionPlan = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const subscriptionPlanSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(
            3,
            t('subscriptionPlan.createSubscriptionPlan.validate.nameMin'),
          ),
        description: z
          .string()
          .min(
            10,
            t(
              'subscriptionPlan.createSubscriptionPlan.validate.descriptionMin',
            ),
          )
          .max(
            1000,
            t(
              'subscriptionPlan.createSubscriptionPlan.validate.descriptionMax',
            ),
          ),
        price: z
          .number()
          .min(
            0,
            t('subscriptionPlan.createSubscriptionPlan.validate.priceMin'),
          ),
        imageUrl: z.string().default('abc'),
        typeSubscriptionPlan: z.enum([
          TypeSubscriptionPlan.PREMIUM_PLAN,
          TypeSubscriptionPlan.ITEM_EXTENSION,
        ]),
        duration: z
          .number()
          .min(
            0,
            t('subscriptionPlan.createSubscriptionPlan.validate.durationMin'),
          ),
        numberOfFreeExtension: z.number().min(0),
      }),
    [t],
  );

  type SubscriptionPlanFormValues = z.infer<typeof subscriptionPlanSchema>;

  const form = useForm<SubscriptionPlanFormValues>({
    resolver: zodResolver(subscriptionPlanSchema),
    mode: 'onChange',
    defaultValues: {
      imageUrl: 'abc',
    },
  });

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

      // Sử dụng .unwrap() để throw lỗi từ Redux Toolkit
      await dispatch(createSubscriptionPlan(payload)).unwrap();

      toast({
        title: t('subscriptionPlan.createSubscriptionPlan.successTitle'),
        description: t('subscriptionPlan.createSubscriptionPlan.successDesc'),
      });

      form.reset();
      navigate(SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE);
    } catch (error: any) {
      console.log('Error:', error);
      toast({
        title: t('subscriptionPlan.createSubscriptionPlan.errorTitle'),
        description:
          error instanceof Error
            ? error.message
            : t('subscriptionPlan.createSubscriptionPlan.error'),
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-full h-full">
      <h1 className="text-2xl font-bold">
        {t('subscriptionPlan.createSubscriptionPlan.heading')}
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
                        'subscriptionPlan.createSubscriptionPlan.planNamePlaceholder',
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
            <FormField
              control={form.control}
              name="numberOfFreeExtension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('subscriptionPlan.createSubscriptionPlan.freeExtension')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
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
            <Button type="submit">
              {t('subscriptionPlan.createSubscriptionPlan.createButton')}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              {t('subscriptionPlan.createSubscriptionPlan.cancelButton')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
