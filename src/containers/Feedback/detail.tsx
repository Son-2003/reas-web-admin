import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle, Star } from 'lucide-react';
import { selectFeedbackDetail, selectFeedbackFetchStatus } from './selector';
import { getFeedbackDetail } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ReduxDispatch } from '@/lib/redux/store';

import { useNavigate, useParams } from 'react-router-dom';
import { FEEDBACK_USER_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { Button } from '@/components/ui/button';

const FeedbackDetail: React.FC = () => {
  const { feedbackId, userId } = useParams<{
    feedbackId: string;
    userId: string;
  }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const feedback = useSelector(selectFeedbackDetail);
  const fetchStatus = useSelector(selectFeedbackFetchStatus);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (feedbackId) {
      dispatch(getFeedbackDetail(feedbackId));
    }
  }, [dispatch]);

  const handleBackClick = () => {
    navigate(FEEDBACK_USER_MANAGEMENT_ROUTE.replace(':userId', userId || ''));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={handleBackClick} variant="outline">
          Back
        </Button>
      </div>
      <Card className="border-none shadow-none dark:bg-black">
        <CardContent className="px-0">
          {fetchStatus === ApiStatus.Loading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="animate-spin w-6 h-6 text-blue-500 dark:text-blue-400" />
              <span className="ml-2 text-blue-500 dark:text-blue-400">
                {t('feedback.loading')}
              </span>
            </div>
          )}

          {fetchStatus === ApiStatus.Failed && (
            <div className="flex items-center text-red-500 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="ml-2">{t('feedback.error')}</span>
            </div>
          )}

          {fetchStatus === ApiStatus.Fulfilled && feedback && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('feedback.feedbackInfo')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.rating')}
                      </strong>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < feedback.rating
                                ? 'text-yellow-400 dark:text-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.comment')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.comment}
                      </span>
                    </div>

                    {feedback.imageUrl && (
                      <div>
                        <img
                          src={feedback.imageUrl}
                          alt="Feedback"
                          className="w-full max-w-xs rounded-lg border dark:border-gray-600"
                        />
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('feedback.senderInfo')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.name')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.user.userName}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.email')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.user.email}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.phone')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.user.phone}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.primaryAddress')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {
                          feedback.user.userLocations[0]?.specificAddress.split(
                            '//',
                          )[1]
                        }
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('feedback.productInfo')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.productName')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.item.itemName}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.description')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.item.description}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.price')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.item.price.toLocaleString()} VND
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.brand')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.item.brand.brandName}
                      </span>
                    </div>
                    <div>
                      <img
                        src={feedback.item.imageUrl}
                        alt={feedback.item.itemName}
                        className="w-full max-w-xs rounded-lg border dark:border-gray-600"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-black dark:text-white">
                    {t('feedback.transactionHistory')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.exchangeStatus')}
                      </strong>
                      <span className="text-gray-800 dark:text-gray-200">
                        {feedback.exchangeHistory.statusExchangeHistory}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.buyerConfirmation')}
                      </strong>
                      <span
                        className={`${
                          feedback.exchangeHistory.buyerConfirmation
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {feedback.exchangeHistory.buyerConfirmation
                          ? t('feedback.confirmed')
                          : t('feedback.notConfirmed')}
                      </span>
                    </div>
                    <div>
                      <strong className="block text-sm text-gray-600 dark:text-gray-400">
                        {t('feedback.sellerConfirmation')}
                      </strong>
                      <span
                        className={`${
                          feedback.exchangeHistory.sellerConfirmation
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {feedback.exchangeHistory.sellerConfirmation
                          ? t('feedback.confirmed')
                          : t('feedback.notConfirmed')}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackDetail;
