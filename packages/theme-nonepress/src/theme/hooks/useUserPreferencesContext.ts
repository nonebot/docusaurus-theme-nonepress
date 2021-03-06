import { useContext } from "react";

import UserPreferencesContext from "@theme/UserPreferencesContext";
import type { UserPreferencesContextProps } from "@theme/hooks/useUserPreferencesContext";

function useUserPreferencesContext(): UserPreferencesContextProps {
  const context = useContext<UserPreferencesContextProps | undefined>(
    UserPreferencesContext
  );
  if (context == null) {
    throw new Error(
      '"useUserPreferencesContext" is used outside of "Layout" component.'
    );
  }
  return context;
}

export default useUserPreferencesContext;
