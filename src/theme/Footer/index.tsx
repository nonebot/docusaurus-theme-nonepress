import React, { PropsWithChildren } from "react";

import FooterLinks from "@theme/FooterLinks";
import FooterCopyright from "@theme/FooterCopyright";

export default function Footer(props: PropsWithChildren<{}>) {
  return (
    <footer
      className="bg-light-note dark:bg-gray-900"
      aria-labelledby="footerHeading"
    >
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <FooterLinks />
        <FooterCopyright />
      </div>
    </footer>
  );
}
