import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

const { Route } = Ember;

export default Route.extend({
  model({ id }) {
    return this.store.findRecord('post', id);
  },

  actions: {


    saveComment(post, commentBody) {
      // let user = this.get('currentUser.user');
      let comment = this.store.createRecord('comment', {
        // user,
        post,
        body: commentBody
      });
      comment.save().then(() => {
        stateFor('post-info').get(post).set('draftComment', '');
      });
    }
  }
});
