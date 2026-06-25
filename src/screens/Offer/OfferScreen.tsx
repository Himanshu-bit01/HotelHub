import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  Search,
  TrendingUp,
  Compass,
  MapPin,
  Star,
  Info,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HomeProvider, useHomeContext } from '../../redux/context/HomeContext';
import HotelHubHeader from '../../components/HotelHubHeader/HotelHubHeader';
import {
  fetchHomeData,
  selectFeaturedHotels,
  selectHotelsLoading,
  selectHotelsError,
} from '../../redux/store/slices/HotelSlice';
import { AppDispatch, FeaturedHotel, CouponItem, RootStackParamList } from '../../types';


const COUPONS: CouponItem[] = [
  {
    id: 1,
    save: 'Save',
    percent: '15%',
    label: 'Code:',
    code: 'SUMMER15',
    bg: '#FFBFD6',
    accent: '#F87BAC',
    decorColor: '#F472A8',
  },
  {
    id: 2,
    save: 'Save',
    percent: '20%',
    label: 'Code:',
    code: 'BEACH20',
    bg: '#F9A8D4',
    accent: '#EC4899',
    decorColor: '#DB2777',
  },
  {
    id: 3,
    save: 'Save',
    percent: '25%',
    label: 'Code:',
    code: 'LUXURY25',
    bg: '#F472B6',
    accent: '#DB2777',
    decorColor: '#BE185D',
  },
];

const CouponCard = ({ item }: { item: CouponItem }) => (
  <View style={[styles.couponCard, { backgroundColor: item.bg }]}>
    <View style={[styles.couponCircle1, { backgroundColor: item.decorColor }]} />
    <View style={[styles.couponCircle2, { backgroundColor: item.accent }]} />
    <Text style={styles.couponSave}>{item.save}</Text>
    <Text style={styles.couponPercent}>{item.percent}</Text>
    <Text style={styles.couponLabel}>{item.label}</Text>
    <Text style={styles.couponCode}>{item.code}</Text>
  </View>
);

const HighlightCard = ({ item }: { item: FeaturedHotel }) => (
  <View style={styles.hlCard}>
    <View style={[styles.hlImg, { backgroundColor: item.imgColor }]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { top: '50%', backgroundColor: item.imgColor2, borderBottomLeftRadius: 10 },
        ]}
      />
      <View style={[styles.hlBadge, { backgroundColor: item.badgeColor }]}>
        <Text style={styles.hlBadgeText}>{item.badge}</Text>
      </View>
    </View>

    <View style={styles.hlInfo}>
      <View style={styles.hlRatingPill}>
        <Star size={9} color="#F59E0B" fill="#F59E0B" strokeWidth={1.5} />
        <Text style={styles.hlRatingNum}> {item.rating}</Text>
      </View>
      <Text style={styles.hlName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.hlSub} numberOfLines={1}>{item.sub}</Text>
      <View style={styles.hlLocationRow}>
        <MapPin size={9} color="#7C3AED" strokeWidth={2.5} />
        <Text style={styles.hlLocationTxt}> {item.location}</Text>
      </View>
      <View style={styles.hlOffRow}>
        <Text style={styles.hlOff}>{item.off}</Text>
      </View>
      <View style={styles.hlPriceRow}>
        <Text style={styles.hlPrice}>{item.price}</Text>
      </View>
    </View>
  </View>
);

