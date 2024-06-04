export interface IAdmin {
  data: {
    results: IAdminDetail[];
    currentPage: number;
    next: number;
    pageSize: number;
    previous: number;
    totalItems: number;
  };
}

export interface IAdminDetail {
  avatar: string | null;
  contact: string;
  createdAt: string;
  disabled: boolean;
  email: string;
  firstName: string;
  id: number;
  isTwoFAEnabled: boolean;
  lastName: string;
  role: {
    id: number;
    name: string;
  };
  status: string;
  updatedAt: string;
}
