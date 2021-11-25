import 'react-native-gesture-handler'
import * as React from 'react'

import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  OnBoarding
} from './src/screens/'


const Stack = createNativeStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name='OnBoarding' component={OnBoarding} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <App/>
}