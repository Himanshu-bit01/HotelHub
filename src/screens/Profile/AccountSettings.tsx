import Icon from 'react-native-vector-icons/MaterialCommunityIcons';import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import CameraIcon from '../../assets/images/camera.png';
import MailIcon from '../../assets/images/mail.png';
import PhoneIcon from '../../assets/images/phone.png';
import CheckIcon from '../../assets/images/check.png';
import WarningIcon from '../../assets/images/warning.png';
import {launchImageLibrary} from 'react-native-image-picker';

import { useSelector, useDispatch } from 'react-redux';

const AccountSettings = () => {
  const dispatch = useDispatch();

  const account = useSelector(
    (state: any) => state.account || {}
  );

  const [firstName, setFirstName] = useState(
    account.firstName || 'Arjun',
  );

  const [lastName, setLastName] = useState(
    account.lastName || 'Sharma',
  );

  const [newEmail, setNewEmail] = useState('');

  const [newPhone, setNewPhone] = useState('');

  const [currentPassword, setCurrentPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }
  
        if (response.assets?.length && response.assets[0].uri) {
            setProfileImage(response.assets[0].uri);
          }
      },
    );
  };

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={{
    paddingBottom: 90,
  }}
  showsVerticalScrollIndicator={false}
>
      <Text style={styles.title}>
        Account Settings
      </Text>

      <Text style={styles.subtitle}>
        Manage your profile, security, and
        preferences
      </Text>
      <Text style={styles.sectionTitle}>
        Profile Information
      </Text>

      <View style={styles.card}>
        <View style={styles.profileRow}>
        <View style={styles.avatar}>
  {profileImage ? (
    <Image
      source={{uri: profileImage}}
      style={styles.avatarImage}
    />
  ) : (
    <Image
  source={CameraIcon}
  style={styles.smallIcon}
/>
  )}
</View>

          <View>
            <Text style={styles.profileName}>
              Arjun Sharma
            </Text>

            <Text style={styles.memberText}>
              Member since January 2024
            </Text>

            <Pressable onPress={pickImage}>
  <Text style={styles.uploadText}>
    Upload new photo
  </Text>
</Pressable>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>
              First Name
            </Text>

            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>
              Last Name
            </Text>

            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Save changes
          </Text>
        </Pressable>
      </View>
      <Text style={styles.sectionTitle}>
        Email Verification
      </Text>

      <View style={styles.card}>
        <Text style={styles.desc}>
          Update and Verify your email address
          with a one-time password.
        </Text>

        <View style={styles.infoRow}>
        <Image
  source={MailIcon}
  style={styles.infoIcon}
/>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.smallLabel}>
              Current Email
            </Text>

            <Text style={styles.infoValue}>
              arjun.sharma@example.com
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
          <Image
  source={CheckIcon}
  style={styles.badgeIcon}
/>

            <Text style={styles.verifiedText}>
              Verified
            </Text>
          </View>
        </View>

        <Text style={styles.label}>
          New Email Address
        </Text>

        <View style={styles.actionRow}>
  <TextInput
    style={styles.emailInput}
    placeholder="new@example.com"
    value={newEmail}
    onChangeText={setNewEmail}
  />

  <Pressable style={styles.otpButton}>
    <Text style={styles.buttonText}>
      Send OTP
    </Text>
  </Pressable>
</View>
      </View>
      <Text style={styles.sectionTitle}>
        Phone Verification
      </Text>

      <View style={styles.card}>
        <Text style={styles.desc}>
          Update and verify your phone number with a
          one-time password.
        </Text>

        <View style={styles.infoRow}>
        <Image
  source={PhoneIcon}
  style={styles.infoIcon}
/>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.smallLabel}>
              Current Phone
            </Text>

            <Text style={styles.infoValue}>
              +91 9876543210
            </Text>
          </View>

          <View style={styles.unverifiedBadge}>
          <Image
  source={WarningIcon}
  style={styles.badgeIcon}
/>

            <Text style={styles.unverifiedText}>
              Unverified
            </Text>
          </View>
        </View>

        <Text style={styles.label}>
          New Phone Number
        </Text>

        <View style={styles.actionRow}>
  <TextInput
    style={styles.emailInput}
    placeholder="+91 9876543210"
    value={newPhone}
    onChangeText={setNewPhone}
  />

  <Pressable style={styles.otpButton}>
    <Text style={styles.buttonText}>
      Send OTP
    </Text>
  </Pressable>
