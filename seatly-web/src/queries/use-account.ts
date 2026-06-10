import accountApiRequest from "@/apis/account.api";
import {
  AccountListQueryType,
  ChangePasswordBodyType,
  CreateEmployeeAccountBodyType,
  CreateGuestBodyType,
  GetGuestListQueryParamsType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from "@/schemas/account.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAccountListQuery = (
  queryParams: AccountListQueryType,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryFn: () => accountApiRequest.getAccountList(queryParams),
    queryKey: ["accounts", queryParams],
    enabled: options?.enabled,
  });
};

export const useGetAccountDetailQuery = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["accounts", id],
    queryFn: () => accountApiRequest.getAccountDetail(id),
    enabled,
  });
};

export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateEmployeeAccountBodyType) =>
      accountApiRequest.createAccount(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdateEmployeeAccountBodyType & { id: string }) =>
      accountApiRequest.updateAccount(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.id],
      });
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => accountApiRequest.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useGetMeQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryFn: accountApiRequest.getMe,
    queryKey: ["account-me"],
    enabled: options?.enabled,
  });
};

export const useUpdateMeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateMeBodyType) => accountApiRequest.updateMe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["account-me"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordBodyType) =>
      accountApiRequest.changePassword(body),
  });
};

export const useGetGuestListQuery = (
  queryParams: GetGuestListQueryParamsType,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryFn: () => accountApiRequest.getGuestList(queryParams),
    queryKey: ["guests", queryParams],
    enabled: options?.enabled,
  });
};

export const useCreateGuestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateGuestBodyType) =>
      accountApiRequest.createGuest(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
  });
};
