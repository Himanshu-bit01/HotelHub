import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  LayoutDashboard,
  BookMarked,
  CreditCard,
  Star,
  Bookmark,
  HeadphonesIcon,
  Settings,
  ArrowLeft,
  TrendingUp,
  X,
  IndianRupee,
  CheckCircle,
  Bell,
  Gift,
  Hotel,
  Banknote,
  Calendar,
  BookOpen,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNavBar from '../../components/Home-Screen/Topnavbar';
import QuickActions from '../../components/Profile/QuickActions';

const MENU_ITEMS = [
  { id: 'settings', label: 'Account Settings', Icon: Settings },
  { id: 'back', label: 'Back to Home', Icon: ArrowLeft },
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'bookings', label: 'My bookings', Icon: BookMarked },
  { id: 'payments', label: 'Payments & Wallet', Icon: CreditCard },
  { id: 'reviews', label: 'Reviews & Ratings', Icon: Star },
  { id: 'saved', label: 'Saved Hotels', Icon: Bookmark },
  { id: 'support', label: 'Support', Icon: HeadphonesIcon },
];

const STATS = [
  { id: 1, count: '0', label: 'Total Bookings', sublabel: '0 total', Icon: BookOpen, iconBg: '#ffffff', iconColor: '#7C3AED', trendColor: '#10B981' },
  { id: 2, count: '0', label: 'Upcoming Stays', sublabel: '0 stays', Icon: Calendar, iconBg: '#D1FAE5', iconColor: '#059669', trendColor: '#10B981' },
  { id: 3, count: '0', label: 'Cancelled', sublabel: '0 Cancelled', Icon: X, iconBg: '#FEE2E2', iconColor: '#DC2626', trendColor: '#EF4444' },
  { id: 4, count: '₹0', label: 'Total Spent', sublabel: 'Across all bookings', Icon: IndianRupee, iconBg: '#FEF3C7', iconColor: '#D97706', trendColor: '#10B981' },
];

const ACTIVITY = [
  { id: 1, title: 'Booking Confirmed', desc: 'Your booking for The Grand View Hotel', date: 'Jun 01, 2026 • 2 nights', dotColor: '#10B981', Icon: CheckCircle, iconColor: '#10B981', iconBg: '#D1FAE5' },
  { id: 2, title: 'New Listing Added', desc: 'Sunrise Villa has been added to saved', date: 'May 28, 2026', dotColor: '#7C3AED', Icon: Bookmark, iconColor: '#7C3AED', iconBg: '#EDE9FE' },
  { id: 3, title: 'Payment Received', desc: 'Payment of ₹3,200 received successfully', date: 'May 25, 2026', dotColor: '#10B981', Icon: Banknote, iconColor: '#10B981', iconBg: '#D1FAE5' },
  { id: 4, title: 'Review Submitted', desc: 'You reviewed The Ocean View Hotel', date: 'May 22, 2026', dotColor: '#F59E0B', Icon: Star, iconColor: '#F59E0B', iconBg: '#FEF3C7' },
  { id: 5, title: 'Booking Cancelled', desc: 'Booking for Mountain Retreat cancelled', date: 'May 18, 2026', dotColor: '#DC2626', Icon: X, iconColor: '#DC2626', iconBg: '#FEE2E2' },
];

const NOTIFS = [
  { id: 1, title: 'Check-in Reminder', desc: 'Your stay at The Ocean View Hotel is tomorrow. Check-in starts at 2PM.', Icon: Bell, iconColor: '#7C3AED', iconBg: '#EDE9FE' },
  { id: 2, title: 'Payment Pending', desc: 'You have a payment of ₹4,500 due in 2 days for Sunrise Villa', Icon: CreditCard, iconColor: '#F59E0B', iconBg: '#FEF3C7' },
  { id: 3, title: 'Exclusive Offer for You', desc: 'Get 20% off on your next booking. Use code SAVE20. Valid till Jun 30.', Icon: Gift, iconColor: '#10B981', iconBg: '#D1FAE5' },
];

const StatCard = ({ item }: { item: typeof STATS[number] }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.statCard, { width: (width - 24 - 8) / 2 - 4 }]}>
      <View style={styles.statTop}>
        <View style={[styles.statIconWrap, { backgroundColor: item.iconBg }]}>
          <item.Icon size={14} color={item.iconColor} strokeWidth={2} />
        </View>
        <TrendingUp size={12} color={item.trendColor} strokeWidth={2} />
      </View>
      <Text style={styles.statCount}>{item.count}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statSub}>{item.sublabel}</Text>
    </View>
  );
};

