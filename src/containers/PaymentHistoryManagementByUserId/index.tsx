import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Search, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistoryByUserId } from './thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import {
  selectPaymentHistoryByUserId,
  selectPaymentHistoryByUserIdTotalPages,
} from './selector';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { usePaymentHistorycolumns } from './components/columns';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import { MethodPayment } from '@/common/enums/methodPayment';
import { SortingState } from '@tanstack/react-table';

export const PaymentHistoryByUserManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const columns = usePaymentHistorycolumns();
  const { userId } = useParams<{ userId: string }>();
  const storedUsername = localStorage.getItem('username');

  const paymentHistory = useSelector(selectPaymentHistoryByUserId);
  const totalPages = useSelector(selectPaymentHistoryByUserIdTotalPages);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [transactionId, setTransactionId] = useState('');
  const [selectedMethodPayments, setSelectedMethodPayments] = useState<
    Set<string>
  >(new Set());

  const methodOptions = [
    { label: t('paymentHistory.methodPaymentCash'), value: MethodPayment.CASH },
    {
      label: t('paymentHistory.methodPaymentBankTransfer'),
      value: MethodPayment.BANK_TRANSFER,
    },
    {
      label: t('paymentHistory.methodPaymentCreditCard'),
      value: MethodPayment.CREDIT_CARD,
    },
    {
      label: t('paymentHistory.methodPaymentPayPal'),
      value: MethodPayment.PAYPAL,
    },
    {
      label: t('paymentHistory.methodPaymentApplePay'),
      value: MethodPayment.APPLE_PAY,
    },
    { label: t('paymentHistory.methodPaymentVisa'), value: MethodPayment.VISA },
    {
      label: t('paymentHistory.methodPaymentMasterCard'),
      value: MethodPayment.MASTER_CARD,
    },
    {
      label: t('paymentHistory.methodPaymentOther'),
      value: MethodPayment.OTHER,
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (userId) {
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo,
          pageSize,
          transactionId,
          methodPayments: [...selectedMethodPayments],
          sortBy: 'id',
          sortDir: 'asc',
        }),
      ).finally(() => setLoading(false));
    }
  }, [dispatch, userId, pageNo, pageSize, selectedMethodPayments]);

  const handleSearch = () => {
    setPageNo(0);
    if (userId) {
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo: 0,
          pageSize,
          transactionId,
          methodPayments: [...selectedMethodPayments],
          sortBy: 'id',
          sortDir: 'asc',
        }),
      );
    }
  };

  const handleClearSearch = () => {
    setTransactionId('');
    setPageNo(0);
    if (userId) {
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo: 0,
          pageSize,
          transactionId: '',
          methodPayments: [...selectedMethodPayments],
          sortBy: 'id',
          sortDir: 'asc',
        }),
      );
    }
  };

  // Xử lý thay đổi sorting từ DataTable
  const handleSortChange = (sorting: SortingState) => {
    const sortBy = sorting[0]?.id || 'transactionId';
    const sortDir = sorting[0]?.desc ? 'desc' : 'asc';
    if (userId && sortBy === 'transactionId') {
      setPageNo(0);
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo: 0,
          pageSize,
          transactionId,
          methodPayments: [...selectedMethodPayments],
          sortBy,
          sortDir,
        }),
      );
    }
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
          title={`${t('paymentHistory.title1')} ${storedUsername || 'Unknown User'}`}
          description=""
        />
        <Button
          onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
          variant="outline"
        >
          {t('button.back')}
        </Button>
      </div>
      <Separator />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={t('paymentHistory.searchPlaceholder')}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="h-8 w-[150px] pl-8 pr-8 lg:w-[250px]"
            />
            {transactionId && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Section for method payments */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircledIcon className="mr-1 h-3 w-3" />
                {t('paymentHistory.filter.method')}
                {selectedMethodPayments.size > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-3" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden text-sm"
                    >
                      {selectedMethodPayments.size}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedMethodPayments.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal text-sm"
                        >
                          {selectedMethodPayments.size} selected
                        </Badge>
                      ) : (
                        methodOptions
                          .filter((option) =>
                            selectedMethodPayments.has(option.value),
                          )
                          .map((option) => (
                            <Badge
                              key={option.value}
                              variant="secondary"
                              className="rounded-sm px-1 font-normal text-sm"
                            >
                              {option.label}
                            </Badge>
                          ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              {methodOptions.map((option) => {
                const isSelected = selectedMethodPayments.has(option.value);
                return (
                  <div
                    key={option.value}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-black dark:text-white text-sm ${
                      isSelected
                        ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      const newSet = new Set(selectedMethodPayments);
                      isSelected
                        ? newSet.delete(option.value)
                        : newSet.add(option.value);
                      setSelectedMethodPayments(newSet);
                      setPageNo(0);
                      if (userId) {
                        dispatch(
                          fetchPaymentHistoryByUserId({
                            userId: Number(userId),
                            pageNo: 0,
                            pageSize,
                            transactionId,
                            methodPayments: [...newSet],
                            sortBy: 'id',
                            sortDir: 'asc',
                          }),
                        );
                      }
                    }}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-green-500" />}
                  </div>
                );
              })}
              {selectedMethodPayments.size > 0 && (
                <>
                  <Separator className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedMethodPayments(new Set());
                      setPageNo(0);
                      if (userId) {
                        dispatch(
                          fetchPaymentHistoryByUserId({
                            userId: Number(userId),
                            pageNo: 0,
                            pageSize,
                            transactionId,
                            methodPayments: [],
                            sortBy: 'id',
                            sortDir: 'asc',
                          }),
                        );
                      }
                    }}
                  >
                    {t('paymentHistory.filter.clear')}
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <DataTable
          columns={columns}
          data={paymentHistory}
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
