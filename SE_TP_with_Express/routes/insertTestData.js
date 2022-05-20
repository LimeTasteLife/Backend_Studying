const fs = require('fs');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const Category = require('../models/category');
const Rest_image = require('../models/rest_image');
const { sequelize, Rest_cate } = require('../models');
const { resolve } = require('path');

module.exports = async function parsingData() {
  try {
    let i = 0;
    fs.readFile(
      './public/data/restaurant_data.json',
      'utf-8',
      async (err, jsonFile) => {
        const jsonData = JSON.parse(jsonFile);
        //console.log(jsonFile);
        const { restaurants } = jsonData;
        let i = 0;
        for await (let item of restaurants) {
          await new Promise((resolve, reject) => setTimeout(resolve, 1000));
          await creatingRestaurantData(item);
          i++;
          console.log(i);
        }
      }
    );
    return;
  } catch {
    return console.error(err);
  }
};

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
    //console.log(categories);
    checkCategory(createRestaurantData, categories);
    console.log('go to logo');
    addLogoUrl(createRestaurantData, logo_url, id);
    console.log('go to menu');
    addMenus(createRestaurantData, menu, id);
    console.log('restaurant added');
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function checkCategory(rest, categories) {
  try {
    if (categories) {
      const result = await Promise.all(
        categories.map(async (category) => {
          //console.log(category);
          return Category.findOrCreate({
            where: { name: category },
            defaults: { name: category },
          });
        })
      );
      await rest.addCategory(result.map((r) => r[0]));
      console.log('cate add finished');
    }
    return;
  } catch (err) {
    console.error(err);
    return;
  }
}

async function addLogoUrl(rest, logo_url, rest_id) {
  try {
    const createLogo = await Rest_image.create({
      url: logo_url,
    });
    await rest.addRest_image(createLogo);
  } catch (error) {
    console.error(error);
    return;
  }
}

async function addMenus(rest, menu, rest_id) {
  try {
    await Promise.all(
      menu.map(async (item) => {
        //console.log(item);
        let { original_image, image, price, name } = item;
        const createMenu = await Menu.create({
          restaurant_id: rest_id,
          name: name,
          price: parseInt(price),
          url: image, // original image?
        });
        await rest.addMenu(createMenu);
        console.log('adding menu finished');
      })
    );
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}
