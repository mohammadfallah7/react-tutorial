export type UserModel = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

export type CreateUserPayload = {
  name: string;
  email: string;
  address: {
    city: string;
  };
};
