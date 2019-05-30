import Vue from 'vue';
import Vuex from 'vuex';
import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
  },
  actions: {
    getPosts: ({ commit }) => {
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                description
                imageUrl
                description
              }
            }
          `,
        })
        .then(({ data }) => {
          commit('setPosts', data.getPosts);
          console.log(data.getPosts);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    posts: state => state.posts,
  },
});
