import * as firebase from 'firebase'
import { SET_USER, SET_LOADING, SET_ERROR, CLEAR_ERROR } from '../mutation-types'

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
            registerMeetups: []
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
            registerMeetups: []
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
  clearError ({ commit }) {
    commit(CLEAR_ERROR)
  }
}
