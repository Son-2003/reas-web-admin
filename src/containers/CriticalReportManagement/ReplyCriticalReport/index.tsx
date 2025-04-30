import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReduxDispatch } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCriticalReportById, reviewCriticalReport } from '../thunk';
import { selectDetailCriticalReport } from '../selector';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  StatusCriticalReport,
  TypeCriticalReport,
} from '@/common/enums/criticalReport';
import { CriticalReportStaffRequest } from '@/common/models/critical-report';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CRITICAL_REPORT_MANAGEMENT_ROUTE } from '@/common/constants/router';

export default function ReplyCriticalReport() {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const { reportId } = useParams();
  const criticalReportDetail = useSelector(selectDetailCriticalReport);
  const [responseContent, setResponseContent] = useState('');

  useEffect(() => {
    if (reportId) {
      dispatch(getCriticalReportById(reportId));
    }
  }, [reportId, dispatch]);

  async function handleResolve() {
    if (!reportId) return;

    const reportResponse: CriticalReportStaffRequest = {
      id: Number(reportId),
      contentResponse: responseContent,
      isResolved: true,
    };

    await handleReview(reportResponse);
  }

  async function handleReject() {
    if (!reportId) return;

    const reportResponse: CriticalReportStaffRequest = {
      id: Number(reportId),
      contentResponse: responseContent,
      isResolved: false,
    };

    await handleReview(reportResponse);
  }

  async function handleReview(reportResponse: CriticalReportStaffRequest) {
    const resultAction = await dispatch(reviewCriticalReport(reportResponse));
    if (reviewCriticalReport.fulfilled.match(resultAction)) {
      toast({
        title: t(
          reportResponse.isResolved
            ? 'criticalReport.replyCriticalReport.success'
            : 'criticalReport.replyCriticalReport.rejectSuccess',
        ),
        variant: 'default',
        action: <CheckCircle2 className="text-green-500" />,
      });
      navigate(CRITICAL_REPORT_MANAGEMENT_ROUTE);
    } else if (reviewCriticalReport.rejected.match(resultAction)) {
      showErrorToast();
    }
  }

  const showErrorToast = () => {
    toast({
      title: t('criticalReport.replyCriticalReport.error'),
      variant: 'default',
      action: <XCircle className="text-red-500" />,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!criticalReportDetail) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={t('criticalReport.replyCriticalReport.title')}
          description=""
        />
      </div>
      <Separator className="my-4" />

      {/* Common Information Block */}
      <div className="border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-3">
            <div>
              <p className="font-medium">Report Type</p>
              <p className="text-sm">{criticalReportDetail.typeReport}</p>
            </div>
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm">
                {criticalReportDetail.statusCriticalReport}
              </p>
            </div>
            <div>
              <p className="font-medium">Report Date</p>
              <p className="text-sm">
                {new Date(
                  criticalReportDetail.creationDate,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div>
              <p className="font-medium">Reporter</p>
              <p className="text-sm">
                {criticalReportDetail.reporter?.fullName}
              </p>
            </div>
            <div>
              <p className="font-medium">Content</p>
              <p className="text-sm whitespace-pre-wrap">
                {criticalReportDetail.contentReport}
              </p>
            </div>
          </div>

          {/* Column 3 - Image */}
          <div className="flex flex-col items-center justify-center">
            {criticalReportDetail.imageUrl && (
              <div className="w-full">
                <img
                  src={criticalReportDetail.imageUrl}
                  alt="Report evidence"
                  className="max-w-full h-48 object-contain rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conditional Information Blocks */}
      <div className="border rounded-lg p-4 mb-6">
        {criticalReportDetail.typeReport === TypeCriticalReport.RESIDENT && (
          <div>
            <h3 className="font-medium mb-2">Reported resident</h3>
            <p>Name: {criticalReportDetail.resident?.fullName}</p>
          </div>
        )}

        {criticalReportDetail.typeReport === TypeCriticalReport.FEEDBACK && (
          <div>
            <h3 className="font-medium mb-2">Feedback details</h3>
            <p>Rating: {'★'.repeat(criticalReportDetail.feedback?.rating)}</p>
            <p>Comment: {criticalReportDetail.feedback?.comment}</p>
            {criticalReportDetail.feedback?.imageUrl && (
              <img
                src={criticalReportDetail.feedback.imageUrl}
                alt="Feedback"
                className="max-w-xs rounded-md mt-2"
              />
            )}
          </div>
        )}

        {criticalReportDetail.typeReport === TypeCriticalReport.EXCHANGE && (
          <div>
            <h3 className="font-medium mb-2">Exchange details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium">Seller item:</span>{' '}
                  {criticalReportDetail.exchangeRequest?.sellerItem?.itemName}
                </p>
                <p>
                  <span className="font-medium">Buyer item:</span>{' '}
                  {criticalReportDetail.exchangeRequest?.buyerItem?.itemName}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Final price:</span>
                  {criticalReportDetail.exchangeRequest?.finalPrice} VND
                </p>
                <p>
                  <span className="font-medium">Exchange date:</span>{' '}
                  {new Date(
                    criticalReportDetail.exchangeRequest?.exchangeDate,
                  ).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  {criticalReportDetail.exchangeRequest?.exchangeLocation?.split(
                    '//',
                  )[1] ||
                    criticalReportDetail.exchangeRequest?.exchangeLocation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Response Section */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Response</h3>

        {criticalReportDetail.statusCriticalReport ===
        StatusCriticalReport.PENDING ? (
          <>
            <Textarea
              value={responseContent}
              onChange={(e) => setResponseContent(e.target.value)}
              placeholder="Enter your response here..."
              className="min-h-[150px] mb-4"
            />
            <div className="flex gap-4 justify-end">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
              <Button onClick={handleResolve}>Resolve</Button>
            </div>
          </>
        ) : (
          <>
            <Textarea
              value={criticalReportDetail.contentResponse || ''}
              readOnly
              className="min-h-[150px] mb-4 bg-muted"
            />
            <div className="flex gap-4 justify-end">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
