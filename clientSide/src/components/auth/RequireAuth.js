import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// REACT HOC to keep user authenticated after refresh
export default function(ComposedComponent) {

    class Authentication extends React.Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount() {
            if(!this.props.authenticated){
                this.context.router.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated){
                this.context.router.history.push('/');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    function mapStateToProps({auth: { authenticated }}) {
        return { authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}
