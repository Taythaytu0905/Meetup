import { SET_LOADING, SET_ERROR, CLEAR_ERROR } from '../mutation-types'

export default {
  [SET_LOADING] (state, payload) {
    state.loading = payload
  },
  [SET_ERROR] (state, payload) {
    state.error = payload
  },
  [CLEAR_ERROR] (state) {
    state.error = null
  }
}
