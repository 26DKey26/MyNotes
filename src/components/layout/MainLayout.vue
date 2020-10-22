<template lang="pug">
  include ../../utils/bem/index.pug
  +b.main-layout
    the-header
    +e.content
      slot
    the-footer
</template>

<script>
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
  name: "MainLayout",
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
