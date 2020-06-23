import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Vibration, TouchableWithoutFeedback } from 'react-native';
import { Context } from '../context/MineMatrixContext';

const areEqual = (prev, next) => {
    let f = (prev.number[0] === next.number[0] ||
        prev.number[1] === next.number[1] ||
        prev.number[2] === next.number[2] ||
        prev.number[3] === next.number[3])
    if (!f) console.log(next);
    return (prev.number[0] === next.number[0] ||
        prev.number[1] === next.number[1] ||
        prev.number[2] === next.number[2] ||
        prev.number[3] === next.number[3]);
}

const MineBox = (props) => {
    const value = useContext(Context);
    const styles = StyleSheet.create({
        main: {
            borderLeftWidth: 2,
            borderColor: '#aaa'
        },
        text: {
            borderColor: 'red',
            textAlign: 'center',
        },
        text2: {
            borderColor: 'red',
            textAlign: 'center',
            opacity: 0.0
        },
        image: {
            height: value.state[2][4],
            width: value.state[2][4],
        }
    });
    const press = () => {
        if (props.number[1] === 1) return;
        if (!value.state[0]["isMoved"]) {
            value.firstMove(props.number);
            value.setMoved();
        } else {
            if (props.number[0] === -2) {
                value.setMined(props.number);
            } else {
                value.unCover(props.number);
            }
        }
    }
    const longPress = () => {
        Vibration.vibrate(50);
        if (!value.state[0]["isMoved"]) {
            value.firstMove(props.number);
            value.setMoved();
        }
        value.markMines(props.number)
    }
    return (
        <View style={styles.main}>
            {(props.number[1] < 2 && !value.state[0]['isOver']) ? (
                <TouchableWithoutFeedback onPress={press}
                    onLongPress={longPress}
                >
                    <Image style={styles.image} source={(props.number[1] === 0) ? require('../../assets/bevel.png') : require('../../assets/bevel_flaged.png')} height={value.state[2][4]} width={value.state[2][4]} />
                </TouchableWithoutFeedback>)
                : (
                    (props.number[0] === 0) ? <Image style={styles.image} source={require('../../assets/0.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                        (props.number[0] === 1) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/1.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                            (props.number[0] === 2) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/2.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                (props.number[0] === 3) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/3.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                    (props.number[0] === 4) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/4.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                        (props.number[0] === 5) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/5.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                            (props.number[0] === 6) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/6.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                                (props.number[0] === 7) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/7.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                                    (props.number[0] === 8) ? <Image style={styles.image} source={(value.state[0]["isOver"] && props.number[1] === 1) ? require('../../assets/bevel_flaged_cross.png') : require('../../assets/8.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                                        (props.number[0] === -2) ? <Image style={styles.image} source={(value.state[0]["minedAt"][0] === props.number[2] && value.state[0]["minedAt"][1] === props.number[3]) ? require('../../assets/mineon.png') : require('../../assets/mineoff.png')} height={value.state[2][4]} width={value.state[2][4]} /> :
                                                            <Image style={styles.image} source={require('../../assets/0.png')} height={value.state[2][4]} width={value.state[2][4]} />
                )}


        </View>
    );
};



export default React.memo(MineBox, areEqual);