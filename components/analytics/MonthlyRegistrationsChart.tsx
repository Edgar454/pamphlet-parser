import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';

type MonthlyRegistrationsChartProps = {
  data: any[];
};

export default function MonthlyRegistrationsChart({ data }: MonthlyRegistrationsChartProps) {
  // Get current month data
  const getCurrentMonthData = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    return data.filter(item => {
      const itemDate = new Date(item.created_at);
      return itemDate.getFullYear() === currentYear && itemDate.getMonth() === currentMonth;
    });
  };

  const currentMonthData = getCurrentMonthData();
  const totalRegistrations = currentMonthData.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalCount}>{totalRegistrations}</Text>
        <Text style={styles.totalLabel}>Registrations This Month</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: ['This Month'],
            datasets: [
              {
                data: [totalRegistrations > 0 ? totalRegistrations : 0.1], // Use 0.1 to show a tiny bar when 0
              },
            ],
          }}
          width={Dimensions.get('window').width - 80}
          height={180}
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(81, 92, 230, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
          }}
          style={styles.chart}
          showValuesOnTopOfBars
          fromZero
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalCount: {
    fontFamily: 'Roboto-Bold',
    fontSize: 36,
    color: Colors.primary,
  },
  totalLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.gray[600],
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});