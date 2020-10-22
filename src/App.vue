<template lang="pug">
  include ./utils/bem/index.pug
  #app
    main-layout
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
import MainLayout from "@/components/layout/MainLayout";

export default {
  components: {
    MainLayout
  },

  created(){
    this.$store.dispatch(`Notes/loadNotes`);
  }
};
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap");
  @import url("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css");
  @import "@/assets/scss/reset";
  @import "@/assets/scss/typography/main";
  @import "@/assets/scss/forms/main";
  @import "@/assets/scss/modals";

  html,
  body,
  #app {
    min-height: 100vh;
    background: $color-fog;
  }

  #app {
    font-family: $mainFont;
  }
  .container {
    width: 100%;
    @include wrapper();
  }
  .container-fluid {
    width: 100%;
    @include wrapper-full();
  }
  .page {
    flex-grow: 1;
    padding-left: $offset_one_side;
    padding-right: $offset_one_side;
    padding-bottom: 60px;
    &__top {
      padding: 30px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include sm-block() {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
    &__title {
      text-align: center;
      font-size: 28px;
      font-weight: 300;
      @include sm-block() {
        width: 100%;
        margin-bottom: 30px;
      }
    }
    &__content {
      padding-bottom: 60px;
      section {
        margin-bottom: 40px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
