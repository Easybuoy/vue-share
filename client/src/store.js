import Vue from 'vue';
import Vuex from 'vuex';

import { stat } from 'fs';
import router from './router';

import { defaultClient as apolloClient } from './main';
import {
  GET_POSTS,
  SIGN_IN_USER,
  SIGN_UP_USER,
  GET_CURRENT_USER,
} from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);

      apolloClient
        .query({
          query: GET_CURRENT_USER,
        })
        .then(({ data }) => {
          commit('setLoading', false);
          // Add user to state
          commit('setUser', data.getCurrentUser);
        })
        .catch((err) => {
          commit('setLoading', false);
          console.log(err);
        });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS,
        })
        .then(({ data }) => {
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
          console.log(data.getPosts);
        })
        .catch((err) => {
          console.log(err);
          commit('setLoading', false);
        });
    },
    signInUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGN_IN_USER,
          variables: payload,
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signInUser.token);
          router.go();
        })
        .catch(err => console.log(err));
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
  },
});
