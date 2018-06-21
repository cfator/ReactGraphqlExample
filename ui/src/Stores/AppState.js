import {browserHistory} from 'react-router';
import {observable, computed, action} from 'mobx';
import moment from 'moment';

class AppState {
  errors: Array = [];

  @observable hotels = [];

  @observable loading = true;

  logError(message, level, exception = {}) {
    if(this.errors.length > 999) {
      // keep the last 1k client errors handing for inspection
      this.errors.splice(-1, 1);
    }
    this.errors.push({
      message: message,
      level: level,
      exception: exception,
      when: moment(),
      stack:  (new Error()).stack
    });

    window.console.log(message);
  };

  constructor() {
    // catch all global/uncaught errors
    window.addEventListener('error', (e: object) => {
      this.logError('Global Error', 'error', e);
    });

    // todo: load hotels, set this.loading to false onSuccess
  }
}

export default new AppState();
