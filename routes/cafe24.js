var express = require('express');
var router = express.Router();
var pool=require('../dbconnection'); //reference of dbconnection.js

let client = require("cheerio-httpcli");
let baseUrl = "https://datahub.cafe24.com/openapi/shop/order/v1/search";


/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM product',function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });
});

router.get('/product/list/', function(req, res, next) {
    pool.query('SELECT * FROM product',function(err,rows){
        if(err)
            console.log("Error Selecting : %s ",err );

        let getMap = (list) =>{
            let resultMap = {};
            list.forEach(function(item) {
                resultMap[item['code']+"-"+item['item_code']] = item;
            });
            return resultMap;
        }

        res.send(getMap(rows));
    });
});

router.get('/product/insert/', function(req, res, next) {
    console.log(req.query.code);
    console.log(req.query.item_code);
    console.log(req.query.product_code_own);
    console.log(req.query.product_name);
    console.log(req.query.quentity);
    console.log(req.query.description);

    var data = {
        code: req.query.code,
        item_code: req.query.item_code,
        quentity: req.query.quentity
    };

    pool.query("INSERT INTO product set ? ",data,function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });
});

router.get('/product/modify/', function(req, res, next) {
    console.log(req.query.id);

    let id = req.query.id;

    console.log(req.query.code);
    console.log(req.query.item_code);
    console.log(req.query.product_code_own);
    console.log(req.query.product_name);
    console.log(req.query.quentity);
    console.log(req.query.description);

    var data = {
        code: req.query.code,
        item_code: req.query.item_code,
        quentity : req.query.quentity
    };

    pool.query("UPDATE product set ? WHERE id = ? ", [data,id],function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });
});

router.get('/product/delete/', function(req, res, next) {
    console.log(req.query.id);

    let id = req.query.id;

    pool.query("DELETE FROM product WHERE id= ? ",[id],function(err,rows)     {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.send(rows);
    });
});

router.get('/originlist', function(req, res, next) {
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

    res.send(result);
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

    var response = client.fetchSync(baseUrl, param);
    var json = JSON.parse(response.body);

    let result = {};

    result['startDatetime'] = req.query.start_datetime;
    result['endDatetime'] = req.query.end_datetime;
    let resultList = [];

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
                "item_code":productItem['item_code'],
            }

            resultList.push(requireObject);
        }
    }
    result['list'] = resultList;
    res.send(result);
});

module.exports = router;
