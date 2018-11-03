import { SET_SHOW_INTRO } from '../actions'

export default function showIntro (state = 'n', action) {
  switch (action.type) {
    case SET_SHOW_INTRO:
      return action.state
    default:
      return state
  }
}
