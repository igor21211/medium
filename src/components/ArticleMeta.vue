<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'userProfile',
        params: { slug: article.author.username },
      }"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{
          name: 'userProfile',
          params: { slug: article.author.username },
        }"
        class="author"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
    </div>
    <span v-if="isAuthor">
      <router-link
        :to="{ name: 'editArticle', params: { slug: article.slug } }"
        class="btn btn-outline-secondary btn-sm"
      >
        <i class="ion-edit" />
        Edit Article
      </router-link>
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a" />
        Delete Article
      </button>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';
import { actionsType } from '@/store/modules/article';
export default {
  name: 'app-article-meta',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) return false;
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(actionsType.deleteArticle, { slug: this.article.slug })
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
