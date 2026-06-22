import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Info, Search, Compass, FlameIcon } from 'lucide-react-native';
import { useHomeContext } from '../../redux/context/HomeContext';
import HotelHubHeader from '../HotelHubHeader/HotelHubHeader';

const TABS = [
  { label: 'Search', Icon: Search },
  { label: 'Trending', Icon: FlameIcon },
  { label: 'Explore', Icon: Compass },
];

/**
 * Shared top navigation bar (brand row + Search/Trending/Explore tabs).
 * Uses HotelHubHeader for the brand row to ensure pixel-perfect
 * consistency with all other screens.
 */
const TopNavBar = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useHomeContext();

  return (
    <HotelHubHeader
      theme="dark"
      rightIcons={
        <>
          <TouchableOpacity style={styles.iconBtn}>
            <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Info size={20} color="#FFFFFF" strokeWidth={1.8} />
          </TouchableOpacity>
        </>
      }
    >
      {/* ── Search / Trending / Explore Tabs ── */}
      <View style={styles.searchTabsRow}>
        {TABS.map(({ label, Icon }, i) => {
          const isActive = selectedTab === label;
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
                    const currentRoute = navigation.getState()?.routes[navigation.getState()?.index]?.name;
                    if (currentRoute !== label) {
                      navigation.navigate(label);
                    }
                  }
                }
              }}
            >
              <Icon size={13} color={isActive ? '#FFFFFF' : '#CCC'} strokeWidth={2} />
              <Text
                style={[styles.searchTabText, isActive && styles.searchTabTextActive]}
              >
                {'  '}
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </HotelHubHeader>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Search Tabs ──
  searchTabsRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: 'rgba(115, 73, 194, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(209, 43, 173, 0.25)',
    borderRadius: 10,
  },
  searchTab: {
    paddingTop: 12,
    paddingBottom: 13,
    paddingLeft: 21,
    paddingRight: 22,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  searchTabActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.55)',
    borderRadius: 8,
  },
  searchTabText: {
    fontSize: 14,
    color: '#CCC',
    fontWeight: '500',
  },
  searchTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default TopNavBar;
