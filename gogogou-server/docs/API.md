# API（接口）设计

## 注册（已完成）

### url
`/api/user/register`

### method
`post`

### request body
```js
{
  username: 'abc',
  password: '123'
}
```

### response body
```js
{
  errno: 0,
  message: 'errno != 0 时提供错误信息'
}
```

## 登录（已完成）

### url
`/api/user/login`

### method
`post`

### request body
```js
{
  username: 'abc',
  password: '123'
}
```

### response body
```js
{
  errno: 0,
  message: 'errno != 0 时提供错误信息'
}
```

## 获取用户信息（未设计用户详细信息数据模型）

### url
`/api/user/info`

### method
`get`

### request body
无

### response body
```js
{
  errno: 0,
  data: {
    username: 'xxx'
    // 以及其他用户信息
  },
  message: 'errno != 0 时提供错误信息'
}
```

## 新建收货地址（已完成）

### url
`/api/user/address`

### method
`post`

### request body
```js
{
  city: 'xx市',
  department: 'xx小区',
  houseNumber: 'xx楼xx户',
  name: 'xx',
  phone: 'xx',
}
```

### response body
```js
{
  errno: 0,
  data: {
      _id: '收货地址id',
      city: 'xx市',
      department: 'xx小区',
      houseNumber: 'xx楼xx户',
      name: 'xx',
      phone: 'xx',
      createdAt: Data,
      updatedAt: Data
    },
  message: 'errno != 0 时提供错误信息'
}
```

## 获取收货地址列表（已完成）

### url
`/api/user/address`

### method
`get`

### request body
无

### response body
```js
{
  errno: 0,
  data: [
    {
      _id: '收货地址id',
      city: 'xx市',
      department: 'xx小区',
      houseNumber: 'xx楼xx户',
      name: 'xx',
      phone: 'xx'
    },{
      _id: '收货地址id',
      city: 'xx市',
      department: 'xx小区',
      houseNumber: 'xx楼xx户',
      name: 'xx',
      phone: 'xx'
    }
  ],
  message: 'errno != 0 时提供错误信息'
}
```

## 获取单个收货地址（已完成）

### url
`/api/user/address/:id`

### method
`get`

### request body
无

### response body
```js
{
  errno: 0,
  data: {
    _id: '收货地址id',
    city: 'xx市',
    department: 'xx小区',
    houseNumber: 'xx楼xx户',
    name: 'xx',
    phone: 'xx'
  },
  message: 'errno != 0 时提供错误信息'
}
```

## 更新编辑收货地址（已完成）

### url
`/api/user/address/:id`

### method
`patch`

### request body
```js
{
  city: 'xx市',
  department: 'xx小区',
  houseNumber: 'xx楼xx户',
  name: 'xx',
  phone: 'xx',
}
```

### response body
```js
{
  errno: 0,
  message: 'errno != 0 时提供错误信息'
}
```

## 附近商店（获取商店列表）（已完成）

### url
`/api/shop/hot-list`

### method
`get`

### request body
无

### response body
```js
  {
    errno: 0,
    message: 'errno != 0 时提供错误信息',
    data: [
      {
        _id: '商店id',
        name: '商店名',
        imgUrl: '商店图标',
        sales: 10000, // 月售
        expressLimit: 0,  // 起送价
        expressPrice: 5,  // 配送费
        slogan: 'VIP尊享满 50 元免费配送' // 标语
      },
      {
        _id: '商店id',
        name: '商店名',
        imgUrl: '商店图标',
        sales: 5000, // 月售
        expressLimit: 0,  // 起送价
        expressPrice: 5,  // 配送费
        slogan: 'VIP尊享满 50 元免费配送' // 标语
      },
    ]
  }
```

## 商店详情（获取单个商店信息）（已完成）

### url
`/api/shop/:id`

### method
`get`

### request body
无

### response body
```js
  {
    errno: 0,
    data: {
      _id: '商店id',
      name: '商店名',
      imgUrl: '商店图标',
      sales: 10000, // 月售
      expressLimit: 0,  // 起送价
      expressPrice: 5,  // 配送费
      slogan: 'VIP尊享满 50 元免费配送' // 标语
    },
    message: 'errno != 0 时提供错误信息'
  }
```

## 获取单个商店的商品列表（已完成）

### url
`/api/shop/:id/products`

### query
`tab=全部商品`
举例 `/api/shop/1/products?tab=进店必选`

### method
`get`

### request body
无

