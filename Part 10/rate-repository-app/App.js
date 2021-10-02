
import React from 'react';

import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/ApolloClient'

export default function App() {
  const ApolloClient = createApolloClient()
  
  return (
    <NativeRouter>
      <ApolloProvider client={ApolloClient}>
        <Main styles/>
      </ApolloProvider>
    </NativeRouter>
  );
}


