import React from 'react';
import {SkeletonBodyText, Page, Layout, Card} from '@shopify/polaris';

export function SubscriptionSettings() {
  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
