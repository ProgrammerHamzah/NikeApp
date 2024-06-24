const express=require('express')
const productRoutes=require('./src/router/productRoutes')
const orderRoutes=require('./src/router/orderRoutes')
const bodyParser=require('body-parser')

const app=express()
const PORT=3000

app.use('/',bodyParser.json())
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)

app.get('/',(req,res)=>{
    res.send('<h2>hello world</h2>')
})
app.listen(PORT,()=>{
    console.log('api is listening on port ',PORT)
})