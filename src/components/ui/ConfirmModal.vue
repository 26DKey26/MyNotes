<template lang="pug">
  include ../../utils/bem/index.pug
  base-modal(name="confirm-modal" width="320px", height="auto")
    +b.confirm-text {{text}}
    +b.btn-wrap
      +b.BUTTON.btn(@click="$emit('confirm', true)") Да
      +b.BUTTON.btn(@click="$emit('confirm', false)") Нет
</template>

<script>
  import BaseModal from "./BaseModal";

  export default {
    components: {
      BaseModal
    },

    props: {
      text: { type: String }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/ui/btn';
  .confirm-modal{
    .confirm-text{
      margin-bottom: 30px;
      text-align: center;
    }
  }
  .btn-wrap{
    display: flex;
    justify-content: space-between;
    width: calc(100% + 20px);
    margin: 0 -10px;
    .btn{
      display: flex;
      justify-content: center;
      flex-grow: 1;
      margin: 0 10px;
    }
  }
</style>