import React from "react";

import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";

import type { Props } from "@theme/Footer/Copyright";
import IconDocusaurus from "@theme/Icon/Docusaurus";
import IconReact from "@theme/Icon/React";

export default function FooterCopyright({ copyright }: Props): React.ReactNode {
  return (
    <>
      <div
        // Developer provided the HTML, so assume it's safe.

        dangerouslySetInnerHTML={{ __html: copyright }}
      />
      <div className="footer-support">
        <Translate
          id="theme.FooterCopyright.powerMessage"
          description="The powered by message of footer copyright"
        >
          Powered by
        </Translate>
        <Link
          to="https://docusaurus.io/"
          title={translate({
            id: "theme.FooterCopyright.docusaurusLinkTitle",
            message: "Go to the Docusaurus website",
            description: "The title attribute for the Docusaurus logo link",
          })}
        >
          <IconDocusaurus className="footer-support-icon" />
        </Link>
        <Link
          to="https://reactjs.org/"
          title={translate({
            id: "theme.FooterCopyright.reactLinkTitle",
            message: "Go to the React website",
            description: "The title attribute for the React logo link",
          })}
        >
          <IconReact className="footer-support-icon" />
        </Link>
      </div>
    </>
  );
}
