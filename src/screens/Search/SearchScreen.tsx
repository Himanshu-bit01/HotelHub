import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Users,
  Calendar,
  SlidersHorizontal,
} from 'lucide-react-native';

import { useAppDispatch } from '../../redux/hooks';
import {setSelectedTab} from '../../redux/store/slices/homeSlice';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import { BottomTabBar } from '../BottomTab/BottomTabNavigator';
import SearchTrendingStyles from '../../components/SearchTrending/SearchTrendingStyles';
import { HOTELS } from './hotelConstants';
import { HotelCard } from './hotelData';

type SearchScreenProps = {
  navigation: any;
};

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const dispatch  = useAppDispatch();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');

  useEffect(() => {
    dispatch(setSelectedTab('Search'));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TopNavBar navigation={navigation} theme="light" />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCardWrap}>
          <View style={styles.formCard}>
            <Text style={styles.modifyLabel}>MODIFY SEARCH</Text>
            <View style={styles.divider} />

            <View style={styles.formRow}>
              <View style={[styles.fieldWrap, { flex: 1.4, marginRight: 8 }]}>
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

            <View style={styles.checkinRow}>
              <View style={[styles.fieldWrap, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.fieldLbl}>Check-in & Check-out</Text>
                <View style={styles.fieldBox}>
                  <Calendar size={13} color="#7C3AED" strokeWidth={2.2} />
                  <TextInput
                    style={styles.fieldInp}
                    placeholder="Check-in and check-out dates"
                    placeholderTextColor="#9CA3AF"
                    value={dates}
                    onChangeText={setDates}
                  />
                </View>
              </View>
              <Pressable style={styles.updateBtn}>
                <Text style={styles.updateBtnTxt}>Update Results</Text>
              </Pressable>
            </View>
          </View>
        </View>

          <Pressable
  style={styles.fab}
  onPress={() => navigation.navigate('FilterScreen')}
>
  <SlidersHorizontal size={18} color="#fff" strokeWidth={2.4} />
</Pressable>
        </View>

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

export default SearchScreen;
