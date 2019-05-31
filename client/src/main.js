import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueApollo);

// Setup Apollo Client
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // include auth token with requests to backend
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('networkerr', networkError);
    }

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.dir(err);
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  },
}).$mount('#app');
