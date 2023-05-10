import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { Text } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { ITodo } from '../models/todo.model';
import { getTodosFakeData } from '../services/todo-service';
import TodoList from '../components/todo-list';
import Menu from '../components/menu';
import EditTodoView from './edit-todo.view';

const mockUser = {
  username: 'JuanPerezEY',
  name: 'Juan',
  lastname: 'Perez'
}

export const UserContext = createContext(mockUser)

export default function Home() {

  const [data, setData] = useState<ITodo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onAddTodo = () => { setIsModalVisible(true) }
  const onCloseEditTodo = () => { setIsModalVisible(false) }
  const onSaveTodo = (data: ITodo) => { setData((d) => [...d, data]); setIsModalVisible(false) }

  const onDeleteTodo = (index: number) => {
    let oldData = [...data];
    oldData.splice(index, 1)
    setData([...oldData])
  }

  //Cuando corre por primera vez
  useEffect(() => {
    getTodosFakeData().then((data) => {
      setData([...data]);
    })
  }, []);


  return (
        <SafeAreaView style={styles.container}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#009245', '#FCEE21']}
            style={styles.linearGradient}
          >
            <Text h1={true} style={styles.title}>Daily Tasks</Text>

          </LinearGradient>
          <ScrollView style={styles.scrollView}>
            <TodoList data={data} onDeleteTodo={onDeleteTodo} />
          </ScrollView>
          <Menu onAddTodo={onAddTodo} />
          {isModalVisible ? (
                  <EditTodoView isVisible={isModalVisible}
                  onClose={onCloseEditTodo}
                  onSave={onSaveTodo}
                />
          ) : (
            false
          )}

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: 'black'
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  linearGradient: {
    paddingBottom:20
  },
});