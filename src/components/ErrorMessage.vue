<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'app-error-message',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong',
    },
  },
};
</script>

<style lang="scss" scoped></style>
