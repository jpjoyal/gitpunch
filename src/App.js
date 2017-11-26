import React, { Component } from 'react'
import { Repos, Settings, RepoAdd } from './containers'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'

class AppComponent extends Component {
  render () {
    const { classes, inited } = this.props
    return (
      <div className={classes.app}>
        {inited ? (
        <div>
          <RepoAdd className={classes.sectionContainer} />
          <div className={classes.container}>
            <Repos className={classes.sectionContainer} />
            <Settings className={classes.sectionContainer} />
          </div>
        </div>
        ) : (
        <div className={classes.progressContainer}>
          <Typography type="headline">Win A Beer</Typography>
          <CircularProgress />
        </div>
        )}
      </div>
    )
  }

  componentDidMount () {
    this.props.fetchUserData()
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  inited: PropTypes.bool.isRequired
}

const styles = theme => ({
  app: {
    height: '100%',
    maxWidth: '800px',
    margin: '0 auto'
  },
  container: {
    display: 'flex'
  },
  sectionContainer: {
    padding: '20px',
    margin: '10px'
  },
  progressContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
})

const AppComponentWithStyles = withStyles(styles)(AppComponent)

export const App = connect(
  state => ({ inited: state.inited }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AppComponentWithStyles)
