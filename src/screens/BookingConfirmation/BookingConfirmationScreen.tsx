import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Home,
  Mail,
} from 'lucide-react-native';
import { getPropertyById } from '../PropertyDetails/propertyData';
import { getRoomById } from '../RoomSelection/roomData';

type BookingConfirmationScreenProps = {
  navigation: any;
  route: any;
};

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const BookingConfirmationScreen = ({ navigation, route }: BookingConfirmationScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hotelId, roomId, fullName, email, paymentMethod } = route.params ?? {};

  const property = hotelId ? getPropertyById(hotelId) : null;
  const room = roomId ? getRoomById(roomId) : null;

  const bookingId = `HH-${Date.now().toString().slice(-8)}`;
  const today = new Date();
  const checkOut = new Date(today);
  checkOut.setDate(checkOut.getDate() + 2);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#7C3AED" />

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <View style={styles.checkCircle}>
            <CheckCircle size={56} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <Text style={styles.title}>Booking Confirmed</Text>
          <Text style={styles.subtitle}>
            Thank you, {fullName ?? 'Guest'}! Your booking has been confirmed successfully.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>BOOKING DETAILS</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Booking ID</Text>
            <Text style={styles.detailValue}>{bookingId}</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconRow}>
              <Home size={14} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.detailLabel}>Hotel</Text>
            </View>
            <Text style={styles.detailValue}>{property?.name ?? 'Hotel'}</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconRow}>
              <MapPin size={14} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.detailLabel}>Location</Text>
            </View>
            <Text style={styles.detailValue}>{property?.location ?? 'New Delhi'}</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Room</Text>
            <Text style={styles.detailValue}>{room?.name ?? 'Room'}</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconRow}>
              <Calendar size={14} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.detailLabel}>Check-in</Text>
            </View>
            <Text style={styles.detailValue}>{formatDate(today)}, 2:00 PM</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconRow}>
              <Calendar size={14} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.detailLabel}>Check-out</Text>
            </View>
            <View>
              <Text style={styles.detailValue}>{formatDate(checkOut)}</Text>
              <Text style={styles.detailSub}>11:00 AM</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconRow}>
              <Clock size={14} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.detailLabel}>Duration</Text>
            </View>
            <Text style={styles.detailValue}>2 Nights</Text>
          </View>
          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment</Text>
            <Text style={styles.detailValue}>{paymentMethod ?? 'Card'}</Text>
          </View>
        </View>

        <View style={styles.emailBanner}>
          <Mail size={16} color="#7C3AED" strokeWidth={2} />
          <Text style={styles.emailTxt}>
            A confirmation email has been sent to <Text style={{ fontWeight: '700', color: '#111827' }}>{email ?? 'your email'}</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable style={styles.homeBtn} onPress={() => navigation.navigate('Bottom', { screen: 'Home' })}>
          <Text style={styles.homeBtnTxt}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BookingConfirmationScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  bodyContent: { paddingTop: 4 },
  topSection: {
    backgroundColor: '#7C3AED',
    paddingTop: 30,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: -16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardSectionTitle: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 14 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailLabel: { fontSize: 13, color: '#6B7280' },
  detailValue: { fontSize: 13, fontWeight: '600', color: '#111827', textAlign: 'right', maxWidth: '55%' },
  detailSub: { fontSize: 11, color: '#9CA3AF', textAlign: 'right' },
  detailDivider: { height: 1, backgroundColor: '#F3F4F6' },
  emailBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  emailTxt: { fontSize: 12, color: '#6B7280', flex: 1, lineHeight: 18 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  homeBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  homeBtnTxt: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
