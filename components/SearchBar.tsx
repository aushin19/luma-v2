import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Mic } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
  isInteractive?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search products...',
  onPress,
  isInteractive = false
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (!isInteractive) {
      router.push('/search');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={isInteractive ? 1 : 0.8}
      disabled={isInteractive}
    >
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          editable={isInteractive}
          pointerEvents={isInteractive ? 'auto' : 'none'}
        />
        {isInteractive && (
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    height: '100%',
  },
  micButton: {
    padding: 4,
  },
});