import axios from "axios";
import { useState } from "react";

const DeleteUserButton = ({
  id,
  onDelete,
}: {
  id: number;
  onDelete: () => void;
}) => {
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const handleClick = () => {
    setIsDeletingUser(true);

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + id)
      .then(() => {
        onDelete();
        setIsDeletingUser(false);
      });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="btn btn-sm btn-error"
        disabled={isDeletingUser}
      >
        {isDeletingUser ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteUserButton;
