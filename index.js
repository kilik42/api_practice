const express = require('express');

const request = require('request-promise');

const app = express();

const PORT = process.env.PORT || 5000;




const generateScraperUrl =(apiKey) => `http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/', (req,res) => {
    res.send('Welcome to Amazon Scraper API.');

});

//get all products
app.get('/products/:productId?api_key', (req,res) => {
    const productId = req.params;
    const apiKey = req.query;
    const url = `${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`;

    try{
        const response = await request(url);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

//get product reviews
app.get('/products/:productId/reviews', (req,res) => {
    const productId = req.params;
    const apiKey = req.query;
    const url = `${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`;

    try{
        const response = await request(url);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

//get product offers
app.get('/products/:productId/offers', (req,res) => {
    const productId = req.params;
    const apiKey = req.query;
    const url = `${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`;

    try{
        const response = await request(url);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});

//get search results
app.get('/search/:searchQuery', (req,res) => {
    const searchQuery = req.params;
    const apiKey = req.query;
    const url = `${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`;

    try{
        const response = await request(url);
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
    }
});




app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));



