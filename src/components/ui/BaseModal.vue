<template lang="pug">
  include ../../utils/bem/index.pug
  +b.MODAL.modal(:name="name", :class="name", :width="width", :height="height", @before-close="$emit('before-close')")
    +e.header
      +e.title {{title}}
      +b.BUTTON.btn(class="--icon", @click="$modal.hide(name)")
        +e.icon.fa-solid 
    +e.content
      slot
</template>

<script>
  export default {
    props: {
      name: { type: String },
      title: { type: String },
      width: { type: String | Number },
      height: { type: String | Number }
    }
  }
</script>