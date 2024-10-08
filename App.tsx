import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([


    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);

  
  const [editingTodoId, setEditingTodoId]  = useState<number | null>(null); 

  const handleAddTodo = () => {
    if (!title) { 
        Alert.alert('Error', 'Please enter your todo');
      return;
    }

    if (editingTodoId !== null) { setTodo(todo.map(item => 
        item.id === editingTodoId ?
         { ...item, title: title } : item
      ));


      setEditingTodoId(null); 
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: 
        false,
      };

      setTodo([...todo, newTodo]);
    }
    
    setTitle(''); 
  };

  const handleEditTodo = (
    id: number, currentTitle: string) => {
    setTitle(currentTitle); 
    setEditingTodoId(id); 
  };

  const handleDeleteTodo = (
    id: number) => {
    setTodo(todo.filter(
        item => item.id !== id)); 
  };


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#e9f5ea',
      }}

    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}

      >
        <TextInput
          placeholder='Enter your todo'
          placeholderTextColor={'#64735f'}
          style={{
            flex: 1,
            borderColor: '#768c6f',
            borderWidth: 1,
            color: '#768c6f',
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />

        <Pressable
          style={{
            backgroundColor: '#88A47F',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}
        >

          <Text
            style={{
              color: '#fff',
            }}
          >

            {editingTodoId !== null ? 'Update Todo' : 'Add Todo'} 
          </Text>
        </Pressable>
      </View>
      


      {todo.map(item => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 11,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: '#768c6f',
              flex: 1,
            }}
          >

            {item.title}
          </Text>
          <Pressable
            onPress={() => 
                handleEditTodo(item.id, item.title)} 
            style={{
              backgroundColor: '#88A47F',
              padding: 9,
              borderRadius: 6,
              marginRight: 9,
            }}
          >

            <Text style={{ color: '#fff' }}
            >Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => 
                handleDeleteTodo(item.id)} 
            style={{
              backgroundColor: '#FF6347',
              padding: 9,
              borderRadius: 6,
            }}
          >
            
            <Text style={{ color: '#fff' }}
            >Delete</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
