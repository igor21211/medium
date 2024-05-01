import apiUserProfile from '@/api/userProfile';
const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationsType = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure',
};

export const actionsType = {
  getUserProfile: '[userProfile] getUserProfile',
};

const mutations = {
  [mutationsType.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationsType.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationsType.getUserProfileFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionsType.getUserProfile]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationsType.getUserProfileStart);
      apiUserProfile
        .getUserProfile(slug)
        .then((response) => {
          commit(mutationsType.getUserProfileSuccess, response);
          resolve(response);
        })
        .catch((result) => {
          commit(mutationsType.getUserProfileFailure, result.response.data);
        });
    });
  },
};

export default {
  actions,
  mutations,
  state,
};
