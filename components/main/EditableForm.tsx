import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';

type FormField = {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'phone' | 'boolean';
};

type EditableFormProps = {
  formData: any;
  onSave: (data: any) => void;
};

export default function EditableForm({ formData, onSave }: EditableFormProps) {
  // Convert the form data to a format we can use for rendering
  const formFields: FormField[] = [
    { key: 'Nom', label: 'Last Name', value: formData['Nom'] || '', type: 'text' },
    { key: 'Prénom', label: 'First Name', value: formData['Prénom'] || '', type: 'text' },
    { key: 'Nationalité', label: 'Nationality', value: formData['Nationalité'] || '', type: 'text' },
    { key: 'Profession', label: 'Profession', value: formData['Profession'] || '', type: 'text' },
    { key: 'Téléphone', label: 'Phone Number', value: formData['Téléphone'] || '', type: 'phone' },
    { key: 'Email', label: 'Email', value: formData['Email'] || '', type: 'email' },
    { key: 'Quartier', label: 'Neighborhood', value: formData['Quartier'] || '', type: 'text' },
    { key: 'Eglise_d_origine', label: 'Origin Church', value: formData['Eglise_d_origine'] || '', type: 'text' },
    { key: 'Baptise_par_Immersion', label: 'Baptized by Immersion', value: formData['Baptise_par_Immersion'] || 'No', type: 'boolean' },
    { key: 'De_passage', label: 'Visitor', value: formData['De_passage'] || 'No', type: 'boolean' },
    { key: 'Moyen_de_connaissance', label: 'How They Found Us', value: formData['Moyen_de_connaissance'] || '', type: 'text' },
  ];

  const handleChange = (key: string, value: string | boolean) => {
    // Convert boolean to Yes/No string
    const finalValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;

    const updatedData = {
      ...formData,
      [key]: finalValue,
    };
    
    onSave(updatedData);
  };

  const renderField = (field: FormField, index: number) => {
    // Boolean fields
    if (field.type === 'boolean') {
      const isActive = field.value === 'Yes' || field.value === 'yes' || field.value === 'true' || field.value === 'TRUE' || field.value === 'True';
      
      return (
        <View key={field.key} style={[styles.fieldContainer, index === 0 && styles.firstField]}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.booleanContainer}>
            <Text style={styles.booleanLabel}>{isActive ? 'Yes' : 'No'}</Text>
            <Switch
              value={isActive}
              onValueChange={(value) => handleChange(field.key, value)}
              trackColor={{ false: Colors.gray[300], true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
        </View>
      );
    }
    
    // Text and other fields
    return (
      <View key={field.key} style={[styles.fieldContainer, index === 0 && styles.firstField]}>
        <Text style={styles.label}>{field.label}</Text>
        <TextInput
          style={styles.input}
          value={field.value}
          onChangeText={(value) => handleChange(field.key, value)}
          placeholder={`Enter ${field.label}`}
          placeholderTextColor={Colors.gray[400]}
          keyboardType={
            field.type === 'phone' 
              ? 'phone-pad' 
              : field.type === 'email' 
                ? 'email-address' 
                : 'default'
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {formFields.map((field, index) => renderField(field, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    paddingBottom: 16,
  },
  firstField: {
    marginTop: 0,
  },
  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.gray[800],
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
  },
  booleanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  booleanLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.gray[800],
  },
});