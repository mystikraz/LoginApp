import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import AsyncStorageExample from './AsyncStorageExample'

const About = () => {
   const goToHome = () => {
      Actions.home()
   } 
   return (
    <AsyncStorageExample/>

   )
}
export default About