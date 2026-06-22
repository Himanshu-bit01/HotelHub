import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar } from 'lucide-react-native';

// ─────────────────────────────────────────────────────
//  STATS
// ─────────────────────────────────────────────────────
const REVIEW_STATS = [
  { id: 1, count: '0', label: 'Total Stays', color: '#7C3AED' },
  { id: 2, count: '0', label: 'Review writting', color: '#10B981' },
  { id: 3, count: '0', label: 'Pending reviews', color: '#F97316' },
];

// ─────────────────────────────────────────────────────
//  REVIEWS & RATINGS SCREEN
// ─────────────────────────────────────────────────────
const ReviewsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Back bar ── */}
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
        {/* ── Title ── */}
        <Text style={styles.title}>Reviews & Ratings</Text>
        <Text style={styles.subtitle}>
          Rate your completed stays and help other travelers
        </Text>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          {REVIEW_STATS.map(s => (
            <View key={s.id} style={styles.statCard}>
              <Text style={[styles.statCount, { color: s.color }]}>{s.count}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Empty State ── */}
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconWrap}>
            <Calendar size={26} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>No completed stays yet</Text>
          <Text style={styles.emptySubtitle}>Complete a stay to write your first review</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  topBar: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 18, paddingTop: 4 },

  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12.5,
    color: '#9CA3AF',
    lineHeight: 17,
    marginTop: 4,
    marginBottom: 18,
  },

  // ── Stats Row ──
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  statCount: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },

  // ── Empty State ──
  emptyCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 11.5,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default ReviewsScreen;