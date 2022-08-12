import * as React from 'react';
import { connect } from 'react-redux';


import { NavigationContainer } from '@react-navigation/native';

import AdminNavigator from './AdminNavigator';
import UserNavigator from './UserNavigator';
import UnauthNavigator from './UnauthNavigator';
import { userActions } from '../redux';

const RootNavigator = (props) => {

    const routeSwitch = ({ loggedIn, isAdmin }) => {

        if (loggedIn && isAdmin)
            return <AdminNavigator />

        else if (loggedIn)
            return <UserNavigator />

        else
            return <UnauthNavigator />
    }
    return (
        <NavigationContainer>

            {routeSwitch(props)}

        </NavigationContainer>
    );
}

const mapStateToProps = (props) => {
    return {
        loggedIn: props.global.loggedIn,
        isAdmin: props.global.isAdmin,
        loading: props.global.loading,
    };
};

const mapDispatchToProps = {
    setLoading: userActions.loading,
    login: userActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);

