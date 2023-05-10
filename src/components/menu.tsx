import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface IMenu {
  onAddTodo: () => void
}

const Menu = (props: IMenu) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => props.onAddTodo()}
      >
        <Text style={styles.buttonText}>+ Agregar tarea</Text>
      </TouchableHighlight>
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 30, height: 'auto',
    color: 'black',
    padding: 20,
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#25D366',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: 'red'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16

  }

});