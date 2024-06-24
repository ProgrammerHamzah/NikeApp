import { View, Text, useWindowDimensions, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import {useDispatch} from 'react-redux'
import { useGetProductQuery } from '../store/apiSlice'
import { cartSlice } from '../store/cartSlice'
import { Pressable } from 'react-native'

const ProductDetailsScreen = ({route}) => {
  const id=route.params.id
  const {data,isLoading,error}=useGetProductQuery(id)
  const product=data?.data
  const dispatch=useDispatch()
  const {width}=useWindowDimensions()
  const addToCart=()=>{
    dispatch(cartSlice.actions.addCartItem({product:product}))
  }
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>error fetching the product.{error.error} </Text>
  }
  return (
    <View style={{flex:1}}>
      <FlatList
      data={product.images}
      renderItem={({item})=>(
        <Image source={{uri:item}} style={{width,aspectRatio:1,flex:1}} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      />
      <ScrollView>
        <View style={{padding:20}} >
          <Text style={{fontSize:34,fontWeight:'500',marginVertical:10}} >{product.name} </Text>
          <Text style={{fontWeight:'500',fontSize:16, letterSpacing:1.5}} >${product.price} </Text>
          <Text style={{marginVertical:10,fontSize:18,lineHeight:30,fontWeight:'300'}} >{product.description} </Text>
        </View>
      </ScrollView>
      <Pressable
      onPress={addToCart}
      style={{
        position:'absolute',
        backgroundColor:'black',
        bottom:30,
        width:'90%',
        alignSelf:'center',
        padding:20,
        borderRadius:20,
        justifyContent:'center'
      }}
      >
        <Text
        style={{
          color:'white',
          fontWeight:'500',
          fontSize:16
        }}
        >add to cart</Text>
      </Pressable>
    </View>
  )
}

export default ProductDetailsScreen