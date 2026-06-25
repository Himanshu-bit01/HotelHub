import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Plus,
  ChevronRight,
  ChevronDown,
} from 'lucide-react-native';

const CONTACT_OPTIONS = [
  { id: 'call', title: 'Call us', value: '+91 1800 123 4567', meta: '27/7 support', Icon: Phone, iconColor: '#16A34A', iconBg: '#D1FAE5' },
  { id: 'email', title: 'Email us', value: 'support@hotelhub.com', meta: 'Reply within 24 hours', Icon: Mail, iconColor: '#7C3AED', iconBg: '#EDE9FE' },
  { id: 'chat', title: 'Live chat', value: 'chat with us', meta: 'Available 9 AM - 9 PM', Icon: MessageCircle, iconColor: '#7C3AED', iconBg: '#EDE9FE' },
];

const FAQS = [
  { id: 1, question: 'How do i cancel my booking?', answer: 'Go to My Bookings, find the booking you want to cancel, and tap "Cancel Booking". Review the cancellation policy and confirm. Refunds are processed within 3-5 business days.' },
  { id: 2, question: 'When will i receive my refund?', answer: 'Refunds are typically processed within 3-5 business days after cancellation. The time for it to reflect in your account depends on your bank or payment provider.' },
  { id: 3, question: 'Can I modify my booking dates?', answer: 'Modification is allowed for eligible bookings. Go to Booking Details and tap "Modify Booking". Note that date changes are subject to availability and may affect pricing.' },
  { id: 4, question: 'How do i download my invoice?', answer: 'Open the booking details page and tap "Download Invoice". The invoice will be downloaded as a PDF to your device.' },
  { id: 5, question: 'What is the check-in time?', answer: 'Standard check-in is at 3:00 PM and check-out is at 12:00 PM. Early check-in or late check-out may be available on request, subject to availability.' },
  { id: 6, question: 'How do i contact the hotel directly?', answer: 'You can find the hotel\u2019s phone number and email on your Booking Details page under "Hotel Contact".' },
];

type SupportScreenProps = {
  navigation: any;
};

const SupportScreen = ({ navigation }: SupportScreenProps) => {
  const insets = useSafeAreaInsets();
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <ArrowLeft size={18} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Support & Help Center</Text>
        <Text style={styles.subtitle}>Get help with your bookings and account</Text>

        <View style={styles.contactList}>
          {CONTACT_OPTIONS.map(c => (
            <TouchableOpacity
              key={c.id}
              style={styles.contactCard}
              activeOpacity={0.8}
              onPress={() => {
                if (c.id === 'call') Linking.openURL('tel:+918001234567');
                if (c.id === 'email') Linking.openURL('mailto:support@hotelhub.com');
              }}
            >
              <View style={[styles.contactIconWrap, { backgroundColor: c.iconBg }]}>
                <c.Icon size={18} color={c.iconColor} strokeWidth={2} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{c.title}</Text>
                <Text style={styles.contactValue}>{c.value}</Text>
              </View>
              <Text style={styles.contactMeta}>{c.meta}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.sectionHeaderRow, { marginTop: 22 }]}>
          <Text style={styles.sectionTitle}>My Tickets</Text>
          <TouchableOpacity style={styles.newTicketBtn} activeOpacity={0.8}>
            <Plus size={12} color="#7C3AED" strokeWidth={2.5} />
            <Text style={styles.newTicketTxt}>New Ticket</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ticketCard}>
          <View style={styles.ticketTopRow}>
            <Text style={styles.ticketId}>#TKT - 001</Text>
            <View style={styles.ticketBadge}>
              <Text style={styles.ticketBadgeTxt}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.ticketTitle}>Early check-in request for Leela Palace booking</Text>
          <Text style={styles.ticketMeta}>Created 02 May 2026 - updated 03 May 2026</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 22, marginBottom: 12 }]}>
          Frequently Asked Questions
        </Text>
        <View style={styles.faqList}>
          {FAQS.map(f => {
            const isOpen = openFaqId === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={styles.faqCard}
                activeOpacity={0.8}
                onPress={() => setOpenFaqId(isOpen ? null : f.id)}
              >
                <View style={styles.faqRow}>
                  <Text style={styles.faqQuestion}>{f.question}</Text>
                  {isOpen ? (
                    <ChevronDown size={14} color="#9CA3AF" strokeWidth={2} />
                  ) : (
                    <ChevronRight size={14} color="#9CA3AF" strokeWidth={2} />
                  )}
                </View>
                {isOpen && <Text style={styles.faqAnswer}>{f.answer}</Text>}
              </TouchableOpacity>
            );
          })}
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
  subtitle: { fontSize: 12.5, color: '#9CA3AF', lineHeight: 17, marginTop: 4, marginBottom: 18 },
  contactList: { gap: 10 },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 14,
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 13, fontWeight: '700', color: '#111827' },
  contactValue: { fontSize: 11.5, color: '#6B7280', marginTop: 2 },
  contactMeta: { fontSize: 10.5, color: '#9CA3AF' },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  newTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  newTicketTxt: { fontSize: 11.5, color: '#7C3AED', fontWeight: '700' },
  ticketCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 14,
  },
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ticketId: { fontSize: 12.5, fontWeight: '700', color: '#111827' },
  ticketBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ticketBadgeTxt: { fontSize: 9.5, color: '#D97706', fontWeight: '700' },
  ticketTitle: { fontSize: 12, color: '#374151', fontWeight: '600', lineHeight: 16 },
  ticketMeta: { fontSize: 10, color: '#9CA3AF', marginTop: 6 },
  faqList: { gap: 10 },
  faqCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: { flex: 1, fontSize: 12, color: '#374151', fontWeight: '600', marginRight: 8 },
  faqAnswer: { fontSize: 11.5, color: '#6B7280', lineHeight: 16, marginTop: 10 },
});

export default SupportScreen;
