"use strict";


(function(){

  window.helper = window.helper || {};

  
  var max = 0;

  helper.randomColor = function(){

    var color = '';
    var hex = ['A','B','C','D','E','F',0,1,2,3,4,5,6,7,8,9];

    for (var i = 1; i <= 6; i++){
      color = color + hex[Math.floor(Math.random() * hex.length)];
    }

    return '#' + color;
  }

  helper.parseData = function(myData, xyValues) {

    var graphNum = +xyValues[0] - 1;

    if (!myData[graphNum]){
      myData[graphNum] = {
                            key: 'firebase' + (graphNum + 1),
                            values: [],
                            area: false
                          };

      helper.changeColor(myData, graphNum, helper.randomColor());
    }

    myData[graphNum].values.push({
      x: +xyValues[1],
      y: +xyValues[2]
    });
  };

  helper.updateChart = function(data, xyValues, chart){
    helper.parseData(data, xyValues);
    
    if (xyValues[2] > max) {
      helper.getNewMax(data, xyValues[0]);
      chart.yDomain([0, max]);
    }

    chart.update();
  };

  helper.getNewMax = function(data, chartNum){

    var values = data[+chartNum - 1].values;

    for (var i = 0; i < values.length; i++){

      if (values[i].y > max){
        max = values[i].y;
      }
    }
  };

  helper.changeColor = function(data, graphNum, color){
    data[graphNum].color = color;
  };



})();