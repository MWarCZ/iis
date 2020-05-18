
import axios from 'axios'
import { BACKEND_URL, axiosConfig } from './constant.js'

const Discounts = {

  getAll () {
    return axios.post(BACKEND_URL + '/discounts.php',
      'request=SELECT_ALL'
      , axiosConfig)
      .then(res => {
        console.log('ALL discounts:', res.data)
        return res.data
      })
      .then(res => {
        if (res.data) {
          let newRes = res.data.map(value => {
            value.id = Number(value.idDiscount)
            value.discount = Number(value.discount)
            return value
          })
          console.log('ALL discounts:', newRes)
          return newRes
        } else {
          return []
        }
      })
  },

  getById (id) {
    return axios.post(BACKEND_URL + '/discounts.php',
      'request=SELECT' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Id discount:', res.data)
        return res.data
      })
      .then(res => {
        let value = res.data
        value.id = Number(value.idDiscount)
        value.discount = Number(value.discounts)

        console.log('Id discount:', value)
        return value
      })
  },

  /**/
  create () {
  },
  /**/
  update () {

  },
  /**/
  remove (id) {
    return axios.post(BACKEND_URL + '/discounts.php',
      'request=DELETE' + '&data=' +
      JSON.stringify({
        id: id
      })
      , axiosConfig)
      .then(res => {
        console.log('Delete discount bool:', res.data)
        return res.data
      })
      .then(res => {
        if (!res.data) {
          throw new Error(res.error)
        }
        return res
      })
  }

}

export default Discounts
