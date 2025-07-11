import { useState, type FormEvent } from "react";
import type { CreateUserPayload } from "../types/user.model";
import useCreateUser from "../hooks/use-create-user";

const CreateUserForm = () => {
  const { mutate, isPending } = useCreateUser();

  const [userFormData, setUserFormData] = useState<CreateUserPayload>({
    name: "",
    email: "",
    address: { city: "" },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const {
      name,
      email,
      address: { city },
    } = userFormData;

    if (name && email && city) {
      mutate(userFormData);
    } else {
      console.log("Fields are required!");
    }
  };

  return (
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
        {isPending ? (
          <span className="loading loading-infinity loading-xl text-success"></span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default CreateUserForm;
