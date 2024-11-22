const express = require('express')
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const multer = require('multer')
const path = require('path')

const newUserDetails = require('./Schema/userSchema')

const newProductCollection = require('./Schema/ProductSchema')

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/addproduct', upload.single('img'), async (req, res) => {
    const { name, desc, price, img } = req.body
    const imagePath = req.file ? req.file.path : null;
    try {
        const productdata = {
            name: name,
            description: desc,
            price: price,
            img: imagePath
        }
        await newProductCollection.insertMany([productdata])
        res.json("Inserted")
    } catch (err) {
        alert(err)
    }
})

app.post('/adminhome', async (req, res) => {

    const findProduct = await newProductCollection.find()
    res.json(findProduct);
})

app.post('/section3', async (req, res) => {
    const viewProduct = await newProductCollection.find();
    res.json(viewProduct)
})

app.delete('/deleteitem/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteitem = await newProductCollection.findByIdAndDelete(id);
        if (!deleteitem) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/updateitem/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc, price } = req.body;

    try {
        const updatedItem = await newProductCollection.findByIdAndUpdate(id, {
            name,
            description: desc,
            price
        }, { new: true });

        if (updatedItem) {
            res.json({ message: "Product updated successfully", updatedItem });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

app.post('/userreg', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const newReg = {
            name,
            email: email,
            password: password,
        }
        const Reg = await newUserDetails.insertMany(newReg);
        if (Reg) {
            res.send("Sucess")
        } else {
            res.send("failed")
        }
    } catch (err) {
        res.status(500);
    }
})

app.post('/userlogin', async (req, res) => {
    const { email, password } = req.body;
    const user = await newUserDetails.findOne({ email, password })
    if (user) {
        res.json({ status: "Exist", name: user.name })
    } else {
        res.json("Notexist")
    }
})


app.listen(8000, () => {
    console.log("Server connected on port 8000")
})

