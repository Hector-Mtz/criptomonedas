import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({
    moneda,
    setMoneda,
    criptomoneda,
    setCriptomoneda,
    consultarAPI,
    guardarConsultarAPI
}) => {

    const [criptomonedas, setCriptomonedas] = useState([])

    useEffect(()=>{
       const consultarAPI = async () => 
       {
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
          const resultado = await axios.get(url);
          //console.log(resultado.data.Data)
          setCriptomonedas(resultado.data.Data)
         
       }

       consultarAPI()
    },[])

    //Almacena las selecciones del usuario por medio del Picker
    const obtenerMoneda = (moneda) => 
    {
        setMoneda(moneda)
    }

    const obtenerCriptomoneda = (cripto) => 
    {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () =>
    {
      if(moneda.trim() === '' || criptomoneda.trim() === '')
      {
         mostrarAlerta()
         return
      }

      guardarConsultarAPI(true)

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Los campos son obligatorios',
            [
                {text:'OK'}
            ]
        )
    }

  return (
    <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker 
        selectedValue={moneda} 
        onValueChange={moneda => obtenerMoneda(moneda)}
        itemStyle={{height:120}}
        >
            <Picker.Item label='-- Seleccione --' value="" />
            <Picker.Item label='Dolar de Estados Unidos' value="USD" />
            <Picker.Item label='Peso Mexicano' value="MXN" />
            <Picker.Item label='Euro' value="EUR" />
            <Picker.Item label='Libra Esterlina' value="GBP" />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>
        <Picker 
          selectedValue={criptomoneda}
          onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
          itemStyle={{height:120}}
         >
            <Picker.Item label='-- Seleccione --' value="" />
            {
              criptomonedas.map(cripto => (
                 <Picker.Item  key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
               ))
            }
        </Picker>
        <TouchableHighlight style = {styles.btnCotizar} onPress={()=>cotizarPrecio()}>
            <Text style={styles.textoCotizar}>Cotizar</Text>
        </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  label:{
    fontFamily:'Lato-Black',
    textTransform:'uppercase',
    fontSize:22,
    marginVertical:20
  },
  btnCotizar:
  {
     backgroundColor:'#5E49E2',
     padding: 10,
    marginTop:20
  },
  textoCotizar:{
    color:'white',
    fontSize:18,
    fontFamily:'Lato-Black',
    textTransform:'uppercase',
    textAlign:'center'
  }
})

export default Formulario
