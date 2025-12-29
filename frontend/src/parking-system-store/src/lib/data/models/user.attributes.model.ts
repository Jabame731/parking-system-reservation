export interface User {
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
