import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { useFetch } from '@/utils/api';
import Colors from '@/constants/Colors';
import { AnimatedView } from '@/components/ui/Animations';

type WaitingScreenProps = {
  imageUri: string;
  onDataReceived: (data: any) => void;
  onCancel: () => void;
};

export default function WaitingScreen({ imageUri, onDataReceived, onCancel }: WaitingScreenProps) {
  const { data, isLoading, error } = useFetch(imageUri);
  const [parsedData, setParsedData] = useState(null);
  
  useEffect(() => {
    if (data && !isLoading) {
      try {
        // Parse the string data from the API response
        const parsedResult = JSON.parse(data);
        if (Array.isArray(parsedResult) && parsedResult.length > 0) {
          // We take the first item as we expect an array with a single object
          setParsedData(parsedResult[0]);
          
          // Pass the parsed data to the parent
          onDataReceived(parsedResult[0]);
        } else {
          console.error('Unexpected data format:', parsedResult);
        }
      } catch (e) {
        console.error('Error parsing data:', e);
      }
    }
  }, [data, isLoading]);

  return (
    <AnimatedView style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onCancel}
        >
          <X size={20} color={Colors.gray[600]} />
        </TouchableOpacity>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>
            {error ? 'Processing Error' : 'Processing Form'}
          </Text>
          
          {isLoading && (
            <>
              <ActivityIndicator 
                size="large" 
                color={Colors.primary} 
                style={styles.loader}
              />
              <Text style={styles.loadingText}>
                Analyzing and extracting data from the form...
              </Text>
            </>
          )}
          
          {error && (
            <>
              <Text style={styles.errorText}>
                An error occurred while processing the form. Please try again.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={onCancel}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </>
          )}
          
          {!isLoading && !error && parsedData && (
            <Text style={styles.successText}>
              Form processed successfully!
            </Text>
          )}
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: '100%',
    backgroundColor: Colors.gray[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 16,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 24,
  },
  loadingText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.error,
    textAlign: 'center',
    marginVertical: 16,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.white,
  },
  successText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.success,
    marginVertical: 24,
  },
});