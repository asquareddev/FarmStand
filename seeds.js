const mongoose = require('mongoose')

const Product = require('./models/product')


//mongo connection using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Connection Open hai boss")
    })
    .catch(err => {
        console.log("Connection nahi ho paaya, error hai sasura");
        console.log(err)
    })

// const p = new Product({
//     name:'Ruby Grapefruit',
//     price:1.99,
//     category:'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

// const seedProducts = [
//     {
//       name: 'Organic Tomatoes',
//       price: 2.49,
//       category: 'vegetable'
//     },
//     {
//       name: 'Fresh Spinach',
//       price: 1.99,
//       category: 'vegetable'
//     },
//     {
//       name: 'Green Peppers',
//       price: 1.29,
//       category: 'vegetable'
//     },
//     {
//       name: 'Zucchini',
//       price: 1.79,
//       category: 'vegetable'
//     },
//     {
//       name: 'Sweet Potatoes',
//       price: 2.19,
//       category: 'vegetable'
//     }
//   ]
  
  

//   Product.insertMany(seedProducts)
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })
  
// module.export = Product
