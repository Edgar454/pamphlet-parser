import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchData } from '@/utils/db';
import RecentItem from '@/components/recent/RecentItem';
import Header from '@/components/ui/Header';
import Colors from '@/constants/Colors';
import EmptyState from '@/components/ui/EmptyState';
import { router } from 'expo-router';

export default function RecentScreen() {
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data, error } = await fetchData(10);
      
      if (error) {
        console.error('Error fetching recent data:', error);
        return;
      }
      
      setRecentData(data || []);
    } catch (error) {
      console.error('Failed to fetch recent data:', error);
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

  const handleItemPress = (item) => {
    router.push({
      pathname: '/[id]',
      params: { id: item.id }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Recent Registrations" />
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={recentData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecentItem 
              item={item}
              onPress={() => handleItemPress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
            />
          }
          ListEmptyComponent={
            <EmptyState 
              title="No Recent Registrations"
              message="Registrations will appear here once they are saved."
              icon="list"
            />
          }
        />
      )}
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
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
});