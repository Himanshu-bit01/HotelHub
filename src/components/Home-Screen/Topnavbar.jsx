import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Info, Search, Compass, FlameIcon } from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';

const TABS = [
  { label: 'Search', Icon: Search },
  { label: 'Trending', Icon: FlameIcon },
  { label: 'Explore', Icon: Compass },
];

const TopNavBar = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useHomeContext();

  // Derive the actual current route name from navigation state.
  // Check the parent navigator first (tab/stack), then fall back to
  // the local navigator. This ensures we always reflect the real
  // screen that is visible, not just the last tab the user tapped.
  const getActiveRouteName = () => {
    if (!navigation) return null;
    try {
      const parent = navigation.getParent();
      const state = parent ? parent.getState() : navigation.getState();
      if (!state) return null;
      return state.routes[state.index]?.name ?? null;
    } catch {
      return null;
    }
  };

  // Re-evaluate on every render so the highlight updates the moment
  // the user navigates away from one of the tab screens.
  const activeRouteName = getActiveRouteName();

  // A tab is highlighted only when the current visible screen matches
  // its label. If we are on any other screen (e.g. Bookings, Details)
  // none of the tabs will appear selected.
  const isTabActive = (label) => activeRouteName === label;

  return (
    <View style={styles.container}>
      {/* ── Brand Row ── */}
      <View style={styles.brandRow}>
        {/* Logo */}
        <Text style={styles.logoText}>
          <Text style={styles.logoHotel}>Hotel</Text>
          <Text style={styles.logoHub}>Hub</Text>
        </Text>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Info size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Search / Trending / Explore Tabs ── */}
      <View style={styles.tabsWrapper}>
        <View style={styles.searchTabsRow}>
          {TABS.map(({ label, Icon }, i) => {
            const isActive = isTabActive(label);
            return (
              <TouchableOpacity
                key={i}
                style={[styles.searchTab, isActive && styles.searchTabActive]}
                onPress={() => {
                  setSelectedTab(label);
                  if (navigation) {
                    const parent = navigation.getParent();
                    if (parent) {
                      parent.navigate(label);
                    } else {
                      const currentRoute =
                        navigation.getState()?.routes[navigation.getState()?.index]?.name;
                      if (currentRoute !== label) {
                        navigation.navigate(label);
                      }
                    }
                  }
                }}
              >
                <Icon size={13} color={isActive ? '#FFFFFF' : '#BBBBBB'} strokeWidth={2} />
                <Text style={[styles.searchTabText, isActive && styles.searchTabTextActive]}>
                  {'  '}
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A0533',
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },

  // ── Brand Row ──
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  logoHotel: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  logoHub: {
    color: '#C084FC',
    fontWeight: '800',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Tabs ──
  tabsWrapper: {
    paddingHorizontal: 0,
  },
  searchTabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(209, 43, 173, 0.30)',
    borderRadius: 10,
    padding: 3,
  },
  searchTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
  },
  searchTabActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.60)',
  },
  searchTabText: {
    fontSize: 13,
    color: '#BBBBBB',
    fontWeight: '500',
  },
  searchTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default TopNavBar;