type ProfileScreenProps = {
  navigation: any;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']} >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TopNavBar
        navigation={navigation}
        theme="light"
        showTabs={false}
      />

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 70 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>U</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeTxt}>Welcome back,</Text>
            <Text style={styles.profileName}>Guest</Text>
            <Text style={styles.profileEmail}>guest@example.com</Text>
            <View style={styles.memberRow}>
              <Text style={styles.memberTxt}>Member since Jan 2024 •</Text>
              <Text style={styles.bookingsTxt}> 0 bookings</Text>
            </View>
          </View>
           <Pressable style={styles.bookStayBtn} onPress={() => navigation.navigate('Bottom', { screen: 'Home' })}>
            <Text style={styles.bookStayTxt}>Book a Stay</Text>
          </Pressable>
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => {
            const isFirst = idx === 0;
            const menuNavMap: Record<string, any> = {
              dashboard: 'Dashboard',
              bookings: 'Bookings',
              payments: 'Payments',
              reviews: 'Reviews',
              saved: 'Wishlist',
              support: 'Support',
              settings: 'AccountSettings',
              back: { name: 'Bottom', params: { screen: 'Home' } },
            };
            return (
              <Pressable
                key={item.id}
                style={[styles.menuItem, isFirst && styles.menuItemActive]}
                onPress={() => {
                  const target = menuNavMap[item.id];
                  if (target) {
                    navigation.navigate(target);
                  }
                }}
              >
                <View style={[styles.menuIconWrap, isFirst && styles.menuIconWrapActive]}>
                  <item.Icon
                    size={14}
                    color={isFirst ? '#7C3AED' : '#6B7280'}
                    strokeWidth={isFirst ? 2.2 : 1.8}
                  />
                </View>
                <Text style={[styles.menuLabel, isFirst && styles.menuLabelActive]}>
                  {item.label}
                </Text>
                <ChevronRight size={13} color={isFirst ? '#7C3AED' : '#D1D5DB'} strokeWidth={2} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.statsGrid}>
          {STATS.map(s => <StatCard key={s.id} item={s} />)}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Upcoming Stays</Text>
            <Pressable>
              <Text style={styles.seeAll}>Show All</Text>
            </Pressable>
          </View>
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Hotel size={20} color="#9CA3AF" strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTxt}>No upcoming stays</Text>
            <Pressable style={styles.browseBtn} onPress={() => navigation.navigate('Bottom', { screen: 'Home' })}>
              <Text style={styles.browseTxt}>Browse Hotels</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.twoColRow}>
          <View style={[styles.twoColCard, { marginRight: 5 }]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Pressable>
                <Text style={styles.seeAll}>View All</Text>
              </Pressable>
            </View>
            {ACTIVITY.map(a => (
              <View key={a.id} style={styles.activityItem}>
                <View style={[styles.actDot, { backgroundColor: a.dotColor }]} />
                <View style={styles.actText}>
                  <Text style={styles.actTitle} numberOfLines={1}>{a.title}</Text>
                  <Text style={styles.actDesc} numberOfLines={2}>{a.desc}</Text>
                  <Text style={styles.actDate}>{a.date}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.twoColCard, { marginLeft: 5 }]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeTxt}>3</Text>
              </View>
              <Pressable style={{ marginLeft: 4 }}>
                <Text style={styles.seeAll}>View All</Text>
              </Pressable>
            </View>
            {NOTIFS.map(n => (
              <View key={n.id} style={styles.notifItem}>
                <View style={[styles.notifIconWrap, { backgroundColor: n.iconBg }]}>
                  <n.Icon size={11} color={n.iconColor} strokeWidth={2} />
                </View>
                <View style={styles.notifText}>
                  <Text style={styles.notifTitle} numberOfLines={1}>{n.title}</Text>
                  <Text style={styles.notifDesc} numberOfLines={3}>{n.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <QuickActions navigation={navigation} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  body: { flex: 1 },
  bodyContent: { padding: 12, gap: 10 },
  profileHero: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarLetter: { fontSize: 20, fontWeight: '800', color: '#fff' },
  profileInfo: { flex: 1 },
  welcomeTxt: { fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: '400' },
  profileName: { fontSize: 17, fontWeight: '800', color: '#fff', lineHeight: 22 },
  profileEmail: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  memberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  memberTxt: { fontSize: 9, color: 'rgba(255,255,255,0.65)' },
  bookingsTxt: { fontSize: 9, color: 'rgba(255,255,255,0.65)' },
  bookStayBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  bookStayTxt: { fontSize: 10, color: '#7C3AED', fontWeight: '700' },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    backgroundColor: '#FFFFFF',
  },
  menuItemActive: {
    backgroundColor: '#F5F3FF',
  },
  menuIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuIconWrapActive: {
    backgroundColor: '#EDE9FE',
  },
  menuLabel: {
    flex: 1,
    fontSize: 12.5,
    color: '#374151',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#7C3AED',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginTop: 2,
  },
  statSub: {
    fontSize: 9.5,
    color: '#9CA3AF',
    marginTop: 1,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    fontSize: 10.5,
    color: '#7C3AED',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyTxt: {
    fontSize: 11.5,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  browseBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  browseTxt: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
  },
  twoColRow: {
    flexDirection: 'row',
  },
  twoColCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 11,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 9,
  },
  actDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 7,
    flexShrink: 0,
  },
  actText: { flex: 1 },
  actTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 14,
  },
  actDesc: {
    fontSize: 9.5,
    color: '#6B7280',
    lineHeight: 13,
    marginTop: 1,
  },
  actDate: {
    fontSize: 9,
    color: '#9CA3AF',
    marginTop: 2,
  },
  notifBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 4,
  },
  notifBadgeTxt: {
    fontSize: 8.5,
    color: '#fff',
    fontWeight: '700',
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 9,
  },
  notifIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    flexShrink: 0,
  },
  notifText: { flex: 1 },
  notifTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 14,
  },
  notifDesc: {
    fontSize: 9.5,
    color: '#6B7280',
    lineHeight: 13,
    marginTop: 1,
  },
});

export default ProfileScreen;