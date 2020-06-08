import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import Map from '../components/Map'
import {requestPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location';
import '../_mockLocation';
import {Context as LocationContext} from '../context/LocationContext';


const TrackCreateScreen = () => {
    const [err, setErr] = useState(null);
    const {addLocation} = useContext(LocationContext);
    const startWatching = async () => {
        try{
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) => {
                addLocation(location);
            });
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(()=>{
        startWatching();
    },[])


    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Text h2>Create a Track</Text>
            <Map></Map>
            {err ? <Text> Please enable location services </Text>: null}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;