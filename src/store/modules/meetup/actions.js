import { CREATE_MEETUP, SET_LOADED_MEETUPS, SET_LOADING, SET_ERROR, CLEAR_ERROR } from '../mutation-types'
import * as firebase from 'firebase'

export default {
  loadMeetups ({ commit }) {
    commit(SET_LOADING, true)
    commit(CLEAR_ERROR)
    firebase.database().ref('meetups').once('value')
      .then(data => {
        const meetups = []
        const obj = data.val()
        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            location: obj[key].location,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date
          })
        }
        commit(SET_LOADED_MEETUPS, meetups)
        commit(SET_LOADING, false)
      })
      .catch(error => {
        commit(SET_ERROR, error)
        commit(SET_LOADING, true)
      })
  },
  createMeetup ({ commit }, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date.toISOString()
    }
    firebase.database().ref('meetups').push(meetup)
      .then(data => {
        const key = data.key
        commit(CREATE_MEETUP, { ...meetup, id: key })
      })
      .catch(error => commit(SET_ERROR, error))
  }
}
