import React from "react";

import FooterLinks from "@theme/FooterLinks";
import FooterCopyright from "@theme/FooterCopyright";

function Footer(): JSX.Element {
  return (
    <footer
      className="bg-light-nonepress dark:bg-dark-nonepress"
      aria-labelledby="footerHeading"
    >
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
        <FooterLinks />
        <FooterCopyright />
      </div>
    </footer>
  );
}

export default Footer;
