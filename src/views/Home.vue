<template lang="pug">
  include ../utils/bem/index.pug
  +b.page.home
    +b.container
      +b.notes-wrap
        +b.actions-bar
          +b.BUTTON.btn(class="--circle --icon", @click="addNoteModal()")
            +e.icon.fa-solid 

        note(v-for="note in notes", :note="note", v-on:remove="confirmRemove")

    confirm-modal(text="Вы действительно хотите удалить заметку?", v-on:confirm="removeNote")
    add-note-modal(:onSave="closeAddModal()")
              
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import ConfirmModal from "@/components/ui/ConfirmModal";
  import AddNoteModal from "@/components/ui/AddNoteModal";
  import Note from "@/components/ui/Note";

  export default {
    name: "Home",

    data(){
      return {
        removeId: 0,
      }
    },

    components: {
      ConfirmModal,
      AddNoteModal,
      Note
    },

    computed: {
      ...mapGetters('Notes', {
        notes: 'notes'
      })
    },

    methods: {
      removeNote(isConfirmed){
        //TODO: подумать как можно сделать через Promise (this.removeId из ниоткуда - не красиво). При  помощи замыкания в методе confirmRemove
        if(isConfirmed){
          this.$store.dispatch(`Notes/removeById`, this.removeId);
        }
        this.$modal.hide('confirm-modal');
      },

      confirmRemove(id){
        this.$modal.show('confirm-modal');
        this.removeId = id;
      },

      addNoteModal(){
        this.$modal.show('add-note-modal');
      },

      closeAddModal(){
        this.$modal.hide('add-note-modal');
      }
    }
  };
</script>

<style lang="scss">
  @import '@/assets/scss/ui/btn';
  @import '@/assets/scss/ui/actions-bar';
  @import '@/assets/scss/ui/checkbox';

  .notes-wrap{
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 0 auto;
    .note{
      margin-bottom: 15px;
    }
  }

  
</style>
