<template lang="pug">
  include ../../utils/bem/index.pug
  base-modal(title="Добавить новую заметку", name="add-note-modal", height="auto", v-on:before-close="beforeClose")
    note(:note="note", :state="NoteStates.EDIT")
    +b.btn-wrap
      +b.BUTTON.btn(@click="save()") Сохранить
</template>

<script>
  import BaseModal from "./BaseModal";
  import Note from "@/components/ui/Note";
  import NoteStates from "@/entities/types/NoteStates";

  const noteTemplate = {
    id: '',
    name: 'Title',
    items: [
      {
        checked: false,
        text: 'Text'
      }
    ]
  }

  export default {
    data(){
      return {
        NoteStates,
        note: JSON.parse(JSON.stringify(noteTemplate))
      }
    },

    components: {
      BaseModal,
      Note
    },

    methods: {
      save(){
        this.$store.dispatch(`Notes/saveNote`, this.note);
        this.$emit('onSave');
      },

      beforeClose(){
        this.note = JSON.parse(JSON.stringify(noteTemplate));
      }
    },

    props: {
      text: { type: String }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/ui/btn';
  .add-note-modal{
    .note{
      margin-bottom: 30px;
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