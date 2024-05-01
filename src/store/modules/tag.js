import tagApi from '@/api/tag';

const state = {
  tags: [],
  isLoading: false,
  error: null,
};

export const gettersType = {
  tags: '[tag] getTags',
  IsLoading: '[tag] IsLoading',
  Error: '[tag] Error',
};

const getters = {
  [gettersType.tags]: (state) => state.tags,
  [gettersType.IsLoading]: (state) => state.isLoading,
  [gettersType.Error]: (state) => state.error,
};

export const mutationsType = {
  getTagStart: '[tag] getTagStart',
  getTagSuccess: '[tag] getTagSuccess',
  getTagFailure: '[tag] getTagFailure',
};

export const actionsType = {
  getTags: '[tag] getTags',
};

const mutations = {
  [mutationsType.getTagStart](state) {
    state.isLoading = true;
    state.tags = [];
  },
  [mutationsType.getTagSuccess](state, payload) {
    state.tags = payload;
    state.isLoading = false;
    state.error = null;
  },
  [mutationsType.getTagFailure](state, payload) {
    state.error = payload;
    state.isLoading = false;
  },
};

const actions = {
  [actionsType.getTags]({ commit }) {
    return new Promise((resolve) => {
      commit(mutationsType.getTagStart);
      tagApi
        .getTags()
        .then((response) => {
          commit(mutationsType.getTagSuccess, response.data.tags);
          resolve(response.data.tags);
        })
        .catch((result) => {
          commit(mutationsType.getTagFailure, result.response.data);
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
