import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Search as SearchIcon, Trending, Clock, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { products } from '@/mocks/products';

const trendingSearches = [
  'Lipstick',
  'Face serum',
  'Moisturizer',
  'Mascara',
  'Sunscreen',
];

const recentSearches = [
  'Eye cream',
  'Foundation',
  'Hair oil',
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setQuery(text);
    
    if (text.length > 2) {
      setIsSearching(true);
      // Filter products based on search query
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.brand.toLowerCase().includes(text.toLowerCase()) ||
        product.category.toLowerCase().includes(text.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleSearchItemPress = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.searchHeader}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputContainer}>
            <SearchIcon size={20} color={colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor={colors.text.secondary}
              value={query}
              onChangeText={handleSearch}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <X size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {query.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearSearch}
        >
          <X size={16} color={colors.text.secondary} />
          <Text style={styles.clearText}>Clear search</Text>
        </TouchableOpacity>
      )}

      {isSearching ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No results found for "{query}"
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              onPress={() => handleProductPress(item.id)}
            >
              <Image 
                source={{ uri: item.images[0] }} 
                style={styles.resultImage}
                resizeMode="cover"
              />
              <View style={styles.resultInfo}>
                <Text style={styles.resultBrand}>{item.brand}</Text>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.suggestionsContainer}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Trending size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Trending Searches</Text>
            </View>
            <View style={styles.searchTerms}>
              {trendingSearches.map((term, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.searchTerm}
                  onPress={() => handleSearchItemPress(term)}
                >
                  <Text style={styles.searchTermText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={16} color={colors.primary} />
                <Text style={styles.sectionTitle}>Recent Searches</Text>
              </View>
              <View style={styles.searchTerms}>
                {recentSearches.map((term, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.searchTerm}
                    onPress={() => handleSearchItemPress(term)}
                  >
                    <Text style={styles.searchTermText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBarContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    height: '100%',
  },
  cancelButton: {
    marginLeft: 12,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
    color: colors.primary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  suggestionsContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 8,
  },
  searchTerms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTerm: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchTermText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultImage: {
    width: 80,
    height: 80,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  resultBrand: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});