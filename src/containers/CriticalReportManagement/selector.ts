import { ReduxState } from '@/lib/redux/store';

export const selectCriticalReportSearchResult = (state: ReduxState) =>
  state.criticalReport.criticalReportPaginationResponse;

export const selectDetailCriticalReport = (state: ReduxState) =>
  state.criticalReport.criticalReportDetail;

export const selectReviewCriticalReportResult = (state: ReduxState) =>
  state.criticalReport.criticalReportDetail;
