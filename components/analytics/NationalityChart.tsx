import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';

type NationalityChartProps = {
  data: any[];
};

export default function NationalityChart({ data }: NationalityChartProps) {
  // Process data to count nationalities
  const processNationalityData = () => {
    const nationalityCounts = {};
    
    data.forEach(item => {
      if (item.nationalite) {
        const nationality = item.nationalite.trim();
        nationalityCounts[nationality] = (nationalityCounts[nationality] || 0) + 1;
      }
    });
    
    // Convert to chart format and sort by count
    const chartData = Object.keys(nationalityCounts)
      .map((nationality, index) => {
        // Define some colors for the pie chart
        const colors = [
          '#515CE6', // primary
          '#22C55E', // success
          '#F97316', // warning
          '#D946EF', // secondary
          '#3B82F6', // blue
          '#EF4444', // error
          '#10B981', // emerald
          '#6366F1', // indigo
          '#EC4899', // pink
        ];
        
        return {
          name: nationality,
          count: nationalityCounts[nationality],
          color: colors[index % colors.length],
          legendFontColor: Colors.gray[700],
          legendFontSize: 12,
        };
      })
      .sort((a, b) => b.count - a.count);
    
    return chartData;
  };
  
  const chartData = processNationalityData();

  // If no data, show placeholder
  if (chartData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No nationality data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 80}
          height={180}
          chartConfig={{
            color: (opacity = 1) => `rgba(81, 92, 230, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  noDataContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[500],
  },
});