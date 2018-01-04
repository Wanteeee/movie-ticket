$(document).ready(function() {


  //logo返回顶部
  $(".logo").on("click", function() {
    $('html').animate({scrollTop: 0}, 500)
  })





  //获取正在热映电影
  var html1 = '<div class="movie-card"><div class="pic"><a href=',
  aHref = "#",
  html2 = '><img src=',
  picUrl = '',
  html3 = '></a></div><div class="text"><div class="name"><p>',
  title = '',
  html4 = '</p></div><div class="num"><p>',
  score = '',
  html5 = '</p></div></div></div>',
  clear = '<div class="clear"><div>'

  $.ajax('/getmovies', {
    dataType: 'json',
    success: function(data){
      nowplayingMovies(JSON.parse(data))
    }
  })

  function nowplayingMovies(data) {
    var length = data.length
    for(var i = 0; i < length; i++) {
      title = data[i].title
      picUrl = data[i].picUrl
      score = data[i].score
      aHref = data[i].link
      if(score == '') {
        score = '暂无评分'
      }
      if(i%4 == 3) {
        $('article').append(html1 + aHref + html2 + picUrl + html3 + title + html4 + score + html5 + clear)
      } else {
        $('article').append(html1 + aHref + html2 + picUrl + html3 + title + html4 + score + html5)
      }
    }
  }





  //登陆框弹出
  $('.login').on('click', function() {
    $('#line1').focus();
    $(".loginPop").css("z-index", "10")
    $(".popup").addClass("ShowPopup")
    $(".window").addClass("ShowWin")
    $(".popup").removeClass("HidePopup")
    $(".window").removeClass("HideWin")
    $(".window").removeClass("WinInitial")
  })

  //登陆框关闭
  $('.close').on('click', function(e) {
    e.stopPropagation()
    closePopup()

  })

  function closePopup() {
    $(".popup").addClass("HidePopup")
    $(".window").addClass("HideWin")
    $(".popup").removeClass("ShowPopup")
    $(".window").removeClass("ShowWin")
    setTimeout(function() {
      $(".loginPop").css("z-index", "-1")
      singnin()
      $('input').val('')
    }, 1000)
    $(".window").addClass("WinInitial")
  }



  //登陆注册切换
  $('#singnin').on('click', function() {
    singnin()
  })
  $('#singnup').on('click', function() {
    singnup()
  })
  function singnin() {
    $('button').text('登陆')
    $('button').addClass('signinBtn')
    $('button').removeClass('signupBtn')
    $('#singnin').css({'color': '#4E6FB1'})
    $('#singnup').css({'color': '#CFE1FF'})
    $('#line1').focus()
  }
  function singnup() {
    $('button').text('注册')
    $('button').removeClass('signinBtn')
    $('button').addClass('signupBtn')
    $('#singnup').css({'color': '#4E6FB1'})
    $('#singnin').css({'color': '#CFE1FF'})
    $('#line1').focus()
  }

  //用户名和密码动画
  $('input').on('blur', function() {
    var line, text
    if($(this).attr('id') == 'line1') {
      line = 'line1'
      text = 'username'
    } else {
      line = 'line2'
      text = 'password'
    }
    if($(this).val() == '') {
      $('#'+text).animate({'top': '22px'}, 200)
    }
    $(this).css({'color': '#CFE1FF'})
    $('.'+line).animate({'width': '0px'}, 200)
    $('#'+text).css({'color': '#CFE1FF'})
  })

  $('input').on('focus', function() {
    $(this).css({'color': '#4E6FB1'})
    var line, text
    if($(this).attr('id') == 'line1') {
      line = 'line1'
      text = 'username'
    } else {
      line = 'line2'
      text = 'password'
    }
    $('.'+ line).animate({'width': '260px'}, 200)
    $('#'+text).animate({'top': '0px'}, 200)
    $('#'+text).css({'color': '#4E6FB1'})
  })

  $('.text').on('click', function() {
    $(this).animate({'top': '0px'}, 200)
    if($(this).attr('id') == 'username') {
      $('#line1').focus();
    } else {
      $('#line2').focus();
    }
  })





  //注册请求
  $(".signupBtn").on('click', function(event) {
    event.preventDefault()
    console.log(event);
    $.ajax({
      url: "/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "username": $("#line1").val(),
        "password": $("#line2").val()
      }),
      success: function(data){
        $('.login').remove()
        $('header ul').append('<li class="loggedin">' +  data.username + '</li>')
        signout()
        closePopup()
      },
      error: function(){
        alert('访问失败')
      }
    })
  })



  //退出登录
  function signout() {
    $('.loggedin').on('click', function() {
      $('#signoutBtn').animate({'opacity': '1'}, 200)
      $('main').on('click', function() {
        $('#signoutBtn').animate({'opacity': '0'}, 200)
      })
      $('#signoutBtn').on('click', function() {
        $('#signoutBtn').animate({'opacity': '0'}, 200)
        $('.loggedin').remove()
        $('header ul').append('<li class="login">登陆／注册</li>')

        //登陆框弹出
        $('.login').on('click', function() {
          $('#line1').focus();
          $(".loginPop").css("z-index", "10")
          $(".popup").addClass("ShowPopup")
          $(".window").addClass("ShowWin")
          $(".popup").removeClass("HidePopup")
          $(".window").removeClass("HideWin")
          $(".window").removeClass("WinInitial")
        })

        //登陆框关闭
        $('.close').on('click', function(e) {
          e.stopPropagation()
          closePopup()

        })
      })
    })

  }


})
