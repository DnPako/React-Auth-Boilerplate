import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    renderLinks(){
        if(this.props.authenticated) {
            return(
                // Link showing sign out
                <li className="nav-item">
                    <Link to='/signout' className="nav-link">Sign out</Link>
                </li>
            );
        }else {
            return(
                [
                    <li className="nav-item" key='signin'>
                        <Link to='/signin' className="nav-link">Sign in</Link>
                    </li>,
                    <li className="nav-item" key="signup">
                        <Link to='/signup' className="nav-link">Sign up</Link>
                    </li>
                ]
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="nav-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { authenticated: auth.authenticated };
}


export default connect(mapStateToProps)(Header);
