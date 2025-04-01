import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { selectExchangeHistoryDetail, selectExchangeHistoryDetailFetchStatus } from './selector';
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

    useEffect(() => {
        if (exchangeHistoryId) {
            dispatch(getExchangeHistoryDetail(exchangeHistoryId));
        }
    }, [dispatch, exchangeHistoryId]);

    const handleBackClick = () => {
        navigate(EXCHANGE_HISTORY_MANAGEMENT_ROUTE.replace(':userId', userId || ''));
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
                            <span className="ml-2 text-blue-500">{t('exchangeHistory.loading')}</span>
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
                                        <span>{exchangeHistory.sellerItem.price.toLocaleString()} VND</span>
                                    </div>
                                    {exchangeHistory.sellerItem.imageUrl && (
                                        <img
                                            src={exchangeHistory.sellerItem.imageUrl}
                                            alt={exchangeHistory.sellerItem.itemName}
                                            className="w-full h-[400px] object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                    )}
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
                                        <span>{exchangeHistory.buyerItem.price.toLocaleString()} VND</span>
                                    </div>
                                    {exchangeHistory.buyerItem.imageUrl && (
                                        <img
                                            src={exchangeHistory.buyerItem.imageUrl}
                                            alt={exchangeHistory.buyerItem.itemName}
                                            className="w-full h-[400px] object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                    )}
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
                                            <span>{new Date(exchangeHistory.exchangeDate).toLocaleString()}</span>
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
                                                    exchangeHistory.buyerConfirmation ? 'text-green-600' : 'text-red-600'
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