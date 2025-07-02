import type { UserModel } from "../types/user.model";
import { axiosInstance } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";

const useUser = (id: string) => {
  // const [user, setUser] = useState<UserModel>();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);

  //   axiosInstance
  //     .get(`/users/${id}`)
  //     .then((res) => {
  //       setUser(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error: Error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, [id]);

  // return { user, isLoading, error };

  return useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      axiosInstance.get<UserModel>(`/users/${id}`).then((res) => res.data),
    gcTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};

export default useUser;
