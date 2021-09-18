let ajaxTimes = 0

export const request = (params) => {
    // 用于记录同时发送多个数据
    ajaxTimes++,
    wx.showLoading({
        title: "加载中",
        mask: true
    });

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
            // 执行代码时，无论是success还是fail都会执行complete
            complete: () => {
                ajaxTimes--
                if(ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}