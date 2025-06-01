import { useEffect, useState } from "react";
import axios from "axios";
import type { UserModel } from "../types/user.model";

const UsersList = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleClick = (id: number) => {
    const initialState = users;

    setUsers(users.filter((user) => id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + id)
      .catch(() => {
        setUsers(initialState);
      });
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
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>
                <button
                  onClick={() => handleClick(user.id)}
                  className="btn btn-sm btn-error"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
