import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CreateUpdateUserForm from './components/form';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function CreateUpdateUser() {
  const { t } = useTranslation();
  const [isEdittingStaff, setIsEdittingStaff] = useState(false);
  const { staffId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('edit-staff') && staffId) {
      setIsEdittingStaff(true);
    } else {
      setIsEdittingStaff(false);
    }
  }, [location, staffId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={
            isEdittingStaff
              ? t('usersManagement.createAccountUser.title2')
              : t('usersManagement.createAccountUser.title')
          }
          description=""
        />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <CreateUpdateUserForm />
      </div>
    </>
  );
}
