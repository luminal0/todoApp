import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const auth: Auth = getAuth();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User created!");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("To Do List");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image
          source={require("../assets/LoginImage1.png")}
          style={styles.imageMain}
        />
        <Image
          source={require("../assets/waystodo.png")}
          style={styles.imageSecond}
        />

        <Text style={styles.typo}>
          Write your activity and finish your activity. Fast, Simple and Easy to
          Use
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="Password"
          secureTextEntry
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.buttonRegister} onPress={signUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogin} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 16,
  },
  buttonRegister: {
    width: "100%",
    backgroundColor: "#ff4500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonLogin: {
    width: "100%",
    backgroundColor: "#808080",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  imageMain: {
    width: 300,
    height: 300,
    marginTop: -100,
    resizeMode: "contain",
    alignSelf: "center",
  },

  imageSecond: {
    marginTop: -50,
    width: 300,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },

  typo: {
    fontSize: 15,
    textAlign: "center",
    color: "grey",
  },
});
