import {
  IAdminUserStatusCount,
  IAdminContentCount,
  IApiResponse,
} from "@/types/Admin";
import adminServices from "@/services/admin.service";
import { useQueries } from "@tanstack/react-query";

const useAdminDashboard = () => {
  const [userStatusQuery, contentCountQuery] = useQueries({
    queries: [
      {
        queryKey: ["admin-user-status-count"],
        queryFn: async () => {
          const response = await adminServices.getUserActiveStatusCount();
          return response.data.data as IAdminUserStatusCount;
        },
      },
      {
        queryKey: ["admin-content-count"],
        queryFn: async () => {
          const response = await adminServices.getUserContentCount();
          return response.data.data as IAdminContentCount;
        },
      },
    ],
  });

  const isLoadingMetrics =
    userStatusQuery.isLoading || contentCountQuery.isLoading;
  const isErrorMetrics = userStatusQuery.isError || contentCountQuery.isError;
  const userStatus = userStatusQuery.data;
  const contentCount = contentCountQuery.data;

  return {
    userStatus,
    contentCount,
    isLoadingMetrics,
    isErrorMetrics,
  };
};

export default useAdminDashboard;
