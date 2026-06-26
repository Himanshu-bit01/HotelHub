import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { Heart, Info, Search, Compass, FlameIcon } from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';

const TABS = [
  { label: 'Search', Icon: Search },
  { label: 'Trending', Icon: FlameIcon },
  { label: 'Explore', Icon: Compass },
];

export type NavBarTheme = 'dark' | 'light';

type TopNavBarProps = {
  navigation: any;
  containerStyle?: ViewStyle;
  /** 'dark' = original deep-purple bg (HomeScreen default)
   *  'light' = white bg with dark icons/text (OfferScreen) */
  theme?: NavBarTheme;
};

const THEME = {
  dark: {
    container: { backgroundColor: '#1A0533' },
    logoHotel: { color: '#FFFFFF' },
    logoHub: { color: '#C084FC' },
    iconColor: '#FFFFFF',
    tabsRow: {
      backgroundColor: 'rgba(255,255,255,0.07)',
      borderColor: 'rgba(209, 43, 173, 0.30)',
    },
    tabActiveBackground: 'rgba(124, 58, 237, 0.60)',
    tabText: { color: '#BBBBBB' },
    tabTextActive: { color: '#FFFFFF' },
    tabIconColor: '#BBBBBB',
    tabIconActiveColor: '#FFFFFF',
  },
  light: {
    container: { backgroundColor: '#FFFFFF' },
    logoHotel: { color: '#111827' },
    logoHub: { color: '#7C3AED' },
    iconColor: '#374151',
    tabsRow: {
      backgroundColor: 'rgba(124,58,237,0.06)',
      borderColor: 'rgba(209, 43, 173, 0.25)',
    },
    tabActiveBackground: 'rgba(124, 58, 237, 0.60)',
    tabText: { color: '#6B7280' },
    tabTextActive: { color: '#FFFFFF' },
    tabIconColor: '#6B7280',
    tabIconActiveColor: '#FFFFFF',
  },
};

const TopNavBar = ({ navigation, containerStyle, theme = 'dark' }: TopNavBarProps) => {
  const { setSelectedTab } = useHomeContext();
  const t = THEME[theme];

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
    <View style={[styles.container, t.container, containerStyle]}>
      <View style={styles.brandRow}>
        <Text style={styles.logoText}>
          <Text style={[styles.logoHotel, t.logoHotel]}>Hotel</Text>
          <Text style={[styles.logoHub, t.logoHub]}>Hub</Text>
        </Text>

        <View style={styles.rightIcons}>
          <Pressable style={styles.iconBtn}>
            <Heart size={20} color={t.iconColor} strokeWidth={1.8} />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Info size={20} color={t.iconColor} strokeWidth={1.8} />
          </Pressable>
        </View>
      </View>

      <View style={styles.tabsWrapper}>
        <View style={[styles.searchTabsRow, t.tabsRow]}>
          {TABS.map(({ label, Icon }) => {
            const isActive = isTabActive(label);
            return (
              <Pressable
                key={label}
                style={[
                  styles.searchTab,
                  isActive && { backgroundColor: t.tabActiveBackground },
                ]}
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
                <Icon
                  size={13}
                  color={isActive ? t.tabIconActiveColor : t.tabIconColor}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.searchTabText,
                    t.tabText,
                    isActive && (t.tabTextActive as TextStyle),
                  ]}
                >
                  {'  '}
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: '800',
  },
  logoHub: {
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
    borderWidth: 1.5,
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
  searchTabText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default TopNavBar;