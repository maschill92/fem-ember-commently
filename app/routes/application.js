import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { default as math, PI } from 'math';

const { Route, inject, getOwner } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: inject.service(),
  beforeModel() {
    this._super(...arguments);
    console.log(math, PI);
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('loc', getOwner(this).lookup('data:location'));
  },


  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
