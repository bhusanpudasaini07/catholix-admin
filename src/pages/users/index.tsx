import React from "react";

import UserList from "@/features/Users/user-list";
import { useUsers } from "@/hooks/users/useUsers.hook";
import { NextPageWithLayout } from "@/pages/_app";
import PageHeader from "@/shared/components/page-header";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";

const UsersPage: NextPageWithLayout = () => {
  const {
    userList,
    userLoading,
    userColumns,
    pageChangeHandler,
    perPageHandler,
    handleSearch,
    search,
    perPage,
    handleReset,
  } = useUsers();

  return (
    <div className="page">
      <PageHeader
        title="Users List"
        subTitle="Manage and view users"
        back
        backUrl="/"
      />
      <div className="page-body px-8">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
            />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
        <UserList
          userList={userList}
          loading={userLoading}
          columns={userColumns}
          pageChangeHandler={pageChangeHandler}
          perPageHandler={perPageHandler}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;

export const getStaticProps = getI18nProps;

UsersPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
