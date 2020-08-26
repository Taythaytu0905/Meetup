import * as firebase from 'firebase'
import { SET_USER, SET_LOADING, SET_ERROR, CLEAR_ERROR, REGISTER_MEETUP, UNREGISTER_MEETUP } from '../mutation-types'

export default {
  signUserUp ({ commit }, payload) {
    commit(SET_LOADING, true)
    commit(CLEAR_ERROR)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit(SET_LOADING, false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit(SET_USER, newUser)
        }
      )
      .catch(
        error => {
          commit(SET_LOADING, false)
          commit(SET_ERROR, error)
        }
      )
  },
  signUserIn ({ commit }, payload) {
    commit(SET_LOADING, true)
    commit(CLEAR_ERROR)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit(SET_LOADING, false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit(SET_USER, newUser)
        }
      )
      .catch(
        error => {
          commit(SET_LOADING, false)
          commit(SET_ERROR, error)
        }
      )
  },
  autoSignIn ({ commit }, payload) {
    commit(SET_USER, {
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {}
    })
  },
  logout ({ commit }) {
    firebase.auth().signOut()
    commit(SET_USER, null)
  },
  registerUserForMeetup ({ commit, getters }, payload) {
    commit(SET_LOADING, true)
    const user = getters.user
    firebase.database().ref('/user/' + user.id).child('/registration/')
      .push(payload)
      .then(data => {
        commit(SET_LOADING, false)
        commit(REGISTER_MEETUP,
          {
            id: payload,
            fbKey: data.key
          })
      })
      .catch(error => {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
      })
  },
  unregisterUserFromMeetup ({ commit, getters }, payload) {
    commit(SET_LOADING, true)
    const user = getters.user
    if (!user.fbKeys) {
      return
    }
    const fbKey = user.fbKeys[payload]
    firebase.database().ref('/user/' + user.id + '/registration/').child(fbKey)
      .remove()
      .then(() => {
        commit(SET_LOADING, false)
        commit(UNREGISTER_MEETUP, payload)
      })
      .catch(error => {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
      })
  },
  getDataUser ({ commit, getters }) {
    commit(SET_LOADING, true)
    firebase.database().ref('/user/' + getters.user.id + '/registrations/').once('value')
      .then(data => {
        const dataRegister = data.val()
        const registeredMeetups = []
        const fbKeys = {}
        for (const key in dataRegister) {
          registeredMeetups.push(dataRegister[key])
          fbKeys[dataRegister[key]] = key
        }
        const updateData = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: fbKeys
        }
        commit(SET_LOADING, false)
        commit(SET_USER, updateData)
      })
      .catch(error => {
        commit(SET_ERROR, error)
        commit(SET_LOADING, true)
      })
  }
}
