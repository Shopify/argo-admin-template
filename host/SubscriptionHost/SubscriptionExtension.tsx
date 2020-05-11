import React from 'react';
import {
  SkeletonBodyText,
  TextStyle,
  TextContainer,
  SkeletonDisplayText,
  Page,
  Layout,
  Card,
  Stack,
} from '@shopify/polaris';

export function SubscriptionExtension({children}: React.PropsWithChildren<{}>) {
  return (
    <Page title="Products">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card title="Subscriptions" sectioned>
            <Stack>
              <TextStyle variation="subdued">
                Add subscription options for this product so customers can buy
                it on a recurring basis.
              </TextStyle>

              {children}
            </Stack>
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={1} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
