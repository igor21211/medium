<template>
  <button
    :class="{
      'btn btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
    @click="onClick"
  >
    <i class="ion-heart"></i>
    &nbsp;
    {{ favoritesCountOptimistic }}
  </button>
</template>

<script>
import { actionsTypes } from '@/store/modules/addToFavorites';
export default {
  name: 'app-add-to-favorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    onClick() {
      this.$store.dispatch(actionsTypes.addToFavorites, {
        isFavorited: this.isFavoritedOptimistic,
        slug: this.articleSlug,
      });
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>

<style lang="scss" scoped></style>
