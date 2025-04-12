import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Bell } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductList } from '@/components/ProductList';
import { banners } from '@/mocks/banners';
import { categories } from '@/mocks/categories';
import { 
  getFeaturedProducts, 
  getNewProducts, 
  getTrendingProducts 
} from '@/mocks/products';

export default function HomeScreen() {
  const router = useRouter();
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const trendingProducts = getTrendingProducts();

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.primary} />
            <Text style={styles.locationText}>New York, USA</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hello, Beautiful!</Text>
        <Text style={styles.subtitle}>Discover your perfect beauty products</Text>

        <SearchBar onPress={handleSearchPress} />

        <BannerCarousel banners={banners} />

        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                size="small"
              />
            ))}
          </ScrollView>
        </View>

        <ProductList 
          title="New Arrivals" 
          products={newProducts}
          seeAllLink="/category/new"
        />

        <ProductList 
          title="Featured Products" 
          products={featuredProducts}
          seeAllLink="/category/featured"
        />

        <ProductList 
          title="Trending Now" 
          products={trendingProducts}
          seeAllLink="/category/trending"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 8,
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  notificationButton: {
    padding: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
  },
});