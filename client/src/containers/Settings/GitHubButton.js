import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

class GitHubButton extends Component {
  render () {
    const { bufferRepos, classes } = this.props
    // TODO: make it work server-side, uncomment for development
    // let { hostname, protocol, port } = window.location
    // if (hostname === 'localhost') { port = 3001 }
    // const baseUrl = `${protocol}//${hostname}${port && ':' + port}`
    // const oauthLink = `${baseUrl}/api/oauth/start` +
    //   (bufferRepos.length ? `?repos=${JSON.stringify(bufferRepos)}` : '')
    const oauthLink = `https://beer.vfeskov.com/api/oauth/start` +
      (bufferRepos.length ? `?repos=${JSON.stringify(bufferRepos)}` : '')
    return (
      <Button href={oauthLink} raised className={classes.theButton}>
        <svg className={classes.svg} viewBox="0 0 24 24"><path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"></path></svg>
        &nbsp;Sign in with GitHub
      </Button>
    )
  }
}

export default withStyles(() => ({
  theButton: {
    marginBottom: '16px',
    backgroundColor: '#24292e',
    color: 'rgba(255, 255, 255, 0.75)',
    width: '100%'
  },
  svg: {
    fill: 'currentColor',
    width: '1em',
    height: '1em'
  }
}))(GitHubButton)