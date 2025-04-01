import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';

import { LoaderCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { selectItemDetail } from './selector';
import { fetchItemDetail, reviewItemRequest } from './thunk';
import { ITEM_REQUEST_ROUTE } from '@/common/constants/router';
import { MethodExchange } from '@/common/enums/methodExchange';
import { ConditionItem } from '@/common/enums/conditionItem';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
export const ItemRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const item = useSelector(selectItemDetail);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<
    'AVAILABLE' | 'REJECTED' | null
  >(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      dispatch(fetchItemDetail(id));
    }
  }, [dispatch, id]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }
  const confirmReview = async () => {
    if (!id || !reviewStatus) return;
    try {
      await dispatch(
        reviewItemRequest({ id, statusItem: reviewStatus }),
      ).unwrap();
      setOpenDialog(false);

      toast({
        title: 'Thành công',
        description: `Yêu cầu đã được ${reviewStatus === 'AVAILABLE' ? 'phê duyệt' : 'từ chối'} thành công!`,
        variant: 'default',
        action:
          reviewStatus === 'AVAILABLE' ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <XCircle className="text-red-500" />
          ),
      });

      navigate(ITEM_REQUEST_ROUTE);
    } catch (error) {
      console.error('Error reviewing item request:', error);
      toast({
        title: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi xử lý yêu cầu',
        variant: 'destructive',
        action: <XCircle className="text-red-500" />,
      });
    }
  };
  const MethodExchangeLabelsArray = [
    {
      label: t('itemRequest.itemRequestDetail.pickUpInPerson'),
      value: MethodExchange.PICK_UP_IN_PERSON,
    },
    {
      label: t('itemRequest.itemRequestDetail.delivery'),
      value: MethodExchange.DELIVERY,
    },
    {
      label: t('itemRequest.itemRequestDetail.meetAtGivenLocation'),
      value: MethodExchange.MEET_AT_GIVEN_LOCATION,
    },
    {
      label: t('itemRequest.itemRequestDetail.noMethod'),
      value: MethodExchange.NO_METHOD,
    },
  ];

  const MethodExchangeLabels = MethodExchangeLabelsArray.reduce(
    (acc, item) => ({ ...acc, [item.value]: item.label }),
    {} as Record<MethodExchange, string>,
  );

  const ConditionItemsArray = [
    {
      label: t('itemRequest.itemRequestDetail.brandNew'),
      value: ConditionItem.BRAND_NEW,
    },
    {
      label: t('itemRequest.itemRequestDetail.likeNew'),
      value: ConditionItem.LIKE_NEW,
    },
    {
      label: t('itemRequest.itemRequestDetail.excellent'),
      value: ConditionItem.EXCELLENT,
    },
    {
      label: t('itemRequest.itemRequestDetail.good'),
      value: ConditionItem.GOOD,
    },
    {
      label: t('itemRequest.itemRequestDetail.fair'),
      value: ConditionItem.FAIR,
    },
    {
      label: t('itemRequest.itemRequestDetail.poor'),
      value: ConditionItem.POOR,
    },
    {
      label: t('itemRequest.itemRequestDetail.notWorking'),
      value: ConditionItem.NOT_WORKING,
    },
    {
      label: t('itemRequest.itemRequestDetail.noCondition'),
      value: ConditionItem.NO_CONDITION,
    },
  ];

  const ConditionItemsLabels = ConditionItemsArray.reduce(
    (acc, item) => ({ ...acc, [item.value]: item.label }),
    {} as Record<ConditionItem, string>,
  );
  const primaryLocation = item.owner.userLocations.find((loc) => loc.primary);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="mt-6 flex flex-wrap gap-4">
        <Button onClick={() => navigate(ITEM_REQUEST_ROUTE)} variant="outline">
          {t('button.back')}
        </Button>
      </div>
      <div>
        <div className="w-6 h-6 bg-[url(/logo.svg)] bg-no-repeat bg-cover" />
        <span className="text-black dark:text-white text-xl font-bold">
          {item.itemName}
        </span>
      </div>

      <div className="grid grid-cols-[30%_70%] gap-6 mt-6">
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-500 rounded-full border border-gray-300" />
            <div>
              <span className="text-black dark:text-white font-medium">
                {item.owner.userName}
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Hoạt động 2 giờ trước
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full max-w-sm h-96 bg-gray-300 rounded-lg overflow-hidden mt-2 mb-5">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            Description:
          </span>
          <p className="text-black dark:text-white text-sm mt-2 mb-4">
            {item.description}
          </p>

          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            Information
          </span>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm">
              <tbody>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Condition:
                  </td>
                  <td className="p-2 text-green-600 dark:text-green-500 font-bold">
                    {ConditionItemsLabels[item.conditionItem] ||
                      item.conditionItem}
                  </td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Category:
                  </td>
                  <td className="p-2">{item.category.categoryName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Brand:
                  </td>
                  <td className="p-2">{item.brand.brandName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Method Exchange:
                  </td>
                  <td className="p-2">
                    {item.methodExchanges
                      .map((method) => MethodExchangeLabels[method])
                      .join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-[41%_59%] gap-6 mt-6">
            <div>
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                User Location:
              </span>
              {primaryLocation ? (
                <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                  <p>
                    <strong>Address:</strong>{' '}
                    {primaryLocation.specificAddress.split('//')[1]}
                  </p>
                  <p>
                    <strong>Area:</strong> {primaryLocation.location.area}
                  </p>
                  <p>
                    <strong>District:</strong>{' '}
                    {primaryLocation.location.district}
                  </p>
                  <p>
                    <strong>Ward:</strong> {primaryLocation.location.ward}
                  </p>
                  <p>
                    <strong>Cluster:</strong> {primaryLocation.location.cluster}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No location available
                </p>
              )}
            </div>

            {item.desiredItem && (
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                  Desired Item:
                </span>
                <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                  <p>
                    <strong>Description:</strong> {item.desiredItem.description}
                  </p>
                  <p>
                    <strong>Min price:</strong>{' '}
                    {item.desiredItem.minPrice?.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Max price:</strong>{' '}
                    {item.desiredItem.maxPrice?.toLocaleString()} VND
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
              Price:
            </span>
            <span className="text-black dark:text-white text-xl font-bold ml-2">
              {item.price.toLocaleString()} VND
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={() => {
              setReviewStatus('AVAILABLE');
              setOpenDialog(true);
            }}
            variant="default"
          >
            {t('button.approve')}
          </Button>
          <Button
            onClick={() => {
              setReviewStatus('REJECTED');
              setOpenDialog(true);
            }}
            variant="destructive"
          >
            {t('button.discard')}
          </Button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t('itemRequest.itemRequestDetail.dialog.title')}
              </DialogTitle>
            </DialogHeader>
            <p>
              {t('itemRequest.itemRequestDetail.dialog.content1')}{' '}
              {reviewStatus === 'AVAILABLE'
                ? t('itemRequest.itemRequestDetail.dialog.approve1')
                : t('itemRequest.itemRequestDetail.dialog.discard1')}{' '}
              {t('itemRequest.itemRequestDetail.dialog.content2')}
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Hủy
              </Button>
              <Button
                variant={
                  reviewStatus === 'AVAILABLE' ? 'default' : 'destructive'
                }
                onClick={confirmReview}
              >
                {reviewStatus === 'AVAILABLE'
                  ? t('itemRequest.itemRequestDetail.dialog.approve2')
                  : t('itemRequest.itemRequestDetail.dialog.discard2')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
