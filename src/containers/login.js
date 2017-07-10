import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'
import Snackbar from 'material-ui/Snackbar'

import { selectAuthToken, selectFormData } from '../actions/index'

import FormFields from '../components/row_form_fields'

import { loginForm } from '../assets/login'
import { loginUrl } from '../assets/urls'
import { post } from '../assets/api_calls'
import { errorLogin } from '../assets/strings'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      messageOpen: false
    }
  }

  enableButton = () => this.setState({canSubmit: true})

  disableButton = () => this.setState({canSubmit: false})

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  handleLoginResponse = (response) => {
    if (response.data.key) {
      this.props.selectAuthToken(response.data.key)
      localStorage.setItem('prorimToken', response.data.key)
    }
  }

  errorLogin = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        this.setState({messageOpen: true})
      }
    } else if (error.request) {
      alert(error)
    }
  }

  handleLogin = () => {
    const { formData } = this.props
    post(loginUrl, formData, this.handleLoginResponse, this.errorLogin)
  }

  componentWillUnmount = () => this.props.selectFormData(null)

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
      inputs: {
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
            ref='form'
            onKeyPress={event => {
              if (event.key === 'Enter' && this.state.canSubmit) {
                this.handleLogin()
              }
            }}
          >
            <span style={styles.inputs}>
              <FormFields
                fields={loginForm}
              />
            </span>
            <RaisedButton
              primary
              style={styles.submitStyle}
              type='submit'
              label='Entrar'
              onTouchTap={this.handleLogin}
              disabled={!this.state.canSubmit}
              />
          </Formsy.Form>
        </Paper>
        <Snackbar
          open={this.state.messageOpen}
          message={errorLogin}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({messageOpen: false})}
        />
      </div>
    )
  }
}

Login.propTypes = {
  // redux state
  formData: PropTypes.object,
  // redux actions
  selectAuthToken: PropTypes.func.isRequired,
  selectFormData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    formData: state.formData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAuthToken,
    selectFormData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
