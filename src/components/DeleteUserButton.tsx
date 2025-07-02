import useDeleteUser from "../hooks/use-delete-user";

const DeleteUserButton = ({ id }: { id: number }) => {
  const { mutate, isPending } = useDeleteUser();

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
