import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MineBox from './MineBox';

const MineBoxSetHorizontal = (props) => {
    return (
        <View style={styles.main}>
            <FlatList
                data={props.numberList}
                keyExtractor={(item) => item + ""}
                renderItem={({ item }) => <View style={styles.minebox} key={item}><MineBox number={item} /></View>}
                horizontal={true}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
    },
    minebox: {
        borderBottomWidth: 2,
        borderColor: '#aaa'
    }
});

export default MineBoxSetHorizontal;