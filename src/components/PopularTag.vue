<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <app-loading v-if="isLoading" />
    <app-error-message :message="error" v-if="error" />
    <div v-if="tags">
      <router-link
        v-for="tag in tags"
        :key="tag"
        class="tag-default tag-pill"
        :to="{ name: 'tag', params: { slug: tag } }"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { gettersType } from '@/store/modules/tag';
import { mapGetters } from 'vuex';
import { actionsType } from '@/store/modules/tag';
import AppLoading from '@/components/Loading';
import AppErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'app-popular-tag',
  components: {
    AppLoading,
    AppErrorMessage,
  },
  computed: {
    ...mapGetters({
      tags: gettersType.tags,
      isLoading: gettersType.IsLoading,
      error: gettersType.Error,
    }),
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
    fetchTags() {
      this.$store.dispatch(actionsType.getTags);
    },
  },
};
</script>

<style></style>
