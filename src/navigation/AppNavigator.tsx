import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import BottomTabNavigator from '../screens/BottomTab/BottomTabNavigator';
import TrendingScreen from '../screens/Trending/TrendingScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import PaymentsScreen from '../screens/Profile/QuickActions/PaymentsScreen';
import ReviewsScreen from '../screens/Profile/QuickActions/ReviewsScreen';
import SupportScreen from '../screens/Profile/QuickActions/SupportScreen';
import AccountSettings from '../screens/Profile/QuickActions/AccountSettings';
import PropertyDetailsScreen from '../screens/PropertyDetails/PropertyDetailsScreen';
import RoomSelectionScreen from '../screens/RoomSelection/RoomSelectionScreen';
import GuestDetailsScreen from '../screens/GuestDetails/GuestDetailsScreen';
import CheckoutPaymentScreen from '../screens/CheckoutPayment/CheckoutPaymentScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmation/BookingConfirmationScreen';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import DiscoveryScreen from '../screens/Discovery/DiscoveryScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import InfoPageScreen from '../screens/InfoPages/InfoPageScreen';
import FAQsScreen from '../screens/FAQs/FAQsScreen';
import { RootStackParamList } from '../types';
import FilterScreen from '../screens/Search/FilterScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 150,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="Trending"
          component={TrendingScreen}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="Payments"
          component={PaymentsScreen}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
        />
        <Stack.Screen
          name="RoomSelection"
          component={RoomSelectionScreen}
        />
        <Stack.Screen
          name="GuestDetails"
          component={GuestDetailsScreen}
        />
        <Stack.Screen
          name="CheckoutPayment"
          component={CheckoutPaymentScreen}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="Discovery"
          component={DiscoveryScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />
        <Stack.Screen
          name="InfoPage"
          component={InfoPageScreen}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQsScreen}
        />
        <Stack.Screen
          name="FilterScreen"
          component={FilterScreen}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
};
export default AppNavigator;
