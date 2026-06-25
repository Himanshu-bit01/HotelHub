import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import {
  Heart,
  Info,
  MapPin,
  BedDouble,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Hourglass,
  AlertCircle,
} from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HotelHubHeader from '../../components/HotelHubHeader/HotelHubHeader';
import { BookingItem } from '../../types';

const upcomingBookings: BookingItem[] = [
  {
    id: 'HH1234567890',
    status: 'Confirmed',
    statusColor: '#1FA855',
    statusBg: '#E5F8EC',
    name: 'Grand Palace Hotel',
    location: 'New Delhi',
    roomType: 'Suite',
    dates: '12–15 June, 2026 (3 Nights)',
    guests: '3 Adults, 2 Children',
    image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    amountLabel: 'Amount',
    amount: 'Rs. 26,000',
  },
  {
    id: 'AA1234512345',
    status: 'Processing Payment',
    statusColor: '#7A4FE0',
    statusBg: '#F0EBFC',
    name: 'Green Valley Stay',
    location: 'New Delhi',
    roomType: 'Deluxe',
    dates: '12–15 Aug, 2026 (3 Nights)',
    guests: '2 Adults, 2 Children',
    image: { uri: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
    amountLabel: 'Amount',
    amount: 'Rs. 16,000',
  },
  {
    id: 'HH0987654321',
    status: 'Pending Verification',
    statusColor: '#E0A100',
    statusBg: '#FDF3D8',
    name: 'Fab Hotel',
    location: 'New Delhi',
    roomType: 'Suite',
    dates: '21–22 June, 2029 (1 Nights)',
    guests: '3 Adults, 2 Children',
    image: { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
    amountLabel: 'Amount',
    amount: 'Rs. 21,000',
  },
];

const cancelledBookings: (BookingItem & { cancelledOn: string; cancellationReason: string; refundStatus: string; refundStatusColor: string; refundAmount: string })[] = [
  {
    id: 'HH1234567890',
    status: 'Cancelled',
    name: 'Grand Palace Hotel',
    location: 'New Delhi',
    roomType: 'Suite',
    dates: '12–15 June, 2026 (3 Nights)',
    guests: '3 Adults, 2 Children',
    image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
    cancelledOn: '10 June, 2026 10:30 AM',
    cancellationReason: 'Change in Plans',
    refundStatus: 'Refunded',
    refundStatusColor: '#1FA855',
    refundAmount: 'Rs. 26,000',
  },
  {
    id: 'HH2344758896',
    status: 'Cancelled',
    name: 'Fab Hotel',
    location: 'New Delhi',
    roomType: 'Suite',
    dates: '12–15 Aug, 2026 (3 Nights)',
    guests: '3 Adults, 2 Children',
    image: { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
    cancelledOn: '10 Aug, 2026 10:30 AM',
    cancellationReason: 'Medical Emergency',
    refundStatus: 'Partially Refund',
    refundStatusColor: '#E0A100',
    refundAmount: 'Rs. 21,000',
  },
];

type StatusBadgeProps = {
  label: string;
  color: string;
  bg: string;
  IconComp: any;
};

const StatusBadge = ({ label, color, bg, IconComp }: StatusBadgeProps) => (
  <View style={[styles.statusBadge, { backgroundColor: bg }]}>
    <IconComp size={12} color={color} style={{ marginRight: 4 }} />
    <Text style={[styles.statusBadgeText, { color }]}>{label}</Text>
  </View>
);

type UpcomingCardProps = { item: BookingItem };

const UpcomingCard = ({ item }: UpcomingCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardTopRow}>
      <View>
        <Text style={styles.bookingIdLabel}>Booking ID</Text>
        <Text style={styles.bookingIdValue}>{item.id}</Text>
      </View>
      <StatusBadge
        label={item.status}
        color={item.statusColor ?? '#000'}
        bg={item.statusBg ?? '#EEE'}
        IconComp={CheckCircle2}
      />
    </View>

    <View style={styles.cardBodyRow}>
      <Image source={item.image} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.infoLine}>
          <MapPin size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoLine}>
          <BedDouble size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.roomType}</Text>
        </View>
        <View style={styles.infoLine}>
          <Calendar size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.dates}</Text>
        </View>
        <View style={styles.infoLine}>
          <Users size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.guests}</Text>
        </View>
      </View>
    </View>

    <View style={styles.cardBottomRow}>
      <View>
        <Text style={styles.amountLabel}>{item.amountLabel}</Text>
        <Text style={styles.amountValue}>{item.amount}</Text>
      </View>
      <Pressable style={styles.viewDetailsBtn}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>
    </View>
  </View>
);

type CancelledCardProps = {
  item: BookingItem & { cancelledOn: string; cancellationReason: string; refundStatus: string; refundStatusColor: string; refundAmount: string };
};

