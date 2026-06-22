import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, SlidersHorizontal, Search, Users } from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';
import SearchTrendingStyles from '../../components/SearchTrending/SearchTrendingStyles';

// Reuse the exact same data and hotel card component used on SearchScreen
// so both screens are pixel-identical to the reference design.
import { HOTELS, HotelCard } from '../Search/SearchScreen';

const TrendingScreen = ({ navigation }) => {
  const { setSelectedTab } = useHomeContext();

  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  // Sync the HeroSection tab highlight when this screen mounts
  useEffect(() => {
    setSelectedTab('Trending');
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      <TopNavBar navigation={navigation} />

      {/* ══ SCROLL BODY ═════════════════════════ */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Search form ── */}
        <View style={styles.formCardWrap}>
          <View style={styles.formCard}>
            <Text style={styles.modifyLabel}>MODIFY SEARCH</Text>
            <View style={styles.divider} />

            {/* Row 1: Destination  |  Guests & Rooms */}
            <View style={styles.formRow}>
              <View style={[styles.fieldWrap, { flex: 1.15, marginRight: 8 }]}>
                <Text style={styles.fieldLbl}>Destination</Text>
                <View style={styles.fieldBox}>
                  <Search size={13} color="#7C3AED" strokeWidth={2.2} />
                  <TextInput
                    style={styles.fieldInp}
                    placeholder="Search destination (min 3 letters)"
                    placeholderTextColor="#9CA3AF"
                    value={destination}
                    onChangeText={setDestination}
                  />
                </View>
              </View>
              <View style={[styles.fieldWrap, { flex: 1 }]}>
                <Text style={styles.fieldLbl}>Guests & Rooms</Text>
                <View style={styles.fieldBox}>
                  <Users size={13} color="#7C3AED" strokeWidth={2.2} />
                  <View>
                    <Text style={styles.fieldMainTxt}>2 Guest(s)</Text>
                    <Text style={styles.fieldSubTxt}>1 Room(s)</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Row 2: Check-in/out (full width) */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLbl}>Check-in & Check-out</Text>
              <View style={styles.fieldBox}>
                <Calendar size={13} color="#7C3AED" strokeWidth={2.2} />
                <TextInput
                  style={styles.fieldInp}
                  placeholder="Check-in - Check-out dates"
                  placeholderTextColor="#9CA3AF"
                  value={dates}
                  onChangeText={setDates}
                />
              </View>
            </View>

            {/* Update Results button */}
            <TouchableOpacity
              style={styles.updateBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.updateBtnTxt}>Update Results</Text>
            </TouchableOpacity>
          </View>

          {/* ── Floating purple circle (bottom-right, overlaps card) ── */}
          <View style={styles.fab}>
            <SlidersHorizontal size={18} color="#fff" strokeWidth={2.4} />
          </View>
        </View>

        {/* ── Hotel cards (same data + card design as SearchScreen) ── */}
        <View style={styles.listWrap}>
          {HOTELS.map(h => (
            <HotelCard key={h.id} hotel={h} navigation={navigation} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = SearchTrendingStyles;

export default TrendingScreen;