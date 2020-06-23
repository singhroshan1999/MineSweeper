import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import MineBoxSetHorizontal from '../component/MineBoxSetHorizontal';
import { Context } from '../context/MineMatrixContext';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = (props) => {
    const value = useContext(Context);
    return (
        <View style={{ flex: 1, backgroundColor: '#ccc' }}>
            <View style={styles.status}>
                <Text style={styles.statusTextTime}>{0}</Text>
                <TouchableOpacity title="Setting" onPress={() => props.navigation.navigate("setting")} >
                    <Image style={styles.setting} source={require('../../assets/setting.png')} height={64} width={64} />
                </TouchableOpacity>
                <Text style={styles.statusTextMines}>{value.state[2][2] - value.state[0]["marked"]}</Text>
            </View>
            {(value.state[0]['isMined']) ? <Text>You lost</Text> :
                (!value.state[0]['isMined'] && value.state[0]['isOver']) ? <Text>You won</Text> : null}
            <View style={{ borderWidth: 2 }}>
                <ScrollView horizontal={true}>
                    <FlatList
                        data={value.state[1]}
                        renderItem={({ item }) => <View key={item}><MineBoxSetHorizontal numberList={item} /></View>}
                        keyExtractor={(item) => item + ""}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    status: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    statusTextMines: {
        fontSize: 30,
        color: 'red'
    },
    statusTextTime: {
        fontSize: 30
    },
    setting: {
        height: 64,
        width: 64
    }
});

export default HomeScreen;