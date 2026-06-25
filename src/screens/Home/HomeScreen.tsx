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
import { AppDispatch } from '../../types';

const TAB_BAR_CLEARANCE = 90;

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

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
        <View style={styles.darkTop}>
          <TopNavBar navigation={navigation} />
          <HeroSection />
        </View>

        <SearchAndStays />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F3F8',
  },
  scroll: {
    flex: 1,
  },
  darkTop: {
    backgroundColor: '#1A0533',
    overflow: 'visible',
  },
});

export default HomeScreen;
