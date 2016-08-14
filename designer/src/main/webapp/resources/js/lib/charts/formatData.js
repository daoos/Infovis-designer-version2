define(function(){    
    var tableAndConfig = function(){
        var table = [  '<ul class="nav nav-tabs" role="tablist">',
                           '<li role="presentation" class="active"><a href="#data" data-toggle="tab">数据编辑</a></li>',
                           '<li role="presentation"><a href="#param" data-toggle="tab">图表属性</a></li>',
                        '</ul>',
                        '<div class="tab-content">',
                          ' <div role="tabpanel" class="tab-pane active" id="data" style="padding-top: 0px">',
                                '<div>',
                                   '<button type="button" class="btn btn-info" style="float:right;">+导入excel</button>',
                                '</div>',
                                '<div style="height:310px;overflow:auto;clear:both;">',
                                    '<table class="table table-bordered">',
                                        '<tr><td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td></tr>',
                                        '<tr>',
                                            '<td>1</td>',
                                            '<td><input ></td>',
                                            '<!-- ko foreach: legends -->',
                                                '<td><input data-bind="value: legend, valueUpdate: \'keyup\'"></td>',
                                            '<!-- /ko -->',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                        '</tr>',  
                                        '<!-- ko foreach: contacts -->',
                                         '<tr>',
                                            '<td data-bind="text: index"></td>',
                                            '<td><input data-bind="value: name, valueUpdate: \'keyup\'"></td>',
                                            '<!-- ko foreach: {data : value} -->',
                                            '<td><input data-bind="value: v, valueUpdate: \'keyup\'"></td>',
                                            '<!-- /ko -->',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                            '<td><input ></td>',
                                        '</tr>',
                                        '<!-- /ko -->',
                                    '</table>',
                                '</div>', 
                                '</div>',
                                '<div role="tabpanel" class="tab-pane" id="param">',
                                    '<div class="col-xs-1">',
                                        '<ul class="nav nav-tabs tabs-left">',
                                          '<li class="active"><a href="#option01" data-toggle="tab">标题</a></li>',
                                          '<li><a href="#option02" data-toggle="tab">图例</a></li>',
                                          '<li><a href="#option03" data-toggle="tab">提示框</a></li>',
                                          '<li><a href="#option04" data-toggle="tab">图表</a></li>',
                                        '</ul>',
                                    '</div>',
                                '<div class="col-xs-11" style="height:350px;overflow:auto;" id="chartConfig">',
                                '<div class="tab-content">',
                                    '<div class="tab-pane active" id="option01" style="padding-top: 0px">',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">主标题</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >内容&nbsp;&nbsp;</label>',
                                                    '<input class="form-control" data-bind="value: titleContent, valueUpdate: \'keyup\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >上边距&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: titleTop, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >左边距&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: titleLeft, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字体&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: titleFontFamily, value: selectedFontFamily, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字号&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: titleFontSize, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >粗细&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: titleFontWeight, value: selectedFontWeight, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >风格&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: titleFontStyle, value: selectedFontStyle, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >文字颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="titleFontColor" data-bind="value: titleFontColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">副标题</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >内容&nbsp;&nbsp;</label>',
                                                    '<input class="form-control" data-bind="value: subtitleContent, valueUpdate: \'keyup\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字体&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: subtitleFontFamily, value: subselectedFontFamily, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字号&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: subtitleFontSize, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >粗细&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: subtitleFontWeight, value: subselectedFontWeight, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >风格&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: subtitleFontStyle, value: subselectedFontStyle, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >文字颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="subtitleFontColor" data-bind="value: subtitleFontColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                    '</div>',
                                    '<div class="tab-pane" id="option02">',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">基础</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >是否显示&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: legendShow, value: selectedLegendShow, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">布局</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >上边距&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: legendTop, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >左边距&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: legendLeft, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >布局方式&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: legendOrient, value: selectedLegendOrient, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">图例项</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >图标间距&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: legendItemGap, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >图标样式&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: legendIcon, value: selectedLegendIcon, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字体&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: legendFontFamily, value: selectedLegendFontFamily, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字号&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: legendFontSize, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >粗细&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: legendFontWeight, value: selectedLegendFontWeight, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >文字颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="legendFontColor" data-bind="value: legendFontColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                    '</div>',
                                    '<div class="tab-pane" id="option03">',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">基础</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >是否显示&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: tooltipShow, value: selectedToolTipShow, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >边框颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="tooltipBorderColor" data-bind="value: tooltipBorderColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >边框宽度&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: tooltipBorderWidth, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >背景颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="tooltipBackgroundColor" data-bind="value: tooltipBackgroundColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                        '<div>',
                                            '<span style="color:#5D5BA8;margin-top;10px;">文本样式</span>',
                                            '<hr style="margin-top:10px;">',
                                            '<form role="form">',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字体&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: tooltipFontFamily, value: selectedToolTipFontFamily, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >字号&nbsp;&nbsp;</label>',
                                                    '<input type="number" class="form-control" data-bind="value: tooltipFontSize, valueUpdate: \'input\'">',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >粗细&nbsp;&nbsp;</label>',
                                                    '<select class="form-control" data-bind="options: tooltipFontWeight, value: selectedToolTipFontWeight, valueUpdate: \'keyup\'"></select>',
                                                '</div>',
                                                '<div class="form-group form-group-sm">',
                                                    '<label >文字颜色&nbsp;&nbsp;</label>',
                                                    '<input type="text" id="tooltipFontColor" data-bind="value: tooltipFontColor, valueUpdate: \'input\'"/>',
                                                '</div>',
                                            '</form>',
                                        '</div>',
                                    '</div>',
                                    '<div class="tab-pane" id="option04">',
                                            '<div>',
                                                '<span style="color:#5D5BA8;margin-top;10px;">图属性</span>',
                                                '<hr style="margin-top:10px;">',
                                                '<form role="form">',
                                                    '<div class="form-group form-group-sm">',
                                                        '<label >图形间距&nbsp;&nbsp;</label>',
                                                        '<input type="number" class="form-control" data-bind="value: seriesBarGap, valueUpdate: \'input\'">',
                                                    '</div>',
                                                    '<div class="form-group form-group-sm">',
                                                        '<label >是否显示标签值&nbsp;&nbsp;</label>',
                                                        '<select class="form-control" data-bind="options: seriesBarShowLabel, value: selectedSeriesBarShowLabel, valueUpdate: \'keyup\'"></select>',
                                                    '</div>',
                                                '</form>',
                                            '</div>',
                                            '<div>',
                                                '<span style="color:#5D5BA8;margin-top;10px;">布局(饼图无效)</span>',
                                                '<hr style="margin-top:10px;">',
                                                '<form role="form">',
                                                     '<div class="form-group form-group-sm">',
                                                        '<label >上边距&nbsp;&nbsp;</label>',
                                                        '<input type="number" class="form-control" data-bind="value: gridTop, valueUpdate: \'input\'">',
                                                    '</div>',
                                                    '<div class="form-group form-group-sm">',
                                                        '<label >下边距&nbsp;&nbsp;</label>',
                                                        '<input type="number" class="form-control" data-bind="value: gridBottom, valueUpdate: \'input\'">',
                                                    '</div>',
                                                    '<div class="form-group form-group-sm">',
                                                        '<label >左边距&nbsp;&nbsp;</label>',
                                                        '<input type="number" class="form-control" data-bind="value: gridLeft, valueUpdate: \'input\'">',
                                                    '</div>',
                                                    '<div class="form-group form-group-sm">',
                                                        '<label >右边距&nbsp;&nbsp;</label>',
                                                        '<input type="number" class="form-control" data-bind="value: gridRight, valueUpdate: \'input\'">',
                                                    '</div>',
                                                '</form>',
                                            '</div>',
                                        '</div>',
                                    '<div>',
                                '</div>',  
                            '</div>',
                        '</div>'].join("");

        return table;
    };
                    
	return {
        tableAndConfig : tableAndConfig
	};
});