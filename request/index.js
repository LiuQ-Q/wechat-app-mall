let ajaxTimes = 0;

export const request = (params) => {
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    });
  })
}