$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("secondTpl", info);
                $("table .second-tb").html( htmlStr );

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    $('.btnAddCate2').click(function () {
        $('#addCateModal').modal('show');
    });

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            // console.log(data);
            $('#imgBox img').attr("src", data.result.picAddr);

            $('[name="brandLogo"]').val(data.result.picAddr);

            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });


    // 获取模态框一级分类数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: "json",
        success: function (info) {
            // console.log(info);
            var htmlStr = template("mdcateTpl", info);
            $('#form .dropdown-menu').html( htmlStr );
        }

    });

    //点击一级分类  hidden-cate1
    $('#form .dropdown-menu').on("click", "li a", function () {
        // console.log($(this).text());
        $('#form .cateSeltext').text($(this).text());

        $('[name="categoryId"]').val($(this).data("id"));

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    // 添加二级分类
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if(info.success)
                {
                    $('#addCateModal').modal("hide");
                    // 页面重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单, 校验状态和文本都要重置
                    $('#form').data("bootstrapValidator").resetForm( true );

                    // 下拉按钮的文本, 图片不是表单元素, 需要手动重置
                    $('.cateSeltext').text("请选择一级分类");
                    $('#imgBox img').attr("src", "./images/none.png");
                }
            }
        })
    });

    //模态框表单验证
    $('#form').bootstrapValidator({
        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty:{
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty:{
                        message: "请上传图片"
                    }
                }
            }
        }
    });

})