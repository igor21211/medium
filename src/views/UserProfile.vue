<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <router-link
                v-if="isCurrentUserProfile"
                :to="{
                  name: 'settings',
                }"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                >
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                >
                  Favorited Post
                </router-link>
              </li>
            </ul>
          </div>
          <app-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { actionsType } from '@/store/modules/userProfile';
import { getterTypes } from '@/store/modules/auth';
import AppFeed from '@/components/Feed.vue';
export default {
  name: 'app-user-profile',
  components: {
    AppFeed,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      userProfile: (state) => state.userProfile.data,
      error: (state) => state.userProfile.error,
    }),
    ...mapGetters({
      currentUserProfile: getterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUserProfile || !this.userProfile) {
        return false;
      }
      return this.currentUserProfile.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    routeName() {
      return this.$route.name;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
  },
  mounted() {
    this.getUserProfile();
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(actionsType.getUserProfile, {
        slug: this.userProfileSlug,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
