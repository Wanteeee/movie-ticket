
'use strict';

// 引入模块
var express = require('express')
var app = express()
// var https = require('https')
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')

// 爬虫的 URL 信息
var opt = {
    hostname: 'movie.douban.com',
    path: '/cinema/nowplaying/beijing/',
    port: 443
}

// exports.getMovies = getMovies
module.exports = function getMovies(req, res) {
  // 创建 http get 请求
  app.get(opt, function(res) {
    console.log('res', res);
      var html = ''; // 保存抓取到的 HTML 源码
      var movies = [];  // 保存解析 HTML 后的数据，即我们需要的电影信息

      // 前面说过
      // 这里的 res 是 Class: http.IncomingMessage 的一个实例
      // 而 http.IncomingMessage 实现了 stream.Readable 接口
      // 所以 http.IncomingMessage 也有 stream.Readable 的事件和方法
      // 比如 Event: 'data', Event: 'end', readable.setEncoding() 等

      // 设置编码
      res.setEncoding('utf-8')

      // 抓取页面内容
      res.on('data', function(chunk) {
          html += chunk
          // console.log("html", html);
      })
      res.on('end', function() {
          // 使用 cheerio 加载抓取到的 HTML 代码
          // 然后就可以使用 jQuery 的方法了
          // 比如获取某个 class：$('.className')
          // 这样就能获取所有这个 class 包含的内容
          var $ = cheerio.load(html)

          // 解析页面
          // 每个电影都在 item class 中
          $('.list-item').each(function() {
              var movie = {
                  title: $('.stitle a', this).attr('title'), // 获取电影名称
                  score: $('.srating .subject-rate', this).text(), // 获取电影评分
                  link: $('a', this).attr('href'), // 获取电影详情页链接
                  picUrl: $('.poster img', this).attr('src') // 获取电影图片链接
              }
              // 把所有电影放在一个数组里面
              movies.push(movie)
              // downloadImg('img/', movie.picUrl)
          })
          // 保存抓取到的电影数据
          saveData('data/data.json', movies)
          // console.log(movies);

          // app.get('/', function(req, res) {
          //   fs.readFile('data/data.json', 'utf8', (err, data) => {
          //     if (err) console.log('err');
          //     console.log(data)
          //     res.json(data)
          //   })
          // })
      })
  }).on('error', function(err) {
      console.log(err)
  })

}

function saveData(path, movies) {
    // 调用 fs.writeFile 方法保存数据到本地
    // fs.writeFile(filename, data[, options], callback)
    // fs.writeFile 方法第一个参数是需要保存在本地的文件名称（包含路径）
    // 第二个参数是文件数据
    // 然后有个可选参数，可以是 encoding，mode 或者 flag
    // 最后一个 参数是一个回调函数
    fs.writeFile(path, JSON.stringify(movies, null, 4), function(err) {
        if (err) {
            return console.log(err)
        }
    })
}


// function downloadImg(imgDir, url) {
//     https.get(url, function(res) {
//         var data = '';
//
//         res.setEncoding('binary')
//
//         res.on('data', function(chunk) {
//             data += chunk
//         })
//
//         res.on('end', function() {
//             // 调用 fs.writeFile 方法保存图片到本地
//             // path.basename(url) 可以得到链接指向的文件名
//             // 如：path.basename('http://localhost/img/2.jpg') => '2.jpg'
//             fs.writeFile(imgDir + path.basename(url), data, 'binary', function(err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 // console.log('Image downloaded:', path.basename(url));
//             })
//         })
//     }).on('error', function(err) {
//         console.log(err)
//     })
// }
