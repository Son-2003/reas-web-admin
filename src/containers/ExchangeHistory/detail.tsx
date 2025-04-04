import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import {
  selectExchangeHistoryDetail,
  selectExchangeHistoryDetailFetchStatus,
} from './selector';
import { getExchangeHistoryDetail } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ReduxDispatch } from '@/lib/redux/store';
import { Button } from '@/components/ui/button';
import { EXCHANGE_HISTORY_MANAGEMENT_ROUTE } from '@/common/constants/router';

const ExchangeHistoryDetail: React.FC = () => {
  const { exchangeHistoryId, userId } = useParams();
  const dispatch = useDispatch<ReduxDispatch>();
  const exchangeHistory = useSelector(selectExchangeHistoryDetail);
  const fetchStatus = useSelector(selectExchangeHistoryDetailFetchStatus);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSellerImageIndex, setCurrentSellerImageIndex] = useState(0);
  const [currentBuyerImageIndex, setCurrentBuyerImageIndex] = useState(0);

  useEffect(() => {
    if (exchangeHistoryId) {
      dispatch(getExchangeHistoryDetail(exchangeHistoryId));
    }
  }, [dispatch, exchangeHistoryId]);

  const handleBackClick = () => {
    navigate(
      EXCHANGE_HISTORY_MANAGEMENT_ROUTE.replace(':userId', userId || ''),
    );
  };

  const sellerImageUrls = exchangeHistory?.sellerItem.imageUrl
    ? exchangeHistory.sellerItem.imageUrl.split(', ')
    : [];
  const buyerImageUrls = exchangeHistory?.buyerItem.imageUrl
    ? exchangeHistory.buyerItem.imageUrl.split(', ')
    : [];

  const handlePrevSellerImage = () => {
    setCurrentSellerImageIndex((prevIndex) =>
      prevIndex === 0 ? sellerImageUrls.length - 1 : prevIndex - 1,
    );
  };

  const handleNextSellerImage = () => {
    setCurrentSellerImageIndex((prevIndex) =>
      prevIndex === sellerImageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevBuyerImage = () => {
    setCurrentBuyerImageIndex((prevIndex) =>
      prevIndex === 0 ? buyerImageUrls.length - 1 : prevIndex - 1,
    );
  };

  const handleNextBuyerImage = () => {
    setCurrentBuyerImageIndex((prevIndex) =>
      prevIndex === buyerImageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleDotBuyerClick = (index: number) => {
    setCurrentBuyerImageIndex(index);
  };
  const handleDotSellerClick = (index: number) => {
    setCurrentSellerImageIndex(index);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={handleBackClick} variant="outline">
          {t('button.back')}
        </Button>
      </div>

      <Card className="border-none shadow-none dark:bg-black">
        <CardContent className="px-0">
          {fetchStatus === ApiStatus.Loading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
              <span className="ml-2 text-blue-500">
                {t('exchangeHistory.loading')}
              </span>
            </div>
          )}

          {fetchStatus === ApiStatus.Failed && (
            <div className="flex items-center text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="ml-2">{t('exchangeHistory.error')}</span>
            </div>
          )}

          {fetchStatus === ApiStatus.Fulfilled && exchangeHistory && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                  {t('exchangeHistory.sellerItem')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.itemName')}
                    </strong>
                    <span>{exchangeHistory.sellerItem.itemName}</span>
                  </div>
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.description')}
                    </strong>
                    <span>{exchangeHistory.sellerItem.description}</span>
                  </div>
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.price')}
                    </strong>
                    <span>
                      {exchangeHistory.sellerItem.price.toLocaleString()} VND
                    </span>
                  </div>
                  {sellerImageUrls.length > 0 && (
                    <div className="relative w-full h-96 mt-2 mb-5">
                      <img
                        alt={exchangeHistory.sellerItem.itemName}
                        className="w-full h-full object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        src={sellerImageUrls[currentSellerImageIndex]}
                      />
                      <button
                        onClick={handlePrevSellerImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        &#8249;
                      </button>
                      <button
                        onClick={handleNextSellerImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        &#8250;
                      </button>
                    </div>
                  )}
                  <div className="flex justify-center mt-2 space-x-2">
                    {sellerImageUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotSellerClick(index)}
                        className={`h-2 w-2 rounded-full focus:outline-none transition-colors duration-200 ${currentSellerImageIndex === index ? 'bg-black dark:bg-white scale-125' : 'bg-gray-400 dark:bg-gray-600'}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                  {t('exchangeHistory.buyerItem')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.itemName')}
                    </strong>
                    <span>{exchangeHistory.buyerItem.itemName}</span>
                  </div>
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.description')}
                    </strong>
                    <span>{exchangeHistory.buyerItem.description}</span>
                  </div>
                  <div>
                    <strong className="block text-sm text-gray-600 dark:text-gray-400">
                      {t('exchangeHistory.price')}
                    </strong>
                    <span>
                      {exchangeHistory.buyerItem.price.toLocaleString()} VND
                    </span>
                  </div>
                  {buyerImageUrls.length > 0 && (
                    <div className="relative w-full h-96 mt-2 mb-5">
                      <img
                        alt={exchangeHistory.buyerItem.itemName}
                        className="w-full h-full object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        src={buyerImageUrls[currentBuyerImageIndex]}
                      />
                      <button
                        onClick={handlePrevBuyerImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        &#8249;
                      </button>
                      <button
                        onClick={handleNextBuyerImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-full hover:bg-black transition-colors"
                      >
                        &#8250;
                      </button>
                    </div>
                  )}
                  <div className="flex justify-center mt-2 space-x-2">
                    {buyerImageUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotBuyerClick(index)}
                        className={`h-2 w-2 rounded-full focus:outline-none transition-colors duration-200 ${currentBuyerImageIndex === index ? 'bg-black dark:bg-white scale-125' : 'bg-gray-400 dark:bg-gray-600'}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('exchangeHistory.paidBy')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('exchangeHistory.userName')}
                      </strong>
                      <span>{exchangeHistory.paidBy.userName}</span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('exchangeHistory.fullName')}
                      </strong>
                      <span>{exchangeHistory.paidBy.userName}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('exchangeHistory.exchangeDetails')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('exchangeHistory.exchangeDate')}
                      </strong>
                      <span>
                        {new Date(
                          exchangeHistory.exchangeDate,
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('exchangeHistory.exchangeLocation')}
                      </strong>
                      <span>{exchangeHistory.exchangeLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('exchangeHistory.confirmationAndNotes')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('exchangeHistory.buyerConfirmation')}
                      </strong>
                      <span
                        className={
                          exchangeHistory.buyerConfirmation
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {exchangeHistory.buyerConfirmation
                          ? t('exchangeHistory.confirmed')
                          : t('exchangeHistory.notConfirmed')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeHistoryDetail;
