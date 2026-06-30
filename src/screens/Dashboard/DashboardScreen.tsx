import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  DollarSign,
  Building2,
  Calendar,
  ChevronRight,
} from 'lucide-react-native';
import TopNavBar from '../../components/Home-Screen/Topnavbar';

const STATS = [
  { label: 'Total Bookings', value: '128', icon: Calendar, color: '#7C3AED', bg: '#EDE9FE' },
  { label: 'Revenue', value: '₹12.4L', icon: DollarSign, color: '#10B981', bg: '#D1FAE5' },
  { label: 'Active Listings', value: '24', icon: Building2, color: '#3B82F6', bg: '#DBEAFE' },
];

const RECENT_ACTIVITY = [
  { id: 1, title: 'New booking from Arjun Mehta', subtitle: 'Grand Palace Hotel • Suite', time: '2 hours ago', color: '#10B981' },
  { id: 2, title: 'Payment received ₹26,000', subtitle: 'Manhattan Skyline Suites', time: '5 hours ago', color: '#7C3AED' },
  { id: 3, title: 'Booking cancelled by Priya Sharma', subtitle: 'Fab Hotel • Deluxe', time: '1 day ago', color: '#EF4444' },
  { id: 4, title: 'New review posted', subtitle: 'Eiffel Luxury Star • 5 stars', time: '2 days ago', color: '#F59E0B' },
];

type DashboardScreenProps = { navigation: any };

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const insets = useSafeAreaInsets();

  const renderActivity = useCallback(({ item }: { item: typeof RECENT_ACTIVITY[number] }) => (
    <View style={styles.activityCard}>
      <View style={[styles.activityDot, { backgroundColor: item.color }]} />
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activitySub}>{item.subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />
      <TopNavBar
        theme="light"
        showTabs={false}
        rightIcons={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color="#374151" strokeWidth={1.8} />
          </Pressable>
        }
      />

      <FlatList
        data={RECENT_ACTIVITY}
        keyExtractor={(a) => a.id.toString()}
        renderItem={renderActivity}
        ListHeaderComponent={
          <>
            <Text style={styles.screenTitle}>Dashboard</Text>

            <View style={styles.statsRow}>
              {STATS.map((s) => {
                const IconComp = s.icon;
                return (
                  <View key={s.label} style={styles.statCard}>
                    <View style={[styles.statIconWrap, { backgroundColor: s.bg }]}>
                      <IconComp size={16} color={s.color} strokeWidth={2} />
                    </View>
                    <Text style={styles.statValue}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>OFFERS</Text>
              <Pressable style={styles.seeAllBtn}>
                <Text style={styles.seeAllTxt}>See All</Text>
                <ChevronRight size={12} color="#7C3AED" strokeWidth={2.5} />
              </Pressable>
            </View>

            <View style={styles.offerCards}>
              <View style={[styles.offerCard, { backgroundColor: '#F3E8FF' }]}>
                <Text style={styles.offerPercent}>30% OFF</Text>
                <Text style={styles.offerLabel}>Summer Sale</Text>
                <Text style={styles.offerCode}>Code: SUMMER30</Text>
              </View>
              <View style={[styles.offerCard, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.offerPercent}>20% OFF</Text>
                <Text style={styles.offerLabel}>First Booking</Text>
                <Text style={styles.offerCode}>Code: FIRST20</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 12 }]}>RECENT ACTIVITY</Text>
          </>
        }
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        style={styles.body}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF',marginTop:-32 },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 4 },
  screenTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center' },
  statIconWrap: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
  statLabel: { fontSize: 9, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1.2 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllTxt: { fontSize: 11, color: '#7C3AED', fontWeight: '600' },
  offerCards: { flexDirection: 'row', gap: 10 },
  offerCard: { flex: 1, borderRadius: 12, padding: 14 },
  offerPercent: { fontSize: 16, fontWeight: '800', color: '#111827' },
  offerLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  offerCode: { fontSize: 10, fontWeight: '700', color: '#7C3AED', marginTop: 6 },
  activityCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, marginBottom: 10 },
  activityDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 12, fontWeight: '700', color: '#111827' },
  activitySub: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  activityTime: { fontSize: 10, color: '#9CA3AF' },
});

export default DashboardScreen;
