import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import ShowSnackBar from './snackbar';

const Loader=()=>(
    <View style={styles.container}>
        <ActivityIndicator size={90} animating={true} color="blue" />
        {/* <ShowSnackBar /> */}
    </View>
);
export default Loader;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    }
})