import { Page, PageBody, PageHeader } from "@saas-ui-pro/react";

export default function About() {
  return (
    <Page variant="hero" colorScheme="primary">
      <PageHeader
        title="About"
        description="This is where you can follow along with our development progress."
      />
      <PageBody>
        <p>Some stuff about the development team.</p>
      </PageBody>
    </Page>
  );
}
