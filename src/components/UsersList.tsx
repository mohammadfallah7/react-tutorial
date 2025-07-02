import { useState, type FormEvent } from "react";
import { axiosInstance } from "../lib/utils";
import { Link } from "react-router";
import useUsers from "../hooks/use-users";

const UsersList = () => {
  const { data: users, isLoading, error } = useUsers();
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    address: { city: "" },
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const handleClick = (id: number) => {
    axiosInstance.delete("/users/" + id).catch(() => {});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const {
      name,
      email,
      address: { city },
    } = userFormData;

    if (name && email && city) {
      setIsCreatingUser(true);

      axiosInstance
        .post("/users", userFormData)
        .then(() => {
          setIsCreatingUser(false);
          setUserFormData({
            name: "",
            email: "",
            address: { city: "" },
          });
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-xl mx-auto my-5"
      >
        <input
          type="text"
          value={userFormData.name}
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
          placeholder="Your name..."
          className="input w-full"
        />
        <input
          type="email"
          value={userFormData.email}
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
          placeholder="Your email..."
          className="input w-full"
        />
        <input
          type="text"
          value={userFormData.address.city}
          onChange={(e) =>
            setUserFormData({
              ...userFormData,
              address: { ...userFormData.address, city: e.target.value },
            })
          }
          placeholder="Your city..."
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

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td className="space-x-3">
                  <button
                    onClick={() => handleClick(user.id)}
                    className="btn btn-sm btn-error"
                  >
                    delete
                  </button>
                  <Link
                    to={`/users/${user.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Visit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
