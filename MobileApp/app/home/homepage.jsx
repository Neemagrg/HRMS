import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import {useRouter} from "expo-router";

const homepage = () => {
  const router = useRouter();
  return (
    <View className = "flex-1 bg-blue-600 flex flex-col">
        <View className = "w-full h-[100px] flex flex-row p-5">
            <Icon name = "align-left" size={40} color="#fff"></Icon>
            <Text className = "text-white font-semibold w-full text-center text-2xl">HRMS Enrichment</Text>
        </View>

        <View className = "w-full h-full bg-white rounded-[40px] grid grid-cols-2 p-5 gap-y-5 place-items-center">
          <TouchableOpacity 
          onPress={()=> {
            router.push("/home/employee");
          }}
          
        className = "w-[95%] h-[180px] rounded-2xl flex flex-col p-4 gap-3 justify-center shadow-lg">
        <View className = "w-[60px] h-[60px] bg-purple-500 rouded-xl flex items-center justify-center">
            <Icon name = "user" size={40} color="#fff"/>
        </View>
        <View className = "w-full flex flex-col">
            <Text className = "text-xl text-black">Employee</Text>
            <Text className = "text-xl text-black">Management</Text>
        </View>
       
        </TouchableOpacity>
        

        <View className = "w-[95%] h-[180px] rounded-2xl flex flex-col p-4 gap-3 justify-center shadow-lg">
        <View className = "w-[60px] h-[60px] bg-blue-500 rouded-xl flex items-center justify-center">
            <Icon name = "plane" size={40} color="#fff"></Icon>
        </View>
        <View className = "w-full flex flex-col">
            <Text className = "text-xl text-black">Leave</Text>
            <Text className = "text-xl text-black">Management</Text>
        </View>
        </View>

        <View className = "w-[95%] h-[180px] rounded-2xl flex flex-col p-4 gap-3 justify-center shadow-lg">
        <View className = "w-[60px] h-[60px] bg-green-500 rouded-xl flex items-center justify-center">
            <Icon name = "money" size={40} color="#fff"></Icon>
        </View>
        <View className = "w-full flex flex-col">
            <Text className = "text-xl text-black">Payroll</Text>
            <Text className = "text-xl text-black">Management</Text>
        </View>
        </View>


        <View className = "w-[95%] h-[180px] rounded-2xl flex flex-col p-4 gap-3 justify-center shadow-lg">
        <View className = "w-[60px] h-[60px] bg-yellow-500 rouded-xl flex items-center justify-center">
            <Icon name = "book" size={40} color="#fff"></Icon>
        </View>
        <View className = "w-full flex flex-col">
            <Text className = "text-xl text-black">Attendence</Text>
            <Text className = "text-xl text-black">Management</Text>
        </View>
        </View>
    </View>
    </View>
  )
}

export default homepage