require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "validate": "lib/jquery.validate.min",
        "metisMenu": "lib/metisMenu/metisMenu.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min",
        "options": "lib/charts/options",
        "infovis": "lib/infovis.min",
        "jqueryCookie": "lib/jquery.cookie",
        "jqueryMd5": "lib/jquery.md5",
        "mCustomScrollbar":"lib/mCustomScrollbar/jquery.mCustomScrollbar.concat.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "mCustomScrollbar" : { "deps" :['jquery'] },
        "jqueryMd5" : { "deps" :['jquery'] },
        "metisMenu" : { "deps" :['jquery'] },
        "ztree" : { "deps" :['jquery'] }
    }
});

require(['jquery', 'options', 'infovis','mCustomScrollbar'], function($, baseOptions, infovis){
    $(function(){
        var engine = infovis.init(baseOptions.makeAllOptions() || {});
        var exportId = window.location.href.split("=")[1].replace("&order","");
        var order = window.location.href.split("=")[2].replace("#","");
        $.ajax({
            type: 'POST',
            url: '../getOptions',
            data: "exportId="+exportId,
            success: function(data){
                var editChart = engine.chart.init(document.getElementById("editArea"));
                editChart.setOption(JSON.parse(data["jsCode"])[order]);
                window.currentOption = JSON.parse(data["jsCode"])[order];
                window.data = data;
            },
            error: function(){
                alert("图表配置加载失败，请重试");
            }
        });

        $(".btn-info").click(function(){
            var option = engine.chart.getInstanceByDom(document.getElementById("editArea")).getOption();
            var optionArray = JSON.parse(window.data["jsCode"]);
            optionArray[order] = option;

            $.ajax({
                type: 'POST',
                url: '../updateOptions',
                data: {
                    'exportId': exportId,
                    'jsCode': JSON.stringify(optionArray)
                },
                success: function(){
                    //top.window.location = "../showPanel.page?exportId=" + exportId;
                }
            });

            console.log(window.bmodel);
           $.ajax({
              type: 'POST',
              url: '../updateChartInfo',
              data: {
                  'exportId': exportId,
                  'chartId': order.toString(),
                  'sqlRecordingId': window.sid.toString(),
                  'buildModel': JSON.stringify(window.bmodel).toString()
              }
           });
        })
    })
});

require(['jquery','validate','jquery-ui','bootstrap','metisMenu'], function($,jqueryui,validate){

    $(".thumbnail").on('mouseenter mouseleave',function(e){
        var target = $("#operate",$(this));
        if(e.type == 'mouseenter'){
            target.stop();
            target.children().css("display","block");
            target.animate({height:'40px'});
        }else if(e.type == 'mouseleave'){
            target.stop();
            target.children().css("display","none");
            if(target.css('height') != '0px') {
                target.animate({height: "0"});
            }
        }
    });

    $(".dropdown").on('mouseenter mouseleave',function(e){
        if(e.type == 'mouseenter'){
            $(this).addClass("danger");
        }else if(e.type == 'mouseleave'){
            $(this).removeClass("danger");
        }
    });
    $('#side-menu').metisMenu({
        toggle: false
    });
});

