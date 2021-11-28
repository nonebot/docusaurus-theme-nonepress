import React from "react";

import type { Props } from "@theme/UserPreferencesProvider";
import useTabGroupChoice from "@theme/hooks/useTabGroupChoice";
import UserPreferencesContext from "@theme/UserPreferencesContext";

function UserPreferencesProvider(props: Props): JSX.Element {
  const { tabGroupChoices, setTabGroupChoices } = useTabGroupChoice();
  return (
    <UserPreferencesContext.Provider
      value={{
        tabGroupChoices,
        setTabGroupChoices,
      }}
    >
      {props.children}
    </UserPreferencesContext.Provider>
  );
}

export default UserPreferencesProvider;
