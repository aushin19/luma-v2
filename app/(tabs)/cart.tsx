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
import { ShoppingBag, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useCartStore } from '@/store/cart-store';
import { getProductById } from '@/mocks/products';
import { Button } from '@/components/Button';
import { QuantitySelector } from '@/components/QuantitySelector';

export default function CartScreen() {
  const router = useRouter();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getCartTotal,
    clearCart
  } = useCartStore();

  const cartProducts = items.map(item => ({
    product: getProductById(item.productId),
    quantity: item.quantity,
    shade: item.shade,
  })).filter(item => item.product !== undefined);

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add items to your cart to checkout
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
        <Text style={styles.title}>Shopping Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.product!.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity
              style={styles.productPress}
              onPress={() => handleProductPress(item.product!.id)}
            >
              <Image 
                source={{ uri: item.product!.images[0] }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.brand}>{item.product!.brand}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.product!.name}
                </Text>
                {item.shade && (
                  <Text style={styles.shade}>Shade: {item.shade}</Text>
                )}
                <Text style={styles.price}>${item.product!.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeItem(item.product!.id)}
              >
                <Trash2 size={18} color={colors.error} />
              </TouchableOpacity>
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.product!.id, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.product!.id, item.quantity - 1)}
              />
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <Button 
              title="Proceed to Checkout" 
              fullWidth
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
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
  clearText: {
    fontSize: 14,
    color: colors.primary,
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  productPress: {
    flexDirection: 'row',
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
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
    marginBottom: 4,
  },
  shade: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 12,
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    marginTop: 8,
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