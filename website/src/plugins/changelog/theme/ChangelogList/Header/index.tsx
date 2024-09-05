import Heading from "@theme/Heading";

export default function ChangelogListHeader({
  blogTitle,
}: {
  blogTitle: string;
}): JSX.Element {
  return (
    <header className="margin-bottom--lg">
      <Heading as="h1" style={{ fontSize: "3rem" }}>
        {blogTitle}
      </Heading>
    </header>
  );
}
