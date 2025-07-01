import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { UserModel } from "../types/user.model";
import { axiosInstance } from "../lib/utils";

const UserDetailPage = () => {
  const { id } = useParams();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-5 pt-5">
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.address.city}</p>
    </div>
  );
};

export default UserDetailPage;
