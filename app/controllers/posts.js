import Ember from 'ember';

const { Controller, run: { debounce } } = Ember;

export default Controller.extend({

  _refreshRoute() {
    this.send('_refreshRoute');
  },

  actions: {
    searchUpdated(value) {
      this.set('search', value);
      debounce(this, '_refreshRoute', 300);
    }
  }
});
