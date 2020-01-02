import React, { useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import Colors from '../../../constants/Colors';

import CartItem from '../../../components/shop/CartItem/CartItem';
import Card from '../../../components/UI/Card/Card';

import * as cartActions from '../../../store/actions/cart';
import * as ordersActions from '../../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
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
        return transformedCarItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primary} />
                ) : ( 
                <Button 
                    title="Order Now" 
                    color={Colors.accent} 
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler} /> )}
            </Card>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={({item}) => (<CartItem 
                                            quantity={item.quantity}
                                            title={item.productTitle} 
                                            amount={item.sum}
                                            deletable
                                            onRemove={() => {
                                                dispatch(cartActions.removeFromCart(item.productId));
                                            }} 
                                        />
                                    )} 
                                />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

export default CartScreen;