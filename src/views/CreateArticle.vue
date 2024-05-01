<template>
  <div>
    Create article
    <app-article-form
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
import { actionTypes } from '@/store/modules/createArticle';
export default {
  components: {
    AppArticleForm,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validatesError: (state) => state.createArticle.validatesError,
    }),
  },
  name: 'app-create-article',
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tag: '',
        tagList: [],
      },
    };
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, { articleInput })
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
