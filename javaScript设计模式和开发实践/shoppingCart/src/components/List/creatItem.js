import Item from './Item';

function createDiscount(itemData) {
  //用代理做商品的折扣处理
  return new Proxy(itemData, {
    get(target, key, receiver) {
      if (key === 'name') {
        return `${target[key]}【折扣】`;
      }
      if (key === 'price') {
        return target.discount * target[key];
      }
      return target[key];
    }
  });
}

//工厂函数
export default function(List, itemData) {
  if (typeof itemData.discount === 'number') {
    itemData = createDiscount(itemData);
  }
  return new Item(List, itemData);
}
