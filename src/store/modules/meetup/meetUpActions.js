import { CREATE_MEETUP } from '../mutation-types'

export default {
  createMeetup ({ commit }, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date,
      id: Math.random()
    }
    commit(CREATE_MEETUP, meetup)
  }
}
