import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import BottomTabNavigator from '../screens/BottomTab/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        {/* Splash screen - shown on app launch, navigates to Bottom after delay */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Bottom Tab Navigator - wraps Home, Bookings, Offers, Profile */}
        <Stack.Screen name="Bottom" component={BottomTabNavigator} />

        {/* Uncomment below screens when ready:

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
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;