import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/utils";

const DeleteUserButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleClick = () => {
    mutate(id);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="btn btn-sm btn-error"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteUserButton;
