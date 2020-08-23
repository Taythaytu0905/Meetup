import { SET_USER, REGISTER_MEETUP, UNREGISTER_MEETUP } from '../mutation-types'

export default {
  [SET_USER] (state, payload) {
    state.user = payload
  },
  [REGISTER_MEETUP] (state, payload) {
    const id = payload.id
    if (state.user.registeredMeetups.findIndex(meetupId => meetupId === id) >= 0) {
      return
    }
    state.user.registeredMeetups.push(id)
    state.user.fbKeys[id] = payload.fbKey
  },
  [UNREGISTER_MEETUP] (state, payload) {
    const registeredMeetups = state.user.registeredMeetups
    registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup === payload), 1)
    Reflect.deleteProperty(state.user.fbKeys, payload)
  }
}
