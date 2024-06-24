import { View, Text, Alert, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { cartSlice, selectDeliveryPrice, selectSubtotal, selectTotal } from '../store/cartSlice'
import { useCreateOrderMutation } from '../store/apiSlice'
import CartListItem from '../components/CartListItem'

const ShoppingCartTotals=()=>{
  const subtotal=useSelector(selectSubtotal)
  const deliveryFee=useSelector(selectDeliveryPrice)
  const total=useSelector(selectTotal)
  return(
    <View style={styles.totalContainer} >
      <View style={styles.row}>
        <Text style={styles.text} >Subtotal</Text>
        <Text style={styles.text}>{subtotal} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>DeliveryFee</Text>
        <Text style={styles.text}>{deliveryFee} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} </Text>
      </View>
    </View>
  )
}

const ShoppingCart = () => {
  const subtotal=useSelector(selectSubtotal)
  const deliveryFee=useSelector(selectDeliveryPrice)
  const total=useSelector(selectTotal)
  const dispatch=useDispatch()
  const cartItems=useSelector((state)=>state.cart.items)
  const [createOrder,{data,isLoading,error}]=useCreateOrderMutation()
  console.log(error,isLoading)
  const onCreateOrder=async()=>{
    const results=await createOrder({
      items:cartItems,
      subtotal,
      deliveryFee,
      total,
      customers:{
        name:'vadim',
        address:'myhome',
        email:'vadim@notjust.dev'
      }
    })
    if(results.data?.status==='OK'){
      Alert.alert(
        'Order has been submitted',
        `your data reference is:${results.data.data.ref}`
      )
      dispatch(cartSlice.actions.clear())
    }
  }
  return (
    <>
    <FlatList
    data={cartItems}
    renderItem={({item})=> <CartListItem cartItem={item} />}
    ListFooterComponent={ShoppingCartTotals}
    />
    <Pressable
    onPress={onCreateOrder}
    style={{
      position:'absolute',
      backgroundColor:'black',
      bottom:30,
      width:'90%',
      alignSelf:'center',
      padding:20,
      borderRadius:100,
      justifyContent:'center',
      alignItems:'center'
    }}
    >
      <Text
      style={{
        color:'white',
        fontWeight:'500',
        fontSize:16
      }}
      >
        Checkout
        {isLoading&&<ActivityIndicator/> }
      </Text>
    </Pressable>
    </>
  )
}

export default ShoppingCart
const styles=StyleSheet.create({
  totalContainer:{
    margin:20,
    paddingTop:10,
    borderColor:'gainsboro',
    borderTopColor:1
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:2
  },
  text:{
    fontSize:16,
    color:'gray'
  },
  textBold:{
    fontSize:16,
    fontWeight:'500'
  }
})