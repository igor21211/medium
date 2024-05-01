<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler />
          <app-feed :api-url="apiUrl" />
        </div>

        <div class="col-md-3">
          <app-popular-tag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed.vue';
import AppPopularTag from '@/components/PopularTag.vue';
import AppBanner from '@/components/Banner.vue';
import AppFeedToggler from '@/components/FeedToggle.vue';

export default {
  name: 'app-global-feed',
  components: {
    AppFeed,
    AppPopularTag,
    AppBanner,
    AppFeedToggler,
  },
  data() {
    return {
      apiUrl: '/articles',
    };
  },
};
</script>

<style lang="scss" scoped></style>
