export interface IUser {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName?: string;
  email: string;
  contactNumber: string;
  addressLine1: string;
  addressLine2?: string;
  suburb: string;
  state: string;
  postcode: string;
  role: string;
  userType: string;
  isEmailVerified: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  profileImageUrl?: string | null;
}
