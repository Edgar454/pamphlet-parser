import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useState } from 'react';
import UploadScreen from '@/components/main/UploadScreen';
import WaitingScreen from '@/components/main/WaitingScreen';
import ResultScreen from '@/components/main/ResultScreen';
import Header from '@/components/ui/Header';

export type FormState = 'upload' | 'waiting' | 'result';

export default function MainScreen() {
  // Image URI state
  const [imageUri, setImageUri] = useState<string | null>(null);
  // Form state tracking
  const [formState, setFormState] = useState<FormState>('upload');
  // Parsed form data
  const [formData, setFormData] = useState<any>(null);

  // Reset to initial state
  const handleReset = () => {
    setImageUri(null);
    setFormData(null);
    setFormState('upload');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="New Registration" />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {formState === 'upload' && (
          <UploadScreen 
            onImageCaptured={(uri) => {
              setImageUri(uri);
              setFormState('waiting');
            }} 
          />
        )}
        
        {formState === 'waiting' && imageUri && (
          <WaitingScreen 
            imageUri={imageUri}
            onDataReceived={(data) => {
              setFormData(data);
              setFormState('result');
            }}
            onCancel={handleReset}
          />
        )}
        
        {formState === 'result' && formData && (
          <ResultScreen 
            formData={formData}
            imageUri={imageUri}
            onSaveComplete={handleReset}
            onDiscard={handleReset}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});