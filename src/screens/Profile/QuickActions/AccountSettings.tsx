import React, { useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { Camera, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { formReducer } from './accountSettingsReducer';

function AccountSettings() {
  const account = useSelector(
    (state: any) => state.account || {}
  );

  const [state, dispatch] = useReducer(formReducer, {
    firstName: account.firstName || 'Arjun',
    lastName: account.lastName || 'Sharma',
    newEmail: '',
    newPhone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Account Settings</Text>
      <Text style={styles.subtitle}>Manage your profile, security, and preferences</Text>

      {/* ── Profile Information ── */}
      <Text style={styles.sectionTitle}>Profile Information</Text>
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Camera size={34} color="#fff" />
          </View>
          <View>
            <Text style={styles.profileName}>Arjun Sharma</Text>
            <Text style={styles.memberText}>Member since January 2024</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.uploadText}>Upload new photo</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={state.firstName} onChangeText={(v) => dispatch({ type: 'SET_FIRST_NAME', payload: v })} />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={state.lastName} onChangeText={(v) => dispatch({ type: 'SET_LAST_NAME', payload: v })} />
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save changes</Text>
        </Pressable>
      </View>

      {/* ── Email Verification ── */}
      <Text style={styles.sectionTitle}>Email Verification</Text>
      <View style={styles.card}>
        <Text style={styles.desc}>Update and Verify your email address with a one-time password.</Text>

        <View style={styles.infoRow}>
          <Mail size={34} color="#22D3EE" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.smallLabel}>Current Email</Text>
            <Text style={styles.infoValue}>arjun.sharma@example.com</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <CheckCircle size={18} color="#16A34A" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <Text style={styles.label}>New Email Address</Text>
        <View style={styles.actionRow}>
          <TextInput
            style={styles.emailInput}
            placeholder="new@example.com"
            value={state.newEmail}
            onChangeText={(v) => dispatch({ type: 'SET_NEW_EMAIL', payload: v })}
          />
          <Pressable style={styles.otpButton}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Phone Verification ── */}
      <Text style={styles.sectionTitle}>Phone Verification</Text>
      <View style={styles.card}>
        <Text style={styles.desc}>Update and verify your phone number with a one-time password.</Text>

        <View style={styles.infoRow}>
          <Phone size={34} color="#22C55E" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.smallLabel}>Current Phone</Text>
            <Text style={styles.infoValue}>+91 9876543210</Text>
          </View>
          <View style={styles.unverifiedBadge}>
            <AlertCircle size={18} color="#F97316" />
            <Text style={styles.unverifiedText}>Unverified</Text>
          </View>
        </View>

        <Text style={styles.label}>New Phone Number</Text>
        <View style={styles.actionRow}>
          <TextInput
            style={styles.emailInput}
            placeholder="+91 9876543210"
            value={state.newPhone}
            onChangeText={(v) => dispatch({ type: 'SET_NEW_PHONE', payload: v })}
          />
          <Pressable style={styles.otpButton}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Change Password ── */}
      <Text style={styles.sectionTitle}>Change Password</Text>
      <View style={styles.card}>
        <Text style={styles.desc}>Use a strong password with at least 8 characters.</Text>

        <Text style={styles.label}>Current Password</Text>
        <TextInput style={styles.input} secureTextEntry value={state.currentPassword} onChangeText={(v) => dispatch({ type: 'SET_CURRENT_PASSWORD', payload: v })} placeholder="••••••••" />

        <Text style={styles.label}>New Password</Text>
        <TextInput style={styles.input} secureTextEntry value={state.newPassword} onChangeText={(v) => dispatch({ type: 'SET_NEW_PASSWORD', payload: v })} placeholder="••••••••" />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput style={styles.input} secureTextEntry value={state.confirmPassword} onChangeText={(v) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: v })} placeholder="••••••••" />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save changes</Text>
        </Pressable>
      </View>

      {/* ── Login Security ── */}
      <Text style={styles.sectionTitle}>Login Security</Text>
      <View style={styles.card}>
        <Text style={styles.desc}>Manage two-factor authentication and login settings.</Text>

        <View style={styles.securityRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>Two-Factor Authentication</Text>
            <Text style={styles.securityDesc}>Add an extra layer of security. An OTP will be sent to your phone on each login.</Text>
          </View>
          <Pressable style={[styles.button, { width: 90, marginTop: 0 }]}>
            <Text style={styles.buttonText}>Enable</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.securityTitle}>Active Sessions</Text>
          <Text style={styles.securityDesc}>You are currently logged in on 1 device.</Text>
          <Text style={styles.sessionTitle}>Chrome on Windows</Text>
          <Text style={styles.sessionSub}>Last active: Just now · New Delhi, India</Text>
          <Pressable>
            <Text style={styles.signOutText}>Sign out all other devices</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default AccountSettings;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 50 },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 10, marginTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#7C3AED', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  memberText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  uploadText: { fontSize: 12, color: '#7C3AED', fontWeight: '600', marginTop: 4 },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  label: { fontSize: 12, fontWeight: '600', color: '#6B7280', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#111827' },
  button: { backgroundColor: '#7C3AED', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 14 },
  buttonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  desc: { fontSize: 13, color: '#6B7280', marginBottom: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  smallLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
  infoValue: { fontSize: 14, color: '#111827', fontWeight: '500', marginTop: 2 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  verifiedText: { fontSize: 11, color: '#16A34A', fontWeight: '600' },
  unverifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  unverifiedText: { fontSize: 11, color: '#F97316', fontWeight: '600' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  emailInput: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#111827' },
  otpButton: { backgroundColor: '#7C3AED', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 },
  securityRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  securityTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  securityDesc: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  sessionTitle: { fontSize: 13, fontWeight: '600', color: '#111827', marginTop: 10 },
  sessionSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  signOutText: { fontSize: 13, color: '#EF4444', fontWeight: '600', marginTop: 10 },
});