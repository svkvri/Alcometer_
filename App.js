import React, { useState } from 'react';
import { ScrollView, Text, View, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input';

export default function App() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(70);
  const [beerCount, setBeerCount] = useState(0);
  const [time, setTime] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [bloodAlcoholLevel, setBloodAlcoholLevel] = useState(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#333' : '#fff',
    },
    calculatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      margin: 20,
      color: darkMode ? '#fff' : '#000',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
      alignItems: 'center',
    },
    genderButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    darkModeSwitchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    calculateButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    calculateButtonText: {
      color: 'white',
    },
    darkModeNumericInput: {
      color: 'white', 
    },
  });

  const calculateBloodAlcoholLevel = () => {
    const litres = beerCount * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = weight / 10;
    const gramsLeft = grams - burning * time;
    let result = 0;

    if (gender === 'male') {
      result = gramsLeft / (weight * 0.7);
    } else {
      result = gramsLeft / (weight * 0.6);
    }

    if (result < 0) {
      result = 0;
    }

    setBloodAlcoholLevel(result.toFixed(2));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calculatorContainer}>
        <Text style={styles.header}>Alcometer App</Text>

        <View style={styles.inputContainer}>
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>Gender:</Text>
          <View style={styles.genderButtons}>
            <TouchableOpacity onPress={() => setGender('male')}>
              <Text style={{ marginRight: 10, color: gender === 'male' ? 'blue' : 'black' }}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('female')}>
              <Text style={{ color: gender === 'female' ? 'pink' : 'black' }}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>Weight (kg):</Text>
          <NumericInput
            value={weight}
            onChange={setWeight}
            minValue={0}
            totalWidth={120}
            totalHeight={50}
            iconSize={25}
            textColor={darkMode ? 'white' : 'black'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>Number of Bottles:</Text>
          <NumericInput
            value={beerCount}
            onChange={setBeerCount}
            minValue={0}
            totalWidth={120}
            totalHeight={50}
            iconSize={25}
            textColor={darkMode ? 'white' : 'black'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>Hours:</Text>
          <NumericInput
            value={time}
            onChange={setTime}
            minValue={0}
            totalWidth={120}
            totalHeight={50}
            iconSize={25}
            textColor={darkMode ? 'white' : 'black'} 
          />
        </View>
        
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateBloodAlcoholLevel}
        >
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        <Text style={{ color: darkMode ? '#fff' : '#000' }}>Blood Alcohol Level: {bloodAlcoholLevel}</Text>

        <View style={styles.darkModeSwitchContainer}>
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>Dark Mode: {darkMode ? 'On' : 'Off'}</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
