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
            fbKeys: {},
            name: '',
            phone: '',
            idProfile: '',
            location: ''
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
            idProfile: '',
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
            name: '',
            phone: '',
            location: ''
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
      idProfile: '',
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {},
      name: '',
      phone: '',
      location: ''
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
    firebase.database().ref('/user/' + getters.user.id + '/registration/').once('value')
      .then(data => {
        const dataRegister = data.val()
        const registeredMeetups = []
        const fbKeys = {}
        for (const key in dataRegister) {
          registeredMeetups.push(dataRegister[key])
          fbKeys[dataRegister[key]] = key
        }
        firebase.database().ref('/user/' + getters.user.id + '/profile/').once('value')
          .then(data => {
            const profile = data.val()
            let name = ''
            let phone = ''
            let idProfile = ''
            let location = ''
            for (const key in profile) {
              name = profile[key].name
              phone = profile[key].phone
              idProfile = key
              location = profile[key].location
            }
            const updateData = {
              idProfile: idProfile,
              name: name,
              phone: phone,
              id: getters.user.id,
              registeredMeetups: registeredMeetups,
              fbKeys: fbKeys,
              location: location
            }
            commit(SET_LOADING, false)
            commit(SET_USER, updateData)
          })
      })
      .catch(error => {
        commit(SET_ERROR, error)
        commit(SET_LOADING, true)
      })
  },
  addProfileUser ({ commit, getters }, payload) {
    commit(SET_LOADING, true)
    const user = getters.user
    firebase.database().ref('/user/' + user.id).child('/profile/')
      .push(payload)
      .then(data => {
        const newDataUser = {
          id: user.id,
          registeredMeetups: user.registeredMeetups,
          fbKeys: user.fbKeys,
          name: payload.name,
          phone: payload.phone,
          location: payload.location,
          idProfile: data.key
        }
        commit(SET_LOADING, false)
        commit(SET_USER, newDataUser)
      })
      .catch(error => {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
      })
  },
  updateProfileUser ({ commit, getters }, payload) {
    commit(SET_LOADING, true)
    const user = getters.user
    const updateObj = {}
    if (payload.name) {
      updateObj.name = payload.name
    }
    if (payload.phone) {
      updateObj.phone = payload.phone
    }
    if (payload.location) {
      updateObj.location = payload.location
    }
    firebase.database().ref('/user/' + user.id + '/profile/').child(user.idProfile)
      .update(updateObj)
      .then(data => {
        commit(SET_LOADING, false)
        const newDataUser = {
          id: user.id,
          registeredMeetups: user.registeredMeetups,
          fbKeys: user.fbKeys,
          name: payload.name,
          phone: payload.phone,
          location: payload.location,
          idProfile: data.key
        }
        commit(SET_USER, newDataUser)
      })
      .catch(error => {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
      })
  }
}
