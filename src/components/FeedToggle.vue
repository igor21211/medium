<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourFeed' }"
          class="nav-link"
          :class="{ active: routedName === 'yourFeed' }"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'globalFeed' }"
          class="nav-link"
          :class="{ active: routedName === 'globalFeed' }"
        >
          Global Feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'tag' }"
          class="nav-link"
          :class="{ active: routedName === 'tag' }"
        >
          #{{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/modules/auth';
export default {
  name: 'app-feed-toggle',
  props: {
    tagName: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routedName() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
