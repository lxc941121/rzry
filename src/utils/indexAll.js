/*
 * @srt {string|number} 
 */
//获取url中参数
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

// 验证手机号
export function isPhoneAvailable(str) {
  const myreg = /^[1][0-9][0-9]{9}$/
  return myreg.test(str)
}
//验证银行卡
export function isBankAvailable(str) {
  const myreg = /^(\d{16,19})|(\d{4}\*{8}\d{4})$/g
  return myreg.test(str)
}

// 验证邮箱
export function isEmailAvailable(str) {
  const myreg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return myreg.test(str)
}

// 时间戳转日期 2019-3-11 long 2019-3-11 15:00
export function format(data, long) {
  let date = new Date(data * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()
  //console.log(Y+M+D+h+m)
  if (long) return Y + M + D + h + m
  return Y + M + D
}

//格式化Thu May 12 2017 08:00:00 GMT+0800 (中国标准时间)  至 2019-3-11 15:00
export function formatTime(data, type = 1) {

  let date = new Date(data);
  let date_value
  if (type == 1) {
    date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
  } else {
    date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  }
  return date_value

}

export function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i;
}

export function CompareTime(begintime, endtime) {
  let starttime = new Date(Date.parse(begintime));
  let endtime = new Date(Date.pares(endtime));
  //进行比较
  return (curTime >= starttime && cutTime <= endtime);
}

// 区间内随机数
export function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

export function getAuditsTextByStatus(value) {
  switch (value) {
    case '-1':
      return '删除'
    case '0':
      return '禁用'
    case '1':
      return '已发布'
    case '2':
      return '待审核'
    case '3':
      return '草稿'
    default:
      return ''
  }
}

//上传文件，上传图片方式
export function UploadImg(File) {
  let formData = new FormData();
  let token = common_base.deal_token();
  let { signal, timestamp, overTimeIvalStr, device } = token;
  formData.append("file", File.file);
  formData.append("signal", signal);
  formData.append("timestamp", timestamp);
  formData.append("overTimeIvalStr", overTimeIvalStr);
  formData.append("device", device);
  //接口地址
  let url = isDev
    ? "/api/File/uploadPictures"
    : "/index.php?s=/Api/File/uploadPictures";

  //vue axios方式一 
  axios.post(url, formData).then(res => {
    res = res.data;
    if (res.status == 1) {
      this.avatars = res.path;
    }
  });
  //Jquery ajax 方式二
  $.ajax({
    url: url,
    type: "post",
    data: formData,
    processData: false, // 告诉jQuery不要去处理发送的数据
    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
    success: function (result) {
      layer.open({
        content: result.info,
        skin: 'msg',
        time: 2
      });
      if (result.status == "1") {
        //上传成功，返回文件路径
        that.uploadBaidu(result.path);
      }
    }
  });
}

//非浏览器环境使用导出excel或word文件
export function downloadFile(obj) {
  let { query, cb } = obj
  let token = this.$store.state.User.token;
  if (!token && config.url.toLowerCase() !== 'general/get_token') {
    this.init_getToken();
  }

  return new Promise((resolve, reject) => {
    let token = this.$store.state.User.token;
    console.info(token)
    axios.defaults.headers = {
      'Accept': 'application/json',
      'X-Agent': `SHOP-ERP/${osType};${Conf.version}`,
      'token': token,
      'mac': netMac,
    };
    axios({
      method: query.method,
      url: Conf.serverHost + query.path, // 请求地址
      data: query.data || {}, // 参数
      responseType: query.responseType || "json" // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data)

        let fileNameUnicode = response.headers["content-disposition"].split("filename=")[1]
        let fileName = decodeURIComponent(fileNameUnicode);
        fileName = fileName.replace("\"", "").replace("\"", "");
        console.info(fileName)

        let blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
        })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {

          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }

        cb && cb();
      },
      err => {
        reject(err)
      }
    )
  })
}