import { apiClient, type HttpClient } from '../http/http-client';
import type { PaginatedResult } from '../types/pagination';
import type {
  CommissionLedgerFilterQuery,
  CommissionLedgerItemResponse,
  CommissionSettingResponse,
  CommissionSummaryResponse,
  UpdateCommissionSettingRequest
} from './commission.types';

export function createCommissionApi(client: HttpClient = apiClient) {
  return {
    adminSettings(): Promise<CommissionSettingResponse[]> {
      return client.get<CommissionSettingResponse[]>('/admin/commission/settings');
    },

    adminUpdateSettings(body: UpdateCommissionSettingRequest): Promise<CommissionSettingResponse> {
      return client.patch<CommissionSettingResponse, UpdateCommissionSettingRequest>(
        '/admin/commission/settings',
        body
      );
    },

    adminLedger(
      filters?: CommissionLedgerFilterQuery
    ): Promise<PaginatedResult<CommissionLedgerItemResponse>> {
      return client.getPaginated<CommissionLedgerItemResponse>('/admin/commission/ledger', filters);
    },

    ownerSummary(): Promise<CommissionSummaryResponse> {
      return client.get<CommissionSummaryResponse>('/shop-owner/commission/summary');
    },

    ownerLedger(
      filters?: CommissionLedgerFilterQuery
    ): Promise<PaginatedResult<CommissionLedgerItemResponse>> {
      return client.getPaginated<CommissionLedgerItemResponse>(
        '/shop-owner/commission/ledger',
        filters
      );
    }
  };
}

export const commissionApi = createCommissionApi();
