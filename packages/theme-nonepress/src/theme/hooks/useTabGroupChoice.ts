import { useState, useCallback, useEffect } from "react";
import { createStorageSlot, listStorageKeys } from "@docusaurus/theme-common";
import type { useTabGroupChoiceReturns } from "@theme/hooks/useTabGroupChoice";

const TAB_CHOICE_PREFIX = "docusaurus.tab.";

const useTabGroupChoice = (): useTabGroupChoiceReturns => {
  const [tabGroupChoices, setChoices] = useState<{
    readonly [groupId: string]: string;
  }>({});
  const setChoiceSyncWithLocalStorage = useCallback((groupId, newChoice) => {
    createStorageSlot(`${TAB_CHOICE_PREFIX}${groupId}`).set(newChoice);
  }, []);

  useEffect(() => {
    try {
      const localStorageChoices: Record<string, string> = {};
      listStorageKeys().forEach((storageKey) => {
        if (storageKey.startsWith(TAB_CHOICE_PREFIX)) {
          const groupId = storageKey.substring(TAB_CHOICE_PREFIX.length);
          localStorageChoices[groupId] = createStorageSlot(storageKey).get()!;
        }
      });
      setChoices(localStorageChoices);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    tabGroupChoices,
    setTabGroupChoices: (groupId: string, newChoice: string) => {
      setChoices((oldChoices) => ({ ...oldChoices, [groupId]: newChoice }));
      setChoiceSyncWithLocalStorage(groupId, newChoice);
    },
  };
};

export default useTabGroupChoice;
