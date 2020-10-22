<template lang="pug">
  include ../../utils/bem/index.pug
  +b.note
    +e.wrap
      +e.header
        input(type="text", v-model="note.name", :disabled="state === NoteStates.VIEW")

        //TODO: перенести в слот
        +e.actions
          +b.ROUTER-LINK.btn(:to="{ name:'edit', query: { id: note.id }}", class="--icon", v-if="state === NoteStates.VIEW")
            +e.icon.fa-solid 
          +b.BUTTON.btn(class="--icon", @click="removeNote(note.id)", v-if="!!note.id")
            +e.icon.fa-solid 

      +e.content
        +e.row(v-for="(item, index) in note.items", v-if="(index < showItemsCount) || (state === NoteStates.EDIT)")
          +b.LABEL.checkbox(:class="{ 'disabled': state === NoteStates.VIEW }")
            input(type="checkbox", v-model="item.checked", :disabled="state === NoteStates.VIEW")
            span
          +e.text
            textarea-autosize(v-model="item.text", :disabled="state === NoteStates.VIEW")
            +e.row-actions(v-if="state === NoteStates.EDIT")
              +b.BUTTON.btn(class="--icon", @click="removeItem(index)")
                +e.icon.fa-solid 

        +e.row.add-btn(v-if="state === NoteStates.EDIT", @click="addItem()")
          +b.btn(class="--icon --square", )
            +e.icon.fa-solid 
          +e.text
            span Добавить
           

    +e.BUTTON.expand(v-if="(note.items.length > itemsForShow) && (state === NoteStates.VIEW)", @click="toggleExpand()")
      span {{expanded ? 'Скрыть' : 'Показать еще'}}
      span.fa-solid {{expanded ? '' : ''}}
</template>

<script>
  import NoteStates from "@/entities/types/NoteStates";

  const itemsForShow = 3;

  export default {

    data(){
      return {
        expanded: false,
        itemsForShow,
        showItemsCount: itemsForShow,
        NoteStates
      }
    },

    methods: {
      removeNote(id){
        this.$emit('remove', id)
      },

      removeItem(index){
        this.note.items = this.note.items.filter((item, inx) => index != inx);
      },

      addItem(){
        this.note.items.push({ checked: false, text: '' });
      },

      toggleExpand(){
        this.expanded = !this.expanded;
        this.showItemsCount = this.expanded ? Infinity : itemsForShow;
      }
    },

    props: {
      note: { type: Object },
      state: { type: Number, default: NoteStates.VIEW }
    }
  }
</script>

<style lang="scss">
  .note{
    $parent: &;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    transition: all .3s ease;
    &:hover{
      border-color: #e0e0e0;
      #{$parent}__actions{
        visibility: visible;
        opacity: 1;
      }
    }

    input, textarea{
      background: none;
      font-family: "Montserrat", sans-serif;
    }

    .add-btn{
      cursor: pointer;
      border-top: 1px solid #f1f1f1;
      padding: 15px 0px;
      &:hover{
        .btn{
          border-color: #75c251;
          &__icon{
            color: #75c251;
          }
        }
      }
      .btn{
        margin-right: 15px;
        font-size: 12px;
      }
    }

    &__wrap{
      padding: 10px 20px;
    }

    &__header{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid #f1f1f1;
      font-weight: 500;
    }

    &__actions{
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: all .3s ease;
      &>*{
        margin-right: 5px;
        &:last-child{
          margin-right: 0;
        }
      }
    }

    &__content{

    }

    &__row{
      display: flex;
      margin-bottom: 15px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    &__text{
      display: flex;
      padding-top: 3px;
      font-size: 14px;
      flex-grow: 1;
      textarea{
        width: 100%;
      }
      .btn--icon{
        opacity: 0;
        visibility: hidden;
      }
      &:hover{
        .btn--icon{
          opacity: 1;
          visibility: visible;
        }
      }
    }

    &__expand {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 15px;
      background: none;
      cursor: pointer;
      transition: all .3s ease;
      color: #8b8b8b;

      &:hover{
        background: #f1f1f1;
      }

      &>*{
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>