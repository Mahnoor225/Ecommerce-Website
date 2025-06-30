import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.carts);
  console.log('Cart Data:', cartItems);
 

  return (
    <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
      <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
        My Shopping Cart
      </h1>

      <div className="flex items-start mt-8 gap-6">
        <div className="bg-white p-4 w-[800px] rounded-xl">
          <table className="w-full bg-white rounded-xl">
            <thead>
              <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
                <th className="text-left px-2 py-2">Product</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Quantity</th>
                <th className="px-2 py-2">Subtotal</th>
                <th className="w-7 px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-2 py-2 text-left align-top">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-[100px] mr-2 inline-block h-[100px]"
                    />
                    <span>{item.title}</span>
                  </td>
                  <td className="px-2 py-2">${item.price}</td>
                  <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
                    <button onClick={() => dispatch({ type: "DECREMENT_QTY", payload: item.id })} >-</button>
                    <span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">
                      {item.qty}
                    </span>
                    <button onClick={() => dispatch({ type: "INCREMENT_QTY", payload: item.id })}>+</button>
                  </td>
                  <td className="px-2 py-2">${(item.price * item.qty).toFixed(2)}</td>
                  <td className="px-2 py-2">
                    <button className="cursor-pointer text-red-500" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-400">
                <td className="px-2 py-2" colSpan="3">
                <Link to="/">
                <button className="px-8 py-3.5 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold leading-[16px]">
                    Return to shop
                  </button>
                </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="w-[424px] bg-white rounded-lg p-6">
          <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">Cart Total</h2>
          <div className="w-[376px] py-3 justify-between items-center flex">
            <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span>
            <span className="text-[#191919] text-base font-semibold leading-tight">
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="w-[376px] py-3 border-t border-b border-[#e5e5e5] justify-between items-center flex">
            <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span>
            <span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
          </div>
          <div className="w-[376px] py-3 justify-between items-center flex">
            <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Subtotal:</span>
            <span className="text-[#191919] text-sm font-medium leading-[21px]">
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>
          <button className="w-[376px] text-white mt-5 px-10 py-4 bg-[#00b206] rounded-[44px] text-base font-semibold leading-tight">
            Proceed to checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
