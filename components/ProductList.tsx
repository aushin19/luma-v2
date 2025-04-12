import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  title: string;
  products: Product[];
  seeAllLink?: string;
  horizontal?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
}

export const ProductList: React.FC<ProductListProps> = ({ 
  title, 
  products, 
  seeAllLink,
  horizontal = true,
  cardSize = 'medium'
}) => {
  const router = useRouter();

  const handleSeeAll = () => {
    if (seeAllLink) {
      router.push(seeAllLink);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeAllLink && (
          <TouchableOpacity 
            style={styles.seeAllButton} 
            onPress={handleSeeAll}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={horizontal ? styles.horizontalItem : styles.gridItem}>
            <ProductCard product={item} size={cardSize} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  horizontalItem: {
    marginRight: 16,
  },
  gridItem: {
    flex: 1,
    marginBottom: 16,
  },
});