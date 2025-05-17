import { View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Colors from '@/constants/Colors';

type BaptismStatusChartProps = {
  data: any[];
};

export default function BaptismStatusChart({ data }: BaptismStatusChartProps) {
  // Process data to count baptism status
  const processBaptismData = () => {
    let baptized = 0;
    let notBaptized = 0;
    
    data.forEach(item => {
      if (item.baptise) {
        // Check for various formats of "Yes"
        const status = item.baptise.toString().toLowerCase();
        if (status === 'yes' || status === 'true' || status === 'oui') {
          baptized++;
        } else {
          notBaptized++;
        }
      }
    });
    
    return [
      {
        name: 'Baptized',
        count: baptized,
        color: Colors.success,
        legendFontColor: Colors.gray[700],
        legendFontSize: 12,
      },
      {
        name: 'Not Baptized',
        count: notBaptized,
        color: Colors.gray[400],
        legendFontColor: Colors.gray[700],
        legendFontSize: 12,
      },
    ];
  };
  
  const chartData = processBaptismData();

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 80}
        height={180}
        chartConfig={{
          color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});