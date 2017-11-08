import Ember from 'ember';

const { Route, RSVP: { all } } = Ember;

export default Route.extend({
  queryParams: {
    search: {
      replace: true,
      as: 's'
    }
  },
  model({ search }) {
    let p = null;
    if (search) {
      p = this.store.query('post', { search });
    } else {
      p = this.store.findAll('post');
    }
    return p.then((posts) => {
      let commentsPromises = posts.map((p) => p.get('comments'));
      return all(commentsPromises).then(() => {
        return posts;
      })
    });
  },

  actions: {
    _refreshRoute() {
      this.refresh();
    }
  }
});
