const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});
//Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

//Important!!!! Everytime cluster starts REWRITE CLUSTER LINK
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://BrandAd:brandadmogodb@cluster0.rn6vcal.mongodb.net/test', {
        useNewUrlParser: true
    });

    return client.db('BrandAd').collection('posts');
}
module.exports = router;
// 'mongodb+srv://BrandAd:brandadmogodb@cluster0.rn6vcal.mongodb.net/?retryWrites=true&w=majority'