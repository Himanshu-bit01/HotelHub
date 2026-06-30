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
  ArrowLeft,
  Check,
  Shield,
  Lock,
} from 'lucide-react-native';
import { getPropertyById } from '../PropertyDetails/propertyData';
import { getRoomById } from '../RoomSelection/roomData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPaymentMethod, selectPaymentMethod } from '../../redux/store/slices/bookingSlice';

type PaymentMethod = {
  id: string;
  type: string;
  badge: string;
  badgeBg: string;
  name: string;
  detail: string;
  isDefault: boolean;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: '1', type: 'visa', badge: 'Visa', badgeBg: '#1A56DB', name: 'HDFC Bank Visa', detail: '•••• •••• •••• 4242', isDefault: true },
  { id: '2', type: 'mastercard', badge: 'MasterCard', badgeBg: '#EA580C', name: 'SBI Mastercard', detail: '•••• •••• •••• 8868', isDefault: false },
  { id: '3', type: 'upi', badge: 'UPI', badgeBg: '#16A34A', name: 'Google Pay UPI', detail: 'arjun@okaxis', isDefault: false },
];

type CheckoutPaymentScreenProps = {
  navigation: any;
  route: any;
};

const CheckoutPaymentScreen = ({ navigation, route }: CheckoutPaymentScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hotelId, roomId, fullName, email, phone, guests } = route.params ?? {};

  const property = hotelId ? getPropertyById(hotelId) : null;
  const room = roomId ? getRoomById(roomId) : null;

  const dispatch = useAppDispatch();
  const selectedMethod = useAppSelector(selectPaymentMethod);

  const handlePay = () => {
    const method = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    navigation.replace('BookingConfirmation', {
      hotelId,
      roomId,
      fullName,
      email,
      phone,
      guests,
      paymentMethod: method?.name ?? 'Card',
    });
  };

  const priceNum = room ? parseInt(room.price.replace(/[₹,]/g, ''), 10) : 0;
  const tax = Math.round(priceNum * 0.12);
  const total = priceNum + tax;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={18} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secureBanner}>
          <Shield size={16} color="#7C3AED" strokeWidth={2} />
          <Text style={styles.secureBannerTxt}>Your booking is protected by our secure payment system</Text>
        </View>

        <Text style={styles.sectionTitle}>BOOKING SUMMARY</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Hotel</Text>
            <Text style={styles.summaryValue}>{property?.name ?? 'Hotel'}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Room</Text>
            <Text style={styles.summaryValue}>{room?.name ?? 'Room'}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Guest</Text>
            <Text style={styles.summaryValue}>{fullName ?? 'Guest'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
        <View style={styles.methodsCard}>
          {PAYMENT_METHODS.map(method => {
            const isSelected = selectedMethod === method.id;
            return (
              <Pressable
                key={method.id}
                style={[styles.methodRow, isSelected && styles.methodRowActive]}
                onPress={() => dispatch(setPaymentMethod(method.id))}
              >
                <View style={[styles.methodBadge, { backgroundColor: method.badgeBg }]}>
                  <Text style={styles.methodBadgeTxt}>{method.badge}</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodDetail}>{method.detail}</Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioActive]}>
                  {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.secureFooter}>
          <Lock size={14} color="#16A34A" strokeWidth={2} />
          <Text style={styles.secureFooterTxt}>Your payment is 100% secure</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.bottomTotal}>Total</Text>
          <Text style={styles.bottomPrice}>₹{total.toLocaleString('en-IN')}</Text>
        </View>
        <Pressable style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payBtnTxt}>Pay ₹{total.toLocaleString('en-IN')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutPaymentScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 4 },
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    gap: 8,
  },
  secureBannerTxt: { fontSize: 12, color: '#6B7280', flex: 1 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 10 },
  summaryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryLabel: { fontSize: 13, color: '#6B7280' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#111827' },
  summaryDivider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 4 },
  methodsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 2,
  },
  methodRowActive: { backgroundColor: '#F5F3FF' },
  methodBadge: {
    width: 48,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodBadgeTxt: { fontSize: 9, fontWeight: '700', color: '#FFFFFF' },
  methodInfo: { flex: 1 },
  methodName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  methodDetail: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: '#7C3AED', backgroundColor: '#7C3AED' },
  secureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  secureFooterTxt: { fontSize: 12, color: '#16A34A', fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  bottomTotal: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
  bottomPrice: { fontSize: 18, fontWeight: '700', color: '#111827' },
  payBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  payBtnTxt: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
