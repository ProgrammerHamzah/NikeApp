import { View, Text, ActivityIndicator, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import {useDispatch} from 'react-redux'
import { useGetProductsQuery } from '../store/apiSlice'

const ProductsScreen = ({navigation}) => {
  const dispatch=useDispatch()
  const {data,isLoading,error}=useGetProductsQuery()
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    console.log(error)
    return <Text>error fetching the products {error.error} </Text>
  }
  const products=data.data
  return (
    <FlatList
    data={products}
    renderItem={({item})=>(
      <Pressable
      onPress={()=>{
        navigation.navigate('Product Details',{id:item._id})
      }}
      style={{width:'50%',padding:1}}
      >
      <Image
      source={{uri:item.image}}
      style={{
        width:'100%',
        aspectRatio:1
      }}
      />
      </Pressable>
      
    )}
    numColumns={2}
    />
  )
}

export default ProductsScreen