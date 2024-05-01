import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const gettersType = {
  data: '[article] data',
  isLoading: '[article] isLoading',
  error: '[article] error',
};

const getters = {
  [gettersType.data]: (state) => state.data,
  [gettersType.isLoading]: (state) => state.isLoading,
  [gettersType.error]: (state) => state.error,
};

export const mutationsType = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',
  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
};

export const actionsType = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
};

const mutations = {
  [mutationsType.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsType.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsType.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
  [mutationsType.deleteArticleStart]() {},
  [mutationsType.deleteArticleSuccess]() {},
  [mutationsType.deleteArticleFailure]() {},
};

const actions = {
  [actionsType.getArticle]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationsType.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((response) => {
          commit(mutationsType.getArticleSuccess, response);
          resolve(response);
        })
        .catch((result) => {
          commit(mutationsType.getArticleFailure, result.response.data);
        });
    });
  },
  [actionsType.deleteArticle]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationsType.deleteArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          commit(mutationsType.deleteArticleSuccess);
          resolve();
        })
        .catch(() => {
          commit(mutationsType.deleteArticleFailure);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
