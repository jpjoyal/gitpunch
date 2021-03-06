import { ActionableUser } from './interfaces'
import { fetchAtom, trackFetchErrors } from 'gitpunch-lib/githubAtom'
import { SEND_EMAIL_AND_UPDATE_ALERTED } from './constants'

export default async function fetchReleaseNotes (users: ActionableUser[]) {
  const repos = users.map(u => u.actionableRepos[SEND_EMAIL_AND_UPDATE_ALERTED])
  const reposToFetch = [...new Set(
    repos.reduce(
      (res, userRepos) => [
        ...res,
        ...userRepos.filter(r => r.tags.length).map(r => r.repo)
      ],
      [] as string[]
    )
  )]

  const errors = trackFetchErrors()
  const notesArray = await Promise.all(
    reposToFetch.map(async repo => {
      try {
        const url = `https://github.com/${repo}/releases.atom`
        const releases = await fetchAtom(url, true)
        const map = releases.reduce((res, { name, entry }) => ({ ...res, [name]: entry }), {})
        return { repo, releases: map }
      } catch (error) {
        errors.push(repo, error)
        return null
      }
    })
  )
  errors.log('fetchReleaseNotesErrors')

  const notes = notesArray
    .filter(Boolean)
    .reduce((res, { repo, releases }) => ({ ...res, [repo]: releases }), {})

  repos.forEach(userRepos =>
    userRepos.forEach(({ repo, tags }) =>
      notes[repo] && tags.forEach(tag =>
        tag.entry = notes[repo][tag.name] || ''
      )
    )
  )
  return users
}
