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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const createAccountSchema = z
  .object({
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters.')
      .max(30, 'Username must not be longer than 30 characters.'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format.'),
    gender: z.enum(['Male', 'Female', 'Other'], {
      message: 'Select a valid gender.',
    }),
    image: z.instanceof(File).optional(), // Handle file input
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type CreateAccountUserRequest = z.infer<typeof createAccountSchema>;

export default function CreateAccountUserForm() {
  const { t } = useTranslation();

  const form = useForm<CreateAccountUserRequest>({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview

  function onSubmit(data: CreateAccountUserRequest) {
    toast({
      title: 'Account Created Successfully!',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Handle file input change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Set preview image
      };
      reader.readAsDataURL(file); // Convert file to data URL
      form.setValue('image', file); // Update form value
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.fullName.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'usersManagement.createAccountUser.fullName.placeholder',
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.phone.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t(
                      'usersManagement.createAccountUser.phone.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.username.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'usersManagement.createAccountUser.username.placeholder',
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.email.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t(
                      'usersManagement.createAccountUser.email.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.password.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t(
                      'usersManagement.createAccountUser.password.placeholder',
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.confirmPassword.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t(
                      'usersManagement.createAccountUser.confirmPassword.placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image and Gender on the same row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.profileImage.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('usersManagement.createAccountUser.gender.label')}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <FormLabel htmlFor="male" className="font-normal">
                        {t('usersManagement.createAccountUser.gender.male')}
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <FormLabel htmlFor="female" className="font-normal">
                        {t('usersManagement.createAccountUser.gender.female')}
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <FormLabel htmlFor="other" className="font-normal">
                        {t('usersManagement.createAccountUser.gender.other')}
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cancel and Create Account Buttons */}
        <div className="flex space-x-4">
          <Button type="submit">
            {t('usersManagement.createAccountUser.createButton')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset(); // Reset the form
              setPreviewImage(null); // Clear the image preview
            }}
          >
            {t('usersManagement.createAccountUser.cancelButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
