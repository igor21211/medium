import feedApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null,
};
export const getterTypes = {
  data: '[feed] data',
  isLoading: '[feed] isLoading',
  error: '[feed] error',
};

const getters = {
  [getterTypes.data]: (state) => state.data,
  [getterTypes.isLoading]: (state) => state.isLoading,
  [getterTypes.error]: (state) => state.error,
};

export const mutationsTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
};

export const actionTypes = {
  getFeed: '[feed] getFeed',
};

const mutations = {
  [mutationsTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsTypes.getFeedFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getFeed]({ commit }, { apiUrl }) {
    return new Promise((resolve) => {
      commit(mutationsTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          commit(mutationsTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch((result) => {
          commit(mutationsTypes.getFeedFailure, result.response.data);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
