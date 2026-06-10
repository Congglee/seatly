import http from "@/lib/http";
import {
  AccountListQueryType,
  AccountListResType,
  AccountResType,
  ChangePasswordBodyType,
  ChangePasswordV2ResType,
  CreateEmployeeAccountBodyType,
  CreateGuestBodyType,
  CreateGuestResType,
  GetGuestListQueryParamsType,
  GetListGuestsResType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from "@/schemas/account.schema";
import queryString from "query-string";

const prefix = "/accounts";

const accountApiRequest = {
  getAccountList: (queryParams: AccountListQueryType) =>
    http.get<AccountListResType>(
      `${prefix}?` +
        queryString.stringify({
          page: queryParams.page,
          limit: queryParams.limit,
        })
    ),

  getAccountDetail: (id: string) => http.get<AccountResType>(`${prefix}/${id}`),

  createAccount: (body: CreateEmployeeAccountBodyType) =>
    http.post<AccountResType>(prefix, body),

  updateAccount: (id: string, body: UpdateEmployeeAccountBodyType) =>
    http.put<AccountResType>(`${prefix}/${id}`, body),

  deleteAccount: (id: string) => http.delete<AccountResType>(`${prefix}/${id}`),

  getMe: () => http.get<AccountResType>(`${prefix}/me`),

  updateMe: (body: UpdateMeBodyType) =>
    http.put<AccountResType>(`${prefix}/me`, body),

  changePassword: (body: ChangePasswordBodyType) =>
    http.put<ChangePasswordV2ResType>(`${prefix}/change-password`, body),

  getGuestList: (queryParams: GetGuestListQueryParamsType) =>
    http.get<GetListGuestsResType>(
      `${prefix}/guests?` +
        queryString.stringify({
          fromDate: queryParams.fromDate?.toISOString(),
          toDate: queryParams.toDate?.toISOString(),
        })
    ),

  createGuest: (body: CreateGuestBodyType) =>
    http.post<CreateGuestResType>(`${prefix}/guests`, body),
};

export default accountApiRequest;
