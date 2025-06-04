import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Categories: React.FC<{
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}> = ({ onCategoryChange, activeCategory }) => {
  const categories = ["Characters", "Planets", "Films"];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryChange(category)}
          style={[
            styles.categoryButton,
            activeCategory === category && styles.activeCategoryButton,
          ]}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Categories;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  activeCategoryButton: {
    backgroundColor: "#988EE4",
  },
  categoryText: {
    color: "#fff",
  },
});
