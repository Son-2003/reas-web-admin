import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

import { getFeedbackDetail, deleteFeedback } from './thunk';
import { selectFeedbackDetail, selectFeedbackFetchStatus } from './selector';
import { ApiStatus } from '@/common/enums/apiStatus';
import { FEEDBACK_USER_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { ReduxDispatch } from '@/lib/redux/store';

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100 dark:border-gray-700">
    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
    <div className="col-span-2 text-sm text-gray-900 dark:text-gray-100">
      {value || '-'}
    </div>
  </div>
);

const FeedbackDetail: React.FC = () => {
  const { feedbackId, userId } = useParams();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();

  const feedback = useSelector(selectFeedbackDetail);
  const status = useSelector(selectFeedbackFetchStatus);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (feedbackId) dispatch(getFeedbackDetail(feedbackId));
  }, [dispatch, feedbackId]);

  const handleDelete = async () => {
    if (!feedbackId) return;
    try {
      await dispatch(deleteFeedback(feedbackId)).unwrap();
      toast({
        title: t('feedback.deleted'),
        description: t('feedback.deletedSuccess'),
      });
      navigate(FEEDBACK_USER_MANAGEMENT_ROUTE.replace(':userId', userId || ''));
    } catch {
      toast({
        title: t('feedback.error'),
        description: t('feedback.deletedError'),
        variant: 'destructive',
      });
    } finally {
      setOpenDialog(false);
    }
  };

  const imageUrls = feedback?.imageUrl?.split(', ') || [];

  return (
    <div className="w-full px-8 py-6 space-y-10">
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            navigate(
              FEEDBACK_USER_MANAGEMENT_ROUTE.replace(':userId', userId || ''),
            )
          }
        >
          {t('common.back')}
        </Button>
        <Button variant="destructive" onClick={() => setOpenDialog(true)}>
          {t('common.delete')}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('feedback.confirmDelete')}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t('common.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {status === ApiStatus.Loading && <div>{t('feedback.loading')}</div>}
      {status === ApiStatus.Failed && (
        <div className="text-red-500">{t('feedback.error')}</div>
      )}

      {status === ApiStatus.Fulfilled && feedback && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {t('feedback.feedbackInfo')}
            </h2>
            <InfoRow
              label={t('feedback.rating')}
              value={<p>{'★'.repeat(feedback.rating)}</p>}
            />
            <InfoRow label={t('feedback.comment')} value={feedback.comment} />
            {imageUrls.length > 0 && (
              <InfoRow
                label={t('feedback.images')}
                value={
                  <div className="flex flex-wrap gap-2">
                    {imageUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`img-${idx}`}
                        className="w-20 h-20 object-cover rounded border cursor-pointer"
                        onClick={() => setSelectedImage(url)}
                      />
                    ))}
                  </div>
                }
              />
            )}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {t('feedback.productInfo')}
              </h2>
              <InfoRow
                label={t('feedback.productName')}
                value={feedback.item.itemName}
              />
              <InfoRow
                label={t('feedback.brand')}
                value={feedback.item.brand.brandName}
              />
              <InfoRow
                label={t('feedback.description')}
                value={
                  feedback.item.description
                    ? feedback.item.description
                        .replace(/\\n/g, '\n')
                        .split('\n')
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                    : '-'
                }
              />
              <InfoRow
                label={t('feedback.price')}
                value={`${feedback.item.price.toLocaleString()} VND`}
              />
              <InfoRow
                label={t('feedback.productImage')}
                value={
                  <img
                    src={feedback.item.imageUrl}
                    alt={feedback.item.itemName}
                    className="w-32 h-32 object-cover rounded border mt-1 cursor-pointer"
                    onClick={() => setSelectedImage(feedback.item.imageUrl)}
                  />
                }
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {t('feedback.senderInfo')}
              </h2>
              <InfoRow
                label={t('feedback.name')}
                value={feedback.user.userName}
              />
              <InfoRow
                label={t('feedback.email')}
                value={feedback.user.email}
              />
              <InfoRow
                label={t('feedback.phone')}
                value={feedback.user.phone}
              />
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-3xl">
            <div className="flex justify-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full max-h-[80vh] object-contain rounded"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FeedbackDetail;
