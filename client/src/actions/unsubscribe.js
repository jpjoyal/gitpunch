export const requestUnsubscribe = () => ({
  type: 'REQUEST_UNSUBSCRIBE'
})

export const receiveUnsubscribe = ({ payloadEmail, currentEmail }) => ({
  type: 'RECEIVE_UNSUBSCRIBE',
  payloadEmail,
  currentEmail
})

export const errorUnsubscribe = error => ({
  type: 'ERROR_UNSUBSCRIBE',
  error
})

export function unsubscribe (currentEmail, lambdajwt) {
  const payloadEmail = getPayloadEmail(lambdajwt)
  return dispatch => {
    if (!payloadEmail) { return }
    dispatch(requestUnsubscribe())
    return fetch('/api/unsubscribe', {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lambdajwt })
    })
      .then(response => {
        if (response.status === 200) { return response.json() }
        const error = new Error(response.statusText)
        error.status = response.status
        throw error
      })
      .then(
        () => dispatch(receiveUnsubscribe({ payloadEmail, currentEmail })),
        error => dispatch(errorUnsubscribe(error))
      )
  }
}

function getPayloadEmail (lambdajwt) {
  const payload = (lambdajwt.match(/^[^\.]+\.([^\.]+)\./) || [0, 0])[1]
  if (!payload) { return '' }
  try {
    return JSON.parse(atob(payload)).email
  } catch (e) {
    return ''
  }
}
