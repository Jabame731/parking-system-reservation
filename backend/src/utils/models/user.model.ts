export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  contactNumber: string;
  image: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  userRole: string;
  contactNumber: string;
}

export interface UserAttr {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  image: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  id: string;
  type: string;
  attributes: UserAttr;
  accessToken: string;
}
