export interface IRoles {
  data: {
    results: IRoleDetail[];
    currentPage: number;
    next: number;
    pageSize: number;
    previous: number;
    totalItems: number;
  };
}

export interface IRoleDetail {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string;
}


