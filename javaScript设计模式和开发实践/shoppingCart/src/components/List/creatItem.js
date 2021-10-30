import Item from './Item';

//补充优惠商品的逻辑

//工厂函数
export default function(List, ItemData) {
  return new Item(List, ItemData);
}
