import {
  CriticalReportStaffRequest,
  SearchCriticalReportRequest,
} from '@/common/models/critical-report';
import { SearchRequestPagination } from '@/common/models/pagination';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi, { objectToQueryString } from '@/utils/api';

const TypePrefix = 'User';

export const searchCriticalReport = createAppAsyncThunk(
  `${TypePrefix}/searchCriticalReport`,
  async ({
    data,
    request,
  }: {
    data: SearchRequestPagination;
    request: SearchCriticalReportRequest | null;
  }) => {
    const queryString = objectToQueryString(data);
    return await callApi(
      {
        method: 'post',
        url: `/critical-report/search?${queryString}`,
        data: request,
      },
      true,
    );
  },
);

export const getCriticalReportById = createAppAsyncThunk(
  `${TypePrefix}/getCriticalReportById`,
  async (reportId: string) =>
    await callApi(
      {
        method: 'get',
        url: `/critical-report/${reportId}`,
      },
      true,
    ),
);

export const reviewCriticalReport = createAppAsyncThunk(
  `${TypePrefix}/reviewCriticalReport`,
  async (data: CriticalReportStaffRequest) =>
    await callApi(
      {
        method: 'put',
        url: `/critical-report`,
        data: data,
      },
      true,
    ),
);
