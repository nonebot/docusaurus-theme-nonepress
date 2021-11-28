import { Context, createContext } from "react";

import type { UserPreferencesContextProps } from "@theme/hooks/useUserPreferencesContext";

const UserPreferencesContext: Context<UserPreferencesContextProps | undefined> =
  createContext(undefined);

export default UserPreferencesContext;