const OffersScreenContent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedTab, setSelectedTab } = useHomeContext();
  const dispatch = useDispatch<AppDispatch>();

  const featuredHotels = useSelector(selectFeaturedHotels);
  const loading = useSelector(selectHotelsLoading);
  const error = useSelector(selectHotelsError);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const NAV_TABS = [
    { id: 'Search', Icon: Search },
    { id: 'Trending', Icon: TrendingUp },
    { id: 'Explore', Icon: Compass },
  ];

  return (
    <SafeAreaView style={styles.safe}
    edges={['left', 'right', 'bottom']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A0533"/>

      <HotelHubHeader
        theme="dark"
        rightIcons={
          <>
            <TouchableOpacity style={styles.hBtn}>
              <Heart size={20} color="#000000" strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuSquare}>
              <Info size={20} color="#000000" strokeWidth={1.8} />
            </TouchableOpacity>
          </>
        }
      />

      <View style={styles.navTabOuter}>
        <View style={styles.navTabBar}>
          {NAV_TABS.map(({ id, Icon }) => {
            const active = selectedTab === id;
            return (
              <TouchableOpacity
                key={id}
                style={[styles.navTab, active && styles.navTabActive]}
                onPress={() => {
                  if (id === 'Search') {
                    setSelectedTab(id);
                    navigation.navigate('Search');
                  } else if (id === 'Trending') {
                    navigation.navigate('Trending');
                  } else if (id === 'Explore') {
                    navigation.navigate('Explore');
                  }
                }}
                activeOpacity={0.8}
              >
                <Icon size={11} color={active ? '#fff' : 'rgba(255,255,255,0.55)'} strokeWidth={active ? 2 : 1.8} />
                <Text style={[styles.navTabTxt, active && styles.navTabTxtActive]}>{'  '}{id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.offersTitleWrap}>
          <Text style={styles.offersTitle}>OFFERS</Text>
          <Text style={styles.offersSub}>Offers curated just for you</Text>
          <Text style={styles.offersSubSmall}>Unbeatable deals on your favorite destinations</Text>
        </View>

        <View style={styles.couponsRow}>
          {COUPONS.map(c => <CouponCard key={c.id} item={c} />)}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spring to highlights</Text>
          <Text style={styles.sectionSub}>Discover properties guests love</Text>
        </View>

        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="small" color="#7C3AED" />
          </View>
        )}

        {!loading && error && (
          <View style={styles.stateBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.hlList}>
            {featuredHotels.map(h => <HighlightCard key={h.id} item={h} />)}
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const OffersScreen = () => {
  return (
    <HomeProvider>
      <OffersScreenContent />
    </HomeProvider>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  menuSquare: {
    width: 28, height: 28, backgroundColor: '#7C3AED',
    borderRadius: 6, justifyContent: 'center', alignItems: 'center',
  },
  redDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  navTabOuter: {
    backgroundColor: '#1A0533',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  navTabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 3,
    gap: 2,
  },
  navTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
  },
  navTabActive: { backgroundColor: '#6D28D9' },
  navTabTxt: { fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: '500' },
  navTabTxtActive: { color: '#fff', fontWeight: '700' },
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  bodyContent: { paddingHorizontal: 14, paddingTop: 16 },
  offersTitleWrap: { marginBottom: 16 },
  offersTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.5,
    lineHeight: 36,
  },
  offersSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  offersSubSmall: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 2,
  },
  couponsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 22,
  },
  couponCard: {
    flex: 1,
    borderRadius: 12,
    padding: 11,
    paddingTop: 10,
    overflow: 'hidden',
    minHeight: 90,
    position: 'relative',
  },
  couponCircle1: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    top: -12,
    right: -12,
    opacity: 0.45,
  },
  couponCircle2: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    bottom: 8,
    right: 8,
    opacity: 0.35,
  },
  couponSave: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.9,
  },
  couponPercent: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 28,
  },
  couponLabel: {
    fontSize: 8.5,
    color: '#fff',
    fontWeight: '500',
    marginTop: 4,
    opacity: 0.85,
  },
  couponCode: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSub: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 1,
  },
  stateBox: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'center',
  },
  hlList: { gap: 10 },
  hlCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    height: 100,
  },
  hlImg: {
    width: 110,
    position: 'relative',
    overflow: 'hidden',
  },
  hlBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 5,
  },
  hlBadgeText: {
    fontSize: 7,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  hlInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'relative',
  },
  hlRatingPill: {
    position: 'absolute',
    top: 8,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  hlRatingNum: {
    fontSize: 9,
    color: '#92400E',
    fontWeight: '700',
  },
  hlName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginRight: 40,
    lineHeight: 16,
  },
  hlSub: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
    lineHeight: 14,
  },
  hlLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  hlLocationTxt: {
    fontSize: 10,
    color: '#6B7280',
  },
  hlOffRow: {
    marginTop: 4,
  },
  hlOff: {
    fontSize: 9.5,
    color: '#DC2626',
    fontWeight: '700',
  },
  hlPriceRow: {
    marginTop: 1,
  },
  hlPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#7C3AED',
  },
});

export default OffersScreen;
