import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus } from '@/common/enums/apiStatus';
import { fetchCurrentActiveUsers, fetchMonthlyRevenue, fetchMonthlyRevenueBySubscriptionPlan, fetchSuccessfulExchanges, fetchSuccessfulTransactions } from './thunk';

interface DashboardState {
    revenue: number;
    successfulTransactions: number;
    monthlyRevenueBySubscriptionPlan: { [key: string]: number };
    successfulExchanges: number;
    currentActiveUsers: number;
    fetchRevenueStatus: ApiStatus;
    fetchTransactionStatus: ApiStatus;
    fetchSubscriptionPlanRevenueStatus: ApiStatus;
    fetchSuccessfulExchangesStatus: ApiStatus;
    fetchCurrentActiveUsersStatus: ApiStatus;
    errorMessage?: string;

}

const initialState: DashboardState = {
    revenue: 0,
    successfulTransactions: 0,
    monthlyRevenueBySubscriptionPlan: {},
    successfulExchanges: 0,
    currentActiveUsers: 0,
    fetchRevenueStatus: ApiStatus.Idle,
    fetchTransactionStatus: ApiStatus.Idle,
    fetchSubscriptionPlanRevenueStatus: ApiStatus.Idle,
    fetchSuccessfulExchangesStatus: ApiStatus.Idle,
    fetchCurrentActiveUsersStatus: ApiStatus.Idle,
    errorMessage: undefined,
};

const dashboardSlice = createSlice({
    name: 'DashboardManagement',
    initialState,
    reducers: {
        resetDashboardState: (state) => {
            state.revenue = 0;
            state.successfulTransactions = 0;
            state.monthlyRevenueBySubscriptionPlan = {};
            state.successfulExchanges = 0;
            state.fetchRevenueStatus = ApiStatus.Idle;
            state.fetchTransactionStatus = ApiStatus.Idle;
            state.errorMessage = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchDashboardRevenue
            .addCase(fetchMonthlyRevenue.pending, (state) => {
                state.fetchRevenueStatus = ApiStatus.Loading;
            })
            .addCase(fetchMonthlyRevenue.fulfilled, (state, action: PayloadAction<number>) => {
                state.revenue = action.payload;
                state.fetchRevenueStatus = ApiStatus.Fulfilled;
            })
            .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
                state.fetchRevenueStatus = ApiStatus.Failed;
                state.errorMessage = action.error.message;
            })

            // Handle fetchSuccessfulTransactions
            .addCase(fetchSuccessfulTransactions.pending, (state) => {
                state.fetchTransactionStatus = ApiStatus.Loading;
            })
            .addCase(fetchSuccessfulTransactions.fulfilled, (state, action: PayloadAction<number>) => {
                state.successfulTransactions = action.payload;
                state.fetchTransactionStatus = ApiStatus.Fulfilled;
            })
            .addCase(fetchSuccessfulTransactions.rejected, (state, action) => {
                state.fetchTransactionStatus = ApiStatus.Failed;
                state.errorMessage = action.error.message;
            })

            // Handle fetchMonthlyRevenueBySubscriptionPlan
            .addCase(fetchMonthlyRevenueBySubscriptionPlan.pending, (state) => {
                state.fetchSubscriptionPlanRevenueStatus = ApiStatus.Loading;
            })
            .addCase(
                fetchMonthlyRevenueBySubscriptionPlan.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.monthlyRevenueBySubscriptionPlan = action.payload;
                    state.fetchSubscriptionPlanRevenueStatus = ApiStatus.Fulfilled;
                },
            )
            .addCase(fetchMonthlyRevenueBySubscriptionPlan.rejected, (state, action) => {
                state.fetchSubscriptionPlanRevenueStatus = ApiStatus.Failed;
                state.errorMessage = action.error.message;
            })

            // Handle fetchSuccessfulExchanges
            .addCase(fetchSuccessfulExchanges.pending, (state) => {
                state.fetchSuccessfulExchangesStatus = ApiStatus.Loading;
            })
            .addCase(fetchSuccessfulExchanges.fulfilled, (state, action: PayloadAction<number>) => {
                state.successfulExchanges = action.payload;
                state.fetchSuccessfulExchangesStatus = ApiStatus.Fulfilled;
            })
            .addCase(fetchSuccessfulExchanges.rejected, (state, action) => {
                state.fetchSuccessfulExchangesStatus = ApiStatus.Failed;
                state.errorMessage = action.error.message;
            })

        // Handle fetchCurrentActiveUsers
            .addCase(fetchCurrentActiveUsers.pending, (state) => {
                state.fetchCurrentActiveUsersStatus = ApiStatus.Loading;
            })
            .addCase(fetchCurrentActiveUsers.fulfilled, (state, action: PayloadAction<number>) => {
                state.currentActiveUsers = action.payload;
                state.fetchCurrentActiveUsersStatus = ApiStatus.Fulfilled;
            })
            .addCase(fetchCurrentActiveUsers.rejected, (state, action) => {
                state.fetchCurrentActiveUsersStatus = ApiStatus.Failed;
                state.errorMessage = action.error.message;
            });

    

    },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
