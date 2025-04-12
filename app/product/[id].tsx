import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Heart, ShoppingBag, Star, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getProductById } from '@/mocks/products';
import { Button } from '@/components/Button';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id);
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(
    product?.shades && product.shades.length > 0 ? product.shades[0].id : undefined
  );
  const [activeTab, setActiveTab] = useState('description');
  const isWishlisted = isInWishlist(id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleIncrease = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };

  const handleDecrease = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    const shadeName = product.shades?.find(s => s.id === selectedShade)?.name;
    addItem(id, quantity, shadeName);
    router.push('/cart');
  };

  const handleToggleWishlist = () => {
    toggleItem(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: product.name,
          headerRight: () => (
            <TouchableOpacity 
              style={styles.wishlistButton}
              onPress={handleToggleWishlist}
            >
              <Heart 
                size={24} 
                color={isWishlisted ? colors.error : colors.text.primary}
                fill={isWishlisted ? colors.error : 'none'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageCarousel}>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image 
                source={{ uri: item }} 
                style={styles.productImage}
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          
          <View style={styles.priceRatingContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>
                ({product.reviewCount} reviews)
              </Text>
            </View>
          </View>

          {product.shades && product.shades.length > 0 && (
            <View style={styles.shadesContainer}>
              <Text style={styles.shadesTitle}>Shades</Text>
              <View style={styles.shadeOptions}>
                {product.shades.map(shade => (
                  <TouchableOpacity
                    key={shade.id}
                    style={[
                      styles.shadeOption,
                      selectedShade === shade.id && styles.selectedShadeOption,
                    ]}
                    onPress={() => setSelectedShade(shade.id)}
                  >
                    <View 
                      style={[
                        styles.shadeColor, 
                        { backgroundColor: shade.colorCode }
                      ]} 
                    />
                    <Text 
                      style={[
                        styles.shadeName,
                        selectedShade === shade.id && styles.selectedShadeName,
                      ]}
                    >
                      {shade.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'description' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('description')}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === 'description' && styles.activeTabText,
                ]}
              >
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'ingredients' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === 'ingredients' && styles.activeTabText,
                ]}
              >
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'usage' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('usage')}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === 'usage' && styles.activeTabText,
                ]}
              >
                How to Use
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'description' && (
              <Text style={styles.tabContentText}>{product.description}</Text>
            )}
            {activeTab === 'ingredients' && (
              <Text style={styles.tabContentText}>
                {product.ingredients || 'Ingredients information not available.'}
              </Text>
            )}
            {activeTab === 'usage' && (
              <Text style={styles.tabContentText}>
                {product.usage || 'Usage information not available.'}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Add to Cart"
          fullWidth
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          icon={<ShoppingBag size={20} color={colors.text.light} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wishlistButton: {
    padding: 8,
  },
  imageCarousel: {
    width: '100%',
    height: width,
  },
  productImage: {
    width,
    height: width,
  },
  infoContainer: {
    padding: 16,
  },
  brand: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginLeft: 4,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  shadesContainer: {
    marginBottom: 24,
  },
  shadesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  shadeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shadeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedShadeOption: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(141, 123, 104, 0.1)',
  },
  shadeColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  shadeName: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedShadeName: {
    fontWeight: '500',
    color: colors.primary,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  activeTabText: {
    fontWeight: '600',
    color: colors.primary,
  },
  tabContent: {
    marginBottom: 100,
  },
  tabContentText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 24,
  },
});