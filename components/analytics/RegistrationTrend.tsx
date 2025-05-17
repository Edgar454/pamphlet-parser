import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';

type RegistrationTrendProps = {
  data: any[];
};

export default function RegistrationTrend({ data }: RegistrationTrendProps) {
  // Function to group registrations by month
  const getMonthlyRegistrations = () => {
    const now = new Date();
    const monthsData = [];
    const labels = [];
    
    // Get data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleDateString('en-US', { month: 'short' });
      
      const registrations = data.filter(item => {
        const itemDate = new Date(item.created_at);
        return (
          itemDate.getMonth() === month.getMonth() &&
          itemDate.getFullYear() === month.getFullYear()
        );
      }).length;
      
      monthsData.push(registrations);
      labels.push(monthName);
    }
    
    return { monthsData, labels };
  };
  
  const { monthsData, labels } = getMonthlyRegistrations();
  
  // Ensure we have at least one non-zero value for the chart
  const chartData = monthsData.map(value => value === 0 ? 0.1 : value);

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: chartData,
              color: (opacity = 1) => `rgba(81, 92, 230, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width - 80}
        height={220}
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
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: Colors.primary,
          },
        }}
        bezier
        style={styles.chart}
        fromZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});