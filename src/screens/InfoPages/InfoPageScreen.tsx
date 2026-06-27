import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { getInfoPageData } from './infoPageData';

type InfoPageScreenProps = {
  navigation: any;
  route: any;
};

const InfoPageScreen = ({ navigation, route }: InfoPageScreenProps) => {
  const insets = useSafeAreaInsets();
  const { type } = route.params || { type: 'meals' };
  const data = getInfoPageData(type);

  if (!data) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color="#111827" strokeWidth={2} />
          </Pressable>
        </View>
        <View style={styles.centerBox}>
          <Text style={styles.centerTxt}>Page not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>{data.title}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>{data.subtitle}</Text>

        {data.sections.map((section) => (
          <View key={section.title} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 18, paddingTop: 4 },
  subtitle: { fontSize: 13, color: '#9CA3AF', marginBottom: 18 },
  sectionCard: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, padding: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  sectionContent: { fontSize: 13, color: '#6B7280', lineHeight: 20 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerTxt: { fontSize: 16, fontWeight: '600', color: '#6B7280' },
});

export default InfoPageScreen;
