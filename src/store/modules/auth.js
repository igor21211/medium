import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const getterTypes = {
  isSubmitting: '[auth] isSubmitting',
  currentUser: '[auth] currentUser',
  validationErrors: '[auth] validationErrors',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};

const getters = {
  [getterTypes.isSubmitting]: (state) => state.isSubmitting,
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.validationErrors]: (state) => state.validationErrors,
  [getterTypes.isLoggedIn]: (state) => Boolean(state.isLoggedIn),
  [getterTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentStart',
  getCurrentUserSuccess: '[auth] getCurrentSuccess',
  getCurrentUserFailure: '[auth] getCurrentFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout',
};
const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationsTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationsTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
  [mutationsTypes.updateCurrentUserStart]() {},
  [mutationsTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationsTypes.updateCurrentUserFailure]() {},
  [mutationsTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
};

const actions = {
  [actionTypes.register]({ commit }, credentials) {
    return new Promise((resolve) => {
      commit(mutationsTypes.registerStart);
      authApi
        .register(credentials)
        .then((response) => {
          commit(mutationsTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((error) => {
          commit(mutationsTypes.registerFailure, error.response.data.errors);
        });
    });
  },
  [actionTypes.login]({ commit }, credentials) {
    return new Promise((resolve) => {
      commit(mutationsTypes.loginStart);
      authApi
        .login(credentials)
        .then((response) => {
          commit(mutationsTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((error) => {
          commit(mutationsTypes.loginFailure, error.response.data.errors);
        });
    });
  },
  [actionTypes.getCurrentUser]({ commit }) {
    return new Promise((resolve) => {
      commit(mutationsTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          commit(mutationsTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          commit(mutationsTypes.getCurrentUserFailure);
        });
    });
  },
  [actionTypes.updateCurrentUser]({ commit }, { currentUser }) {
    return new Promise((resolve) => {
      commit(mutationsTypes.updateCurrentUserStart);
      authApi
        .updateCurrentUser(currentUser)
        .then((user) => {
          commit(mutationsTypes.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch((result) => {
          commit(
            mutationsTypes.updateCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.logout]({ commit }) {
    return new Promise((resolve) => {
      setItem('accessToken', '');
      commit(mutationsTypes.logout);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
