<template lang="pug">
  include ../../utils/bem/index.pug
  +b.FOOTER.footer
    .container
      +e.P.copyright © {{year}} Все права защищены
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss">
.footer {
  background: $color-white;
  border-top: 1px solid $color-gray-light;
  padding-top: 30px;
  padding-bottom: 30px;
  &__copyright {
    text-align: center;
    font-size: $mainFontSize * 0.8;
  }
}
</style>
