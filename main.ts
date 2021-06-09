import type { ApolloClientElement } from '@apollo-elements/components/apollo-client';
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

import '@apollo-elements/components/apollo-client';
import '@power-elements/json-viewer/json-viewer';

import './component';

/*****************
 * APOLLO CLIENT *
 *****************/

async function setupClient(element: ApolloClientElement) {
  // Do any async work here, like fetching a token;
  await Promise.resolve();

  element.client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql'
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Launch: {
          fields: {
            /**
             * Define `selected` on launch
             */
            selected: {
              read(prev) {
                return prev ?? false;
              },
              merge(_, next) {
                return next;
              },
            },
          },
        }
      }
    }),
  });
}

async function main() {
  document.getElementById('dependencies').textContent = `DEPENDENCIES`;
  // You can set up multiple apollo clients here and assign them based on ID or data-attrs
  document.querySelectorAll('apollo-client')
    .forEach(setupClient)
}

main();
