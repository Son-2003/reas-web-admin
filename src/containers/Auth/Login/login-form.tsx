import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReduxDispatch } from '@/lib/redux/store';
import { signIn } from '@/containers/Auth/thunk';
import { useTranslation } from 'react-i18next';
import { DASHBOARD_ROUTE } from '@/common/constants/router';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectNotificationToken } from '@/containers/Notification/selector';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  const [userNameOrEmailOrPhone, setUserNameOrEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const registrationToken = useSelector(selectNotificationToken);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const accountSignIn = pick(
      {
        userNameOrEmailOrPhone,
        password,
        registrationTokens: registrationToken ? [registrationToken] : [],
      },
      ['userNameOrEmailOrPhone', 'password', 'registrationTokens'],
    );

    const resultAction = await dispatch(signIn(accountSignIn));

    setIsLoading(false);

    if (signIn.fulfilled.match(resultAction)) {
      toast({
        title: t('toast.success.login'),
        variant: 'default',
        action: <CheckCircle2 className="text-green-500" />,
      });

      navigate(DASHBOARD_ROUTE);
    } else {
      toast({
        title: t('toast.error.login'),
        variant: 'default',
        action: <XCircle className="text-red-500" />,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t('loginPage.title')}</h1>
                <p className="text-balance text-muted-foreground">
                  {t('loginPage.loginMsg')}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('loginPage.emailOrUsername')}</Label>
                <Input
                  type="text"
                  value={userNameOrEmailOrPhone}
                  placeholder="Email or Username"
                  onChange={(e) => setUserNameOrEmailOrPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('loginPage.password')}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : t('loginPage.loginButton')}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://res.cloudinary.com/dkpg60ca0/image/upload/v1743772817/reas/web-admin/common/gxjmkhebz7bhuu9zoahk.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
