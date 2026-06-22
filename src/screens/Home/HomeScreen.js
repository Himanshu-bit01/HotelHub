import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import TopNavBar from '../../components/Home-Screen/Topnavbar';
import SearchAndStays from '../../components/Home-Screen/SearchAndStays';
import HeroSection from '../../components/Home-Screen/HeroSection';
import { fetchHomeData } from '../../redux/store/slices/HotelSlice';

const TAB_BAR_CLEARANCE = 90;

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_CLEARANCE,
        }}
      >
        <TopNavBar navigation={navigation} />
        <HeroSection />
        <SearchAndStays />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scroll: {
    flex: 1,
  },
});

export default HomeScreen;