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
import { ArrowLeft, Plus, Trash2, Hotel } from 'lucide-react-native';

const PAYMENT_METHODS = [
  { id: 1, type: 'Visa', badgeBg: '#1A56DB', badgeLabel: 'Visa', name: 'HDFC Bank Visa', detail: '•••• •••• •••• 4242', meta: 'Expires 12/2027', isDefault: true },
  { id: 2, type: 'Mastercard', badgeBg: '#EA580C', badgeLabel: 'MasterCard', name: 'SBI Mastercard', detail: '•••• •••• •••• 8868', meta: 'Expires 08/2026', isDefault: false },
  { id: 3, type: 'UPI', badgeBg: '#16A34A', badgeLabel: 'UPI', name: 'Google Pay UPI', detail: 'arjun@okaxis', meta: null, isDefault: false },
];

const TRANSACTIONS = [
  { id: 1, title: 'The Leela Palace New Delhi - Jun 15-18', method: 'Visa •••• 4242', amount: '-₹53,100', amountColor: '#DC2626', date: '01 May 2026' },
  { id: 2, title: 'The Claridges New Delhi - Mar 18-20', method: 'Visa •••• 4242', amount: '-₹33,040', amountColor: '#DC2626', date: '28 Feb 2026' },
  { id: 3, title: 'Vivanta New Delhi, Dwarka - Feb 9-12', method: 'Visa •••• 4242', amount: '-₹49,590', amountColor: '#DC2626', date: '25 Jan 2026' },
  { id: 4, title: 'Refund - Radisson Blu Plaza Delhi Airport', method: 'Google Pay UPI', amount: '+₹14,160', amountColor: '#16A34A', date: '17 Jan 2026' },
  { id: 5, title: 'Refund - Hyatt Regency Delhi', method: 'Visa •••• 4242', amount: '+₹84,900', amountColor: '#16A34A', date: '12 Dec 2025' },
];

type PaymentsScreenProps = {
  navigation: any;
};

const PaymentsScreen = ({ navigation }: PaymentsScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={18} color="#111827" strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Payment & Wallet</Text>
        <Text style={styles.subtitle}>Manage payment methods and view transaction history</Text>

        <View style={styles.walletCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.walletLabel}>HotelHub Wallet</Text>
            <Text style={styles.walletAmount}>Rs. 2,500</Text>
            <Text style={styles.walletSub}>Available balance</Text>
          </View>
          <Pressable style={styles.addMoneyBtn}>
            <Text style={styles.addMoneyTxt}>Add Money</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <Pressable style={styles.addNewBtn}>
            <Plus size={12} color="#7C3AED" strokeWidth={2.5} />
            <Text style={styles.addNewTxt}>Add New</Text>
          </Pressable>
        </View>

        <View style={styles.methodList}>
          {PAYMENT_METHODS.map(m => (
            <View key={m.id} style={styles.methodCard}>
              <View style={[styles.methodBadge, { backgroundColor: m.badgeBg }]}>
                <Text style={styles.methodBadgeTxt}>{m.badgeLabel}</Text>
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{m.name}</Text>
                <Text style={styles.methodDetail}>{m.detail}</Text>
                {m.meta ? <Text style={styles.methodMeta}>{m.meta}</Text> : null}
              </View>
              <View style={styles.methodRight}>
                {m.isDefault ? (
                  <Text style={styles.defaultTag}>Default</Text>
                ) : (
                  <Pressable>
                    <Text style={styles.setDefaultTag}>Set default</Text>
        </Pressable>
                )}
                <Pressable style={{ marginTop: 6 }}>
                  <Trash2 size={14} color="#9CA3AF" strokeWidth={1.8} />
          </Pressable>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 22, marginBottom: 12 }]}>Transaction History</Text>
        <View style={styles.txnList}>
          {TRANSACTIONS.map(t => (
            <View key={t.id} style={styles.txnRow}>
              <View style={styles.txnIconWrap}>
                <Hotel size={15} color="#7C3AED" strokeWidth={1.8} />
              </View>
              <View style={styles.txnInfo}>
                <Text style={styles.txnTitle} numberOfLines={1}>{t.title}</Text>
                <Text style={styles.txnMethod}>{t.method}</Text>
              </View>
              <View style={styles.txnRight}>
                <Text style={[styles.txnAmount, { color: t.amountColor }]}>{t.amount}</Text>
                <Text style={styles.txnDate}>{t.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: { height: 44, justifyContent: 'center', paddingHorizontal: 16 },
  backBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'flex-start' },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 18, paddingTop: 4 },
  title: { fontSize: 23, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 12.5, color: '#9CA3AF', lineHeight: 17, marginTop: 4, marginBottom: 16 },
  walletCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  walletLabel: { fontSize: 11.5, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  walletAmount: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginTop: 6 },
  walletSub: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  addMoneyBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addMoneyTxt: { fontSize: 12, color: '#7C3AED', fontWeight: '700' },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  addNewTxt: { fontSize: 11.5, color: '#7C3AED', fontWeight: '700' },
  methodList: { gap: 10 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 13,
  },
  methodBadge: {
    width: 40,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodBadgeTxt: { fontSize: 7.5, color: '#FFFFFF', fontWeight: '800' },
  methodInfo: { flex: 1 },
  methodName: { fontSize: 12.5, fontWeight: '700', color: '#111827' },
  methodDetail: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  methodMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  methodRight: { alignItems: 'flex-end' },
  defaultTag: { fontSize: 10.5, color: '#16A34A', fontWeight: '700' },
  setDefaultTag: { fontSize: 10.5, color: '#7C3AED', fontWeight: '600' },
  txnList: { gap: 14 },
  txnRow: { flexDirection: 'row', alignItems: 'center' },
  txnIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  txnInfo: { flex: 1, marginRight: 8 },
  txnTitle: { fontSize: 12, fontWeight: '700', color: '#111827' },
  txnMethod: { fontSize: 10.5, color: '#9CA3AF', marginTop: 2 },
  txnRight: { alignItems: 'flex-end' },
  txnAmount: { fontSize: 12.5, fontWeight: '700' },
  txnDate: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
});

export default PaymentsScreen;