//数据集操作模块
require(['jquery','ztree','infovis','options','mCustomScrollbar','jqueryCookie','jqueryMd5','bootstrap'], function($,ztree,infovis,baseOptions){
    function tagDropFunction(event, ui,iclass,target) {
        var targetNode = $(ui.draggable).find("a").find("span").html();
        var numberTag = $(ui.draggable).find("a").find("i").hasClass("fa-sort-numeric-asc");
        var textTag = $(ui.draggable).find("a").find("i").hasClass("glyphicon-text-color");
        target.html('');
        var targetText = '<span style="width:100px;display: inline-block; overflow: hidden;"><i class="'+iclass+'" style="display: inline;"></i>&nbsp;'+targetNode+'</span><button type="button" class="close mark-item-close">&times;</button>';
        target.append(targetText);
        if(textTag){
            target.css("background-color",'#f6eedb');
            target.css("border",'1px #f9e7bb solid');
        }
        if(numberTag){
            target.css("background-color",'#d2ddf0');
            target.css("border",'1px #b1caf4 solid');
        }
        target.css("cursor","move");

        /**
         * 绑定删除事件
         */
        $('form.make-model-region .mark-item-close').click(function(){
            var target = $(this);
            var isColorMark = target.parent().hasClass("mark-item-color");
            var isCornerMark = target.parent().hasClass("mark-item-corner");
            var isTagMark = target.parent().hasClass("mark-item-tag");

            if(isColorMark){//颜色tag删除
                target.parent().css("background-color",'#ffffff');
                target.parent().css("border",'none');
                target.parent().css("border-right",'1px dashed #ccc');
                target.parent().html('<i class="fa fa-tachometer"></i> 颜色');
            }else if(isCornerMark){//角度tag删除
                target.parent().css("background-color",'#ffffff');
                target.parent().css("border",'none');
                target.parent().css("border-right",'1px dashed #ccc');
                target.parent().html('<i class="fa fa-clock-o"></i> 角度');
            }else if(isTagMark){//标签tag删除
                target.parent().css("background-color",'#ffffff');
                target.parent().css("border",'none');
                target.parent().html('<i class="fa fa-tags"></i> 标签');
            }
        });
    };

    var setting_datalist = {
        async: {
            enable: true,
            url:"../sqlRecordingManage/queryTree",
            autoParam:["queryParam", "level=lv"],
            dataType: "JSON",
            dataFilter: function(treeId, parentNode, responseData) {
                //批量增加iconSkin
                $.each(responseData,function(index,object){
                    if(object.type === 'database'){
                        switch(object.dbType)
                        {
                            case 'Oracle':
                                object.iconSkin = "oracleIcon";
                                break;
                            case 'MySql':
                                object.iconSkin = "mysqlIcon";
                                break;
                            case 'SqlServer':
                                object.iconSkin = "sqlserverIcon";
                                break;
                            case 'H2':
                                object.iconSkin = "h2Icon";
                                break;
                            default:
                                object.iconSkin = "dbIcon";
                        }

                    }else{
                        object.iconSkin = "tableIcon";
                    }
                });
                return responseData;
            }
        },
        data: {
            key: {
                name: "dbName"
            }
        },
        callback: {
            onAsyncError: function (event,treeId,treeNode,XMLHttpRequest,textStatus,errorThrown) {
                //记录旧的节点名称以免重复增加无法连接
                if(!treeNode.oldDbName){
                    treeNode.oldDbName = treeNode.dbName;
                }
                treeNode.dbName = treeNode.oldDbName +"(无法连接)"
                setting_datalist.updateNode(treeNode);
            },
            onAsyncSuccess :function () {
                $("div.panel-body").mCustomScrollbar({
                    autoHideScrollbar:true,
                    axis:"yx",
                    theme:"dark"
                });
            },
            onClick: function(event, treeId, treeNode){
                var tree = $.fn.zTree.getZTreeObj("dataListTree");
                var sqlRecordingId = tree.getSelectedNodes()[0].id;       //数据集id
                var chartType = window.currentOption.series[0].type;      //图表类型

                window.sid = sqlRecordingId;     //用于插入图表关联信息

                var engine = infovis.init(baseOptions.makeAllOptions() || {});
                function renderChart(){
                    var color = $(".mark-item-color").find("span").text().trim();
                    var angle = $(".mark-item-corner").find("span").text().trim();
                    var tag = $(".mark-item-tag").find("span").text().trim();
                    var xAxis = [];
                    var yAxis = [];

                    xAxis.push($(".xAxis").find("span").text().trim());
                    yAxis.push($(".yAxis").find("span").text().trim());

                    if(chartType == 'pie'){
                        var builderModel = {
                            'mark': {
                                'color': color,
                                'angle': angle,
                                'tag': tag
                            }
                        }
                    }else if(chartType == 'line' || chartType == 'bar'){
                        var builderModel = {
                            'xAxis':  xAxis,
                            'yAxis':  yAxis
                        }
                    }

                    window.bmodel = builderModel;         //用于插入图表关联信息

                    $.ajax({
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        url: '../render',
                        data: JSON.stringify({
                            'chartType': chartType,
                            'dataRecordId': sqlRecordingId,
                            'exportId': window.location.href.split("=")[1].replace("&order",""),
                            'builderModel': builderModel
                        }),
                        success: function(data){
                            console.log(JSON.stringify(data));
                            var editChart = engine.chart.init(document.getElementById("editArea"));
                            editChart.setOption(data);
                        }
                    });
                }

                if(!treeNode.dbUrl) {
                    $('#side-menu li a:eq(0)').html("<i class='fa fa-sitemap fa-fw'></i>" + treeNode.dbName + "<span class='fa arrow'></span>");
                    var queryParam = {};
                    queryParam.id = treeNode.getParentNode().id;
                    queryParam.sql = treeNode.sql;
                    queryParam.queryMaxRows = 1;
                    queryParam.paging = false;
                    var deferred = $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: '../connectionManage/getQuerySqlInfo',
                        data : queryParam
                    });
                    deferred.done(function(result){
                        var columnModle = getCookieInfo(result).data;

                        $('#side-menu ul.nav.nav-third-level').empty();
                        $.each(columnModle.dimensions,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(0)')
                                .append("<li><a href='javascript:void(0)'><i class='glyphicon glyphicon-text-color leftBarLiIcon'></i><span style='display:inline-block;max-width: 150px;overflow: hidden;'>" + element + "</span><i class='glyphicon glyphicon-download leftBarLiIcon pull-right'></i></a></li>");
                        });
                        $.each(columnModle.measure,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(1)')
                                .append("<li><a href='javascript:void(0)'><i class='fa fa-sort-numeric-asc leftBarLiIcon'></i><span style='display:inline-block;max-width: 10px;max-width: 150px;overflow: hidden;'>" + element + "</span><i class='glyphicon glyphicon-upload leftBarLiIcon pull-right'></i></a></li>");
                        });
                        //切换维度度量事件绑定
                        $('#side-menu ul.nav.nav-third-level li i.leftBarLiIcon').on("click",function () {
                            var li = $($(this).parent().parent());
                            if($(this).hasClass("glyphicon-download")){
                                $(this).removeClass("glyphicon-download").addClass("glyphicon-upload");
                                li.find("i:not(.pull-right)").removeClass("glyphicon glyphicon-text-color").addClass("fa fa-sort-numeric-asc");
                                $('#side-menu ul.nav.nav-third-level:eq(1)').append(li);
                            }else{
                                $(this).removeClass("glyphicon-upload").addClass("glyphicon-download");
                                li.find("i:not(.pull-right)").removeClass("fa fa-sort-numeric-asc").addClass("glyphicon glyphicon-text-color");
                                $('#side-menu ul.nav.nav-third-level:eq(0)').append(li);
                            }
                            //移动后保存到cookie
                            saveCookieInfo(result);
                        })

                        //滚动条插件
                        $(".scrollable").mCustomScrollbar({
                            autoHideScrollbar:true,
                            theme:"dark"
                        });
                        /**
                         * 左侧维度、度量拖拽
                         */
                        $('#side-menu ul.nav.nav-third-level li').draggable({
                            cursor: "move",
                            opacity: 0.7,
                            appendTo :'body',
                            cursorAt: { top: 10, left: 34 },
                            helper: function(event) {
                                var dragText = $(this).find("a").find("span").html();
                                return $( "<div class='drag-helper'>"+dragText+"</div>" );
                            }
                        });

                        //在droppable事件中发送option组装请求
                        $("form.make-model-region .trigger-column").droppable({
                            drop: function (event, ui) {
                                var targetNode = $(ui.draggable).find("a").find("span").html();
                                var numberTag = $(ui.draggable).find("a").find("i").hasClass("fa-sort-numeric-asc");
                                var textTag = $(ui.draggable).find("a").find("i").hasClass("glyphicon-text-color");

                                var targetText = '<div class="trigger-column-tag trigger-column-tag-text">'+
                                    '<a><i class="glyphicon glyphicon-text-color" style="display: none;"></i>'+
                                    '<span class="dragName">'+targetNode+'</span><button type="button" class="close trigger-column-tag-close">&times;</button></a>'+
                                    '</div>';
                                var targetNumberText = '<div class="trigger-column-tag trigger-column-tag-number">'+
                                    '<a><i class="fa fa-sort-numeric-asc" style="display: none;"></i>'+
                                    '<span class="dragName">'+targetNode+'</span><button type="button" class="close trigger-column-tag-close">&times;</button></a>'+
                                    '</div>';
                                var target = $(this);

                                if(numberTag){
                                    target.append(targetNumberText);
                                    renderChart();
                                }
                                if(textTag){
                                    target.append(targetText);
                                    renderChart();
                                }

                                /**
                                 * 行、列、标签拖动
                                 */
                                $('.trigger-column-tag').draggable({
                                    cursor: "move",
                                    opacity: 0.7,
                                    appendTo:'body',
                                    cursorAt: { top: 10, left: 34 },
                                    helper: function(event) {
                                        var dragText = $(this).find("span").html();
                                        return $( "<div class='drag-helper'>"+dragText+"</div>" );
                                    }
                                });

                                /**
                                 * 标记删除可拖动标签
                                 */
                                $('.trigger-column-tag .trigger-column-tag-close').click(function(){
                                    var target = $(this).parent().parent();
                                    target.draggable('destroy');
                                    target.remove();
                                });

                                $(this).css("border","1px dashed #ccc");
                                $(this).css("background-color","white");

                            },
                            over: function (event, ui) {
                                $(this).css("border","1px dashed #22a7f0");
                                $(this).css("background-color","#cfe9f7");
                            },
                            out:function (event,ui) {
                                $(this).css("border","1px dashed #ccc");
                                $(this).css("background-color","white");
                            }
                        });

                        var engine = infovis.init(baseOptions.makeAllOptions() || {});
                        /**
                         * 颜色tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-color").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-tachometer',target);

                                renderChart();
                            },
                            over: function (event, ui) {
                                $(this).css("border","1px dashed #22a7f0");
                                $(this).css("background-color","#cfe9f7");
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");
                            }
                        });

                        /**
                         * 角度tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-corner").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-clock-o',target)

                                renderChart();
                            },
                            over: function (event, ui) {
                                $(this).css("border","1px dashed #22a7f0");
                                $(this).css("background-color","#cfe9f7");
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");


                            }
                        });

                        /**
                         * 标签tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-tag").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-tags',target)

                                renderChart();
                            },
                            over: function (event, ui) {
                                $(this).css("border","1px dashed #22a7f0");
                                $(this).css("background-color","#cfe9f7");
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");
                            }
                        });

                    });
                }
            }
        }
    };
    var dataListTree = $.fn.zTree.init($("#dataListTree"),setting_datalist);

    //获取cookie中的维度与度量
    var getCookieInfo = function(res){
        var key = $.md5(res);
        var result;
        var cookieResult = $.cookie(key);
        if(cookieResult){
            result = {
                data : JSON.parse(cookieResult),
                type : 'cookie'
            }
        }else{
            //维度和度量模型
            var columnModle ={
                dimensions :[],
                measure :[],
            }
            $.each(res,function(index,element){
                if(element.type === 'varchar') {
                    columnModle.dimensions.push(element.name);
                }else{
                    columnModle.measure.push(element.name);
                }
            });
            result = {
                data : columnModle,
                type : 'ajax'
            }
            $.cookie(key,JSON.stringify(columnModle),{ expires: 10 });
        }
        return result
    }
    //将维度与度量保存到cookie
    var saveCookieInfo = function (result) {
        //维度和度量模型
        var columnModle ={
            dimensions :[],
            measure :[],
        }
        $.each($('#side-menu ul.nav.nav-third-level:eq(0) span'),function (index, element) {
            columnModle.dimensions.push($(element).text());
        })

        $.each($('#side-menu ul.nav.nav-third-level:eq(1) span'),function (index, element) {
            columnModle.measure.push($(element).text());
        })
        $.cookie($.md5(result),JSON.stringify(columnModle),{ expires: 10 });
    }

    $("form.make-model-region .trigger-column").on('mouseenter mouseleave',function(e){
        var target = $(this);
        if(e.type == 'mouseenter'){
            if(target.html()!=''){
                target.css("height","auto");
            }
            target.css("cursor","pointer");
        }
    });

});
