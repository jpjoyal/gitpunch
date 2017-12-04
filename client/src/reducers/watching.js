export function watching (state = false, action) {
  switch (action.type) {
    case 'RECEIVE_WATCHING':
      return action.json.watching
    case 'RECEIVE_REGISTER':
    case 'RECEIVE_LOGIN':
    case 'RECEIVE_PROFILE':
      return action.profile.watching
    case 'RECEIVE_LOGOUT':
      return false
    case 'RECEIVE_UNSUBSCRIBE':
      return action.payloadEmail === action.currentEmail ? false : state
    default:
      return state
  }
}
