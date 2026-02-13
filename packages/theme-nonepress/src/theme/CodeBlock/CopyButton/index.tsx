import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";

import type { Props } from "@theme/CodeBlock/CopyButton";
import IconCopy from "@theme/Icon/Copy";
import IconSuccess from "@theme/Icon/Success";

function title() {
  return translate({
    id: "theme.CodeBlock.copy",
    message: "Copy",
    description: "The copy button label on code blocks",
  });
}

function ariaLabel(isCopied: boolean) {
  return isCopied
    ? translate({
        id: "theme.CodeBlock.copied",
        message: "Copied",
        description: "The copied button label on code blocks",
      })
    : translate({
        id: "theme.CodeBlock.copyButtonAriaLabel",
        message: "Copy code to clipboard",
        description: "The ARIA label for copy code blocks button",
      });
}

export default function CopyButton({ code, className }: Props): ReactNode {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return (
    <button
      type="button"
      aria-label={ariaLabel(isCopied)}
      title={title()}
      className={clsx(
        "btn btn-square btn-sm no-animation swap swap-rotate code-block-btn",
        className,
        isCopied && "swap-active",
      )}
      onClick={copyCode}
    >
      <IconCopy className="swap-off code-block-btn-icon" />
      <IconSuccess className="swap-on code-block-btn-icon text-success" />
    </button>
  );
}
