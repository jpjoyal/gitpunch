import { createRepoAddContainer } from './container'
import { createReducer } from './reducer'
import { createActions } from './actions'

export function createModule (
  stateNamespace = '',
  actionPrefix = ''
) {
  const lens = stateNamespace ? state => state[stateNamespace] : state => state
  const actions = createActions(actionPrefix)
  const RepoAdd = createRepoAddContainer(lens, actions)

  const reducer = createReducer(actionPrefix)
  const reducerConfig = stateNamespace ? { [stateNamespace]: reducer } : reducer

  return {
    RepoAdd,
    reducerConfig
  }
}