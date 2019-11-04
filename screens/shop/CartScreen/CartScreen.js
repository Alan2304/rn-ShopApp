import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';
import Colors from '../../../constants/Colors';

import CartItem from '../../../components/shop/CartItem/CartItem';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCarItems = [];
        for (const key in state.cart.items) {
            transformedCarItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCarItems;
    });
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    title="Order Now" 
                    color={Colors.accent} 
                    disabled={cartItems.length === 0}/>
            </View>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={({item}) => <CartItem 
                                            quantity={item.quantity}
                                            title={item.productTitle} 
                                            amount={item.sum} 
                                            onRemove={() => {}} />} />
        </View>
    )
}

export default CartScreen;