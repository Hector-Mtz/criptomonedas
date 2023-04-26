import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'

const Header = () => ( //se da por implicito el return
    <Text style={styles.encabezado}>Criptomonedas</Text>
)

const styles = StyleSheet.create({
    encabezado:{
      paddingTop:Platform.OS === 'ios' ? 50:10,  // condicionamos con platform el paddgin dependiendo el sistema operativo
      fontFamily:'Lato-Black',
      backgroundColor:'#5E49E2',
      paddingBottom:10,
      textAlign:'center',
      textTransform:'uppercase',
      color:'white',
      marginBottom:30,
      fontSize:20
    }
})

export default Header
