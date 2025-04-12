import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Filter, ArrowUpDown } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { ProductCard } from '@/components/ProductCard';
import { 
  getProductsByCategory, 
  getFeaturedProducts, 
  getNewProducts, 
  getTrendingProducts,
  products
} from '@/mocks/products';
import { categories } from '@/mocks/categories';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  let categoryProducts = [];
  let categoryName = '';
  
  // Handle special categories
  if (id === 'featured') {
    categoryProducts = getFeaturedProducts();
    categoryName = 'Featured Products';
  } else if (id === 'new') {
    categoryProducts = getNewProducts();
    categoryName = 'New Arrivals';
  } else if (id === 'trending') {
    categoryProducts = getTrendingProducts();
    categoryName = 'Trending Now';
  } else {
    // Find category by ID
    const category = categories.find(cat => cat.id === id);
    if (category) {
      categoryName = category.name;
      categoryProducts = getProductsByCategory(category.name.toLowerCase());
    } else {
      categoryProducts = products;
      categoryName = 'All Products';
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: categoryName }} />
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color={colors.text.primary} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ArrowUpDown size={16} color={colors.text.primary} />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={categoryProducts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsGrid}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ProductCard product={item} size="medium" />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 8,
  },
  productsGrid: {
    padding: 8,
  },
  productItem: {
    flex: 1,
    padding: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});