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
        // Allow the negatively-margined search card to render above its
        // natural position without being clipped by the scroll container.
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_CLEARANCE,
        }}
      >
        {/*
          darkTop: contains the navbar and hero. The dark background extends
          a little beyond the hero so the overlapping search card still sits
          against a dark surface visually.
        */}
        <View style={styles.darkTop}>
          <TopNavBar navigation={navigation} />
          <HeroSection />
        </View>

        {/*
          SearchAndStays pulls itself up via negative marginTop on its inner
          searchCard, overlapping the hero below the gradient. zIndex on the
          card ensures it renders above the darkTop layer.
        */}
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
    // Let the search card (which has a negative marginTop) overlap this view
    // without being clipped.
    overflow: 'visible',
  },
});

export default HomeScreen;