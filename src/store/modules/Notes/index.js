const state = {
  notes: []
};

const actions = {
  removeById({ state, commit, dispatch }, id){
    let notes = state.notes.filter((note) => note.id !== id);
    commit('SET_NOTES', notes);
    dispatch('saveNotes');
  },

  getById({ state, commit }, id){
    return state.notes.find((note) => note.id === id);
  },

  saveNote({ state, commit, dispatch }, note){
    let notes = state.notes;
    let saveIndex = notes.findIndex((item) => item.id === note.id);
    if(saveIndex != -1){
      notes[saveIndex] = note;
    }
    else {
      //TODO: может возникнуть ошибка при расширении функционала, исправить
      if(!!notes.length){
        note.id = notes[notes.length-1].id + 1;
      }
      else {
        note.id = 1;
      }
      notes.push(note);
    }
    
    commit('SET_NOTES', notes);
    dispatch('saveNotes');
  },

  saveNotes({ state, commit }){
    localStorage.setItem('notes', JSON.stringify(state.notes));
  },

  loadNotes({ commit, dispatch }){
    let storageNotes = localStorage.getItem('notes');
    let notes = [];

    if(!!storageNotes){
      notes = JSON.parse(storageNotes)
    }
    else
    {
      localStorage.setItem('notes', JSON.stringify(notes))
    }

    commit('SET_NOTES', notes);
  },

};

const mutations = {
  SET_NOTES(state, data){
    state.notes = data;
  }
};

const getters = {
  notes: (state) => state.notes
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
