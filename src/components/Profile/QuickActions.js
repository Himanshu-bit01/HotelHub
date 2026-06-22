import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BookOpen,
  CreditCard,
  Pencil,
  HeadphonesIcon,
} from 'lucide-react-native';

const QUICK_ACTIONS = [
  { id: 'bookings', label: 'Bookings', Icon: BookOpen, iconBg: '#EDE9FE', iconColor: '#7C3AED', screen: 'Bookings' },
  { id: 'payments', label: 'Payments', Icon: CreditCard, iconBg: '#D1FAE5', iconColor: '#059669', screen: 'Payments' },
  { id: 'review', label: 'Review', Icon: Pencil, iconBg: '#FEF3C7', iconColor: '#D97706', screen: 'Reviews' },
  { id: 'support', label: 'Support', Icon: HeadphonesIcon, iconBg: '#FEE2E2', iconColor: '#DC2626', screen: 'Support' },
];

const QuickActions = ({ navigation }) => {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map(q => (
          <TouchableOpacity
            key={q.id}
            style={styles.quickAction}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(q.screen)}
          >
            <View style={[styles.qaIcon, { backgroundColor: q.iconBg }]}>
              <q.Icon size={18} color={q.iconColor} strokeWidth={1.8} />
            </View>
            <Text style={styles.qaLabel}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },

  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  qaIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  qaLabel: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '600',
  },
});

export default QuickActions;