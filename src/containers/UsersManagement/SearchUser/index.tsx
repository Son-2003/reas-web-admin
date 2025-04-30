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
import { CREATE_STAFF_ACCOUNT_ROUTE } from '@/common/constants/router';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator as Line } from '@/components/ui/separator';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import { SortingState } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';

export const UsersManagement = () => {
  const { t } = useTranslation();
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
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
  const [selectedStatuses, setSelectedStatuses] = useState<Set<StatusEntity>>(
    new Set([StatusEntity.ACTIVE]),
  );
  const [inputUserName, setInputUserName] = useState<string>('');
  const [searchUserName, setSearchUserName] = useState<string>('');
  const [selectedGenders, setSelectedGenders] = useState<Set<Gender>>(
    new Set([Gender.FEMALE, Gender.MALE, Gender.OTHER]),
  );

  const statusOptions = [
    { label: 'Active', value: StatusEntity.ACTIVE },
    { label: 'Inactive', value: StatusEntity.INACTIVE },
  ];
  const genderOptions = [
    { label: 'Female', value: Gender.FEMALE },
    { label: 'Male', value: Gender.MALE },
    { label: 'Other', value: Gender.OTHER },
  ];

  useEffect(() => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment !== '');
    const currentLastSegment = pathSegments[pathSegments.length - 1];
    setLastSegment(currentLastSegment);
    setIsStaffsManagement(currentLastSegment === 'staffs-management');
  }, [location.pathname]);

  useEffect(() => {
    if (!lastSegment) return;

    const defaultSearchRequestBody: SearchUserRequest = {
      userName: searchUserName,
      fullName: '',
      email: '',
      phone: '',
      genders: [...selectedGenders],
      statusEntities: [...selectedStatuses],
      roleNames: [isStaffsManagement ? Role.ROLE_STAFF : Role.ROLE_RESIDENT],
    };

    const searchUserRequestPagination: SearchRequestPagination = {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
    };

    setLoading(true);
    dispatch(
      searchUser({
        data: searchUserRequestPagination,
        request: defaultSearchRequestBody,
      }),
    ).finally(() => setLoading(false));

    setTotalPages(responsePagination?.totalPages || 0);
  }, [
    pageNo,
    pageSize,
    sortBy,
    sortDir,
    lastSegment,
    selectedStatuses,
    selectedGenders,
    searchUserName,
  ]);

  const handleSortChange = (sorting: SortingState) => {
    const sortBy = sorting[0]?.id || 'id';
    const sortDir = sorting[0]?.desc ? 'desc' : 'asc';
    setPageNo(0);

    const searchUserRequestPagination: SearchRequestPagination = {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
    };

    const defaultSearchRequestBody: SearchUserRequest = {
      userName: searchUserName,
      fullName: '',
      email: '',
      phone: '',
      genders: [...selectedGenders],
      statusEntities: [...selectedStatuses],
      roleNames: [isStaffsManagement ? Role.ROLE_STAFF : Role.ROLE_RESIDENT],
    };

    dispatch(
      searchUser({
        data: searchUserRequestPagination,
        request: defaultSearchRequestBody,
      }),
    ).finally(() => setLoading(false));
  };

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
              navigate(CREATE_STAFF_ACCOUNT_ROUTE, { state: null })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
      <Separator />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder={t('usersManagement.searchUser')}
              value={inputUserName}
              onChange={(e) => setInputUserName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchUserName(inputUserName);
                  setPageNo(0);
                }
              }}
            />
            {inputUserName && (
              <button
                type="button"
                onClick={() => {
                  setInputUserName('');
                  setSearchUserName('');
                  setPageNo(0);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircleIcon className="mr-1 h-3 w-3" />
                Status Filter
                {selectedStatuses.size > 0 && (
                  <>
                    <Line orientation="vertical" className="mx-1 h-3" />
                    <div className="flex gap-1 max-w-[150px] overflow-hidden">
                      {[...selectedStatuses].map((status) => {
                        const label = statusOptions.find(
                          (opt) => opt.value === status,
                        )?.label;
                        return (
                          <Badge
                            key={status}
                            variant="secondary"
                            className="rounded-sm px-1 font-normal text-xs truncate"
                            title={label}
                          >
                            {label}
                          </Badge>
                        );
                      })}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              {statusOptions.map((option) => {
                const isSelected = selectedStatuses.has(option.value);
                return (
                  <div
                    key={option.value}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-black dark:text-white text-sm
              ${
                isSelected
                  ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
                    onClick={() => {
                      const newSet = new Set(selectedStatuses);
                      isSelected
                        ? newSet.delete(option.value)
                        : newSet.add(option.value);
                      setSelectedStatuses(newSet);
                      setPageNo(0);
                    }}
                  >
                    <span className="flex items-center text-sm">
                      {option.label}
                    </span>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}

              {selectedStatuses.size > 0 && (
                <>
                  <Line className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedStatuses(new Set());
                      setPageNo(0);
                    }}
                  >
                    Clear Status
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircleIcon className="mr-1 h-3 w-3" />
                Gender Filter
                {selectedGenders.size > 0 && (
                  <>
                    <Line orientation="vertical" className="mx-1 h-3" />
                    <div className="flex gap-1 max-w-[150px] overflow-hidden">
                      {[...selectedGenders].map((gender) => {
                        const label = genderOptions.find(
                          (opt) => opt.value === gender,
                        )?.label;
                        return (
                          <Badge
                            key={gender}
                            variant="secondary"
                            className="rounded-sm px-1 font-normal text-xs truncate"
                            title={label}
                          >
                            {label}
                          </Badge>
                        );
                      })}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              {genderOptions.map((option) => {
                const isSelected = selectedGenders.has(option.value);
                return (
                  <div
                    key={option.value}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-black dark:text-white text-sm
            ${
              isSelected
                ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
                    onClick={() => {
                      const newSet = new Set(selectedGenders);
                      isSelected
                        ? newSet.delete(option.value)
                        : newSet.add(option.value);
                      setSelectedGenders(newSet);
                      setPageNo(0);
                    }}
                  >
                    <span className="flex items-center text-sm">
                      {option.label}
                    </span>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}

              {selectedGenders.size > 0 && (
                <>
                  <Line className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedGenders(new Set());
                      setPageNo(0);
                    }}
                  >
                    Clear Gender
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <DataTable
          columns={columns}
          data={responsePagination?.content || []}
          defaultSortOrder={false}
          onSortChange={handleSortChange}
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
