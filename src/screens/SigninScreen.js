import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import{Context} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';


const SigninScreen = () => {
    const {state, signin,clearErrorMessage} = useContext(Context)
    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            ></NavigationEvents>
            <AuthForm
                headerText="Sign In to your Account"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Sign In"
            ></AuthForm>
            <NavLink 
                routeName="Signup"
                text="Dont have an account? Sign up instead"
            ></NavLink>
        </View>
    )
};
SigninScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        marginBottom: 200
    }
});

export default SigninScreen;