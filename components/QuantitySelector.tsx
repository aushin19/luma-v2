import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
}) => {
  const isDecrementDisabled = quantity <= minQuantity;
  const isIncrementDisabled = quantity >= maxQuantity;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          isDecrementDisabled && styles.buttonDisabled,
        ]}
        onPress={onDecrease}
        disabled={isDecrementDisabled}
      >
        <Minus 
          size={16} 
          color={isDecrementDisabled ? colors.text.secondary : colors.text.primary} 
        />
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isIncrementDisabled && styles.buttonDisabled,
        ]}
        onPress={onIncrease}
        disabled={isIncrementDisabled}
      >
        <Plus 
          size={16} 
          color={isIncrementDisabled ? colors.text.secondary : colors.text.primary} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  quantityContainer: {
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
});