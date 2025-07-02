import { axiosInstance } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { UserModel } from "../types/user.model";

const useUsers = () => {
  // const [users, setUsers] = useState<UserModel[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);

  //   axiosInstance
  //     .get("/users")
  //     .then((response) => {
  //       setUsers(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error: Error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  // return { users, isLoading, error, setUsers };

  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance.get<UserModel[]>("/users").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export default useUsers;
