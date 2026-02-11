import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const SWIGGY_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://www.swiggy.com',
    'Referer': 'https://www.swiggy.com/'
};

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// ===== Food delivery restaurants API =====
app.get('/api/restaurants', async (req, res) => {
    const lat = req.query.lat || '22.5726';
    const lng = req.query.lng || '88.3639';
    console.log(`Fetching restaurants for lat=${lat}, lng=${lng}`);
    try {
        const swiggyRes = await fetch(
            `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
            { headers: SWIGGY_HEADERS }
        );
        if (!swiggyRes.ok) throw new Error(`Swiggy responded with status ${swiggyRes.status}`);
        const data = await swiggyRes.json();
        console.log('✅ Restaurants API OK');
        res.json(data);
    } catch (err) {
        console.error('❌ Restaurants API error:', err.message);
        res.status(502).json({ error: 'Failed to fetch restaurants', message: err.message });
    }
});

// ===== Instamart / Grocery (scraped from page HTML) =====
// Swiggy's Instamart API is protected. This endpoint scrapes product data
// from the rendered Instamart page HTML.
app.get('/api/instamart', async (req, res) => {
    console.log('Fetching Instamart page...');
    try {
        const pageRes = await fetch('https://www.swiggy.com/instamart', {
            headers: { 'User-Agent': SWIGGY_HEADERS['User-Agent'] }
        });
        if (!pageRes.ok) throw new Error(`Instamart page responded with status ${pageRes.status}`);
        const html = await pageRes.text();

        // Extract product data from embedded ___INITIAL_STATE___
        const products = [];
        const productRegex = /"displayName":"([^"]+)","brandName":"([^"]+)","imageIds":\["([^"]+)"/g;
        let match;
        const seen = new Set();
        while ((match = productRegex.exec(html)) !== null) {
            const name = match[1];
            if (seen.has(name)) continue;
            seen.add(name);
            products.push({
                id: `im-${products.length}`,
                displayName: name,
                brandName: match[2],
                imageId: match[3]
            });
        }

        // Also extract price data
        const priceRegex = /"displayName":"([^"]+)"[^}]*?"mrp":(\d+)[^}]*?"price":(\d+)/g;
        const priceMap = {};
        while ((match = priceRegex.exec(html)) !== null) {
            priceMap[match[1]] = { mrp: parseInt(match[2]), price: parseInt(match[3]) };
        }

        for (const p of products) {
            const prices = priceMap[p.displayName];
            if (prices) {
                p.mrp = prices.mrp;
                p.price = prices.price;
            }
        }

        console.log(`✅ Instamart: Found ${products.length} products`);
        res.json({ statusCode: 0, data: { products } });
    } catch (err) {
        console.error('❌ Instamart error:', err.message);
        res.status(502).json({ error: 'Failed to fetch instamart', message: err.message });
    }
});

// ===== Dineout restaurants (scraped from __NEXT_DATA__) =====
app.get('/api/dineout', async (req, res) => {
    console.log('Fetching Dineout page...');
    try {
        const pageRes = await fetch('https://www.swiggy.com/dineout', {
            headers: { 'User-Agent': SWIGGY_HEADERS['User-Agent'] }
        });
        if (!pageRes.ok) throw new Error(`Dineout page responded with status ${pageRes.status}`);
        const html = await pageRes.text();

        // Extract __NEXT_DATA__ JSON
        const match = html.match(/<script id="__NEXT_DATA__"[^>]*>(.+?)<\/script>/);
        if (!match) throw new Error('Could not find __NEXT_DATA__ in dineout page');

        const nextData = JSON.parse(match[1]);
        const cards = nextData?.props?.pageProps?.widgetResponse?.success?.cards || [];

        // Find restaurant listings
        let restaurants = [];
        for (const card of cards) {
            const rests = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if (rests) {
                restaurants = rests;
                break;
            }
        }

        console.log(`✅ Dineout: Found ${restaurants.length} restaurants`);
        res.json({
            statusCode: 0,
            data: { cards, restaurants }
        });
    } catch (err) {
        console.error('❌ Dineout error:', err.message);
        res.status(502).json({ error: 'Failed to fetch dineout', message: err.message });
    }
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend proxy running on http://localhost:${PORT}`);
    console.log('Routes: /api/restaurants, /api/instamart, /api/dineout');
});
