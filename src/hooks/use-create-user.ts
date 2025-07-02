import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserPayload } from "../types/user.model";
import { axiosInstance } from "../lib/utils";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      axiosInstance.post("/users", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useCreateUser;
