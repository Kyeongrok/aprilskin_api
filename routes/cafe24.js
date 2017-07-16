var express = require('express');
var router = express.Router();
var connection=require('../dbconnection'); //reference of dbconnection.js

let client = require("cheerio-httpcli");
let baseUrl = "https://datahub.cafe24.com/openapi/shop/order/v1/search";



/* GET users listing. */
router.get('/', function(req, res, next) {




    connection.query('SELECT * FROM product',function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );

        res.send(rows);
    });

});

router.get('/list', function(req, res, next) {

    console.log(req.query.start_datetime);
    console.log(req.query.end_datetime);
    let param = {
        "service_type":"aprilskinkor"
        ,"mall_id":"onesper"
        ,"data_type":"json"
        ,"auth_code":"995ff59dd187520a69b3a89cc2e71e28"
        ,"start_datetime":req.query.start_datetime
        ,"end_datetime":req.query.end_datetime
        ,"limit":2000
    }

    var result = client.fetchSync(baseUrl, param);
    var json = JSON.parse(result.body);

    let resultlist = [];

    for(let item of json.response.result) {

        for(let productItem of item.product){
            let requireObject = {
                "order_no":item['order_no'],
                "ship_address1":item['ship_address1'],
                "ship_address2":item['ship_address2'],
                "ship_name":item['ship_name'],
                "ship_mobile":item['ship_mobile'],
                "ship_message":item['ship_message'],
                "product_code":productItem['product_code'],
                "order_item_qty":productItem['order_item_qty'],
                "item_code":productItem['item_code']
            }

            resultlist.push(requireObject);
        }
    }

    res.send(resultlist);

    connection.query('SELECT * FROM product',function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );
        // res.send(rows);
    });

});

module.exports = router;