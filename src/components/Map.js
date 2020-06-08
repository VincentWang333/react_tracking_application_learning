import React , {useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext';

const Map = () => {
    const {state:{currentLocation}} = useContext(LocationContext);
    if(!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop:200}}></ActivityIndicator>;
    }

    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}>
        </MapView>)
};

const styles = StyleSheet.create({
    map:{
        height:300
    }
});

export default Map;
