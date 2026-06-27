import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Home, Briefcase, Tag, User } from 'lucide-react-native';

import HomeScreen    from '../Home/HomeScreen';
import BookingScreen from '../Booking/BookingScreen';
import OfferScreen   from '../Offer/OfferScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import { BottomTabParamList } from '../../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const ACTIVE_COLOR   = '#7C3AED';
const INACTIVE_COLOR = '#18181B';
const ACTIVE_PILL_BG = '#fdfcfd';
const BORDER_COLOR   = '#d779fa';

const TABS = [
  { name: 'Home' as const, label: 'Home', Icon: Home },
  { name: 'Bookings' as const, label: 'Bookings', Icon: Briefcase },
  { name: 'Offers' as const, label: 'Offers', Icon: Tag },
  { name: 'Profile' as const, label: 'Profile', Icon: User },
];

const BottomTabBar = ({ activeTab, navigation, state }: any) => {
  const currentIndex = state ? state.index : null;

  const getActiveName = () => {
    if (state) {
      return TABS[currentIndex!]?.name;
    }
    return activeTab;
  };
  const activeName = getActiveName();

  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const focused = activeName === tab.name;
        const color = focused ? ACTIVE_COLOR : INACTIVE_COLOR;
        return (
          <Pressable
            key={tab.name}
            style={styles.tabItem}
            onPress={() => {
              if (state) {
                navigation.navigate(tab.name);
              } else {
                navigation.navigate('Bottom', { screen: tab.name });
              }
            }}
          >
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <tab.Icon size={22} color={color} strokeWidth={focused ? 2.2 : 1.8} />
            </View>
            <Text style={[styles.labelText, { color }, focused && styles.labelTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const MemoizedBottomTabBar = React.memo(BottomTabBar);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MemoizedBottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"     component={HomeScreen}    />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Offers"   component={OfferScreen}   />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BORDER_COLOR,
    marginHorizontal: 12,
    marginBottom: Platform.OS === 'ios' ? 24 : 12,
    height: Platform.OS === 'ios' ? 80 : 70,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 16 : 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  iconWrapper: {
    width: 44,
    height: 32,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: ACTIVE_PILL_BG,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  labelTextActive: {
    fontWeight: '700',
  },
});

export { BottomTabBar };
export default BottomTabNavigator;
