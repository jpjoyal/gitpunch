import { DBUser, RepoGroup } from '../lib/interfaces'
import log from 'win-a-beer-lib/log'
const { keys } = Object

export default function groupByRepo (users: DBUser[]): RepoGroup[] {
  const byRepo = users.reduce((byRepo, { _id, email, alerted, accessToken, repos }) => {
    repos.forEach(repo => {
      byRepo[repo] = byRepo[repo] || { repo, users: [] }
      byRepo[repo].users.push({ _id, email, alerted, accessToken })
    })
    return byRepo
  }, {})
  const repos = keys(byRepo)
  log('uniqueRepos', { repos, count: repos.length })
  return repos.map(r => byRepo[r])
}
