// pages/cart/index.js
// await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
// import { getSetting,chooseAddress,openSetting } from "../../utils/Wx.js"

Page({
  handleChooseAddres() {
    wx.getSetting({
      success: (result)=>{
        // console.log(result)
        const scopeAdress = result.authSetting["scope.address"]
        if(scopeAdress === true || scopeAdress === undefined) {
          wx.chooseAddress({
            success: (result1)=>{
              console.log(result1)
            }
          });
        }else {
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log(result3)
                }
              });
            }
          });
        }
      }
    });
  }
})