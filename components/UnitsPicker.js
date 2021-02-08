import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({ unitSystems, setUnitSystems}) {
   return (
      <View style={styles.unitSystems}>
         <Picker selectedValue={ unitSystems } onValueChange={(item) => setUnitSystems(item)} itemStyle={{ fontSize:16 }}>
            <Picker.Item label="C° " value="metric" />
            <Picker.Item label="F° " value="imperial" />
         </Picker>
      </View>
   )
}

const styles = StyleSheet.create({
   unitSystems:{
      position: 'absolute',
      height: 50,
      width: 100,
      top: 0,
      left:20,
   }
});