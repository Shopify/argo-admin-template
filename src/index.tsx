import React, { useState, useEffect, useMemo } from 'react';
import { ExtensionPoint } from '@shopify/argo';
import ApolloClient from 'apollo-client';
import { ApolloProvider, useQuery } from '@shopify/react-graphql';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


import {render, useModalActions} from '@shopify/argo-react';
import {
  ResourceList,
  ResourceItem,
  Stack,
  Checkbox,
  Text,
  StackItem,
} from '@shopify/argo-react/components';

import Test from './Test.graphql';

function App() {
  const dataList = [1, 2, 3, 4, 5, 12, 13, 145];
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [listItems, setListItems] = useState(dataList);
  const [primaryActionText, setPrimaryActionText] = useState('Next');
  const [secondaryActionText, setSecondaryActionText] = useState('Cancel');

  const {
    primaryAction: {setContent: setPrimaryContent, setAction: setPrimaryAction},
    secondaryAction: {setContent: setSecondaryContent, setAction: setSecondaryAction},
    closeModal,
  } = useModalActions();

  const [resourceListQuery, setResourceListQuery] = useState('');
  const resourceListFilterControl = useMemo(
    () => ({
      queryValue: resourceListQuery,
      queryPlaceholder: 'Search...',
      onQueryChange: q => {
        setResourceListQuery(q);
        setListItems(dataList.filter(r => r.toString().includes(q)));
      },
      onQueryClear: () => {
        setResourceListQuery('');
        setListItems(dataList);
      },
    }),
    [resourceListQuery, dataList],
  );

  setPrimaryContent(primaryActionText);
  setSecondaryContent(secondaryActionText);
  setPrimaryAction(() => {
    closeModal();
  });
  setSecondaryAction(() => {
    closeModal();
  });

  const {data, error, loading} = useQuery(Test);

  console.log('data', data);
  console.log('error', error);
  console.log('loading', loading);
  

  const renderList = () => (
    <>
      <ResourceList filterControl={resourceListFilterControl}>
        {listItems.map((item, index) => (
          <ResourceItem
            key={index}
            id={index}
            onClick={() => {
              console.log('ResourceList item toggle:', item);
              if (selectedItems.includes(item)) {
                setSelectedItems(selectedItems.filter(o => o !== item));
              } else {
                setSelectedItems(selectedItems.concat(item));
              }
            }}
          >
            <Stack alignment="center">
              <Checkbox checked={selectedItems.includes(item)} />
              <StackItem fill>Every {item} week or 15 days * 20-25% off</StackItem>
              <Text>{item} product</Text>
            </Stack>
          </ResourceItem>
        ))}
      </ResourceList>
    </>
  );

 return renderList();
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

const client = new ApolloClient({
  cache,
  link,
});

render(ExtensionPoint.SubscriptionManagement, () => <AppWrapper />);


function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
