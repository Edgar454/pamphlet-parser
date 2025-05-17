import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

export default function ChartCard({ title, children, fullWidth = false }: ChartCardProps) {
  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  fullWidth: {
    marginHorizontal: -16,
    borderRadius: 0,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 16,
    textAlign: 'center',
  },
});