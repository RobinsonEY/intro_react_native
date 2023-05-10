import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Menu from './components/menu';
import TodoList from './components/todo-list';
import { ITodo } from './models/todo.model';
import EditTodoView from './screens/edit-todo.view';
import { getTodos } from './services/todo-service';
import { Text } from '@rneui/themed';

export default function App() {

  const [data, setData] = useState<ITodo[]>([])
  const [isEditTodoVisible, setIsEditTodoVisible] = useState(false)
  
  const onAddTodo = () => { setIsEditTodoVisible(true) }
  const onCloseEditTodo = () => { setIsEditTodoVisible(false) }
  const onSaveTodo = (data: ITodo) => { setData((d) => [...d, data]); setIsEditTodoVisible(false) }

  const onDeleteTodo = (index: number) => {
    let oldData = [...data];
    oldData.splice(index, 1)
    setData([...oldData])
  }

  useEffect(() => {
    getTodos().then((data) => {
      setData([...data]); 
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text h1={true} style={styles.title}>Daily Tasks</Text>
      <ScrollView style={styles.scrollView}>
        <TodoList data={data} onDeleteTodo={onDeleteTodo} />
      </ScrollView>
      <Menu onAddTodo={onAddTodo} />
      <EditTodoView isVisible={isEditTodoVisible}
        onClose={onCloseEditTodo}
        onSave={onSaveTodo}
      />
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
    color:'black'
  },
  scrollView: {
    marginHorizontal: 20,
  },
});