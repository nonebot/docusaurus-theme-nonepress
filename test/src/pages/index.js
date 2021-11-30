import React from "react";

import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import Hero, { HeroFeatureSingle } from "@theme/Hero";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const feature = {
    title: "Develop",
    tagline: "DETERMINISTIC BUILDS",
    description:
      "Poetry comes with all the tools you might need to manage your projects in a deterministic way.",
  };

  return (
    <Layout>
      <Hero />
      <HeroFeatureSingle {...feature}>
        <CodeBlock
          title="test"
          className="homeCodeBlock inline-block"
          languageClassName="language-javascript"
        >
          console.log("test");
        </CodeBlock>
      </HeroFeatureSingle>
    </Layout>
  );
}
