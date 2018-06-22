import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Provider } from 'mobx-react';
import React from 'react'
import ReactDOM from 'react-dom'

import AppState from '@Stores/AppState';
import Layout from '@Components/Layouts/Primary';
import RegisterServiceWorker from '@Utilities/registerServiceWorker'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin'
});

// post response processing to join in data as need per response type
// https://github.com/apollographql/apollo-client/issues/2534 is preventing this currently
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // if we have one or more hotels join with full hotel data
    /*if(response.data.reservations !== undefined) {
      return response.data.reservations.map((reservation) => {
        return Object.assign({}, reservation, AppState.getHotel(reservation.hotelId));
      })
    }*/

    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          AppState.logError(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (networkError) {
        AppState.logError(`[Network error]: ${networkError}`);
      }
    }),
    afterwareLink.concat(httpLink)
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    }
  }
});

// will need a ref to the client to make bootstrap data requests
AppState.setTransport(client);

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

RegisterServiceWorker();
