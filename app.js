console.clear()
const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const Product = require('./models/product')
const AppError = require('./AppError');
const methodOverride = require('method-override');
const { throws } = require('assert');

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));


//mongo connection using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Connection Open hai boss")
    })
    .catch(err => {
        console.log("Connection nahi ho paaya, error hai sasura");
        // console.log(err)
    })

//setting path and view engine to ejs

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//check .get() to see if the server is working or not

//error handling function
function wrapAsync(fn) {
    return function (req, res, next) {

        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/products', wrapAsync(async (req, res) => {
    const products = await Product.find({})
    // console.log(products)
    console.log("sent /products")
    res.render('products/index', { products })
}))
app.get('/products/new', (req, res) => {

    res.render("products/newProd")
})
app.post('/products/new', wrapAsync(async (req, res, next) => {

    const { name, price, category } = req.body;
    await Product.insertMany([
        {
            name,
            price,
            category
        }
    ])
    res.redirect('/products')

}))
app.get('/products/:id', wrapAsync(async (req, res, next) => {

    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        return next(new AppError("This wasn't found", 404))
    }
    console.log("Sent /ProdDesc Page")
    res.render('products/prodDesc', { product })

    // console.log(product)
}))

app.get('/products/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("No editable product was found here", 404)
    }
    res.render('products/edit', { product })

}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {

    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id.toString()}`)
}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    console.log(req.params)
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
}))

//error handling middleware
app.use((err, req, res, next) => {
    // console.log("The error handling middleware is running")
    // console.log(err)
    const { status = 500, message } = err;
    console.log(message)
    res.status(status).send(message)
})


//listening for a connection for get or post request

app.listen(3000, () => {
    console.log("App is listening!!")
})