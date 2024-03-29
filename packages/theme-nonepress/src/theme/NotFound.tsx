import React from "react";

import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";

import Layout from "@theme/Layout";
import Page from "@theme/Page";

export default function NotFound(): JSX.Element {
  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />
      <Layout>
        <Page hideSidebar hideTableOfContents>
          <main className="hero">
            <div className="hero-content">
              <div>
                <h1 className="text-5xl font-bold">
                  <Translate
                    id="theme.NotFound.title"
                    description="The title of the 404 page"
                  >
                    Page Not Found
                  </Translate>
                </h1>
                <p className="my-4">
                  <Translate
                    id="theme.NotFound.p1"
                    description="The first paragraph of the 404 page"
                  >
                    We could not find what you were looking for.
                  </Translate>
                </p>
                <p>
                  <Translate
                    id="theme.NotFound.p2"
                    description="The 2nd paragraph of the 404 page"
                  >
                    Please contact the owner of the site that linked you to the
                    original URL and let them know their link is broken.
                  </Translate>
                </p>
              </div>
            </div>
          </main>
        </Page>
      </Layout>
    </>
  );
}
