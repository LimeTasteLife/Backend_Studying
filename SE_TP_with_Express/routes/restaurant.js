const express = require('express');
const { Restaurant, Category, Menu, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const router = express.Router();

const Query_Get_Restaurant_Category =
  'SELECT r.id, r.name, r.review_avg, r.begin, r.end, r.min_order_amount, r.delivery_fee, r.delivery_time, r.phone, r.address, r.url, r.lat, r.lng FROM restaurant r JOIN rest_cate rc ON r.id = rc.restaurant_id JOIN category c ON c.id = rc.category_id WHERE c.name = :cate ORDER BY r.created_at DESC LIMIT :limit OFFSET :offset';

// get restaurant lists with category
router.get('/category', async (req, res, next) => {
  try {
    const { category, pageNum } = req.query;
    if (!category) {
      res.status(400).json({
        log: 'wrong input',
      });
    }
    if (!pageNum) pageNum = 0;
    const cate = decodeURIComponent(category);

    const findRestaurantwithCategory = await sequelize.query(
      Query_Get_Restaurant_Category,
      {
        replacements: { cate: category, limit: 10, offset: parseInt(pageNum) },
        type: QueryTypes.SELECT,
      }
    );
    if (!findRestaurantwithCategory) {
      res.status(500).json({
        log: 'no restaurant found',
      });
    } else {
      res.status(200).json(findRestaurantwithCategory);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'restaurant load failure',
    });
  }
});

// inserting restaurant
router.post('/full', async (req, res, next) => {
  try {
    const {
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
      url,
      categories,
      lat,
      lng,
    } = req.body.restaurant;

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
      url: url,
      lat: lat,
      lng: lng,
    });
    if (!createRestaurantData) {
      res.status(400).json({
        log: 'restaurant insert failure',
      });
    } else {
      checkCategory(createRestaurantData, categories);
      addMenus(createRestaurantData, menu, id);
      res.status(200).json({
        log: 'restaurant insert success',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'restaurant insert failure',
    });
  }
});

// updating restaurants
router.patch('/', async (req, res, next) => {
  try {
    const {
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
      url,
      lat,
      lng,
    } = req.body.restaurant;
    const updateRestaurant = await Restaurant.update(
      {
        name: name,
        review_avg: review_avg,
        begin: begin,
        end: end,
        min_order_amount: min_order_amount,
        delivery_fee: adjusted_delivery_fee,
        delivery_time: estimated_delivery_time,
        phone: phone,
        address: address,
        url: url,
        lat: lat,
        lng: lng,
      },
      { where: { id: id } }
    );
    res.status(200).json({
      log: 'restaurant update success',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'restaurant update failure',
    });
  }
});

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
      //console.log('cate add finished');
    }
    return;
  } catch (err) {
    console.error(err);
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
        //console.log('adding menu finished');
      })
    );
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = router;
