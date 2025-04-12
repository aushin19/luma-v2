import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { getProductById } from '@/mocks/products';
import { Button } from '@/components/Button';

export default function WishlistScreen() {
  const router = useRouter();
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const wishlistProducts = items
    .map(id => getProductById(id))
    .filter(product => product !== undefined);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    addItem(productId, 1);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
  };

  if (wishlistProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Heart size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyText}>
            Save your favorite items to buy them later
          </Text>
          <Button 
            title="Start Shopping" 
            onPress={() => router.push('/')}
            style={styles.shopButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.count}>{wishlistProducts.length} items</Text>
      </View>

      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item!.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity
              style={styles.productPress}
              onPress={() => handleProductPress(item!.id)}
            >
              <Image 
                source={{ uri: item!.images[0] }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.brand}>{item!.brand}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item!.name}
                </Text>
                <Text style={styles.price}>${item!.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleAddToCart(item!.id)}
              >
                <ShoppingBag size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleRemoveFromWishlist(item!.id)}
              >
                <Trash2 size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  count: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productPress: {
    flex: 1,
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  brand: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  actions: {
    justifyContent: 'space-around',
    padding: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    width: 200,
  },
});