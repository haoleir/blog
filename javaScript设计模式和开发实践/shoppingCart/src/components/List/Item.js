import $ from 'jquery';
import getCart from '../ShoppingCart/getCart';
import StateMachine from 'javascript-state-machine';

export default class Item {
  constructor(list, data) {
    this.list = list;
    this.data = data;
    this.$el = $('<div>');
    this.cart = getCart();
  }

  initContent() {
    let $el = this.$el;
    let data = this.data;
    $el.append($(`<p>名称：${data.name}</p>`));
    $el.append($(`<p>价格：${data.price}</p>`));
    $el.append($(`<p>名称：${data.name}</p>`));
  }
  initBtn() {
    let $el = this.$el;
    let $btn = $(`<button>test</button>`);
    let _this = this;

    let fsm = new StateMachine({
      init: '加入购物车',
      transitions: [
        {
          name: 'addToCart',
          from: '加入购物车',
          to: '从购物车删除'
        },
        {
          name: 'deleteFromCart',
          from: '从购物车删除',
          to: '加入购物车'
        }
      ],
      methods: {
        //加入购物车
        onAddToCart() {
          _this.addToCartHandle();
          updateText();
        },
        // 从购物车删除
        onDeleteFromCart() {
          _this.deleteFromCartHandle();
          updateText();
        }
      }
    });

    function updateText() {
      $btn.text(fsm.state);
    }

    $btn.click(() => {
      // 添加到购物车
      if (fsm.is('加入购物车')) {
        fsm.addToCart();
      } else {
        fsm.deleteFromCart();
      }
      // 从购物车删除
    });
    updateText();
    $el.append($btn);
  }

  // 添加到购物车
  addToCartHandle() {
    this.cart.add(this.data);
  }
  // 从购物车删除
  deleteFromCartHandle() {
    this.cart.del(this.data.id);
  }
  render() {
    this.list.$el.append(this.$el);
  }
  init() {
    this.initContent();
    this.initBtn();
    this.render();
  }
}
