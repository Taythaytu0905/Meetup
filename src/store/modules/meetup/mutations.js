import { CREATE_MEETUP, SET_LOADED_MEETUPS } from '../mutation-types'

export default {
  [CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  },
  [SET_LOADED_MEETUPS] (state, payload) {
    state.loadedMeetups = payload
  }
}
