<template>
  <ul class="error-messages">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'app-validation-errors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errors() {
      return Object.keys(this.validationErrors).map((key) => {
        const messages = this.validationErrors[key].join(', ');
        return `${key} ${messages}`;
      });
    },
  },
};
</script>

<style></style>
