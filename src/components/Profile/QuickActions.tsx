import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  BookOpen,
  CreditCard,
  Pencil,
  HeadphonesIcon,
} from 'lucide-react-native';


const QUICK_ACTIONS = [
  { id: 'bookings', label: 'Bookings', Icon: BookOpen, iconBg: '#EDE9FE', iconColor: '#7C3AED', screen: 'Bookings' as const },
  { id: 'payments', label: 'Payments', Icon: CreditCard, iconBg: '#D1FAE5', iconColor: '#059669', screen: 'Payments' as const },
  { id: 'review', label: 'Review', Icon: Pencil, iconBg: '#FEF3C7', iconColor: '#D97706', screen: 'Reviews' as const },
  { id: 'support', label: 'Support', Icon: HeadphonesIcon, iconBg: '#FEE2E2', iconColor: '#DC2626', screen: 'Support' as const },
];

type QuickActionsProps = {
  navigation: any;
};

const QuickActions = ({ navigation }: QuickActionsProps) => {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map(q => (
          <Pressable
            key={q.id}
            style={styles.quickAction}
            onPress={() => navigation.navigate(q.screen)}
          >
            <View style={[styles.qaIcon, { backgroundColor: q.iconBg }]}>
              <q.Icon size={18} color={q.iconColor} strokeWidth={1.8} />
            </View>
            <Text style={styles.qaLabel}>{q.label}</Text>
          </Pressable>
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
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
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
