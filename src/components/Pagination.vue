<template>
  <nav v-if="pages.length > 1">
    <ul class="pagination">
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <router-link class="page-link" :to="`${url}?page=${page}`">{{
          page
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { range } from '@/helpers/utils';
export default {
  name: 'app-pagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit);
      return range(1, pagesCount);
    },
  },
};
</script>

<style lang="scss" scoped></style>
