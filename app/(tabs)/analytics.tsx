import BaptismStatusChart from '@/components/analytics/BaptismStatusChart';
import DiscoveryMethodChart from '@/components/analytics/DiscoveryMethodChart';
import LocationMap from '@/components/analytics/LocationMap';
import MonthlyRegistrationsChart from '@/components/analytics/MonthlyRegistrationsChart';
import NationalityChart from '@/components/analytics/NationalityChart';
import ProfessionChart from '@/components/analytics/ProfessionChart';
import RegistrationTrend from '@/components/analytics/RegistrationTrend';
import ChartCard from '@/components/ui/ChartCard';
import Header from '@/components/ui/Header';
import Colors from '@/constants/Colors';
import { fetchAnalyticsData } from '@/utils/db';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

export default function AnalyticsScreen() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data, error } = await fetchAnalyticsData();
      
      if (error) {
        console.error('Error fetching analytics data:', error);
        return;
      }
      
      setAnalyticsData(data || []);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <Header title="Analytics" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Analytics" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        <ChartCard title="Monthly Registrations">
          <MonthlyRegistrationsChart data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="Registration Trend">
          <RegistrationTrend data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="Members by Nationality">
          <NationalityChart data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="How Members Found Us">
          <DiscoveryMethodChart data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="Member Locations" fullWidth>
          <LocationMap data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="Members by Profession">
          <ProfessionChart data={analyticsData} />
        </ChartCard>
        
        <ChartCard title="Baptism Status">
          <BaptismStatusChart data={analyticsData} />
        </ChartCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
});