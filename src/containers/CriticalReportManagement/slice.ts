import { ResponseEntityPagination } from '@/common/models/pagination';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ApiStatus } from '@/common/enums/apiStatus';
import { CriticalReportResponse } from '@/common/models/critical-report';
import {
  getCriticalReportById,
  reviewCriticalReport,
  searchCriticalReport,
} from './thunk';

export interface CriticalReportSliceState {
  criticalReportPaginationResponse:
    | ResponseEntityPagination<CriticalReportResponse>
    | undefined;
  criticalReportDetail: CriticalReportResponse | undefined;
  status: ApiStatus;
}

export const initialState: CriticalReportSliceState = {
  criticalReportPaginationResponse: undefined,
  criticalReportDetail: undefined,
  status: ApiStatus.Idle,
};

const criticalReportManagementSlice = createSlice({
  name: 'criticalReportManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setCriticalReportPaginationResponse(builder);
    setDetailCriticalReportResponse(builder);
    setReviewCriticalReportResponse(builder);
  },
});

function setCriticalReportPaginationResponse(
  builder: ActionReducerMapBuilder<CriticalReportSliceState>,
) {
  builder
    .addCase(
      searchCriticalReport.pending,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      searchCriticalReport.fulfilled,
      (
        state: CriticalReportSliceState,
        action: PayloadAction<ResponseEntityPagination<CriticalReportResponse>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.criticalReportPaginationResponse = action.payload;
      },
    )
    .addCase(
      searchCriticalReport.rejected,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

function setDetailCriticalReportResponse(
  builder: ActionReducerMapBuilder<CriticalReportSliceState>,
) {
  builder
    .addCase(
      getCriticalReportById.pending,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      getCriticalReportById.fulfilled,
      (
        state: CriticalReportSliceState,
        action: PayloadAction<CriticalReportResponse>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.criticalReportDetail = action.payload;
      },
    )
    .addCase(
      getCriticalReportById.rejected,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

function setReviewCriticalReportResponse(
  builder: ActionReducerMapBuilder<CriticalReportSliceState>,
) {
  builder
    .addCase(
      reviewCriticalReport.pending,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Loading;
      },
    )
    .addCase(
      reviewCriticalReport.fulfilled,
      (
        state: CriticalReportSliceState,
        action: PayloadAction<CriticalReportResponse>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.criticalReportDetail = action.payload;
      },
    )
    .addCase(
      reviewCriticalReport.rejected,
      (state: CriticalReportSliceState) => {
        state.status = ApiStatus.Failed;
      },
    );
}

export default criticalReportManagementSlice.reducer;
