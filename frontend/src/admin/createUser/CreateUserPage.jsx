import React from "react";
import { useHistory } from "react-router-dom";

import Page from "../../general/Page";
import CreateUserPageContents from "./CreateUserPageContents";

export default function CreateUserPage() {
  const history = useHistory();
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Admin", "/Admin"],
    ["Create a User", "/Admin/New"]
  ];

  return (
    <Page title="Create a User" breadcrumbs={breadcrumbs}>
      <CreateUserPageContents history={history} />
    </Page>
  );
}
