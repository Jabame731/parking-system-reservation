export interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  email: string;
  image?: string;
  userRole?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface UserResponseModel {
  id: string;
  type: string;
  attributes: User;
  accessToken: string;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  email: string;
  password: string;
}

export interface EditUserData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNumber: string;
  image?: string;
  userRole: string;
}
