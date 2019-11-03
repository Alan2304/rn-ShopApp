import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector( state => 
        state.products.availableProduct.find(prod => prod.id === productId) 
    );

    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

export default ProductDetailScreen;