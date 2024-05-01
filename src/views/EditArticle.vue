<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :validatesError="validatesError"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm.vue';
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/editArticle';
import AppLoading from '@/components/Loading.vue';
export default {
  components: {
    AppArticleForm,
    AppLoading,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validatesError: (state) => state.editArticle.validatesError,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  name: 'app-edit-article',
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.updateArticle, {
          articleInput,
          slug: this.$route.params.slug,
        })
        .then((article) => {
          this.$router.push({
            name: 'article',
            params: { slug: article.slug },
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
