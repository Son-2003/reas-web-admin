import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CreateAccountUserForm from './components/form';

export default function CreateAccountUser() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={t('usersManagement.createAccountUser.title')}
          description=""
        />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <CreateAccountUserForm />
      </div>
    </>
  );
}
