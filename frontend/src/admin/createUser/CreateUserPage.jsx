import React from "react";

import Page from "../../general/Page";
import CreateUserPageContents from "./CreateUserPageContents";

export default function CreateUserPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Admin"],
    ["Create a User", "/Admin/New"]
  ];

  return (
    <Page title="Create a User" breadcrumbs={breadcrumbs}>
      <CreateUserPageContents />
    </Page>
  );
}
