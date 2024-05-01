<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message :message="error" v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <app-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/feed';
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/feed';
import AppPagination from '@/components/Pagination';
import { LIMIT } from '@/helpers/constants';
import queryString from 'query-string';
import AppLoading from '@/components/Loading';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';
import AppAddToFavorites from '@/components/AddToFavorites';
export default {
  name: 'app-feed',
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit: LIMIT,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: getterTypes.isLoading,
      feed: getterTypes.data,
      error: getterTypes.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.limit - this.limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      console.log('op');
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const updatedParams = {
        ...parsedUrl.query,
        limit: this.limit,
        offset: this.offset,
      };
      const stringifiedParams = queryString.stringify(updatedParams);
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>

<style lang="scss" scoped></style>
