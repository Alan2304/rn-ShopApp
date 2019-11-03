import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector( state => 
        state.products.availableProduct.find(prod => prod.id === productId) 
    );

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button 
                    color={Colors.primary} 
                    title='Add to Cart' 
                    onPress={() => {}} />
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