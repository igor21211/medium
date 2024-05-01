import apiFavorites from '@/api/addToFavorites';

export const mutationsTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure',
};

export const actionsTypes = {
  addToFavorites: '[addToFavorites] Add to favorites',
};

const mutations = {
  [mutationsTypes.addToFavoritesStart]() {},
  [mutationsTypes.addToFavoritesSuccess]() {},
  [mutationsTypes.addToFavoritesFailure]() {},
};

const actions = {
  [actionsTypes.addToFavorites]({ commit }, { slug, isFavorited }) {
    return new Promise((resolve) => {
      commit(mutationsTypes.addToFavoritesStart);
      const promise = isFavorited
        ? apiFavorites.removeFromFavorites(slug)
        : apiFavorites.addToFavorites(slug);
      promise
        .then((article) => {
          commit(mutationsTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          commit(mutationsTypes.addToFavoritesFailure);
        });
    });
  },
};

export default {
  actions,
  mutations,
};
