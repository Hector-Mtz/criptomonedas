import React from 'react'
import {Text, View, StyleSheet } from 'react-native'
 
const Cotizacion = (
    {
        resultado
    }
) => {
   if(Object.keys(resultado) === 0) return null
    return (
        <>
          <View style={styles.resultado}>
              <Text style={[styles.text, styles.precio]}>
                <Text style={styles.span}>{resultado.PRICE}</Text>
              </Text>

              <Text style={styles.text}> Precio más alto del dia: {''}
                <Text style={styles.span}>{resultado.HIGHDAY}</Text>
              </Text>

              <Text style={styles.text}> Precio más bajo del dia: {''}
                <Text style={styles.span}>{resultado.LOWDAY}</Text>
              </Text>

              <Text style={styles.text}> Variación las últimas 24 horas: {''}
                <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
              </Text>

              <Text style={styles.text}> Última Actualización3: {''}
                <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
              </Text>
          </View>
        </>
      )

}

const styles = StyleSheet.create({
    resultado:{
        backgroundColor:'#5E49E2',
        padding:20,
        marginTop:20
    },
    text:{
      color:'white',
      fontFamily:'Lato-Regular',
      fontSize:18,
      marginBottom:10
    },
    precio:{
      fontSize:38
    },
    span:{ //no existe como tal un span pero se adaptara con clases uno
        fontFamily:'Lato-Black'
    }
})

export default Cotizacion
