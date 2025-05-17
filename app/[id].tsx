import { supabase, updateData } from '@/utils/db';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EditableForm from '@/components/main/EditableForm';
import Colors from '@/constants/Colors';
import { Save } from 'lucide-react-native';

export default function MemberDetailScreen() {
  const { id } = useLocalSearchParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    fetchMemberData();
  }, [id]);
  
  const fetchMemberData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users_data')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching member data:', error);
        Alert.alert('Error', 'Failed to load member data');
        return;
      }
      
      // Transform database fields to form field format
      const transformedData = {
        id: data.id,
        "Nom": data.nom,
        "Prénom": data.prenom,
        "Quartier": data.quartier,
        "Téléphone": data.telephone,
        "Baptise_par_Immersion": data.baptise,
        "De_passage": data.passage,
        "Eglise_d_origine": data.eglise,
        "Email": data.email,
        "Moyen_de_connaissance": data.connaissance,
        "Nationalité": data.nationalite,
        "Profession": data.profession || '',
      };
      
      setMemberData(transformedData);
    } catch (error) {
      console.error('Failed to fetch member data:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async (updatedData) => {
    try {
      setSaving(true);
      
      // Ensure the ID is included in the updated data
      const dataToUpdate = { ...updatedData, id };
      
      const { error } = await updateData(dataToUpdate);
      
      if (error) {
        console.error('Error updating member data:', error);
        Alert.alert('Error', 'Failed to update member data');
        return;
      }
      
      Alert.alert('Success', 'Member information updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Failed to update member data:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {memberData && (
          <EditableForm 
            formData={memberData}
            onSave={handleSave}
          />
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => handleSave(memberData)}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <Save size={18} color={Colors.white} />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  saveButtonText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    marginLeft: 8,
  },
});