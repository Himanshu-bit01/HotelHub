import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";
import { useAppDispatch } from "../../redux/hooks";
import { setFilters, resetFilters } from "../../redux/store/slices/filterSlice";

const toggleSelection = (
  value: string | number,
  state: any[],
  setter: any
) => {
  if (state.includes(value)) {
    setter(state.filter((item: any) => item !== value));
  } else {
    setter([...state, value]);
  }
};

const propertyTypesData = [
  { label: "Home", icon: require("../../assets/images/home.png") },
  { label: "Resort", icon: require("../../assets/images/resort.png") },
  { label: "Apartment", icon: require("../../assets/images/apartment.png") },
  { label: "Villa", icon: require("../../assets/images/villa.png") },
  { label: "Homestay", icon: require("../../assets/images/homestay.png") },
  { label: "Guest House", icon: require("../../assets/images/guesthouse.png") },
  { label: "Hostels", icon: require("../../assets/images/hostel.png") },
  {
    label: "Hotel Boutique",
    icon: require("../../assets/images/boutique.png"),
  },
];

const amenitiesData = [
  "Wi-Fi",
  "Gym",
  "Breakfast",
  "Parking",
  "Pool",
  "Airport Transfer",
  "Restaurant",
  "Business Desk",
  "Spa",
  "Kitchenette",
];

const suitabilityData = [
  "Pet Friendly",
  "Senior Citizen Friendly",
  "Couple Friendly",
  "Business Friendly",
  "Celebration Friendly",
];

export default function FilterScreen() {
  const dispatch = useAppDispatch();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [bedrooms, setBedrooms] = useState<number[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [guestRating, setGuestRating] = useState<number | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [suitability, setSuitability] = useState<string[]>([]);

  const applyFilters = () => {
    dispatch(
      setFilters({
        minPrice,
        maxPrice,
        bedrooms,
        propertyTypes,
        starRatings: ratings,
        guestRatings: guestRating ? [guestRating] : [],
        amenities,
        suitability,
      })
    );
  };

  const clearFilters = () => {
    dispatch(resetFilters());

    setMinPrice(0);
    setMaxPrice(100000);
    setBedrooms([]);
    setPropertyTypes([]);
    setRatings([]);
    setGuestRating(null);
    setAmenities([]);
    setSuitability([]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: 30,
      }}
    >
      <Text style={styles.heading}>Filters</Text>

      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <View style={styles.card}>
            <Text style={styles.title}>Price Range</Text>

            <Slider
              minimumValue={0}
              maximumValue={100000}
              step={1000}
              value={maxPrice}
              minimumTrackTintColor="#B73EFF"
              maximumTrackTintColor="#E5D6FF"
              onValueChange={(value) => setMaxPrice(value)}
            />

            <Text style={styles.priceText}>
              ₹{minPrice.toLocaleString("en-IN")} - ₹
              {maxPrice.toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Property Types</Text>

            <View style={styles.grid}>
              {propertyTypesData.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() =>
                    toggleSelection(item.label, propertyTypes, setPropertyTypes)
                  }
                  style={[
                    styles.propertyCard,
                    propertyTypes.includes(item.label) &&
                      styles.selectedProperty,
                  ]}
                >
                  <Image source={item.icon} style={styles.icon} />
                  <Text>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Guest Rating</Text>

            {[3, 3.5, 4, 4.5].map((item) => (
              <Pressable
                key={item}
                onPress={() =>
                  setGuestRating(guestRating === item ? null : item)
                }
                style={[
                  styles.filterOption,
                  guestRating === item && styles.selectedFilterOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    guestRating === item && styles.selectedFilterText,
                  ]}
                >
                  {item}+ Guest Score
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable onPress={applyFilters}>
            <LinearGradient
              colors={["#7A2FFF", "#D260FF"]}
              style={styles.applyButton}
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.resetButton} onPress={clearFilters}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.card}>
            <Text style={styles.title}>Bedrooms</Text>

            <View style={styles.bedroomWrap}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Pressable
                  key={item}
                  onPress={() => toggleSelection(item, bedrooms, setBedrooms)}
                  style={[
                    styles.bedroomButton,
                    bedrooms.includes(item) && styles.selectedBedroom,
                  ]}
                >
                  <Text>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Hotel Star Rating</Text>

            {[3, 4, 5].map((item) => (
              <Pressable
                key={item}
                onPress={() => toggleSelection(item, ratings, setRatings)}
                style={[
                  styles.filterOption,
                  ratings.includes(item) && styles.selectedFilterOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    ratings.includes(item) && styles.selectedFilterText,
                  ]}
                >
                  {item} Star Hotel
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Groups & Suitability</Text>

            {suitabilityData.map((item) => (
              <Pressable
                key={item}
                onPress={() =>
                  toggleSelection(item, suitability, setSuitability)
                }
                style={[
                  styles.filterOption,
                  suitability.includes(item) && styles.selectedFilterOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    suitability.includes(item) && styles.selectedFilterText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Amenities</Text>

            {amenitiesData.map((item) => (
              <Pressable
                key={item}
                onPress={() => toggleSelection(item, amenities, setAmenities)}
                style={[
                  styles.filterOption,
                  amenities.includes(item) && styles.selectedFilterOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    amenities.includes(item) && styles.selectedFilterText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111",
    marginTop: 20,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  leftColumn: {
    flex: 1,
  },

  rightColumn: {
    flex: 1,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },

  priceText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  propertyCard: {
    width: "47%",
    height: 90,
    borderWidth: 1.5,
    borderColor: "#E7B6FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#FFF",
  },

  selectedProperty: {
    backgroundColor: "#F3D8FF",
    borderColor: "#C85FFF",
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginBottom: 8,
  },

  bedroomWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  bedroomButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  selectedBedroom: {
    backgroundColor: "#F3D8FF",
    borderColor: "#C85FFF",
  },

  optionText: {
    fontSize: 16,
    color: "#111",
    marginBottom: 14,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#444",
    marginRight: 12,
  },

  checkedBox: {
    backgroundColor: "#B73EFF",
    borderColor: "#B73EFF",
  },

  applyButton: {
    height: 64,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    boxShadow: "0 4px 10px rgba(162,75,255,0.3)",
  },

  applyText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  resetButton: {
    height: 64,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 40,
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
  },

  resetText: {
    color: "#C85FFF",
    fontSize: 22,
    fontWeight: "700",
  },

  showMore: {
    color: "#B73EFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 8,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  star: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginLeft: 3,
  },

  ratingBadge: {
    backgroundColor: "#F3D8FF",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },

  ratingBadgeText: {
    textAlign: "center",
    color: "#B73EFF",
    fontSize: 18,
    fontWeight: "700",
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 10,
  },

  selectedFilterOption: {
    backgroundColor: "#F3D8FF",
    borderColor: "#C85FFF",
  },

  selectedFilterText: {
    color: "#B73EFF",
    fontWeight: "700",
  },
});
