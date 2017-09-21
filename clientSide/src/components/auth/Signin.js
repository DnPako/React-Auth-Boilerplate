import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router'

class Signin extends React.Component {
    renderField(field){
        const type = field.input.name === 'password' ? 'password' : 'text';
        return(
            <fieldset className="form-group">
                <label>{field.label}</label>
                <input type={type} className="form-control" {...field.input} />
            </fieldset>
        );
    }

    handleFormSubmit({ email, password }){
        this.props.signinUser({ email, password }, this.props.history);
    }

    // Dispaly error messages
    renderAler(){
        const {errorMessage} = this.props;
        if(errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Oooops!</strong>{errorMessage}
                </div>
            );
        }
    }

    render() {
        // Redux form props
        const { handleSubmit, fields: {email, password} } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    label="Email"
                    name="email"
                    component={this.renderField}
                />

                <Field
                    label="Password"
                    name="password"
                    component={this.renderField}
                />
            {this.renderAler()}
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

// You can find more validations implemented on the Signup component
const signinForm = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin);
export default withRouter(connect(mapStateToProps, actions)(signinForm));
