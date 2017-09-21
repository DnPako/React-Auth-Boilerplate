import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router'

// Field level validation
const required = value => (value ? undefined : 'Required');
const emailSyntax = value =>
                                value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                                ? 'Invalid email address'
                                : undefined;

class Signup extends React.Component {
    renderField({ input, label, meta: { touched, error } }){
        const type = field.input.name === 'password' ? 'password' : 'text';
        return(
            <fieldset className="form-group">
                <label>{label}</label>
                <input type={type} className="form-control" {...input} />
                {touched && error && <div className="error">
                    {error}
                </div>}

            </fieldset>
        );
    }

    handleFormSubmit({ email, password }){
        this.props.signupUser({email, password}, this.props.history);
    }

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
        const { handleSubmit, fields: {email, password, passwordConfirm} } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    label="Email"
                    name="email"
                    component={this.renderField}
                    validate={[required, emailSyntax]}
                />

                <Field
                    label="Password"
                    name="password"
                    component={this.renderField}
                    validate={required}
                />

                <Field
                    label="Confirm Password"
                    name="passwordConfirm"
                    component={this.renderField}
                    validate={required}
                />
            {this.renderAler()}
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}

function validate(formProps) {
    const errors = {};

    if (formProps.password != formProps.passwordConfirm) {
        errors.password = 'Password must match';
    }

    return errors;
}

function mapStateToProps({auth: {error}}) {
    return {errorMessage: error};
}

const signupForm = reduxForm({
    form: 'signup',
    fields: [
        'email', 'password', 'passwordConfirm'
    ],
    validate
})(Signup);

export default withRouter(connect(mapStateToProps, actions)(signupForm));
