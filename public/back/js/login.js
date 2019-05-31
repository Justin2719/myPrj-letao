$(function () {

    // 表单校验
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在 2-6 位"
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在 6-12 位"
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });


    // 处理表单校验成功事件
    $('#login-form').on("success.form.bv", function (e) {
        e.preventDefault();

        // 发送登录ajax请求
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#login-form').serialize(),
            dataType: "json",
            success: function (info) {
                if( info.success ){
                    location.href = "index.html";
                }
                if(info.error === 1000){
                    $('#login-form').data("bootstrapValidator").updateStatus("username","INVALID", "callback");
                }
                if(info.error === 1001){
                    $('#login-form').data("bootstrapValidator").updateStatus("password","INVALID", "callback");
                }
            }
        })
    })

});

$('[type = "reset"]').click(function () {
    $('#form').data("bootstrapValidator").resetForm(true);
})