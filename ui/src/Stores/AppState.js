import gql from 'graphql-tag';
import { observable, action } from 'mobx';
import moment from 'moment';

class AppState {
  errors:Array = [];

  @observable hotels = {};

  @observable isLoading = true;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  logError(message, level, exception = {}) {
    if (this.errors.length > 999) {
      // keep the last 1k client errors handing for inspection
      this.errors.splice(-1, 1);
    }
    this.errors.push({
      message: message,
      level: level,
      exception: exception,
      when: moment(),
      stack: (new Error()).stack
    });

    window.console.log(message);
  };

  constructor(props) {
    // catch all global/uncaught errors
    window.addEventListener('error', (e:object) => {
      this.logError('Global Error', 'error', e);
    });
  }

  setTransport(transportClient) {
    this.transportClient = transportClient;

    // load hotel list before letting the user interact via isLoading observable
    const HOTELS_QUERY = gql`
      query ItemsQuery {
        hotels {
          id
          name
          location {
            lat
            long
          }
        }
      }
    `;

    this.transportClient.query({query: HOTELS_QUERY}).then(((response) => {
      this.hotels = response.data.hotels;
      this.setLoading(false);
    }).bind(this));
  }

  getHotel(id) {
    return this.hotels[id];
  }
}

export default new AppState();
