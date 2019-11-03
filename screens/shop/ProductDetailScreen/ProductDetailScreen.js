import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../../constants/Colors';

import * as cartActions from '../../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector( state => 
        state.products.availableProduct.find(prod => prod.id === productId) 
    );

    const dispatch = useDispatch(); 

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button 
                    color={Colors.primary} 
                    title='Add to Cart' 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

export default ProductDetailScreen;