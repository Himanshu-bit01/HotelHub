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
import { ArrowLeft, Bell, CreditCard, Star, Gift, CalendarCheck } from 'lucide-react-native';

const NOTIFICATIONS = [
  { id: 1, icon: CalendarCheck, color: '#10B981', bg: '#D1FAE5', title: 'Booking Confirmed', desc: 'Your booking at Grand Palace Hotel has been confirmed for June 12-15.', time: '2 hours ago' },
  { id: 2, icon: CreditCard, color: '#7C3AED', bg: '#EDE9FE', title: 'Payment Received', desc: 'Payment of ₹26,000 for Grand Palace Hotel has been processed successfully.', time: '5 hours ago' },
  { id: 3, icon: Star, color: '#F59E0B', bg: '#FEF3C7', title: 'Review Reminder', desc: 'How was your stay at Manhattan Skyline Suites? Share your experience.', time: '1 day ago' },
  { id: 4, icon: Gift, color: '#EC4899', bg: '#FCE7F3', title: 'New Offer Available', desc: 'Get 30% off on your next booking. Use code STAY30 at checkout.', time: '2 days ago' },
  { id: 5, icon: Bell, color: '#3B82F6', bg: '#DBEAFE', title: 'Check-in Reminder', desc: 'Your check-in at Green Valley Stay is tomorrow at 3:00 PM.', time: '3 days ago' },
];

type NotificationsScreenProps = { navigation: any };

const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  const insets = useSafeAreaInsets();

  const renderNotification = useCallback(({ item }: { item: typeof NOTIFICATIONS[number] }) => {
    const IconComp = item.icon;
    return (
      <View style={styles.notifCard}>
        <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
          <IconComp size={18} color={item.color} strokeWidth={2} />
        </View>
        <View style={styles.notifInfo}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifDesc}>{item.desc}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Recent Activity</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(n) => n.id.toString()}
        renderItem={renderNotification}
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 8 },
  notifCard: { flexDirection: 'row', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, padding: 14, marginBottom: 12 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 3 },
  notifDesc: { fontSize: 12, color: '#6B7280', lineHeight: 17 },
  notifTime: { fontSize: 11, color: '#9CA3AF', marginTop: 6 },
});

export default NotificationsScreen;
