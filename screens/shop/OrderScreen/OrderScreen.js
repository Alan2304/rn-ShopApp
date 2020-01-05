import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Text, Platform, ActivityIndicator, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './styles';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import OrderItem from '../../../components/shop/OrderItem/OrderItem';
import * as ordersActions from '../../../store/actions/orders';
import Colors from '../../../constants/Colors';

const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback( async () => {
        setIsLoading(true);
        try {
            await dispatch(ordersActions.fetchOrders());
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading])

    useEffect(() => {
        loadOrders();
    }, [dispatch, loadOrders]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No orders found, maybe start ordering some products?</Text>
            </View>
        )
    }

    return <FlatList 
            data={orders} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => {
                return (
                    <OrderItem 
                        amount={item.totalAmount} 
                        date={item.readableDate}
                        items ={item.items}/>
                )
            }} />
};

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item  
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>,
    }
};

export default OrderScreen;