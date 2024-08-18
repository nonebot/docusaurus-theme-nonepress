import React, { type ReactNode } from "react";

import clsx from "clsx";

import "./styles.css";
import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/Admonition";

function NoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="admonition-icon"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
       />
    </svg>
  );
}

function TipIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="admonition-icon"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="admonition-icon"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="admonition-icon"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
       />
    </svg>
  );
}

function CautionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="admonition-icon"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

type AdmonitionConfig = {
  iconComponent: React.ComponentType;
  className?: string;
  label: ReactNode;
};

const AdmonitionConfigs: Record<Props["type"], AdmonitionConfig> = {
  note: {
    className: "note",
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)"
      >
        note
      </Translate>
    ),
  },
  tip: {
    className: "success",
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)"
      >
        tip
      </Translate>
    ),
  },
  danger: {
    className: "error",
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    ),
  },
  info: {
    className: "info",
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)"
      >
        info
      </Translate>
    ),
  },
  caution: {
    className: "warning",
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    ),
  },
};

// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: "note",
  important: "info",
  success: "tip",
  warning: "caution",
} as const;

function getAdmonitionConfig(unsafeType: string): AdmonitionConfig {
  const type =
    (aliases as { [key: string]: Props["type"] })[unsafeType] ?? unsafeType;
  const config = (AdmonitionConfigs as { [key: string]: AdmonitionConfig })[
    type
  ];
  if (config) {
    return config;
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`,
  );
  return AdmonitionConfigs.info;
}

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children: ReactNode): {
  mdxAdmonitionTitle: ReactNode | undefined;
  rest: ReactNode;
} {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) &&
      (item.props as { mdxType: string } | null)?.mdxType ===
        "mdxAdmonitionTitle",
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}

function processAdmonitionProps(props: Props): Props {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(
    props.children,
  );
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}

export default function Admonition(props: Props): JSX.Element {
  const {
    children,
    type,
    title,
    icon: iconProp,
  } = processAdmonitionProps(props);

  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;
  const { iconComponent: IconComponent } = typeConfig;
  const icon = iconProp ?? <IconComponent />;
  return (
    <div
      className={clsx(
        "admonition",
        typeConfig.className && `admonition-${typeConfig.className}`,
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
      )}
    >
      <div>
        <div className="admonition-title">
          {icon}
          <span>{titleLabel}</span>
        </div>
        <div className="admonition-content">{children}</div>
      </div>
    </div>
  );
}
