import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
import asyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid Email.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/auth", formData);
      if (response.status == 200) {
        // console.log(response.data);
        const data = response?.data;
        const token = data?.token;
        const user = data?.user;
        await asyncStorage.setItem("token", token);
        await asyncStorage.setItem("user", JSON.stringify(user));
        router.replace("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <View className="flex-1 flex-col items-center gap-4 p-6">
      <Text className="text-xl font-bold">Welcom Back!</Text>
      <View className="flex flex-col gap-2 w-full">
        <Text className="text-lg">Email</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="Email"
          autoCapitalize={false}
          keyboardType="email-address"
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
        ></TextInput>

        <Text className="text-lg">Password</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="********"
          autoCapitalize={false}
          secureTextEntry={true}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}


        ></TextInput>
        {error && <Text className="text-red-500">{error}</Text>}
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-black w-full p-2 rounded-md">
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default login