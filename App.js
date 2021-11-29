import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, Alert, Image, slice  } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false,
      pokemon : [],
      url : 'https://pokeapi.co/api/v2/pokemon'
    }
  }
  componentDidMount (){
    this.getPokemon();
  }
  getPokemon = () => {
    this.setState({loading:true})
    fetch(this.state.url)
    .then(res => res.json())
    .then( res=> {
      this.setState({
        pokemon : res.results.slice(0,10),
        url: res.next,
        loading: false
      });
    });

  };
   _getDetail = (detUrl) =>{
    return fetch(detUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      var arr = responseJson.types;
      var con = arr.length;
      var ataqueP = arr[0]['type']['name'];
      var ataqueS ='';
      var nombre = responseJson.species.name;
      if(con>1){var ataqueS = ' and '+arr[1]['type']['name'];}
          return(
              Alert.alert('Tipos de ataques de '+nombre+' : '+ataqueP+ataqueS)
          );
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render(){
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <Text>Descargando Pokemon!</Text>
        </View>
      );
    }
    return(
      <View style={{flex: 1, paddingTop:50, paddingLeft:5}}>
        <FlatList
          data={this.state.pokemon}
          renderItem={
            ({item}) =>
                        <Text style={{
                            width:'90%',
                            height:'auto',
                            margin:5,
                            backgroundColor:'skyblue',
                            fontSize:25
                            }} onPress={() => {
                                var datP = item.url;
                                   this._getDetail(datP);

                                 }}>
                            {item.name}
                        </Text>
          }

          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
