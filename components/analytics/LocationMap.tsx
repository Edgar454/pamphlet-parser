import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fetchGeoLocation } from '@/utils/geo';
import Colors from '@/constants/Colors';

type LocationMapProps = {
  data: any[];
};

type LocationData = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  count: number;
};

export default function LocationMap({ data }: LocationMapProps) {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations();
  }, [data]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      
      // Group data by quartier (neighborhood)
      const locationCounts = {};
      
      data.forEach(item => {
        if (item.quartier) {
          const location = item.quartier.trim();
          locationCounts[location] = (locationCounts[location] || 0) + 1;
        }
      });
      
      // Fetch geocode for each location
      const locationPromises = Object.keys(locationCounts).map(async (location) => {
        const count = locationCounts[location];
        const geoData = await fetchGeoLocation(location);
        
        if (geoData) {
          return {
            ...geoData,
            count,
          };
        }
        return null;
      });
      
      const resolvedLocations = await Promise.all(locationPromises);
      const validLocations = resolvedLocations.filter(loc => loc !== null);
      
      setLocations(validLocations);
      setError(null);
    } catch (err) {
      console.error('Error fetching location data:', err);
      setError('Failed to load location data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate initial region based on markers
  const getInitialRegion = () => {
    if (locations.length === 0) {
      // Default to France if no locations
      return {
        latitude: 46.2276,
        longitude: 2.2137,
        latitudeDelta: 10,
        longitudeDelta: 10,
      };
    }
    
    // Use the first location as center
    return locations[0].location;
  };

  // Calculate marker size based on count
  const getMarkerSize = (count) => {
    const baseSize = 30;
    const scaleFactor = Math.log10(count + 1) * 15;
    return baseSize + scaleFactor;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading map data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={getInitialRegion()}
      >
        {locations.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
          >
            <View 
              style={[
                styles.markerContainer,
                { width: getMarkerSize(item.count), height: getMarkerSize(item.count) }
              ]}
            >
              <Text style={styles.markerText}>{item.count}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 16,
  },
  loadingText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  errorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 16,
  },
  errorText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.error,
  },
  markerContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.7)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  markerText: {
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
  },
});