import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Heart,
  User,
  Menu,
  Search,
  TrendingUp,
  Compass,
  Info,
  FlameKindling,
  Flame,
  BrickWallFire,
  FlameIcon,
} from 'lucide-react-native';


const { height } = Dimensions.get('window');

const HeroSection = ({ navigation }) => {
  return (
    <View style={styles.heroBlock}>
      {/* Background hotel image */}
      <Image
        source={require('../../assets/images/background.jpeg')}
        style={styles.heroBgImage}
        resizeMode="cover"
      />

      {/* Dark purple overlay */}
      <View style={styles.heroOverlay} />

      {/* ── Top Nav Bar ── */}
      <View style={styles.topBar}>
        <Text style={styles.brandName}>
          <Text style={styles.brandWhite}>Hotel</Text>
          <Text style={styles.brandPurple}>Hub</Text>
        </Text>
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Info size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
          
        </View>
      </View>

      {/* ── Search Tabs ── */}
      <View style={styles.searchTabsRow}>
        {[
          { label: 'Search', Icon: Search },
          { label: 'Trending', Icon: FlameIcon},
          { label: 'Explore', Icon: Compass },
        ].map(({ label, Icon }, i) => (
          <TouchableOpacity
            key={i}
            style={styles.searchTab}
            onPress={() => {
              if (label === 'Search' && navigation) {
                navigation.navigate('Search');
              }
            }}
          >
            <Icon size={13} color="#CCC" strokeWidth={2} />
            <Text style={styles.searchTabText}>  {label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Hero Text ── */}
      <View style={styles.heroContent}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeIcon}>✦</Text>
          <Text style={styles.heroBadgeText}> STAY BEYOND EXPECTATION</Text>
        </View>

        <Text style={styles.heroTitle}>Your Perfect</Text>
        <Text style={styles.heroTitleRow}>
          <Text style={styles.heroTitleAccent}>Stay </Text>
          <Text style={styles.heroTitle}>Awaits</Text>
        </Text>

        <Text style={styles.heroSub}>
          Discover luxury hotels, vacation rentals, and unique accommodations worldwide.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroBlock: {
    width: '100%',
    height: height * 0.56,
    overflow: 'hidden',
    backgroundColor: '#1A0533',
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1A0533',
    opacity: 0.65,
  },

  // ── Top Nav Bar ──
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 12,
    zIndex: 10,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandWhite: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  brandPurple: {
    fontSize: 24,
    color: '#A855F7',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Search Tabs ──
  searchTabsRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: 'rgba(115, 73, 194, 0.08)',
    borderWidth:2,
    borderColor: 'rgba(209, 43, 173, 0.25)',
    borderRadius: 10,
    zIndex: 10,
  },
  searchTab: {
    paddingTop:12 ,
    paddingBottom:13 ,
    paddingLeft:21 ,
    paddingRight:22 ,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  searchTabText: {
    fontSize: 14,
    color: '#CCC',
    fontWeight: '500',
  },

  // ── Hero Text ──
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    zIndex: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 33, 170, 0.95)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  heroBadgeIcon: { fontSize: 10, color: '#ffffff' },
  heroBadgeText: {
    fontSize: 15,
    color: '#ffffff',
    width:246,
    height:34,
    paddingTop:5,
    paddingBottom:6 ,
    paddingLeft:9 ,
    paddingRight:3 ,
    fontWeight: '600',
    letterSpacing: 1,
    // elevation: 5,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'nowrap',
  },
  
  heroTitle: {
    fontSize: 32,
    fontFamily:'PortLligatSlab-Regular',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  heroTitleAccent: {
    fontSize: 40,
    color: '#945ec9f1',
    fontFamily:'PetitFormalScript-Regular',
    lineHeight: 50,
  },
  heroSub: {
    fontSize: 15,
    color: '#f8f6fa',
    marginTop: 15,
    fontFamily:'PortLligatSlab-Regular',
    lineHeight: 20,
    maxWidth: '60%',
  },
});

export default HeroSection;