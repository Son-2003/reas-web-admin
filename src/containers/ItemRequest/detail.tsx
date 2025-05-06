import React, { useEffect, useState } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

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
    setIsLoading(true);
    try {
      await dispatch(
        reviewItemRequest({ id, statusItem: reviewStatus }),
      ).unwrap();
      setOpenDialog(false);

      toast({
        title: t('itemRequest.itemRequestDetail.toast.success'),
        description: `${t('itemRequest.itemRequestDetail.toast.description')} ${
          reviewStatus === 'AVAILABLE'
            ? t('itemRequest.itemRequestDetail.toast.approve')
            : t('itemRequest.itemRequestDetail.toast.discard')
        } ${t('itemRequest.itemRequestDetail.toast.successfully')}`,
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
        title: 'Error',
        description: 'An error occurred while processing the request.',
        variant: 'destructive',
        action: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
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

  const imageUrls = item.imageUrl.split(', ');

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setImageDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="mt-6 flex flex-wrap gap-4">
        <Button onClick={() => navigate(ITEM_REQUEST_ROUTE)} variant="outline">
          {t('button.back')}
        </Button>
      </div>
      <div className="flex items-center space-x-4 mt-5">
        <div className="w-12 h-12 bg-gray-500 rounded-full border border-gray-300" />
        <div>
          <span className="text-black dark:text-white font-medium">
            {item.owner.userName}
          </span>
        </div>
      </div>
      <div>
        <div className="w-6 h-6 bg-[url(/logo.svg)] bg-no-repeat bg-cover" />
        <span className="text-black dark:text-white text-xl font-bold">
          {item.itemName}
        </span>
      </div>

      <div className="grid grid-cols-[30%_70%] gap-6 mt-6">
        <div>
          <div className="mt-6 relative w-96">
            <div className="w-96 h-96 rounded-lg overflow-hidden mt-2 mb-5 flex items-center justify-center">
              <img
                alt={item.itemName}
                className="w-full h-full object-contain cursor-pointer"
                src={imageUrls[currentImageIndex]}
                onClick={() => handleImageClick(currentImageIndex)}
              />
            </div>

            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
            >
              &#8249;
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
            >
              &#8250;
            </button>
          </div>

          {/* Các dot điều hướng hình ảnh */}
          <div className="flex justify-center mt-2 space-x-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full focus:outline-none transition-colors duration-200 ${currentImageIndex === index ? 'bg-black dark:bg-white scale-125' : 'bg-gray-400 dark:bg-gray-600'}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            {t('itemRequest.description')}
          </span>

          <p className="text-black dark:text-white text-sm mt-2 mb-4">
            {item.description
              .replace(/\\n/g, '\n')
              .split('\n')
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            {t('itemRequest.information')}
          </span>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm">
              <tbody>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    {t('itemRequest.condition')}
                  </td>
                  <td
                    className={`p-2 font-bold ${
                      {
                        [ConditionItem.BRAND_NEW]: 'text-green-700',
                        [ConditionItem.LIKE_NEW]: 'text-green-500',
                        [ConditionItem.EXCELLENT]: 'text-blue-700',
                        [ConditionItem.GOOD]: 'text-blue-500',
                        [ConditionItem.FAIR]: 'text-yellow-700',
                        [ConditionItem.POOR]: 'text-yellow-500',
                        [ConditionItem.NOT_WORKING]: 'text-red-700',
                        [ConditionItem.NO_CONDITION]: 'text-gray-500',
                      }[item.conditionItem] || 'text-black dark:text-white'
                    }`}
                  >
                    {ConditionItemsLabels[item.conditionItem] ||
                      item.conditionItem}
                  </td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    {t('itemRequest.category')}
                  </td>
                  <td className="p-2">{item.category.categoryName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    {t('itemRequest.brand')}
                  </td>
                  <td className="p-2">{item.brand.brandName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    {t('itemRequest.methodExchange')}
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
              {item.userLocation && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                    {t('itemRequest.userLocation')}
                  </span>
                  <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                    <p>
                      <strong>{t('itemRequest.address')}</strong>{' '}
                      {item.userLocation.specificAddress}
                    </p>
                    <p>
                      <strong>{t('itemRequest.area')}</strong>{' '}
                      {item.userLocation.location.area}
                    </p>
                    <p>
                      <strong>{t('itemRequest.district')}</strong>{' '}
                      {item.userLocation.location.district}
                    </p>
                    <p>
                      <strong>{t('itemRequest.ward')}</strong>{' '}
                      {item.userLocation.location.ward}
                    </p>
                    <p>
                      <strong>{t('itemRequest.cluster')}</strong>{' '}
                      {item.userLocation.location.cluster}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {item.desiredItem && (
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                  {t('itemRequest.itemRequestDetail.desiredItem')}
                </span>
                <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                  {item.desiredItem.description && (
                    <p>
                      <strong>
                        {t('itemRequest.itemRequestDetail.description')}
                      </strong>{' '}
                      {item.desiredItem.description}
                    </p>
                  )}
                  {item.desiredItem.categoryName && (
                    <p>
                      <strong>{t('itemRequest.category')}</strong>{' '}
                      {item.desiredItem.categoryName}
                    </p>
                  )}
                  {item.desiredItem.brandName && (
                    <p>
                      <strong>{t('itemRequest.brand')}</strong>{' '}
                      {item.desiredItem.brandName}
                    </p>
                  )}
                  {item.desiredItem.conditionItem && (
                    <p>
                      <strong>{t('itemRequest.condition')}</strong>{' '}
                      {
                        ConditionItemsLabels[
                          item.desiredItem.conditionItem as ConditionItem
                        ]
                      }
                    </p>
                  )}
                  {item.desiredItem.minPrice != null && (
                    <p>
                      <strong>
                        {t('itemRequest.itemRequestDetail.minPrice')}
                      </strong>{' '}
                      {item.desiredItem.minPrice.toLocaleString()} VND
                    </p>
                  )}
                  {item.desiredItem.maxPrice != null && (
                    <p>
                      <strong>
                        {t('itemRequest.itemRequestDetail.maxPrice')}
                      </strong>{' '}
                      {item.desiredItem.maxPrice.toLocaleString()} VND
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
              {t('itemRequest.price')}
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
                {t('button.cancel')}
              </Button>
              <Button
                variant={
                  reviewStatus === 'AVAILABLE' ? 'default' : 'destructive'
                }
                onClick={confirmReview}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" size={16} />
                    {t('button.loading')}
                  </>
                ) : reviewStatus === 'AVAILABLE' ? (
                  t('itemRequest.itemRequestDetail.dialog.approve2')
                ) : (
                  t('itemRequest.itemRequestDetail.dialog.discard2')
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{item.itemName}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img
                alt={item.itemName}
                className="w-full h-auto max-w-4xl object-contain"
                src={imageUrls[currentImageIndex]}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
