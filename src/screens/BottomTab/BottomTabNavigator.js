import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Home, Briefcase, Tag, User } from 'lucide-react-native';

// Import tab screens
import HomeScreen    from '../Home/HomeScreen';
import BookingScreen from '../Booking/BookingScreen';
import OfferScreen   from '../Offer/OfferScreen';  
import ProfileScreen from '../Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// Colors used by the tab bar
const ACTIVE_COLOR     = '#7C3AED';
const INACTIVE_COLOR   = '#18181B';
const ACTIVE_PILL_BG   = '#fdfcfd';
const BORDER_COLOR     = '#d779fa';

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        // ── Hide the native header on every tab screen ──────────────────
        headerShown: false,

        // ── Tab bar appearance ──────────────────────────────────────────
        tabBarShowLabel: true,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,

        // ── Icons ───────────────────────────────────────────────────────
        tabBarIcon: ({ focused, color }) => {
          const size        = 22;
          const strokeWidth = focused ? 2.2 : 1.8;

          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = Home;
              break;
            case 'Bookings':
              IconComponent = Briefcase;
              break;
            case 'Offers':
              IconComponent = Tag;
              break;
            case 'Profile':
              IconComponent = User;
              break;
            default:
              return null;
          }

          return (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
            </View>
          );
        },

        // ── Label ───────────────────────────────────────────────────────
        tabBarLabel: ({ focused, color, children }) => (
          <Text
            style={[
              styles.labelText,
              { color },
              focused && styles.labelTextActive,
            ]}
          >
            {children}
          </Text>
        ),
      })}
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
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // Elevation (Android)
    elevation: 8,
  },
  tabItem: {
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

export default BottomTabNavigator;