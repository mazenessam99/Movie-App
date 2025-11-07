import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FilterDropdown = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          dropdownIconColor="#FFF"
          onValueChange={onValueChange}
        >
          {items.map((item) => (
            <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value}
              color="#000"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#FFF',
    height: 50,
  },
});

export default FilterDropdown;