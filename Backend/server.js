const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

app.get("/api/status", (req, res) => {
    res.json({ status: "Connected" });
});

app.post('/api/save-gift-data', async (req, res) => {
    const giftData = req.body;

    if (!giftData.GIFT_TYPE) {
        return res.status(400).send({ error: "Gift type is required" });
    }

    try {
        await client.connect();
        const database = client.db('ecommerce');

        const collection = database.collection('gifts');
        const result = await collection.insertOne(giftData);
        const id = result.insertedId;

        const collection2 = database.collection('giftList');
        const result2 = await collection2.insertOne({ giftId: id, GIFT_TYPE: giftData.GIFT_TYPE });

        res.status(200).send({ message: 'Gift data saved and gift id inserted', giftId: id, giftListId: result2.insertedId });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send({ error: 'Failed to save data' });
    } finally {
        await client.close();
    }
});

app.get('/api/get-all-gift-data', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.status(200).json(gifts);
    } catch (err) {
        console.error('Error fetching gift data:', err);
        res.status(500).json({ error: 'Failed to fetch gift data' });
    } finally {
        await client.close();
    }
}
);

app.get('/api/total-gifts', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection('gifts');
        const totalGifts = await collection.countDocuments({});
        res.status(200).json({ totalGifts });
    } catch (err) {
        console.error('Error fetching total gifts:', err);
        res.status(500).json({ error: 'Failed to fetch total gifts' });
    } finally {
        await client.close();
    }
}
);

app.post('/api/save-category-name', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');

        const collection = database.collection('categoryNames');

        const categoryName = req.body['categoryName'];
        const result = await collection.insertOne({ categoryName });
        res.status(200).send({ message: 'Category name saved' });
    } catch (err) {
        console.error('Error saving category name:', err);
        res.status(500).send({ error: 'Failed to save category name' });
    } finally {
        await client.close();
    }
}
);

app.get('/api/get-category-names', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection('categoryNames');
        const categories = await collection.find({}).toArray();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching category names:', err);
        res.status(500).json({ error: 'Failed to fetch category names' });
    } finally {
        await client.close();
    }
}
);

app.post('/api/get-all-products-by-category', async (req, res) => {
    const categoryName = req.body.categoryName;

    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection('products');
        const products = await collection.find({ category: categoryName }).toArray();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).json({ error: 'Failed to fetch products by category' });
    } finally {
        await client.close();
    }
}
);

app.get('/api/products-by-category', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const productsCollection = database.collection('products');

        const productsByCategory = await productsCollection.aggregate([
            {
                $group: {
                    _id: "$category",
                    products: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    products: 1
                }
            }
        ]).toArray();

        res.status(200).json(productsByCategory);
    } catch (err) {
        console.error('Error grouping products:', err);
        res.status(500).json({ error: 'Failed to fetch grouped products' });
    } finally {
        await client.close();
    }
});

app.get('/api/get-gift-by-product-id/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        await client.connect();
        const database = client.db('ecommerce');
        const productsCollection = database.collection('products');

        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching gift by product ID:', err);
        res.status(500).json({ error: 'Failed to fetch gift by product ID' });
    } finally {
        await client.close();
    }
});

app.post('/api/save-product', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const collection = database.collection('products');

        const productData = req.body;
        const result = await collection.insertOne(productData);
        res.status(200).send({ message: 'Product saved successfully', productId: result.insertedId });
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).send({ error: 'Failed to save product' });
    } finally {
        await client.close();
    }
});

app.delete('/api/delete-gift/:id', async (req, res) => {
    const giftId = req.params.id;

    try {
        await client.connect();
        const db = client.db('ecommerce');

        const giftsCollection = db.collection('gifts');
        const giftListCollection = db.collection('giftList');

        const objectId = new ObjectId(giftId);

        const deleteGift = await giftsCollection.deleteOne({ _id: objectId });
        const deleteGiftRef = await giftListCollection.deleteMany({ giftId: objectId });

        res.status(200).json({ message: 'Gift deleted', deleteGift, deleteGiftRef });
    } catch (err) {
        console.error("Error deleting gift:", err);
        res.status(500).json({ error: 'Failed to delete gift' });
    } finally {
        await client.close();
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