const CancelledCard = ({ item }: CancelledCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardTopRow}>
      <View>
        <Text style={styles.bookingIdLabel}>Booking ID</Text>
        <Text style={styles.bookingIdValue}>{item.id}</Text>
      </View>
      <StatusBadge
        label={item.status}
        color="#E0433D"
        bg="#FCE6E5"
        IconComp={XCircle}
      />
    </View>

    <View style={styles.cardBodyRow}>
      <Image source={item.image} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.infoLine}>
          <MapPin size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoLine}>
          <BedDouble size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.roomType}</Text>
        </View>
        <View style={styles.infoLine}>
          <Calendar size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.dates}</Text>
        </View>
        <View style={styles.infoLine}>
          <Users size={12} color="#8B2FC9" />
          <Text style={styles.infoText}>{item.guests}</Text>
        </View>
      </View>
    </View>

    <View style={styles.cancelledMetaRow}>
      <View>
        <Text style={styles.metaLabel}>Cancelled on</Text>
        <Text style={styles.metaValue}>{item.cancelledOn}</Text>
      </View>
      <View>
        <Text style={styles.metaLabel}>Cancellation Reason</Text>
        <Text style={styles.metaValue}>{item.cancellationReason}</Text>
      </View>
    </View>

    <View style={styles.cardBottomRow}>
      <View>
        <Text style={styles.metaLabel}>Refund Status</Text>
        <Text style={[styles.refundStatusValue, { color: item.refundStatusColor }]}>
          {item.refundStatus}
        </Text>
      </View>
      <View>
        <Text style={styles.metaLabel}>Refund Amount</Text>
        <Text style={styles.metaValue}>{item.refundAmount}</Text>
      </View>
      <Pressable style={styles.viewDetailsBtn}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>
    </View>
  </View>
);

const BookingScreen = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'cancelled'>('upcoming');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0533" />

      <HotelHubHeader
        theme="dark"
        rightIcons={
          <>
            <Heart size={20} color="#FFFFFF" strokeWidth={1.8} style={{ marginRight: 16 }} />
            <Info size={18} color="#FFFFFF" strokeWidth={1.8} />
          </>
        }
      />

      <Text style={styles.screenTitle}>My Booking</Text>

      <View style={styles.tabsWrap}>
        <Pressable
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming Bookings
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'cancelled' && styles.tabActive]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.tabTextActive]}>
            Cancelled Bookings
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
      >
        {activeTab === 'upcoming' ? (
          <View style={styles.bannerUpcoming}>
            <Hourglass size={18} color="#8B2FC9" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerUpcomingTitle}>Your bookings are being processed.</Text>
              <Text style={styles.bannerUpcomingSubtitle}>
                We'll notify you as soon as the status changes.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.bannerCancelled}>
            <AlertCircle size={18} color="#E0433D" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerCancelledTitle}>This booking has been cancelled.</Text>
              <Text style={styles.bannerCancelledSubtitle}>
                You can view cancellation details and refund status here.
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'upcoming'
          ? upcomingBookings.map((item) => <UpcomingCard key={item.id} item={item} />)
          : cancelledBookings.map((item) => <CancelledCard key={item.id} item={item} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#F0EBFC',
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  tabText: {
    fontSize: 13,
    color: '#7A6A8A',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bannerUpcoming: {
    flexDirection: 'row',
    backgroundColor: '#F0EBFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  bannerUpcomingTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#5B2C8A',
  },
  bannerUpcomingSubtitle: {
    fontSize: 11.5,
    color: '#5B2C8A',
    marginTop: 2,
  },
  bannerCancelled: {
    flexDirection: 'row',
    backgroundColor: '#FCE6E5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  bannerCancelledTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#C23B36',
  },
  bannerCancelledSubtitle: {
    fontSize: 11.5,
    color: '#C23B36',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: 12,
    marginBottom: 14,
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bookingIdLabel: {
    fontSize: 10.5,
    color: '#9B9B9B',
  },
  bookingIdValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#8B2FC9',
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  cardBodyRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  hotelImage: {
    width: 88,
    height: 88,
    borderRadius: 10,
    marginRight: 12,
  },
  hotelInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  hotelName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 11,
    color: '#6B6B6B',
    marginLeft: 5,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 10,
  },
  cancelledMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 10,
    marginBottom: 10,
  },
  amountLabel: {
    fontSize: 10.5,
    color: '#9B9B9B',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 1,
  },
  metaLabel: {
    fontSize: 10.5,
    color: '#9B9B9B',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 1,
  },
  refundStatusValue: {
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 1,
  },
  viewDetailsBtn: {
    borderWidth: 1,
    borderColor: '#8B2FC9',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  viewDetailsText: {
    fontSize: 11.5,
    color: '#8B2FC9',
    fontWeight: '600',
  },
});

export default BookingScreen;
