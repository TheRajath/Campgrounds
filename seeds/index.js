const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/camp-grounds');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {

    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '6427c9999ba7e78116bf0c06',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgfwiqvlx/image/upload/v1680705001/YelpCamp/wfhwhyiivlflziavpint.jpg',
                    filename: 'YelpCamp/wfhwhyiivlflziavpint'
                },
                {
                    url: 'https://res.cloudinary.com/dgfwiqvlx/image/upload/v1680705009/YelpCamp/cw4vnhjgb1pmfl3xnljb.jpg',
                    filename: 'YelpCamp/cw4vnhjgb1pmfl3xnljb'
                }
            ]
        });

        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});
