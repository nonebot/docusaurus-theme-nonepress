import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className="-mt-16 h-screen flex flex-col justify-center items-center">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <Heading as="h1" className="text-5xl font-bold">
                NonePress
              </Heading>
              <p className="py-6">
                A Docusaurus v3 theme with DaisyUI (Tailwind CSS) integration.
              </p>
              <Link className="btn btn-primary" to="/docs/guide">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
