import React, { useReducer } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MessageSquare,
  Minus,
  Plus,
  BedDouble,
  Calendar,
} from 'lucide-react-native';
import { getPropertyById } from '../PropertyDetails/propertyData';
import { getRoomById } from '../RoomSelection/roomData';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  specialRequests: string;
};

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'INCREMENT'; field: 'adults' | 'children' }
  | { type: 'DECREMENT'; field: 'adults' | 'children' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'INCREMENT':
      return { ...state, [action.field]: state[action.field] + 1 };
    case 'DECREMENT':
      if (action.field === 'adults' && state.adults <= 1) return state;
      if (action.field === 'children' && state.children <= 0) return state;
      return { ...state, [action.field]: state[action.field] - 1 };
    default:
      return state;
  }
};

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  adults: 2,
  children: 0,
  specialRequests: '',
};

type FormInputProps = {
  label: string;
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
};

const FormInput = ({ label, icon: Icon, placeholder, value, onChangeText, keyboardType }: FormInputProps) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputBox}>
      <Icon size={16} color="#7C3AED" strokeWidth={2} />
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

type GuestCounterProps = {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const GuestCounter = ({ label, count, onIncrement, onDecrement }: GuestCounterProps) => (
  <View style={styles.counterRow}>
    <Text style={styles.counterLabel}>{label}</Text>
    <View style={styles.counterControls}>
      <Pressable style={styles.counterBtn} onPress={onDecrement}>
        <Minus size={16} color="#7C3AED" strokeWidth={2.5} />
      </Pressable>
      <Text style={styles.counterValue}>{count}</Text>
      <Pressable style={styles.counterBtn} onPress={onIncrement}>
        <Plus size={16} color="#7C3AED" strokeWidth={2.5} />
      </Pressable>
    </View>
  </View>
);

type GuestDetailsScreenProps = {
  navigation: any;
  route: any;
};

const GuestDetailsScreen = ({ navigation, route }: GuestDetailsScreenProps) => {
  const insets = useSafeAreaInsets();
  const { hotelId, roomId } = route.params || { hotelId: 1, roomId: 101 };
  const [form, dispatch] = useReducer(formReducer, initialState);

  const property = getPropertyById(hotelId);
  const room = getRoomById(roomId);

  const handleSubmit = () => {
    if (!form.fullName.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }
    if (!form.email.trim()) {
      Alert.alert('Required', 'Please enter your email address.');
      return;
    }
    if (!form.phone.trim()) {
      Alert.alert('Required', 'Please enter your phone number.');
      return;
    }
    navigation.navigate('CheckoutPayment', {
      hotelId,
      roomId,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      guests: `${form.adults} Adults${form.children > 0 ? `, ${form.children} Children` : ''}`,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Guest Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Booking Summary */}
        {property && room && (
          <View style={styles.summaryCard}>
            <Image source={{ uri: property.image }} style={styles.summaryImage} />
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryHotel} numberOfLines={1}>{property.name}</Text>
              <View style={styles.summaryDetail}>
                <BedDouble size={12} color="#7C3AED" strokeWidth={2} />
                <Text style={styles.summaryDetailTxt}>{room.name}</Text>
              </View>
              <View style={styles.summaryDetail}>
                <Calendar size={12} color="#7C3AED" strokeWidth={2} />
                <Text style={styles.summaryDetailTxt}>12–15 June, 2026 (3 Nights)</Text>
              </View>
              <Text style={styles.summaryPrice}>{room.price} <Text style={styles.summaryPerNight}>/night</Text></Text>
            </View>
          </View>
        )}

        {/* Guest Form */}
        <Text style={styles.sectionTitle}>GUEST INFORMATION</Text>

        <FormInput
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          value={form.fullName}
          onChangeText={val => dispatch({ type: 'SET_FIELD', field: 'fullName', value: val })}
        />

        <FormInput
          label="Email Address"
          icon={Mail}
          placeholder="Enter your email"
          value={form.email}
          onChangeText={val => dispatch({ type: 'SET_FIELD', field: 'email', value: val })}
          keyboardType="email-address"
        />

        <FormInput
          label="Phone Number"
          icon={Phone}
          placeholder="Enter your phone number"
          value={form.phone}
          onChangeText={val => dispatch({ type: 'SET_FIELD', field: 'phone', value: val })}
          keyboardType="phone-pad"
        />

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>GUESTS</Text>
        <View style={styles.guestsCard}>
          <GuestCounter
            label="Adults"
            count={form.adults}
            onIncrement={() => dispatch({ type: 'INCREMENT', field: 'adults' })}
            onDecrement={() => dispatch({ type: 'DECREMENT', field: 'adults' })}
          />
          <View style={styles.divider} />
          <GuestCounter
            label="Children"
            count={form.children}
            onIncrement={() => dispatch({ type: 'INCREMENT', field: 'children' })}
            onDecrement={() => dispatch({ type: 'DECREMENT', field: 'children' })}
          />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>SPECIAL REQUESTS</Text>
        <View style={styles.textAreaBox}>
          <MessageSquare size={16} color="#7C3AED" strokeWidth={2} style={{ marginTop: 2 }} />
          <TextInput
            style={styles.textArea}
            placeholder="Any special requests? (e.g., early check-in, extra pillows)"
            placeholderTextColor="#9CA3AF"
            value={form.specialRequests}
            onChangeText={val => dispatch({ type: 'SET_FIELD', field: 'specialRequests', value: val })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.bottomTotal}>Total</Text>
          <Text style={styles.bottomPrice}>{room?.price ?? '—'} <Text style={styles.bottomFor3}>for 3 nights</Text></Text>
        </View>
        <Pressable style={styles.proceedBtn} onPress={handleSubmit}>
          <Text style={styles.proceedTxt}>Proceed to Payment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 4 },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#F3E8FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  summaryImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginRight: 12,
  },
  summaryInfo: { flex: 1 },
  summaryHotel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  summaryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  summaryDetailTxt: {
    fontSize: 11,
    color: '#6B7280',
  },
  summaryPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#7C3AED',
    marginTop: 4,
  },
  summaryPerNight: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    gap: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    padding: 0,
  },
  guestsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 14,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 14,
  },
  textAreaBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    gap: 10,
  },
  textArea: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    minHeight: 80,
    padding: 0,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
  },
  bottomTotal: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  bottomPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: '#7C3AED',
  },
  bottomFor3: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  proceedBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
    boxShadow: '0 4px 10px rgba(124,58,237,0.35)',
  },
  proceedTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default GuestDetailsScreen;
