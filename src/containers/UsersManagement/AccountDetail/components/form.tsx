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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { createStaffAccount, getUserInfo, updateUser } from '../../thunk';
import { Gender } from '@/common/enums/gender';
import { CreateStaffAccountRequest } from '@/common/models/user';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { STAFFS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { selectStaffAccountInfo } from '../../selector';

const createAccountSchema = z
  .object({
    userName: z
      .string()
      .min(8, 'Username must be at least 8 characters.')
      .max(30, 'Username must not be longer than 30 characters.'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().regex(/^0\d{9,12}$/, 'Invalid phone number format.'),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
      message: 'Select a valid gender.',
    }),
    image: z.instanceof(File).optional(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*).',
      ),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type CreateAccountUserRequest = z.infer<typeof createAccountSchema>;

export default function AccountDetailForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  // const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
  const form = useForm<CreateAccountUserRequest>({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
  });
  const { staffId } = useParams();
  const location = useLocation();
  const [isEdittingStaff, setIsEdittingStaff] = useState(false);
  const staffInfo = useSelector(selectStaffAccountInfo);

  useEffect(() => {
    if (location.pathname.includes('account-detail') && staffId) {
      setIsEdittingStaff(true);
    } else {
      setIsEdittingStaff(false);
    }
  }, [location, staffId]);

  useEffect(() => {
    if (isEdittingStaff && staffId) {
      dispatch(getUserInfo(staffId));
    }
  }, [isEdittingStaff, staffId, dispatch]);

  useEffect(() => {
    if (isEdittingStaff && staffInfo) {
      form.reset({
        userName: staffInfo.userName,
        fullName: staffInfo.fullName,
        email: staffInfo.email,
        phone: staffInfo.phone,
        gender: staffInfo.gender as Gender,
        image: undefined,
        password: '',
        confirmPassword: '',
      });
      // if (staffInfo.image) {
      //   setPreviewImage(staffInfo.image);
      // }
    }
  }, [isEdittingStaff, staffInfo, form]);

  // Helper function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'reas_user_avatar');
    cloudinaryFormData.append('cloud_name', 'dkpg60ca0');

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dkpg60ca0/image/upload',
      {
        method: 'POST',
        body: cloudinaryFormData,
      },
    );

    if (!response.ok) throw new Error('Image upload failed');
    const data = await response.json();
    return data.secure_url;
  };

  async function onSubmit(formData: z.infer<typeof createAccountSchema>) {
    try {
      const imageUrl = formData.image
        ? await uploadImageToCloudinary(formData.image)
        : '';

      const payload: CreateStaffAccountRequest = {
        ...formData,
        image: imageUrl,
        gender: formData.gender as Gender,
      };

      if (isEdittingStaff && staffId) {
        const updateRequest = {
          id: parseInt(staffId),
          ...payload,
        };

        const resultAction = await dispatch(updateUser(updateRequest));
        if (updateUser.fulfilled.match(resultAction)) {
          navigate(STAFFS_MANAGEMENT_ROUTE);
        }
      } else {
        const resultAction = await dispatch(createStaffAccount(payload));
        if (createStaffAccount.fulfilled.match(resultAction)) {
          navigate(STAFFS_MANAGEMENT_ROUTE);
        }
      }

      toast({
        title: 'Account Created Successfully!',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(payload, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: 'Error creating account',
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  }

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //     form.setValue('image', file);
  //   }
  // };

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
                    readOnly
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
                    readOnly
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
            name="userName"
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
                    readOnly
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
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4"></div>

        {/* Image and Gender on the same row */}
        <div className="grid grid-cols-2 gap-4">
          {/* <FormField
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
          /> */}
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
                    value={field.value}
                    className="flex space-x-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={Gender.MALE}
                        id="male"
                        disabled={true}
                      />
                      <FormLabel htmlFor="male" className="font-normal">
                        {t('usersManagement.createAccountUser.gender.male')}
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={Gender.FEMALE}
                        id="female"
                        disabled={true}
                      />
                      <FormLabel htmlFor="female" className="font-normal">
                        {t('usersManagement.createAccountUser.gender.female')}
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={Gender.OTHER}
                        id="other"
                        disabled={true}
                      />
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
          {/* <Button type="submit">
            {isEdittingStaff
              ? t('usersManagement.createAccountUser.updateButton')
              : t('usersManagement.createAccountUser.createButton')}
          </Button> */}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset(); // Reset the form
              // setPreviewImage(null); // Clear the image preview
              navigate(STAFFS_MANAGEMENT_ROUTE);
            }}
          >
            {t('button.back')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
