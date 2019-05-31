$(function () {

    // ajaxStart 在第一个 ajax 发送时, 调用
    $(document).ajaxStart(function() {
        // 开启进度条
        NProgress.start();
    });

// ajaxStop 在所有的ajax完成时, 调用
    $(document).ajaxStop(function() {

        // 模拟网络延迟
        setTimeout(function() {
            // 关闭进度条
            NProgress.done();
        }, 500);

    });

    if ( location.href.indexOf("login.html") === -1 ) {
        // 地址栏中没有 login.html, 说明不是登录页, 需要进行登录拦截
        $.ajax({
            type: "get",
            url: "/employee/checkRootLogin",
            dataType: "json",
            success: function( info ) {
                console.log( info )
                if ( info.success ) {
                    // 已登录, 让用户继续访问
                    console.log("用户已登录")
                }

                if ( info.error === 400 ) {
                    // 未登录, 拦截到登录页
                    location.href = "login.html";
                }
            }
        })
    }

    // 顶部菜单按钮切换
    $('.icon_menu').click(function () {
        $('.lside').toggleClass("hidemenu");
        $('.topBar').toggleClass("hidemenu");
        $('.lt-main').toggleClass("hidemenu");
    })

    // 分类管理的切换功能
    $('.nav .category').click(function() {
        // 切换 child 的显示隐藏
        $('.nav .child').stop().slideToggle();
    });

    //退出登录功能--弹出模态框
    $('.icon_logout').click(function () {
        $('#logoutModal').modal("show");
    })

    $('#btn-logout').click(function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (info) {
                if(info.success){
                    location.href = "login.html";
                }
                // if(info.error){
                //     $('#logoutModal').modal("hide");
                // }
            }
        })
    })


})