# 数据模型设计

列举各个数据模型的示例，写明属性

## 用户
```js
{
  _id: '',  // 自动生成
  username: 'xx',
  password: 'xx'
}
```

## 地址
```js
{
  _id: '',
  username: '', // 与用户数据模型的 username 对应，地址关联用户
  city: 'xx城市',
  department: 'xx公寓xx栋',
  houseNumber: 'xx门牌号',
  name: '收货人姓名',
  phone: '收货人电话'
}
```

## 商店
```js
{
  _id: '',
  name: '商店名',
  imgUrl: '商店图标',
  sales: 10000,
  expressLimit: 0,  // 起送
  expressPrice: 5,  // 配送费
  slogan: 'VIP尊享xx优惠' // 标语
}
```

## 商品
```js
{
  _id: '',
  shopId: '', // 与商店数据模型的 _id 对应，商品关联商店
  name: '商品名',
  imgUrl: '商品图片',
  sales: 300,
  oldPrice: 36，
  price: 30,
  tabs: ['all','seckill'] // 商品所属tab类型
}
```

## 订单
```js
{
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
}
```