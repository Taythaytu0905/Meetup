import { CREATE_MEETUP, SET_LOADED_MEETUPS, EDIT_MEETUP, DELETE_MEETUP } from '../mutation-types'

export default {
  [CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  },
  [SET_LOADED_MEETUPS] (state, payload) {
    state.loadedMeetups = payload
  },
  [EDIT_MEETUP] (state, payload) {
    const meetup = state.loadedMeetups.find(meetup => meetup.id === payload.id)
    if (payload.title) {
      meetup.title = payload.title
    }
    if (payload.location) {
      meetup.location = payload.location
    }
    if (payload.description) {
      meetup.description = payload.description
    }
    if (payload.imageUrl) {
      meetup.imageUrl = payload.imageUrl
    }
    if (payload.date) {
      meetup.date = payload.date
    }
  },
  [DELETE_MEETUP] (state, payload) {
    const meetups = state.loadedMeetups
    meetups.splice(meetups.findIndex(meetup => meetup === payload), 1)
  }
}
