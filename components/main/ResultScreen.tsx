import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { insertData } from '@/utils/db';
import Colors from '@/constants/Colors';
import EditableForm from './EditableForm';
import { AnimatedView } from '@/components/ui/Animations';

type ResultScreenProps = {
  formData: any;
  imageUri: string | null;
  onSaveComplete: () => void;
  onDiscard: () => void;
};

export default function ResultScreen({ formData, imageUri, onSaveComplete, onDiscard }: ResultScreenProps) {
  const [saving, setSaving] = useState(false);
  const [editedData, setEditedData] = useState(formData);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const { error } = await insertData(editedData);
      
      if (error) {
        console.error('Error saving data:', error);
        Alert.alert('Error', 'Failed to save registration data');
        return;
      }
      
      Alert.alert(
        'Success',
        'Registration data saved successfully!',
        [
          { text: 'OK', onPress: onSaveComplete }
        ]
      );
    } catch (error) {
      console.error('Failed to save data:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatedView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Review Information</Text>
          <Text style={styles.subtitle}>Verify and edit extracted information</Text>
        </View>
        
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        )}
        
        <ScrollView style={styles.formContainer}>
          <EditableForm
            formData={editedData}
            onSave={setEditedData}
          />
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.discardButton]}
            onPress={onDiscard}
            disabled={saving}
          >
            <X size={20} color={Colors.error} />
            <Text style={styles.discardButtonText}>Discard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <>
                <Check size={20} color={Colors.white} />
                <Text style={styles.saveButtonText}>Save</Text>
              </>
            )}
          </TouchableOpacity>
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
    flex: 1,
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
  header: {
    padding: 20,
    backgroundColor: Colors.primary,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  imagePreviewContainer: {
    height: 120,
    backgroundColor: Colors.gray[100],
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  discardButton: {
    backgroundColor: Colors.gray[100],
    marginRight: 8,
  },
  discardButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.gray[700],
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  saveButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 8,
  },
});