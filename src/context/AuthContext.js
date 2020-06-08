import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {AsyncStorage} from 'react-native';
import {navigate} from '../naviagtionRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'signout':
            return{token:null, errorMessage:''};
        case 'add_error':
            return{...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage:'', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage:''};
        default: return state;
    };
};
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type:'sign in', payload: token});
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
    
}
const clearErrorMessage = (dispatch) => () => {
    dispatch({type:'clear_error_message'});
}


const signup = (dispatch) =>  async ({email, password}) => {
    //make a api request to sign up with that email and password
    //if we sign up, modify our state, and say that we are authenticated
    //if signing up fails, we probably need to rflect an error messgae somewhere
    try{
        const response = await trackerApi.post('/signup', {email,password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type:'signin', payload: response.data.token});
        //navigate to main flow
        navigate('TrackList');
    } catch (err){
        console.log(err.response.data);
        dispatch({type: 'add_error', payload: 'Somthing went wrong with sign up'});
    }
};


const signin = (dispatch) => {
    return async ({email, password}) => {
        //try signin
        //handle success by updating state
        //handle failure by showing error message (somehow)
        try{
            const response = await trackerApi.post('/signin', {email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type:'signin', payload: response.data.token});
            navigate('TrackList');
        }catch(err){
            dispatch({
                type:'add_error',
                payload:'Something went wrong with sign in'
            });
        }
    };
}

const signout = (dispatch) => async () => {
        //somehow sign out
        await AsyncStorage.removeItem('token');
        dispatch({type:'signout'})
        navigate('loginFlow');
    }


export const {Provider, Context} = createDataContext(authReducer, {signin, signup, signout,clearErrorMessage,tryLocalSignin}, {token: null, errorMessage:''})