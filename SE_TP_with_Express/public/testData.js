const fs = require('fs');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const Category = require('../models/category');
const Rest_image = require('../models/rest_image');

async function parsingData() {
  try {
    fs.readFile('./example.json', 'utf-8', (err, jsonFile) => {
      const jsonData = JSON.parse(jsonFile);
      //console.log(jsonFile);
      const { restaurants } = jsonData;
      restaurants.forEach((item) => {
        creatingRestaurantData(item);
      });
    });
    return;
  } catch {
    return console.error(err);
  }
}

async function creatingRestaurantData(item) {
  try {
    let { info, menu } = item;
    let {
      id,
      name,
      review_avg,
      begin,
      end,
      min_order_amount,
      estimated_delivery_time,
      adjusted_delivery_fee,
      phone,
      address,
      logo_url,
      categories,
      lat,
      lng,
    } = info;

    const createRestaurantData = await Restaurant.create({
      id: id,
      name: name,
      review_avg: review_avg,
      begin: begin,
      end: end,
      min_order_amount: min_order_amount,
      delivery_fee: adjusted_delivery_fee,
      delivery_time: estimated_delivery_time,
      phone: phone,
      address: address,
      lat: lat,
      long: lng,
    });

    checkCategory(createRestaurantData, categories);
    addLogoUrl(createRestaurantData, logo_url, id);
    addMenus(createRestaurantData, menu, id);

    return;
  } catch {
    console.error(error);
    return;
  }
}

async function checkCategory(rest, categories){
    try {
        categories.forEach((item) => {
            const findCategory = await Category.findOrCreate({
                where: {
                    name: item,
                },
            });
            await Restaurant.addCategory(findCategory);
        });
        return;
    } catch {
        console.error(error);
        return;
    }
}

async function addLogoUrl(rest, logo_url, rest_id){
    try {
        const createLogo = await Rest_image.create({
            url: logo_url,
        });
        rest.addRest_image(createLogo);
    } catch {
        console.error(error);
        return;
    }
}

async function addMenus(rest, menu, rest_id){
    try {
    menu.forEach((item) => {
        let { original_image, image, price, name } = item;
        const createMenu = await Menu.create({
            restaurant_id: rest_id,
            name: name,
            price: parseInt(price),
            url: image, // original image?
        });
        rest.addMenu(createMenu);
      });
      return;
    } catch {
        console.error(error);
        return;
    }
}

parsingData();

module.exports = parsingData();

