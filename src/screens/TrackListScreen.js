import React from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';


const TrackListScreen = ({navigation}) => {
    return (
        <>
        <Text style = {{fontSize:48}}>TrackListScreen</Text>
        <Button title="Go to Track Destail" onPress={()=>navigation.navigate('TrackDetail')}></Button>
        </>
    )
};

const styles = StyleSheet.create({});

export default TrackListScreen;