import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { useSettings } from '@/contexts/settings-context';

const TemperatureToggle = () => {
  const {units, setUnits} = useSettings();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Choose your temperature unit:</ThemedText>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.leftButton,
            units === 'imperial' && styles.activeButton
          ]}
          onPress={() => setUnits('imperial')}
          activeOpacity={0.8}
        >
          <ThemedText style={[
            styles.toggleText,
            units === 'imperial' && styles.activeText
          ]}>
            Fahrenheit
          </ThemedText>
          <ThemedText style={[
            styles.unitSymbol,
            units === 'imperial' && styles.activeText
          ]}>
            °F
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.rightButton,
            units === 'metric' && styles.activeButton
          ]}
          onPress={() => setUnits('metric')}
          activeOpacity={0.8}
        >
          <ThemedText style={[
            styles.toggleText,
            units === 'metric' && styles.activeText
          ]}>
            Celsius
          </ThemedText>
          <ThemedText style={[
            styles.unitSymbol,
            units === 'metric' && styles.activeText
          ]}>
            °C
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.resultText}>
        Temperature will be displayed in {units === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
    marginBottom: 10,
  },
  toggleButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 140,
    backgroundColor: '#f0f0f0',
  },
  leftButton: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  rightButton: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    borderLeftWidth: 2,
    borderLeftColor: '#000',
  },
  activeButton: {
    backgroundColor: '#90EE90',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  activeText: {
    color: '#000',
  },
  unitSymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  resultText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default TemperatureToggle;