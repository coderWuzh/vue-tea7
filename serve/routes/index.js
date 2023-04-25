var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js')
var user = require('../db/user.js')
var QcloudSms = require("qcloudsms_js");
var jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 提交订单
router.post('/api/goods/toPay', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);

  let order_id = req.body.order_id;
  let orderIdArr = req.body.orderIdArr
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    // 更改订单状态
    connection.query(`update store_order set order_status = '2' where order_id = ${order_id}`, (err, result) => {
      if (err) throw err
      // 删除购物车商品
      orderIdArr.forEach(v => {
        connection.query(`delete from goods_cart where uid = ${uId} and goods_id = ${v}`, () => {

        })
      })
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '提交成功'
        }
      })
    })
  })
})
// 获取订单页地址
router.post('/api/goods/getAddress', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    connection.query(`select * from address where uid = ${uId}`, (err, result) => {
      let r = result[0];
      result.forEach((v, index) => {
        if (v.isDefault == true) {
          r = result[index]
        }
      })
      res.send({
        data: {
          code: 200,
          success: true,
          data: r
        }
      })
    })
  })
})
// 生成订单
router.post('/api/goods/addOrder', function (req, res, next) {
  let orderArr = req.body.orderArr
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);

  // 生成订单号order_id,规则:时间戳+6位随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    month = setTimeDateFmt(month);
    day = setTimeDateFmt(day);
    hour = setTimeDateFmt(hour);
    minutes = setTimeDateFmt(minutes);
    seconds = setTimeDateFmt(seconds);
    let orderCode = now.getFullYear().toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString() + (Math.round(Math.random() * 1000000)).toString()
    return orderCode
  }

  // 生成对应数组
  // 商品列表名称
  let goodsName = [];
  // 订单商品总金额
  let goodsPrice = 0;
  // 订单商品总数量
  let goodsNum = 0;
  // 订单号
  let orderId = randomNumber();
  orderArr.forEach(v => {
    goodsName.push(v.goods_name);
    goodsPrice += v.goods_num * v.goods_price;
    goodsNum += parseInt(v.goods_num)
  });
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    connection.query(`insert into store_order(uid,order_id,goods_name,goods_price,goods_num,order_status) values(${uId},${orderId},'${goodsName}',${goodsPrice},${goodsNum},'1')`, () => {
      connection.query(`select * from store_order where order_id = ${orderId}`, (err, result) => {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result
          }
        })
      })

    })
  })

})
// 删除地址
router.post('/api/goods/delAddress', function (req, res, next) {
  let id = req.body.id
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    connection.query(`delete from address where uid = ${uId} and id = ${id}`, () => {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '删除成功'
        }
      })
    })
  })

})
// 修改地址
router.post('/api/goods/changeAddress', function (req, res, next) {
  let content = req.body
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    let [id, name, tel, province, city, county, addressDetail, isDefault, areaCode] = [content.id, content.name, content.tel, content.province, content.city, content.county, content.addressDetail, content.isDefault, content.areaCode]
    const update = function () {
      connection.query(`update address set uid=${uId},name='${name}',tel=${tel},province='${province}',city='${city}',county='${county}',addressDetail='${addressDetail}',isDefault=${isDefault},areaCode=${areaCode} where id = ${id}`, () => {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '修改成功'
          }
        })
      })
    }
    if (isDefault == 1) {
      connection.query(`select * from address where isDefault = '1'`, (err, result) => {
        if (result.length > 0) {
          connection.query(`update address set isDefault = '0' where isDefault = '1'`, () => {
            update()
          })
        } else {
          update()
        }
      })
    } else {
      update()
    }
  })

})
// 添加地址
router.post('/api/goods/addAddress', function (req, res, next) {
  let content = req.body
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    let [name, tel, province, city, county, addressDetail, isDefault, areaCode] = [content.name, content.tel, content.province, content.city, content.county, content.addressDetail, content.isDefault, content.areaCode]
    const insert = function () {
      connection.query(`insert into address (uid,name,tel,province,city,county,addressDetail,isDefault,areaCode) values(${uId},${name},${tel},'${province}','${city}','${county}','${addressDetail}',${isDefault},${areaCode})`, () => {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '添加成功'
          }
        })
      })
    }
    if (isDefault == 1) {
      connection.query(`select * from address where isDefault = '1'`, (err, result) => {
        if (result.length > 0) {
          connection.query(`update address set isDefault = '0' where isDefault = '1'`, () => {
            insert()
          })
        } else {
          insert()
        }
      })
    } else {
      insert()
    }

  })

})
// 获取地址信息
router.post('/api/goods/addressList', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    connection.query(`select * from address where uid = ${uId}`, (err, result) => {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })
})
// 删除购物车商品
router.post('/api/goods/deleteCart', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    let goodsId = req.body.goodsId
    connection.query(`delete from goods_cart where goods_id = ${goodsId} and uid = ${uId}`, () => {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '删除成功'
        }
      })
    })
  })
})
// 改变商品数量
router.post('/api/goods/changeNum', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    // 接收前端数据
    let goodsId = req.body.goodsId;
    let goodsNum = req.body.goodsNum;
    connection.query(`update goods_cart set goods_num=${goodsNum} where uid = ${uId} and goods_id = ${goodsId}`, (err, result) => {
      if (err) throw err;
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '修改成功'
        }
      })
    })
  })
})
// 购物车数据
router.post('/api/goods/cartData', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, (error, results) => {
    let uId = results[0].id;
    connection.query(`select * from goods_cart where uid = ${uId}`, (err, result) => {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })
});
// 加入购物车
router.post('/api/goods/addCart', function (req, res, next) {
  let goodsId = req.body.goodsId;
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user_list where tel = "${tokenObj.tel}"`, (error, resutls) => {
    let uId = resutls[0].id
    connection.query(`select * from goods_cart where goods_id = ${goodsId} and uid = ${uId}`, (er, re) => {
      if (re.length > 0) {
        let goodsNum = parseInt(re[0].goods_num) + 1
        connection.query(`update goods_cart set goods_num = ${goodsNum} where goods_id = ${goodsId} and uid = ${uId}`, () => {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '加入购物车+1'
            }
          })
        })
      } else {
        connection.query(`select * from goods_list where id = ${goodsId}`, (err, result) => {
          let goodsName = result[0].name;
          let goodsPrice = result[0].price;
          let goodsImgUrl = result[0].imgUrl;
          connection.query(`insert into goods_cart(uid,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values(${uId},${goodsId},"${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`, (er, re) => {
            res.send({
              data: {
                code: 200,
                success: true,
                msg: '加入购物车成功'
              }
            })
          })
        })
      }
    })

  })
});
// 修改密码
router.post('/api/user/recovery', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  }
  connection.query(user.changeUserPwd(params), (error, results) => {
    if (error) throw error
    res.send({
      code: 0,
      data: {
        success: true,
        msg: "修改成功"
      }
    })
  })
});
// 注册
router.post('/api/user/register', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  }
  connection.query(user.queryUserTel(params), (error, results) => {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '用户已存在'
        }
      })
    }
    else {
      connection.query(user.insertData(params), (error, results) => {
        res.send({
          code: 0,
          data: {
            success: true,
            msg: '注册成功'
          }
        })
      })
    }
  })
});
// 查看用户是否存在
router.post('/api/user/tel', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
  }
  connection.query(user.queryUserTel(params), (error, results) => {
    if (error) throw error
    console.log(results);
    if (results.length > 0) {
      res.send({
        data: {
          success: true,
          msg: '用户已存在'
        }
      })
    } else {
      res.send({
        data: {
          success: false,
          msg: '用户不存在'
        }
      })
    }
  })
});
// 短信登录
router.post('/api/user/codeLogin', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
  }
  connection.query(user.queryUserTel(params), (error, results) => {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 0,
        data: {
          success: true,
          msg: '登录成功',
          data: results[0]
        }
      })
    } else {
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '用户未注册'
        }
      })
    }
  })
});
// 获取验证码
router.post('/api/user/code', function (req, res, next) {
  let tel = req.body.userTel
  // 短信应用SDK AppID
  var appid = 1400187558;  // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = "dc9dc3391896235ddc2325685047edc7";

  // 需要发送短信的手机号码
  var phoneNumbers = [tel];

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey);

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0],
        }
      })
    }
  }
  var ssender = qcloudsms.SmsSingleSender();
  // params就是往手机上发送的短信
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);  // 签名参数不能为空串
});
// 密码登录
router.post('/api/user/login', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  }
  connection.query(user.queryUserTel(params), (error, results) => {
    if (error) throw error
    if (results.length > 0) {
      connection.query(user.queryUserPwd(params), (e, r) => {
        if (e) throw e
        if (r.length > 0) {
          res.send({
            code: 0,
            data: {
              success: true,
              msg: '登录成功',
              data: r[0]
            }
          })
        } else {
          res.send({
            code: 301,
            data: {
              success: false,
              msg: '密码错误'
            }
          })
        }
      })
    } else {
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '用户名错误'
        }
      })
    }
  })
});
// 详细数据
router.get('/api/goods/detail', function (req, res, next) {
  let id = req.query.id
  connection.query('select * from goods_list where id = ' + id + ' ', function (error, results) {
    if (error) throw error
    res.send({
      code: 0,
      data: results[0]
    })
  })

});
// 分类数据
router.get('/api/goods/list', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      leftData: [
        {
          id: 0,
          title: "推荐"
        },
        {
          id: 1,
          title: "新品"
        }, {
          id: 2,
          title: "习茶"
        }, {
          id: 3,
          title: "绿茶"
        }, {
          id: 4,
          title: "乌龙"
        }, {
          id: 5,
          title: "红茶"
        }, {
          id: 6,
          title: "白茶"
        },
      ],
      rightData: [
        {
          id: 0,
          title: "推荐",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            }, {
              id: 5,
              name: "云南滇红",
              imgUrl: "./images/listimg6.jpeg"
            }, {
              id: 6,
              name: "建盏",
              imgUrl: "./images/listimg7.jpeg"
            }, {
              id: 7,
              name: "功夫茶具",
              imgUrl: "./images/listimg8.jpeg"
            },
          ]
        }, {
          id: 1,
          title: "新品",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            },
          ]
        }, {
          id: 2,
          title: "习茶",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }
          ]
        }, {
          id: 3,
          title: "绿茶",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            }, {
              id: 5,
              name: "云南滇红",
              imgUrl: "./images/listimg6.jpeg"
            }, {
              id: 6,
              name: "建盏",
              imgUrl: "./images/listimg7.jpeg"
            }, {
              id: 7,
              name: "功夫茶具",
              imgUrl: "./images/listimg8.jpeg"
            },
          ]
        }, {
          id: 4,
          title: "乌龙",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            }, {
              id: 5,
              name: "云南滇红",
              imgUrl: "./images/listimg6.jpeg"
            }, {
              id: 6,
              name: "建盏",
              imgUrl: "./images/listimg7.jpeg"
            }, {
              id: 7,
              name: "功夫茶具",
              imgUrl: "./images/listimg8.jpeg"
            },
          ]
        }, {
          id: 5,
          title: "红茶",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            }, {
              id: 5,
              name: "云南滇红",
              imgUrl: "./images/listimg6.jpeg"
            }, {
              id: 6,
              name: "建盏",
              imgUrl: "./images/listimg7.jpeg"
            }, {
              id: 7,
              name: "功夫茶具",
              imgUrl: "./images/listimg8.jpeg"
            },
          ]
        }, {
          id: 6,
          title: "推荐",
          listData: [
            {
              id: 0,
              name: "紫砂壶",
              imgUrl: "./images/listimg.jpeg"
            }, {
              id: 1,
              name: "铁观音",
              imgUrl: "./images/listimg2.jpeg"
            }, {
              id: 2,
              name: "金峻眉",
              imgUrl: "./images/listimg3.jpeg"
            }, {
              id: 3,
              name: "武夷岩茶",
              imgUrl: "./images/listimg4.jpeg"
            }, {
              id: 4,
              name: "龙井",
              imgUrl: "./images/listimg5.jpeg"
            }, {
              id: 5,
              name: "云南滇红",
              imgUrl: "./images/listimg6.jpeg"
            }, {
              id: 6,
              name: "建盏",
              imgUrl: "./images/listimg7.jpeg"
            }, {
              id: 7,
              name: "功夫茶具",
              imgUrl: "./images/listimg8.jpeg"
            },
          ]
        },
      ]
    }
  })
});
// 搜索数据
router.get('/api/goods/search_goods', function (req, res, next) {
  connection.query('select * from goods_list where name like "%' + req.query.searchName + '%" ', function (err, results) {
    res.send({
      code: 0,
      data: results
    })
  })
});
// 首页数据
router.get('/api/index_list/home_data', function (req, res, next) {
  let params = {
    titleList: [],
    swiperList: [],
    navList: [],
    recommendList: [],
    likeList: [],
  }
  connection.query(`select * from title_list`, (error, results) => {
    params.titleList = results
  })
  connection.query(`select * from swiper_list`, (error, results) => {
    params.swiperList = results
  })
  connection.query(`select * from nav_list`, (error, results) => {
    params.navList = results
  })
  connection.query(`select * from recommend_list`, (error, results) => {
    params.recommendList = results
  })
  connection.query(`select * from goods_list`, (error, results) => {
    params.likeList = results
    res.send({
      data: {
        code: 200,
        data: params
      }
    });
  })
});
module.exports = router;
