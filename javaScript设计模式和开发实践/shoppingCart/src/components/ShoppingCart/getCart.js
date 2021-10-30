class Cart {
  constructor() {
    this.list = [];
  }

  add(data) {
    this.list.push(data);
  }
  del(id) {
    return this.list.filter(o => o.id !== id);
  }
  getList() {
    return this.list.map(i => i.name).join('\n');
  }
}

//返回购物车单例
let getCart = (function() {
  let cart;
  return function() {
    return cart || (cart = new Cart());
  };
})();

export default getCart;
