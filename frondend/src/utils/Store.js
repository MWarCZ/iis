import backend from './Backend.js'

const store = {
  xxx: 'Toto je sklad.',

  backend: backend,

  user: undefined,
  worker: undefined,

  save: function (storage = localStorage) {
    if (!this.user) {
      storage.removeItem('user')
    } else {
      const parsed = JSON.stringify(this.user)
      storage.setItem('user', parsed)
    }
    if (!this.worker) {
      storage.removeItem('worker')
    } else {
      const parsed = JSON.stringify(this.worker)
      storage.setItem('worker', parsed)
    }
  },

  load: function (storage = localStorage) {
    if (storage.getItem('user')) {
      try {
        let user = {}
        user = JSON.parse(localStorage.getItem('user'))
        this.user = user
      } catch (e) {
        storage.removeItem('user')
      }
    } else if (storage.getItem('worker')) {
      try {
        let worker = {}
        worker = JSON.parse(localStorage.getItem('worker'))
        this.worker = worker
      } catch (e) {
        storage.removeItem('worker')
      }
    }
  }
}

export default store
