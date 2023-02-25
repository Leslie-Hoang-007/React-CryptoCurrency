import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, TextInput, FlatList, View, Image } from 'react-native';
import React, { useState } from 'react';

//StAuth10244: I Leslie Hoang, 000256811 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else.

export default function App() {
  const [thing, setThing] = useState('Hello');
  const [term, setTerm] = useState('');
  const [coins, setCoins] = useState([]);

  async function getSearchResults()
  {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search?query=' + term);
      const json = await response.json();
      console.log(json)
      console.log(json.coins)
      // sets the array of domains to the array of domains returned by the API
      setCoins(json.coins)
    } catch (error) { console.error(error); }   
      
  }
 
  async function getHello(){
    if(thing == "Hello"){
      setThing("Top Rank: Bitcoin")
    }else{
      setThing("Hello")
    }
    
  }
  return (
    
    <View style={{ flex: 6, padding: 24 }}>
  
    <TextInput
      style={styles.TextInputStyle}
      placeholder="Find Rank, Enter a Cyptocurrency..."
      onChangeText={term => setTerm(term)}
      onSubmitEditing={getSearchResults}
      autoFocus
    />
    <Button onPress={getSearchResults} title="Search"  />
    <Button onPress={getHello} title="Click ME!!!"  />
    <Text style={styles.mellow}>{thing} </Text>
     <View style={styles.container}>
     <Image
          source={{
            uri: 'https://img.freepik.com/premium-vector/cute-fox-sitting-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style_138676-1559.jpg?w=2000',
          }}
          style={{ width: 100, height: 100 }}
        />
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.name} ({item.symbol}) Rank: {item.market_cap_rank}    
          <Image
              source={{uri:item.large}}
              style={{ width: 12, height: 12, padding:10, margin:5 }}
            />
        </Text>
          
        )}
        
        keyExtractor={coins => coins.id} />
        
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 20,
    backgroundColor: '#6699CC',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  text: {
    color: 'white',
    padding: 1,
    textAlign: 'center'
    
  },
  mellow:{
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#92D448',
    padding: 5,
    fontWeight: 'bold'
  },
  TextInputStyle:{
    height: 40,
    textAlign: 'center',
  
  }
});
