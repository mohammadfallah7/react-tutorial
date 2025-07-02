import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useDeleteUser;
