import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react-native';

const FAQS = [
  { id: 1, question: 'How do I cancel my booking?', answer: 'Go to My Bookings, find the booking you want to cancel, and tap "Cancel Booking". Review the cancellation policy and confirm. Refunds are processed within 3-5 business days.' },
  { id: 2, question: 'When will I receive my refund?', answer: 'Refunds are typically processed within 3-5 business days after cancellation. The time for it to reflect in your account depends on your bank or payment provider.' },
  { id: 3, question: 'Can I modify my booking dates?', answer: 'Modification is allowed for eligible bookings. Go to Booking Details and tap "Modify Booking". Date changes are subject to availability and may affect pricing.' },
  { id: 4, question: 'How do I download my invoice?', answer: 'Open the booking details page and tap "Download Invoice". The invoice will be downloaded as a PDF to your device.' },
  { id: 5, question: 'What is the check-in time?', answer: 'Standard check-in is at 3:00 PM and check-out is at 12:00 PM. Early check-in or late check-out may be available on request, subject to availability.' },
  { id: 6, question: 'How do I contact the hotel directly?', answer: "You can find the hotel's phone number and email on your Booking Details page under \"Hotel Contact\"." },
  { id: 7, question: 'Is breakfast included in my stay?', answer: 'Breakfast inclusion depends on your room type and booking plan. Check your booking details for meal inclusions. You can also add breakfast at the front desk.' },
  { id: 8, question: 'Can I request early check-in?', answer: 'Early check-in is subject to room availability. You can request it through the app or by contacting the hotel directly. Additional charges may apply.' },
];

type FAQsScreenProps = { navigation: any };

const FAQsScreen = ({ navigation }: FAQsScreenProps) => {
  const insets = useSafeAreaInsets();
  const [openId, setOpenId] = useState<number | null>(null);

  const renderFaq = useCallback(({ item }: { item: typeof FAQS[number] }) => {
    const isOpen = openId === item.id;
    return (
      <Pressable
        style={styles.faqCard}
        onPress={() => setOpenId(isOpen ? null : item.id)}
      >
        <View style={styles.faqRow}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          {isOpen ? (
            <ChevronDown size={16} color="#9CA3AF" strokeWidth={2} />
          ) : (
            <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
          )}
        </View>
        {isOpen && <Text style={styles.faqAnswer}>{item.answer}</Text>}
      </Pressable>
    );
  }, [openId]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={FAQS}
        keyExtractor={(f) => f.id.toString()}
        renderItem={renderFaq}
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
  headerTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 8 },
  faqCard: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 10 },
  faqRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestion: { flex: 1, fontSize: 13, color: '#374151', fontWeight: '600', marginRight: 8 },
  faqAnswer: { fontSize: 12, color: '#6B7280', lineHeight: 18, marginTop: 10 },
});

export default FAQsScreen;