### response body
```js
  {
    errno: 0,
    data: [
      {
        _id: '商品id',
        name: '商品名称',
        imgUrl: '商品图片'，
        sales: 300,
        price: 30,
        oldPrice: 36
      },
      {
        _id: '商品id',
        name: '商品名称',
        imgUrl: '商品图片'，
        sales: 300,
        price: 30,
        oldPrice: 36
      }
    ],
    message: 'errno != 0 时提供错误信息'
  }
```

## 创建订单（已完成）

### url
`/api/order`

### method
`post`

### request body
```js
  {
    addressId: '收货地址id',
    shopId: '商店id',
    shopName: '商店名称',
    isCancled: false, // 是否取消订单
    products: [
      {
        productId: '商品id',
        orderSales: 3  // 购买数量
      },
      {
        productId: '商品id',
        orderSales: 3  // 购买数量
      }
    ]
  }
```

### response body
```js
  {
    errno: 0,
    data: {
      _id: '',
      username: '', // 与用户数据模型的 username 对应，订单关联用户
      shopId: '',
      shopName: '商店名',
      isCancled: false, // 是否取消订单

      // 与地址数据为复制关系，复制来 addressId 对应的地址信息
      address: {
        "username": "zhangsan",
        "city": "北京市",
        "department": "xxx小区",
        "houseNumber": "门牌号1",
        "name": "张三",
        "phone": "12345678900",
      }

      // 与商品数据为复制关系，复制来 productId 对应的商品信息
      products: [
        {
          product: {
            "shopId": "631a97075f29ae0811d0a417",
            "name": "苹果",
            "imgUrl": "/images/product/apple.jpg",
            "sales": 200,
            "oldPrice": 27,
            "price": 25,
            "tabs": [ "all", "fruit" ],
          },
          orderSales: 3
        },
        {
          product: {
            "shopId": "631a97075f29ae0811d0a417",
            "name": "葡萄",
            "imgUrl": "/images/product/grape.jpg",
            "sales": 100,
            "oldPrice": 36,
            "price": 25,
            "tabs": [ "all", "seckill", "fruit" ],
          },
          orderSales: 2
        }
      ]
    },
    message: 'errno != 0 时提供错误信息'
  }
```

## 获取订单列表（已完成）

### url
`/api/order`

### method
`get`

### request body
无

### response body
```js
  {
    errno: 0,
    data: [
      {
        _id: '订单id',
        username: '',
        shopId: '',
        shopName: '商店名',
        isCancled: false,
        address: {
          "username": "zhangsan",
          "city": "北京市",
          "department": "xxx小区",
          "houseNumber": "门牌号1",
          "name": "张三",
          "phone": "12345678900",
        }
        products: [
          {
            product: {
              "shopId": "631a97075f29ae0811d0a417",
              "name": "苹果",
              "imgUrl": "/images/product/apple.jpg",
              "sales": 200,
              "oldPrice": 27,
              "price": 25,
              "tabs": [ "all", "fruit" ],
            },
            orderSales: 3
          },
          {
            product: {
              "shopId": "631a97075f29ae0811d0a417",
              "name": "葡萄",
              "imgUrl": "/images/product/grape.jpg",
              "sales": 100,
              "oldPrice": 36,
              "price": 25,
              "tabs": [ "all", "seckill", "fruit" ],
            },
            orderSales: 2
          }
        ]
      },{
        _id: '订单id',
        username: '',
        shopId: '',
        shopName: '商店名',
        isCancled: false,
        address: {
          "username": "zhangsan",
          "city": "北京市",
          "department": "xxx小区",
          "houseNumber": "门牌号1",
          "name": "张三",
          "phone": "12345678900",
        }
        products: [
          {
            product: {
              "shopId": "631a97075f29ae0811d0a417",
              "name": "苹果",
              "imgUrl": "/images/product/apple.jpg",
              "sales": 200,
              "oldPrice": 27,
              "price": 25,
              "tabs": [ "all", "fruit" ],
            },
            orderSales: 3
          },
          {
            product: {
              "shopId": "631a97075f29ae0811d0a417",
              "name": "葡萄",
              "imgUrl": "/images/product/grape.jpg",
              "sales": 100,
              "oldPrice": 36,
              "price": 25,
              "tabs": [ "all", "seckill", "fruit" ],
            },
            orderSales: 2
          }
        ]
      }
    ],
    message: 'errno != 0 时提供错误信息'
  }
```