import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import BottomTabNavigator from '../screens/BottomTab/BottomTabNavigator';
import TrendingScreen from '../screens/Trending/TrendingScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import PaymentsScreen from '../screens/Profile/PaymentsScreen';
import ReviewsScreen from '../screens/Profile/ReviewsScreen';
import SupportScreen from '../screens/Profile/SupportScreen';
import { HomeProvider } from '../redux/context/HomeContext';
import AccountSettings from '../screens/Profile/AccountSettings';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <HomeProvider>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Trending"
          component={TrendingScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </HomeProvider>
  );
};

export default AppNavigator;