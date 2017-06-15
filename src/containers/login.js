import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'

import { login } from '../actions/index'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false
    }
  }

  submitForm = () => {
    this.props.login()
  }

  enableButton = () => this.setState({canSubmit: true})

  disableButton = () => this.setState({canSubmit: false})

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  render () {
    const styles = {
      paperStyle: {
        width: 300,
        margin: '0 auto'
      },
      switchStyle: {
        marginBottom: 16
      },
      submitStyle: {
        width: '90%',
        margin: '5% auto'
      },
      textInput: {
        width: '90%'
      },
      center: {
        margin: '10% 0 10% 0',
        textAlign: 'center'
      },
      title: {
        fontSize: '3em',
        fontWeight: '900',
        padding: 20,
        color: 'white'
      }
    }
    return (
      <div style={styles.center}>
        <div style={styles.title} >Pro Rim</div>
        <Paper style={styles.paperStyle} zDepth={3}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
            ref='form'
            >
            <FormsyText
              name={'user'}
              required
              floatingLabelText={'Usuário'}
              style={styles.textInput}
              />
            <FormsyText
              name={'password'}
              required
              floatingLabelText={'Senha'}
              style={styles.textInput}
              />
            <RaisedButton
              primary
              style={styles.submitStyle}
              type='submit'
              label='Entrar'
              disabled={!this.state.canSubmit}
              />
          </Formsy.Form>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    login: login
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
