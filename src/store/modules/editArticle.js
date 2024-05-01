import apiArticle from '@/api/article';

const state = {
  isSubmitting: false,
  validatesError: null,
  isLoading: false,
  article: null,
};
export const mutationsType = {
  updateArticleStart: '[editArticle] updateArticleStart',
  updateArticleSuccess: '[editArticle] updateArticleSuccess',
  updateArticleFailure: '[editArticle] updateArticleFailure',

  getArticleStart: '[editArticle] getArticleStart',
  getArticleSuccess: '[editArticle] getArticleSuccess',
  getArticleFailure: '[editArticle] getArticleFailure',
};

export const actionTypes = {
  updateArticle: '[editArticle] updateArticle',
  getArticle: '[editArticle] getArticle',
};

const mutations = {
  [mutationsType.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationsType.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationsType.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validatesError = payload;
  },
  [mutationsType.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
  },
  [mutationsType.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationsType.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.updateArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationsType.updateArticleStart);
      apiArticle
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationsType.updateArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationsType.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationsType.getArticleStart);
      apiArticle
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationsType.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationsType.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