</View>
      </View>
      <Text style={styles.sectionTitle}>
        Change Password
      </Text>

      <View style={styles.card}>
        <Text style={styles.desc}>
          Use a strong password with at least 8
          characters.
        </Text>

        <Text style={styles.label}>
          Current Password
        </Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="••••••••"
        />

        <Text style={styles.label}>
          New Password
        </Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="••••••••"
        />

        <Text style={styles.label}>
          Confirm New Password
        </Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Save changes
          </Text>
        </Pressable>
      </View>
      <Text style={styles.sectionTitle}>
        Login Security
      </Text>

      <View style={styles.card}>
        <Text style={styles.desc}>
          Manage two-factor authentication and
          login settings.
        </Text>

        <View style={styles.securityRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>
              Two-Factor Authentication
            </Text>

            <Text style={styles.securityDesc}>
              Add an extra layer of security. An
              OTP will be sent to your phone on
              each login.
            </Text>
          </View>

          <Pressable
            style={[
              styles.button,
              {
                width: 90,
                marginTop: 0,
              },
            ]}
          >
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.securityTitle}>
            Active Sessions
          </Text>

          <Text style={styles.securityDesc}>
            You are currently logged in on 1
            device.
          </Text>

          <Text style={styles.sessionTitle}>
            Chrome on Windows
          </Text>

          <Text style={styles.sessionSub}>
            Last active: Just now · New Delhi,
            India
          </Text>

          <Pressable>
            <Text style={styles.signOutText}>
              Sign out all other devices
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      padding: 20,
      paddingTop: 50,
    },
  
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: '#000',
    },
  
    subtitle: {
      fontSize: 16,
      color: '#8B8B8B',
      marginTop: 4,
      marginBottom: 18,
    },
  
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000',
      marginBottom: 10,
      marginTop: 10,
    },
  
    card: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#E6E6E6',
      borderRadius: 16,
      padding: 18,
      marginBottom: 14,
    },
  
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
  
    avatar: {
      width: 86,
      height: 86,
      borderRadius: 43,
      backgroundColor: '#9333EA',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 43,
      },
  
    profileName: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
    },
  
    memberText: {
      fontSize: 14,
      color: '#7D7D7D',
      marginTop: 4,
    },
  
    uploadText: {
      fontSize: 16,
      color: '#A855F7',
      marginTop: 4,
    },
  
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    half: {
      width: '48%',
    },
  
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: '#000',
      marginBottom: 8,
      marginTop: 8,
    },
  
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 12,
      paddingHorizontal: 14,
      backgroundColor: '#FFF',
    },
  
    button: {
      height: 40,
      borderRadius: 14,
      backgroundColor: '#7C3AED',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      paddingHorizontal: 10,
      marginTop: 16,
    },
  
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '600',
    },
  
    desc: {
      color: '#8B8B8B',
      fontSize: 15,
      marginBottom: 18,
    },
  
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
  
    smallLabel: {
      fontSize: 14,
      color: '#8B8B8B',
    },
  
    infoValue: {
      fontSize: 16,
      color: '#000',
      marginTop: 4,
    },
  
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      
      emailInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: '#FFF',
        marginRight: 12,
      },
      
      otpButton: {
        width: 110,
        height: 40,
        borderRadius: 14,
        backgroundColor: '#7C3AED',
        justifyContent: 'center',
        alignItems: 'center',
      },
    verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#16A34A',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
  
    verifiedText: {
      color: '#16A34A',
      marginLeft: 4,
      fontWeight: '600',
    },
  
    unverifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F97316',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
  
    unverifiedText: {
      color: '#F97316',
      marginLeft: 4,
      fontWeight: '600',
    },
  
    securityRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    securityTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
  
    securityDesc: {
      color: '#777',
      fontSize: 13,
      marginTop: 4,
    },
  
    sessionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 10,
      color: '#000',
    },
  
    sessionSub: {
      color: '#777',
      marginTop: 4,
    },
  
    signOutText: {
      color: '#FF3B30',
      fontSize: 16,
      marginTop: 12,
      fontWeight: '500',
    },
    smallIcon: {
        width: 34,
        height: 34,
        resizeMode: 'contain',
      },
      
      infoIcon: {
        width: 34,
        height: 34,
        resizeMode: 'contain',
      },
      
      badgeIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
      },
  });
  
  export default AccountSettings;