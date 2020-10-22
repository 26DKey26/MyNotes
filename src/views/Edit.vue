<template lang="pug">
  include ../utils/bem/index.pug
  +b.page.edit
    .container
      +e.wrap
        +b.actions-bar
          +b.BUTTON.btn(class="--circle --icon", @click="undo()", :disabled="currentHistoryStep < 1")
            +e.icon.fa-solid 
          +b.BUTTON.btn(class="--circle --icon", @click="redo()", :disabled="currentHistoryStep >= history.length-1")
            +e.icon.fa-solid 
        note(v-if="!!note", :note="note", :state="NoteStates.EDIT", v-on:remove="removeNote")
        +b.bottom
          +b.BUTTON.btn(@click="confirmCancel()") Отменить
          +b.BUTTON.btn(@click="save()") Сохранить

    confirm-modal(text="Вы действительно вернуться без сохранения изменений?", v-on:confirm="cancel")
</template>

<script>
  import Note from "@/components/ui/Note";
  import NoteStates from "@/entities/types/NoteStates";
  import ConfirmModal from "@/components/ui/ConfirmModal";
  import { difference } from "@/utils/Helpers";

  const MAX_HISTORY_STEPS = 5;

  export default {
    data(){
      return {
        MAX_HISTORY_STEPS,
        note: '',
        history: [],
        currentHistoryStep: 0,
        canSaveToHistory: false,
        NoteStates
      }
    },

    watch: {
      note:{
        deep: true,
        immediate: true,
        handler(val){
          this.saveChangesToHistory(val);
        }
      }
    },

    async created(){
      let noteByLink = await this.$store.dispatch(`Notes/getById`, this.id);
      this.note = JSON.parse(JSON.stringify(noteByLink));
    },

    components: {
      Note,
      ConfirmModal
    },

    methods: {
      saveChangesToHistory(note){
        if(!this.canSaveToHistory){
          this.canSaveToHistory = true;
          return;
        }

        if(this.history.length > MAX_HISTORY_STEPS){
          this.history = this.history.slice(-MAX_HISTORY_STEPS);
        }

        if(this.canSaveAsNew(note)){
          this.saveAsNew(note);
        }
        else {
          this.saveToSame(note);
        }

        this.currentHistoryStep = this.history.length-1;
      },

      canSaveAsNew(note){
        if(this.history.length < 2){
          return true;
        }

        let diff = difference(note, JSON.parse(this.history[this.history.length-2]));
        if(!diff.items){
          return true;
        }

        let checkedChanges = diff.items.filter(item => Object.keys(item).includes('checked'));
        if(checkedChanges.length){
          return true;
        }

        return false;
      },

      saveToSame(note){
        this.history[this.history.length-1] = JSON.stringify(note);
      },

      saveAsNew(note){
        this.history.push(JSON.stringify(note));
      },

      confirmCancel(){
        this.$modal.show('confirm-modal');
      },

      save(){
        this.$store.dispatch(`Notes/saveNote`, this.note);
        this.$router.push({ name: 'home' });
      },

      cancel(isConfirmed){
        if(isConfirmed){
          this.$router.push({ name: 'home' });
        }

        this.$modal.hide('confirm-modal');
      },

      removeNote(id){
        if(!!id){
          this.$store.dispatch(`Notes/removeById`, id);
        }
        this.$router.push({ name: 'home' });
      },

      undo(){
        this.canSaveToHistory = false;
        if(this.currentHistoryStep > 0)
          this.note = JSON.parse(this.history[--this.currentHistoryStep]);
      },

      redo(){
        this.canSaveToHistory = false;
        if(this.currentHistoryStep < this.history.length-1)
          this.note = JSON.parse(this.history[++this.currentHistoryStep]);
      }
    },

    props: {
      id: { type: Number }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/ui/btn';
  @import '@/assets/scss/ui/actions-bar';
  @import '@/assets/scss/ui/checkbox';
  .page{
    &__wrap{
      display: flex;
      flex-direction: column;
      max-width: 700px;
      margin: 0 auto;
    }
  }
  .edit{
    .bottom{
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      &>*{
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>
