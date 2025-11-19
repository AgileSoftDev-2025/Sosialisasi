import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.service";
import { IUserAdmin, IUserFilters } from "@/types/Admin";
import { ToasterContext } from "@/contexts/ToasterContext";

const useUserManagement = () => {
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);
  const [filters, setFilters] = useState<IUserFilters>({});

  const { data: users = [], isLoading: isLoadingUsers } = useQuery<
    IUserAdmin[]
  >({
    queryKey: ["admin-users", filters],
    queryFn: () => adminServices.getUsers(filters),
  });

  const { mutate: toggleStatusMutation, isPending: isTogglingStatus } =
    useMutation({
      mutationFn: adminServices.toggleUsersStatus,

      onMutate: async (userId: string) => {
        await queryClient.cancelQueries({ queryKey: ["admin-users", filters] });

        const previousUsers = queryClient.getQueryData<IUserAdmin[]>([
          "admin-users",
          filters,
        ]);

        queryClient.setQueryData<IUserAdmin[]>(
          ["admin-users", filters],
          (oldData = []) =>
            oldData.map((user) =>
              user._id === userId
                ? { ...user, isActive: !user.isActive }
                : user,
            ),
        );

        return { previousUsers };
      },

      onError: (err, userId, context) => {
        if (context?.previousUsers) {
          queryClient.setQueryData(
            ["admin-users", filters],
            context.previousUsers,
          );
        }
        setToaster({ type: "error", message: "Gagal mengubah status" });
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users", filters] });
      },

      onSuccess: (data) => {
        setToaster({
          type: "success",
          message: `Status ${data.fullName} diubah!`,
        });
      },
    });

  return {
    users,
    isLoadingUsers,
    filters,
    setFilters,
    toggleStatusMutation,
    isTogglingStatus,
  };
};

export default useUserManagement;
