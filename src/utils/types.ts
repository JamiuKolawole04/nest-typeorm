export type createUserParams = {
  username: string;
  password: string;
};

export type updateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};
