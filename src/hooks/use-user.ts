import { useEffect, useState } from "react";
import type { UserModel } from "../types/user.model";
import { axiosInstance } from "../lib/utils";

const useUser = (id: string) => {
  const [user, setUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axiosInstance
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  return { user, isLoading, error };
};

export default useUser;
