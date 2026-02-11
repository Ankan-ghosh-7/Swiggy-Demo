const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock restaurant data
const mockData = {
    data: {
        cards: [
            {
                card: {
                    card: {
                        gridElements: {
                            infoWithStyle: {
                                restaurants: [
                                    {
                                        info: {
                                            id: "1",
                                            name: "Pizza Palace",
                                            cloudinaryImageId: "test1",
                                            cuisines: ["Pizza", "Italian"],
                                            avgRating: 4.5
                                        }
                                    },
                                    {
                                        info: {
                                            id: "2",
                                            name: "Burger Barn",
                                            cloudinaryImageId: "test2",
                                            cuisines: ["Burgers", "American"],
                                            avgRating: 4.2
                                        }
                                    },
                                    {
                                        info: {
                                            id: "3",
                                            name: "Sushi Studio",
                                            cloudinaryImageId: "test3",
                                            cuisines: ["Sushi", "Japanese"],
                                            avgRating: 4.8
                                        }
                                    },
                                    {
                                        info: {
                                            id: "4",
                                            name: "Taj Mahal",
                                            cloudinaryImageId: "test4",
                                            cuisines: ["Indian", "North Indian"],
                                            avgRating: 4.3
                                        }
                                    },
                                    {
                                        info: {
                                            id: "5",
                                            name: "Dragon Palace",
                                            cloudinaryImageId: "test5",
                                            cuisines: ["Chinese", "Asian"],
                                            avgRating: 4.1
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]
    }
};

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

app.get('/api/restaurants', (req, res) => {
    console.log('Restaurant API called');
    res.json(mockData);
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend proxy running on http://localhost:${PORT}`);
});
