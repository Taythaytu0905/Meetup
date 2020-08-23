import { CREATE_MEETUP } from '../mutation-types'

export default {
  [CREATE_MEETUP] (state, payload) {
    state.loadedMeetups.push(payload)
  }
}
