
// const store = new Vuex.Store({

const store = {
  xxx: 'Toto je sklad.',
  user: undefined,

  save: function (storage = localStorage) {
    if (!this.user) {
      localStorage.removeItem('user')
    } else {
      const parsed = JSON.stringify(this.user)
      localStorage.setItem('user', parsed)
    }
  },

  load: function (storage = localStorage) {
    let user = {}
    if (localStorage.getItem('user')) {
      try {
        user = JSON.parse(localStorage.getItem('user'))
        this.user = user
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
  }
}

export default store
