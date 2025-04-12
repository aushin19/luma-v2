import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  Check, 
  ChevronRight 
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useCartStore } from '@/store/cart-store';
import { getProductById } from '@/mocks/products';

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: 'CreditCard' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote' },
];

const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', price: 5.99, days: '3-5' },
  { id: 'express', name: 'Express Delivery', price: 9.99, days: '1-2' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const cartProducts = items.map(item => ({
    product: getProductById(item.productId),
    quantity: item.quantity,
    shade: item.shade,
  })).filter(item => item.product !== undefined);

  const subtotal = getCartTotal();
  const deliveryFee = deliveryOptions.find(option => option.id === selectedDelivery)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      Alert.alert(
        "Order Placed Successfully",
        "Thank you for your order! You will receive a confirmation email shortly.",
        [
          { 
            text: "OK", 
            onPress: () => router.replace('/') 
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Checkout' }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          <TouchableOpacity style={styles.addressCard}>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>Jane Doe</Text>
              <Text style={styles.addressText}>
                123 Main Street, Apt 4B
              </Text>
              <Text style={styles.addressText}>
                New York, NY 10001
              </Text>
              <Text style={styles.addressText}>
                United States
              </Text>
              <Text style={styles.addressText}>
                +1 (555) 123-4567
              </Text>
            </View>
            <View style={styles.addressActions}>
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
              <ChevronRight size={20} color={colors.text.secondary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <View style={styles.optionsCard}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.optionItem,
                  index === paymentMethods.length - 1 && styles.optionItemLast,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.optionLeft}>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedPayment === method.id && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedPayment === method.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.optionText}>{method.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Delivery Options</Text>
          </View>
          <View style={styles.optionsCard}>
            {deliveryOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  index === deliveryOptions.length - 1 && styles.optionItemLast,
                ]}
                onPress={() => setSelectedDelivery(option.id)}
              >
                <View style={styles.optionLeft}>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedDelivery === option.id && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedDelivery === option.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.optionText}>{option.name}</Text>
                    <Text style={styles.optionSubtext}>
                      {option.days} business days
                    </Text>
                  </View>
                </View>
                <Text style={styles.optionPrice}>${option.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Check size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>
          <View style={styles.summaryCard}>
            {cartProducts.map((item, index) => (
              <View 
                key={item.product!.id}
                style={[
                  styles.summaryItem,
                  index === cartProducts.length - 1 && styles.summaryItemLast,
                ]}
              >
                <View style={styles.summaryItemLeft}>
                  <Text style={styles.summaryItemName} numberOfLines={1}>
                    {item.product!.name}
                  </Text>
                  {item.shade && (
                    <Text style={styles.summaryItemShade}>
                      Shade: {item.shade}
                    </Text>
                  )}
                  <Text style={styles.summaryItemQuantity}>
                    Qty: {item.quantity}
                  </Text>
                </View>
                <Text style={styles.summaryItemPrice}>
                  ${(item.product!.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Place Order"
          fullWidth
          onPress={handlePlaceOrder}
          isLoading={isLoading}
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 8,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  addressActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  defaultBadge: {
    backgroundColor: colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  optionsCard: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  optionSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  summaryCard: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryItemLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  summaryItemLeft: {
    flex: 1,
    marginRight: 8,
  },
  summaryItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  summaryItemShade: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  summaryItemQuantity: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  footer: {
    backgroundColor: colors.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});