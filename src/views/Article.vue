<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <app-article-meta
          v-if="article"
          :article="article"
          :isLoading="isLoading"
        />
      </div>
    </div>
    <div class="container page">
      <app-loading v-if="isLoading" />
      <app-error-message :message="error" v-if="error" />
      <div class="row article-content">
        <div class="col-md-12">
          <div v-if="article">
            <div class="article-content">
              <p>{{ article.body }}</p>
            </div>
            <app-tag-list :tags="article.tagList" />
          </div>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <app-article-meta
          v-if="article"
          :article="article"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { actionsType } from '@/store/modules/article';
import { mapState } from 'vuex';
import AppArticleMeta from '@/components/ArticleMeta.vue';
import AppLoading from '@/components/Loading.vue';
import AppErrorMessage from '@/components/ErrorMessage.vue';
import AppTagList from '@/components/TagList.vue';
export default {
  components: {
    AppArticleMeta,
    AppLoading,
    AppErrorMessage,
    AppTagList,
  },
  name: 'app-article',
  computed: {
    ...mapState({
      article: (state) => state.article.data,
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionsType.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>

<style lang="scss" scoped></style>
