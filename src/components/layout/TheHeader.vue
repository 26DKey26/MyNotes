<template lang="pug">
  include ../../utils/bem/index.pug
  +b.HEADER.header
    .container-fluid
      +e.row
        +e.ROUTER-LINK(to="/" class="logo")
          img(src="@/assets/logo.png", :alt="name")
          +e.H1.name {{name}}

</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      name: "MyNote",
    }
  }
};
</script>

<style lang="scss">
.header {
  background: #fff;
  width: 100%;
  box-shadow: $shadowBase;
  padding: 15px 0;
  position: relative;
  z-index: 3;
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    img {
      width: 40px;
      margin-right: 25px;
    }
  }
  &__name {
    font-size: 14px;
    line-height: $mainLineHeight;
    font-weight: 400;
    color: $mainFontColor;
    max-width: 220px;
    margin-right: auto;
  }
}
</style>
