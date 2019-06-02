$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                var htmlStr = template("firstTpl", info);
                $("table .first-tb").html( htmlStr );

                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: info.total / info.size,//总页数
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    // 显示添加分类模态框
    $('.btnAddCate').click(function () {
        $('#addCateModal').modal('show');
    })

    // 表单验证
    $('#addCateForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    })

    // 添加一级分类
    $('#addCateForm').on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#addCateForm').serialize(),
            dataType: "json",
            success: function (info) {
                // console.log(info);
                $('#addCateModal').modal('hide');
                currentPage = 1;
                render();
            }
        })
    })

})