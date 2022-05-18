const fs = require('fs');

async function parsingData() {
  try {
    fs.readFile('./small_example.json', 'utf-8', (err, jsonFile) => {
      const jsonData = JSON.parse(jsonFile);
      //console.log(jsonFile);

      jsonData.forEach((restaurant) => {
        let info = restaurant[1];
        let menu = restaurant[3];
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
        } = info;
        console.log(id);
        console.log(name);
        console.log(review_avg);
        console.log(begin);
        console.log(end);
        console.log(min_order_amount);
        console.log(estimated_delivery_time);
        console.log(adjusted_delivery_fee);
        console.log(phone);
        console.log(address);
        console.log(logo_url);
        console.log(categories);
        //menu.forEach()
      });
    });
  } catch {
    return console.error(err);
  }
}

parsingData();

module.exports = parsingData();
