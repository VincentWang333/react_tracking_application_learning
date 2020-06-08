import React, {useContext} from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-native';

const AccountScreen = () => {
    const {signout} = useContext(AuthContext);
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <Text style={{fontSize:32}}>Account</Text>
            <Spacer>
            <Button  title='Sign Out' onPress={signout}></Button>
            </Spacer>
        </SafeAreaView>)
};


export default AccountScreen;