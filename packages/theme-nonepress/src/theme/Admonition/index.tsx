import React, { type ReactNode } from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import {
  processAdmonitionProps,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/Admonition";

import "./styles.css";

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

const AdmonitionConfigs: Record<string, AdmonitionConfig> = {
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
  warning: {
    className: "warning",
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.warning"
        description="The default label used for the Warning admonition (:::warning)"
      >
        warning
      </Translate>
    ),
  },
};

// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
const AdmonitionAliases: Record<string, AdmonitionConfig> = {
  secondary: { ...AdmonitionConfigs.note!, label: "secondary" },
  important: { ...AdmonitionConfigs.info!, label: "important" },
  success: { ...AdmonitionConfigs.tip!, label: "success" },
  // TODO remove before v4: Caution replaced by Warning
  // see https://github.com/facebook/docusaurus/issues/7558
  caution: {
    ...AdmonitionConfigs.warning!,
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

function getAdmonitionConfig(unsafeType: string): AdmonitionConfig {
  const config = AdmonitionConfigs[unsafeType] ?? AdmonitionAliases[unsafeType];
  if (config) {
    return config;
  }
  console.warn(
    `No admonition config found for admonition type "${unsafeType}". Using Info as fallback.`,
  );
  return AdmonitionConfigs.info!;
}

export default function Admonition(props: Props): ReactNode {
  const {
    children,
    type,
    title,
    icon: iconProp,
    className,
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
        className,
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
