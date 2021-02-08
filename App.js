import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

//Components
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';

//Utils
import { colors } from './utils/index';

const WEATHER_API_KEY = 'a99418a2ab6bbce28337e7adbceffc3e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystems, setUnitSystems] = useState('metric');

  useEffect(()=> {
    load()
  },[unitSystems]);

  async function load(){
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const {latitude, longitude} = location.coords;

      const url = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitSystems}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(url);

      const result = await response.json();

      if(response.ok){
        setCurrentWeather(result);
      }else{
        setErrorMessage(result.message);
      }

    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if(currentWeather){
    return (
      <View style={ styles.container }>
        <View style={ styles.main}>
          <UnitsPicker unitSystems={unitSystems} setUnitSystems={setUnitSystems}/>
          <WeatherInfo currentWeather={currentWeather}></WeatherInfo>
        </View>
      </View>
    );
  }else if(errorMessage){
    return (
      <View style={ styles.container }>
        <Text>{ errorMessage }</Text>
      </View>
    );
  }else{
    return (
      <View style={ styles.container }>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style='auto'/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  main:{
    justifyContent: 'center',
    flex: 1,
  }
});
