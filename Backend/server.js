const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

app.post('/api/save-gift-data', async (req, res) => {
    const giftData = req.body;
    try {
        await client.connect();
        const database = client.db('ecommerce');

        const collection = database.collection('gifts');
        const result = await collection.insertOne(giftData);
        const id = result.insertedId;

        const collection2 = database.collection('giftList');
        const result2 = await collection2.insertOne({ giftId: id });

        res.status(200).send({ message: 'Gift data saved and gift id inserted', giftId: id, giftListId: result2.insertedId });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send({ error: 'Failed to save data' });
    } finally {
        await client.close();
    }
});

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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
