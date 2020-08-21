export default {
  loadedMeetups (state) {
    return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date)
  },
  loadedMeetup (state) {
    return meetupId => state.loadedMeetups.find(meetUp => {
      return meetUp.id === meetupId
    })
  },
  featuredMeetups (state, getters) {
    return getters.loadedMeetups.slice(0, 5)
  }
}
