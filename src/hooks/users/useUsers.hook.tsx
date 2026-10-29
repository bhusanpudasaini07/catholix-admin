import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { IUser } from "@/interface/user-interface";
import { getAllUsers } from "@/services/users/user-service";

const normalizeUsers = (payload: unknown): IUser[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const record = payload as {
      items?: IUser[];
      data?: IUser[] | { items?: IUser[] };
    };

    if (Array.isArray(record.items)) {
      return record.items;
    }

    if (Array.isArray(record.data)) {
      return record.data;
    }

    if (record.data && Array.isArray(record.data.items)) {
      return record.data.items;
    }
  }

  return [];
};

const getUserName = (user: IUser) => {
  if (user.fullName) {
    return user.fullName;
  }

  return [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(" ");
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return "-";
  }

  return moment(value).format("DD/MM/YYYY hh:mm A");
};

export const useUsers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading: userLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const users = useMemo(() => normalizeUsers(data), [data]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const haystack = [
        getUserName(user),
        user.email,
        user.contactNumber,
        user.role,
        user.userType,
        user.suburb,
        user.state,
        user.postcode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const items = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const userList = {
    items,
    page: currentPage,
    perPage,
    totalPages,
  };

  const perPageHandler = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const pageChangeHandler = (value: number) => {
    setPage(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setPage(1);
  };

  const userColumns: ColumnDef<IUser>[] = [
    {
      accessorKey: "id",
      header: "S.N.",
      cell: ({ row }) => (
        <div>{(currentPage - 1) * perPage + row.index + 1}</div>
      ),
    },
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium w-[180px]">{getUserName(row.original)}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="w-[220px]">{row.original.email}</div>,
    },
    {
      accessorKey: "contactNumber",
      header: "Contact",
      cell: ({ row }) => <div>{row.original.contactNumber || "-"}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.original.role || "-"}</div>,
    },
    {
      accessorKey: "userType",
      header: "Type",
      cell: ({ row }) => <div>{row.original.userType || "-"}</div>,
    },
    {
      accessorKey: "isEmailVerified",
      header: "Verified",
      cell: ({ row }) => (
        <div>{row.original.isEmailVerified ? "Yes" : "No"}</div>
      ),
    },
    {
      accessorKey: "suburb",
      header: "Location",
      cell: ({ row }) => (
        <div className="w-[180px]">
          {[row.original.suburb, row.original.state, row.original.postcode]
            .filter(Boolean)
            .join(", ") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "lastLoginAt",
      header: "Last Login",
      cell: ({ row }) => <div>{formatDate(row.original.lastLoginAt)}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
  ];

  return {
    userList,
    userLoading,
    userColumns,
    page,
    setPage,
    perPage,
    setPerPage,
    pageChangeHandler,
    perPageHandler,
    handleSearch,
    search,
    handleReset,
  };
};
