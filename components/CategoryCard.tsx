import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { Category } from '@/types';
import * as Icons from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
}

const { width } = Dimensions.get('window');

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  size = 'medium' 
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };

  const cardWidth = size === 'small' 
    ? width * 0.25 
    : size === 'medium' 
      ? width * 0.3 
      : width * 0.45;

  // Dynamically get the icon component
  const IconComponent = (Icons as any)[category.icon];

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {category.image ? (
          <Image 
            source={{ uri: category.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.iconContainer}>
            {IconComponent && <IconComponent size={24} color={colors.primary} />}
          </View>
        )}
      </View>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.secondary,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    textAlign: 'center',
  },
});