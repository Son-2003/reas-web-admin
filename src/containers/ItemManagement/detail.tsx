import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';

import { LoaderCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { selectItemDetail } from '../ItemRequest/selector';
import { fetchItemDetail } from '../ItemRequest/thunk';
import { ITEMS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { MethodExchange } from '@/common/enums/methodExchange';
import { ConditionItem } from '@/common/enums/conditionItem';
import { useTranslation } from 'react-i18next';

export const ItemDetail = () => {
  const { itemId, userId } = useParams<{ itemId: string; userId: string }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const item = useSelector(selectItemDetail);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemDetail(itemId));
    }
  }, [dispatch, itemId]);

  if (!item || !item.imageUrl) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  const MethodExchangeLabels = [
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

  const ConditionItemsLabels = [
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

  const handleBackClick = () => {
    navigate(ITEMS_MANAGEMENT_ROUTE.replace(':id', userId || ''));
  };

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
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={handleBackClick} variant="outline">
          Back
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
          <div className="mt-6 relative w-96">
            <div className="w-96 h-96 rounded-lg overflow-hidden mt-2 mb-5 flex items-center justify-center">
              <img
                alt={item.itemName}
                className="w-full h-full object-contain cursor-pointer"
                src={imageUrls[currentImageIndex]}
                onClick={() => handleImageClick(currentImageIndex)} // Thêm sự kiện click
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
                    {ConditionItemsLabels.find(
                      (label) => label.value === item.conditionItem,
                    )?.label || item.conditionItem}
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
                      .map(
                        (method) =>
                          MethodExchangeLabels.find(
                            (label) => label.value === method,
                          )?.label,
                      )
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
                      {item.desiredItem.description
                        .replace(/\\n/g, '\n')
                        .split('\n')
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
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
                      {ConditionItemsLabels.find(
                        (label) =>
                          label.value === item.desiredItem.conditionItem,
                      )?.label || item.desiredItem.conditionItem}
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
