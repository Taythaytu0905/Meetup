import { CREATE_MEETUP, SET_LOADED_MEETUPS, SET_LOADING, SET_ERROR, CLEAR_ERROR, DELETE_MEETUP, EDIT_MEETUP } from '../mutation-types'
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
            date: obj[key].date,
            creatorId: obj[key].creatorId
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
  createMeetup ({ commit, getters }, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: getters.user.id
    }
    firebase.database().ref('meetups').push(meetup)
      .then(data => {
        const key = data.key
        commit(CREATE_MEETUP, { ...meetup, id: key })
      })
      .catch(error => commit(SET_ERROR, error))
  },
  editMeetup ({ commit }, payload) {
    commit(SET_LOADING, true)
    commit(CLEAR_ERROR)
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.location) {
      updateObj.location = payload.location
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.imageUrl) {
      updateObj.imageUrl = payload.imageUrl
    }
    if (payload.date) {
      updateObj.date = payload.date
    }
    firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit(SET_LOADING, false)
        commit(EDIT_MEETUP, payload)
      })
      .catch(error => commit(SET_ERROR, error))
  },
  deleteMeetup ({ commit }, payload) {
    commit(SET_LOADING, true)
    commit(CLEAR_ERROR)
    firebase.database().ref('meetups').child(payload).remove()
      .then(() => {
        commit(SET_LOADING, false)
        commit(DELETE_MEETUP, payload)
      })
      .catch(error => commit(SET_ERROR, error))
  }
}
