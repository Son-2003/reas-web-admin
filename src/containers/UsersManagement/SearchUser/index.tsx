import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchUserRequest } from '@/common/models/user';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIR,
  SortDirection,
} from '@/common/constants/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { searchUser } from '../thunk';
import { SearchRequestPagination } from '@/common/models/pagination';
import { selectUserSearchResult } from '../selector';
import { Role } from '@/common/enums/role';
import { StatusEntity } from '@/common/enums/statusEntity';
import { Gender } from '@/common/enums/gender';
import { useUserColumns } from './components/column';

export const UsersManagement = () => {
  const { t } = useTranslation();
  const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy] = useState(DEFAULT_SORT_BY);
  const [sortDir] = useState<SortDirection>(DEFAULT_SORT_DIR);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const responsePagination = useSelector(selectUserSearchResult);
  const [isStaffsManagement, setIsStaffsManagement] = useState<boolean>(false);
  const columns = useUserColumns();
  const location = useLocation();
  const [lastSegment, setLastSegment] = useState<string>('');

  useEffect(() => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment !== '');
    const currentLastSegment = pathSegments[pathSegments.length - 1];
    setLastSegment(currentLastSegment);
    setIsStaffsManagement(currentLastSegment === 'staffs-management');
  }, [location.pathname]);

  useEffect(() => {
    // Only dispatch the API call when lastSegment is set
    if (!lastSegment) return;

    const defaultSearchRequestBody: SearchUserRequest = {
      userName: '',
      fullName: '',
      email: '',
      phone: '',
      genders: [Gender.FEMALE, Gender.MALE, Gender.OTHER],
      statusEntities: [StatusEntity.ACTIVE],
      roleNames: [isStaffsManagement ? Role.ROLE_STAFF : Role.ROLE_RESIDENT],
    };

    const searchUserRequestPagination: SearchRequestPagination = {
      pageNo: DEFAULT_PAGE_NO,
      pageSize: DEFAULT_PAGE_SIZE,
      sortBy: DEFAULT_SORT_BY,
      sortDir: DEFAULT_SORT_DIR,
    };

    dispatch(
      searchUser({
        data: searchUserRequestPagination,
        request: defaultSearchRequestBody,
      }),
    );
    setTotalPages(responsePagination?.totalPages || 0);
    setLoading(false);
  }, [pageNo, pageSize, sortBy, sortDir, lastSegment]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={
            isStaffsManagement
              ? t('staffsManagement.title')
              : t('usersManagement.title')
          }
          description=""
        />

        {isStaffsManagement && (
          <Button
            onClick={() =>
              navigate('/admin/create-account-staff', { state: null })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={responsePagination?.content || []}
          searchKey="id"
          placeholder={t('usersManagement.searchPlaceholder')}
        />
      </div>
      <DataTablePagination
        currentPage={pageNo}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
