import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Info, Search, Compass, FlameIcon } from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';

const TABS = [
  { label: 'Search', Icon: Search },
  { label: 'Trending', Icon: FlameIcon },
  { label: 'Explore', Icon: Compass },
];

type TopNavBarProps = {
  navigation: any;
};

const TopNavBar = ({ navigation }: TopNavBarProps) => {
  const { setSelectedTab } = useHomeContext();

  const getActiveRouteName = (): string | null => {
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

  const activeRouteName = getActiveRouteName();

  const isTabActive = (label: string) => activeRouteName === label;

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <Text style={styles.logoText}>
          <Text style={styles.logoHotel}>Hotel</Text>
          <Text style={styles.logoHub}>Hub</Text>
        </Text>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Info size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>

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
                      parent.navigate(label as any);
                    } else {
                      const currentRoute =
                        navigation.getState()?.routes[navigation.getState()?.index]?.name;
                      if (currentRoute !== label) {
                        navigation.navigate(label as any);
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
