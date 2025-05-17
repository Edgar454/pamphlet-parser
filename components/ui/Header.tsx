import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import Colors from '@/constants/Colors';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export default function Header({ title, showBackButton }: HeaderProps) {
  const pathname = usePathname();
  
  const isRootRoute = pathname === '/' ||
    pathname === '/recent' ||
    pathname === '/analytics' ||
    pathname === '/about';
    
  const shouldShowBack = showBackButton !== undefined ? showBackButton : !isRootRoute;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        {shouldShowBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
        )}
        
        <Text style={styles.title}>{title}</Text>
        
        {/* Empty view for balance */}
        {shouldShowBack && <View style={styles.placeholderRight} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 16,
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.gray[800],
  },
  placeholderRight: {
    width: 24,
    position: 'absolute',
    right: 16,
  },
});