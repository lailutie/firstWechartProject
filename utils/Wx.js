
// await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。
// 所以这个页面的方法暂时没用

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}



export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}


export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}


