import { View, Text, StyleSheet } from 'react-native';
import { FileText, ChartBar as BarChart3, List } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type EmptyStateProps = {
  title: string;
  message: string;
  icon?: 'form' | 'analytics' | 'list';
};

export default function EmptyState({ title, message, icon = 'form' }: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'form':
        return <FileText size={50} color={Colors.gray[400]} />;
      case 'analytics':
        return <BarChart3 size={50} color={Colors.gray[400]} />;
      case 'list':
        return <List size={50} color={Colors.gray[400]} />;
      default:
        return <FileText size={50} color={Colors.gray[400]} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginVertical: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.gray[700],
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    lineHeight: 22,
  },
});