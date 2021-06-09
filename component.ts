/****************
 * UI COMPONENT *
 ****************/

import { ApolloQuery, css, customElement, html } from '@apollo-elements/lit-apollo';
import { gql } from '@apollo/client/core';

interface Launch {
  id: string;
  missionName: string;
  selected: boolean;
}

interface Data {
  launches: readonly Launch[];
}

@customElement('query-element')
class QueryElement extends ApolloQuery<Data, null> {
  query = gql`
    query LaunchesQuery {
      launches(limit: 10) {
        id
        missionName: mission_name
        selected @client
      }
    }
  `;

  static styles = css`
    :host {
      display: grid;
    }
  `;

  render() {
    const launches = this.data?.launches ?? [];
    return html`
      ${this.loading ? '...loading' : ''}
      <ol>
        ${launches.map(x => html`
        <li>
          <label>
            <input type="checkbox" .checked="${x.selected}" data-id="${x.id}" @input="${this.onInput}"/>
            ${x.missionName}
          </label>
        </li>
        `)}
      </ol>
    `;
  }

  /**
   * When user clicks the checkbox, update the stored state
   */
  onInput(event: Event & { target: HTMLInputElement }) {
    const fragment = gql`
      fragment selected on Launch {
        selected @client
      }
    `;

    const id =
      `Launch:${event.target.dataset.id}`;

    const selected =
      event.target.checked;

    this.client.cache.writeFragment({ id, fragment, data: { selected } })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'query-element': QueryElement
  }
}
