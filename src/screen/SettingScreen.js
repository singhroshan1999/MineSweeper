import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Context } from '../context/MineMatrixContext';
import { Slider } from 'react-native'

const SettingScreen = (props) => {

    const value = useContext(Context);
    const [height, setHeight] = useState(value.state[2][0]);
    const [width, setWidth] = useState(value.state[2][1]);
    const [mines, setMines] = useState(value.state[2][2]);
    const [tileSize, setTileSize] = useState(value.state[2][4]);
    return (
        <View>
            <Text>{height}X{width} {mines}</Text>
            <Slider minimumValue={1} maximumValue={100} value={height} step={1} onValueChange={(val) => setHeight(val)} />
            <Slider minimumValue={1} maximumValue={100} value={width} step={1} onValueChange={(val) => setWidth(val)} />
            <Slider minimumValue={1} maximumValue={height * width - 1} value={mines} step={1} onValueChange={(val) => setMines(val)} />
            <Slider minimumValue={1} maximumValue={100} value={tileSize} step={1} onValueChange={(val) => setTileSize(val)} />
            <Button title="Submit" onPress={() => {
                value.configMatrix([height, width, mines, [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], tileSize]);
                value.reInit();
                props.navigation.navigate('home');
            }
            }
            />
        </View>
    );
}

const styles = StyleSheet.create({});

export default SettingScreen;