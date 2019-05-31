$(function () {
    
    echart1();
    echart2();
    
    function echart1() {
        var myChart = echarts.init(document.querySelector(".echart1"));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2017年注册人数'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [1000, 1200, 1400, 1800, 1200, 2500]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
    }
    
    function echart2() {
        var myChart = echarts.init(document.querySelector(".echart2"));
        option = {
            title : {
                text: '热门品牌销售',
                subtext: '2018年8月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['阿迪','耐克','三叶草','阿迪王','匡威']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'阿迪'},
                        {value:310, name:'耐克'},
                        {value:234, name:'三叶草'},
                        {value:135, name:'阿迪王'},
                        {value:1548, name:'匡威'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    
    
})