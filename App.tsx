import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
   Image,
   StyleSheet,
   View,
   ScrollView,
   ActivityIndicator
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios'
import Cotizacion from './components/Cotizacion';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('')
  const [consultarAPI, guardarConsultarAPI] = useState(false)
  const [resultado, guardarResultado] = useState(0)
  const [cargando, setCargando] = useState(false) //variable para poner el indicador de carga

  useEffect(()=> 
  {
    const cotizarCriptomoneda = async () => 
    {
      if(consultarAPI) //revisamos para la primera carga default si es true para que consulte
      { 
         //esta url es para sacar lo cotizado una vez que ya se tenga la moneda y la criptomoneda
         //https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR
         //https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR
        //const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${criptomoneda}&tsyms=${moneda}` 
         const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` 
         const resultadotemp = await axios.get(url)

        //console.log(resultado)
        //console.log(resultado.data[criptomoneda][moneda]) //ingresamos a al valor mediante la criptomoneda y la moneda

        //Ocultar el Spinner y mostrar el resultado
        setCargando(true) //ponemos el valor en true para mostrar el spinner
        setTimeout(() =>
        {
          guardarResultado(resultadotemp.data.DISPLAY[criptomoneda][moneda]) //seteamos el valor
          guardarConsultarAPI(false)
          setCargando(false) //oculta el spinner despues de 3 seg
        }, 3000)
        
        //console.log(resultado)
      }   
    }

    cotizarCriptomoneda()

  },[consultarAPI]) //cuando sea true


  const componente = cargando ? <ActivityIndicator size="large" color='#5E49E2' /> : <Cotizacion  resultado={resultado} />

  return (
   <>
    <ScrollView>
     <Header />
     <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')} />
     <View style={styles.contenido}>
        <Formulario 
          moneda={moneda} 
          setMoneda={setMoneda} 
          criptomoneda={criptomoneda} 
          setCriptomoneda={setCriptomoneda}
          consultarAPI={consultarAPI}
          guardarConsultarAPI={guardarConsultarAPI} />
     </View>
     <View style={{marginTop:40}}>
       {componente}
     </View> 
    </ScrollView>
   </>
  );
}

const styles = StyleSheet.create({
   imagen:{
     width:'100%',
     height:150,
     marginHorizontal:'2.5%'
   },
   contenido:
   {
    marginHorizontal:'2.5%'
   }
});

export default App;
