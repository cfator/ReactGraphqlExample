import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import React from 'react'
import ReactDOM from 'react-dom'

import AppState from '@Stores/AppState';
import Layout from '@Components/Layouts/Primary';
import registerServiceWorker from '@Utilities/registerServiceWorker'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={AppState}>
        <Layout />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app')
);

registerServiceWorker();
