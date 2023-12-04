import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });

        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderToDo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
          {!item.done && (
            <Ionicons name="ellipse-outline" size={24} color="black" />
          )}

          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-outline"
          size={24}
          color="black"
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addTodo()}
          disabled={todo === ""}
        >
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={(item) => renderToDo(item)}
        keyExtractor={(todo: Todo) => todo.id}
        ListEmptyComponent={<Text>No Todos</Text>}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "80%",
    backgroundColor: "white",
  },

  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  todoText: {
    marginLeft: 10,
    fontSize: 18,
    width: "80%",
  },

  todo: {
    flexDirection: "row",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#007AFF", // Change color as desired
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
