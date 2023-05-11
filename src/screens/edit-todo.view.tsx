import React, { useContext, useEffect, useState } from "react"
import { Modal, StyleSheet, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ITodo } from "../models/todo.model";
import { UserContext } from "../App";

interface IEditTodoProps {
  isVisible: boolean
  onClose: () => void
  onSave: (data: any) => void
  data?: ITodo
}

const EditTodoView = (props: IEditTodoProps) => {

  const colors = ['#87D3F5', '#BDE991', '#BAAAFB']
  const [colorIndex, setColorIndex] = useState(0)

  const title = props.data ? 'Editar tarea' : 'Agregar tarea'
  const [text, setText] = useState(props.data?.text || '')

  const mockUser = useContext(UserContext);

  //Cuando corre por primera vez
  useEffect(() => {
    console.log("EditTodoView-Open")
    return ()=> {
      console.log("EditTodoView-Killed")
    }
  }, []);

  const onSave = () => {
    if (text.trim().length === 0) {
      props.onClose()
      return
    }
    if (props.data) {
      const newData = {
        ...props.data,
        text
      }
      props.onSave(newData)
    } else {
      const newData = {
        id: 'id-' + Math.floor(Math.random() * 10000000),
        text,
        done: false,
        color: colors[colorIndex],
      }
      props.onSave(newData)
    }
  }

  return (
    <Modal visible={props.isVisible} style={styles.modal}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView style={styles.container} >
        <Text style={styles.title}>{title}</Text>

        <View style={styles.content}>
          <Text style={styles.label}>Nueva tarea para {mockUser.username}:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            multiline={true}
            placeholder="Nombre de la tarea"
          />
        </View>

        <View style={styles.menu} >
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.onClose()}
          >
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onSave}
          >
            <Text style={styles.buttonText}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default EditTodoView


const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1, justifyContent: 'center', alignItems: 'center',
    // backgroundColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  content: {
    backgroundColor: '#fff',
    width:'100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    color: 'black'
  },
  menu: {
    display: 'flex',
    width: '100%', height: 60,
    paddingHorizontal: 30,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  input: {
    margin: 18,
    borderWidth: 1,
    padding: 4,
    height: 40,
    color: 'black',
    borderRadius:4

  },
  label: {
    color: 'black',
    marginHorizontal: 18
  },
  colors: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  color: {
    width: 30, height: 30,
    marginRight: 20,
    borderRadius: 3,
  },
  button: {
    height: 20,
    width: 100,
  },
  buttonText: {
    fontSize: 18,
    color: '#007fff'
  }
});