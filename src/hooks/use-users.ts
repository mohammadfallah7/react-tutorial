import { useEffect, useState } from "react";
import type { UserModel } from "../types/user.model";
import { axiosInstance } from "../lib/utils";

const useUsers = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axiosInstance
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return { users, isLoading, error, setUsers };
};

export default useUsers;
