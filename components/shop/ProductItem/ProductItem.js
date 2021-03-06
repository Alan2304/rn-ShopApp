import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import styles from './styles';

import Card from '../../UI/Card/Card';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text> 
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
                </TouchableCmp>
            </View>
        </Card>
        
    )
}

export default ProductItem