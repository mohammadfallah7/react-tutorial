import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../lib/utils";
import useUser from "../hooks/use-user";

const UserDetailPage = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser(id!);
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    name: user?.name,
    email: user?.email,
    address: user?.address,
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, email, address } = userFormData;

    if (name && email && address?.city) {
      setIsCreatingUser(true);

      axiosInstance
        .put(`/users/${id}`, userFormData)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setIsCreatingUser(false);
        });
    } else {
      console.log("Fields are required!");
    }
  };

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
        <p className="text-error">{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto space-y-5 pt-5">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.address.city}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-xl mx-auto my-5"
      >
        <input
          type="text"
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
          placeholder={user?.name}
          className="input w-full"
        />
        <input
          type="email"
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
          placeholder={user?.email}
          className="input w-full"
        />
        <input
          type="text"
          onChange={(e) =>
            setUserFormData({
              ...userFormData,
              address: { ...userFormData.address, city: e.target.value },
            })
          }
          placeholder={user?.address.city}
          className="input w-full"
        />
        <button type="submit" className="btn btn-primary">
          {isCreatingUser ? (
            <span className="loading loading-infinity loading-xl text-success"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default UserDetailPage;
