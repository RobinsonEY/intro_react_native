import React, {Component, useState} from 'react';
import {Button, Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import { TaskItem, TaskItemProps } from './components/taskItem';
import { TaskInputField } from './components/taskInputField';


export default function App() {
  //let tasks:Array<TaskItemProps> = [{index:1,task:'1'}]
  /*
  const [tasks, setTasks] = useState([]);

  const addTask = (task:any) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  }

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }*/

  const [tasks, setTasks] = useState(new Array<TaskItemProps>());

  const addTask = (task:TaskItemProps) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  }

   

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {
        tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem index={index} task={task.task} key={index} />
                         </View>
          );
        })
      }

      </ScrollView>
      <TaskInputField addTask={addTask}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});