

// var arr=[["10.28",120],["10.29",20],["10.30",53],["10.31",22],["11.01",13],["11.02",34],["11.03",32],["11.04",49],["11.05",62],["11.06",20],["11.07",120],["11.08",230],["11.09",211]];

// var arr1 = [];
// //将得到的数据中的单数复制到一个新数组
// for(var i=0;i<arr.length;i++){
// 	arr1[i] = arr[i][1];
// }
// //获取新数组中的最大值，并向上取10的倍数
// var max = Math.max.apply(null, arr1);
//     max = (parseInt(max/10)+1)*10;


function chart(arr){

	var arr1 = [];//将每天的销售量置入该数组中
	this.width = (arr.length*50+100);//每个距离为50，并且距离两边分别为50所以加100
	this.height = 400;//固定高度为400
	this.average = //数量在该时间的平均值
		(function(){
			var totol_num = 0,//获得的数据总销售量
				average = 0;//获得数据的平均值

			//将得到的数据中的单数复制到一个新数组
			for(var i=0;i<arr.length;i++){
				arr1[i] = arr[i][1];
				totol_num += arr[i][1];
			}
			return average = (totol_num / arr.length).toFixed(1);
		})();
	this.ceil_max = //数量最大值并向上取10的倍数
		(function(){
			var max = Math.max.apply(null, arr1);
		    	max = (parseInt(max/10)+1)*10;
		    return max;
		})();
}

// //共用的方法
// chart.prototype = {
// 	constructor:chart,
// 	// average:function(){
// 	// 			var arr1 = [],
// 	// 				totol_num = 0;
// 	// 				average = 0;
// 	// 			//将得到的数据中的单数复制到一个新数组
// 	// 			for(var i=0;i<arr.length;i++){
// 	// 				arr1[i] = arr[i][1];
// 	// 				totol_num += arr[i][1];
// 	// 			}
// 	// 			return average = (totol_num / arr.length).toFixed(1);
// 	// 		},
// 	// ceil_max:function(){
// 	// 	var max = Math.max.apply(null, arr1);
// 	//     	max = (parseInt(max/10)+1)*10;
// 	//     return max;
// 	// }
// }

//bar_chart继承chart
function bar_chart(arr){
	chart.call(this,arr);//使用该方法继承使每个新的bar_chart对象独自拥有从chart对象继承过来的属性，防止属性共用

	//这是bar_chart对象自己拥有的方法
	this.draw = 
		function(ctx){
			ctx.clearRect(0,0,980,450);
			//该数组的每项为每个柱形图，方便使用isPointInPath
			var a = [],
	    		that = this;//因为this只会搜索到活动对象，不会去搜索外部函数所以要将this赋值给that

	    	//这个函数是画X,Y轴
			function X_Y(){
				ctx.strokeStyle = "black";
		    	ctx.lineWidth = 2;
		    	ctx.beginPath();
		    	//Y轴
		    	ctx.moveTo(30,30);//Y轴最上方的坐标
		    	ctx.lineTo(30,30+that.height);//Y轴最下方的坐标
		    	//X轴
		    	ctx.lineTo(30+that.width,30+that.height);//X轴最右方的坐标
		    	//Y轴上的箭头
		    	ctx.moveTo(30,30);
		    	ctx.lineTo(25,40);
		    	ctx.moveTo(30,30);
		    	ctx.lineTo(35,40);
		    	//X轴上的箭头
		    	ctx.moveTo(30+that.width,30+that.height);
		    	ctx.lineTo(20+that.width,35+that.height);
		    	ctx.moveTo(30+that.width,30+that.height);
		    	ctx.lineTo(20+that.width,25+that.height);
		    	ctx.stroke();

		    	//添加字体X轴，Y轴
		    	ctx.lineWidth = 1;
		    	ctx.font = "14px 宋体";
		    	ctx.strokeText("Y轴",20,20);
		    	ctx.strokeText("X轴",35+that.width,35+that.height);
			}
			
			X_Y();

			//这个for循环是生成每个柱形图，并将每个柱形图放如a数组中
	    	for(var i=0;i<arr.length;i++){
	    		a[i] = (function(i){
		    			return function(){
				    				ctx.beginPath();
						    		ctx.lineWidth = 2;
						    		ctx.fillStyle = "#252424";
							    	ctx.moveTo(80+i*50,30+that.height);
							    	ctx.lineTo(80+i*50,30+that.height-arr[i][1]*(that.height/that.ceil_max));//乘以that.height/that.ceil_max这个数，是为了让柱形图显得高一点
							    	ctx.lineTo(115+i*50,30+that.height-arr[i][1]*(that.height/that.ceil_max));
							    	ctx.lineTo(115+i*50,30+that.height);
							    	ctx.lineWidth = 1;
							    	ctx.strokeStyle = "#000";
							    	//画上每个柱状图的数量
							    	ctx.strokeText(arr[i][1],85+i*50,20+that.height-arr[i][1]*(that.height/that.ceil_max));
							    	//画上每个柱状图的日期
							    	ctx.strokeText(arr[i][0],80+i*50,30+that.height+15);
							    	ctx.fill();
				    			}
	    				})(i)
	    		a[i]();
		    }
		    //这个函数使画出平均值的线
		    function average_line(){
		    	ctx.beginPath();
			    ctx.lineWidth = 2;
				ctx.strokeStyle = "#FF0101";
				ctx.moveTo(55,30+that.height-(that.average*(that.height/that.ceil_max)));
				ctx.lineTo(that.width,30+that.height-(that.average*(that.height/that.ceil_max)));
				ctx.font = "oblique 18px 宋体";
				ctx.strokeText(that.average,that.width-30,25+that.height-(that.average*(that.height/that.ceil_max)))
				ctx.stroke();
		    }
		    average_line();

		    //canvas鼠标移动事件
			canvas.onmousemove = function(e){
				//全部清空canvas的图形
				ctx.clearRect(0,0,980,450);

				//执行X_Y轴函数
				X_Y();
				// ctx.font = "14px 宋体";
				//获得根据canvas对象的左边距和上边距
				var x=e.offsetX,y=e.offsetY;
				//画柱形图并判断是否处于路径上
				for(var j=0;j<a.length;j++){
					a[j]();
					if(ctx.isPointInPath(x, y)){
						ctx.fillStyle = "#AA0B0B";
					}else{
						ctx.fillStyle = "#252424";
					}
					ctx.fill();
				}
				//执行平均值线的函数
				average_line();
			}
		}
}

function line_chart(arr){
	chart.call(this,arr);

	this.draw = 
		function(ctx){
			ctx.clearRect(0,0,980,450);
			canvas.onmousemove = "";
			var that = this;
			//这个函数是画X,Y轴
			function X_Y(){
				ctx.strokeStyle = "black";
		    	ctx.lineWidth = 2;
		    	ctx.beginPath();
		    	//Y轴
		    	ctx.moveTo(30,30);//Y轴最上方的坐标
		    	ctx.lineTo(30,30+that.height);//Y轴最下方的坐标
		    	//X轴
		    	ctx.lineTo(30+that.width,30+that.height);//X轴最右方的坐标
		    	//Y轴上的箭头
		    	ctx.moveTo(30,30);
		    	ctx.lineTo(25,40);
		    	ctx.moveTo(30,30);
		    	ctx.lineTo(35,40);
		    	//X轴上的箭头
		    	ctx.moveTo(30+that.width,30+that.height);
		    	ctx.lineTo(20+that.width,35+that.height);
		    	ctx.moveTo(30+that.width,30+that.height);
		    	ctx.lineTo(20+that.width,25+that.height);
		    	ctx.stroke();

		    	//添加字体X轴，Y轴
		    	ctx.lineWidth = 1;
		    	ctx.font = "14px 宋体";
		    	ctx.strokeText("Y轴",20,20);
		    	ctx.strokeText("X轴",35+that.width,35+that.height);
			}
			
			X_Y();
			ctx.beginPath();
			ctx.moveTo(80,30+that.height-arr[0][1]);
			for(var i=0;i<arr.length;i++){
				ctx.lineWidth = 1;
				//给j赋值折线图在X轴上的起始高度
				var j=30+that.height;
				//移动到每个折线图X轴上的位置
				ctx.moveTo(80+i*50,30+that.height);

				//while循环，判断j的值是否到达该折线图的最终高度
				while(j>=30+that.height-arr[i][1]*(that.height/that.ceil_max)){
					//虚线中的实线距离为10
					j -= 10;
					//继续判断j的值是否到达该折线图的最终高度,若没有则沿Y轴方向画虚线，有则实线连到下个折线点
					if(j>30+that.height-arr[i][1]*(that.height/that.ceil_max)){
						//虚线中的实线
						ctx.lineTo(80+i*50,j);
						//虚线中的空白距离为5
						j -= 5;
						//继续判断j的值是否到达该折线图的最终高度，若没有则沿Y轴方向画虚线，有则实线连到下个折线点
						if(j>30+that.height-arr[i][1]*(that.height/that.ceil_max)){
							//虚线中的空白
							ctx.moveTo(80+i*50,j);
						}else{
							//将位置移至该折线点的最高点
							ctx.moveTo(80+i*50,30+that.height-arr[i][1]*(that.height/that.ceil_max));
							//判断是否为最后一个点,并将改点连实线至下点的最高点
							if(i<arr.length-1){
								ctx.lineTo(80+(i+1)*50,30+that.height-arr[i+1][1]*(that.height/that.ceil_max));
							}
						}
					}else{
						ctx.lineTo(80+i*50,30+that.height-arr[i][1]*(that.height/that.ceil_max));
						if(i<arr.length-1){
							ctx.lineTo(80+(i+1)*50,30+that.height-arr[i+1][1]*(that.height/that.ceil_max));
						}
					}	
				}
				ctx.strokeStyle = "#000";
				ctx.font = "18px 宋体";
				//画上每个折线图的数量
				ctx.strokeText(arr[i][1],75+i*50,20+that.height-arr[i][1]*(that.height/that.ceil_max));
				ctx.font = "14px 宋体";
				//画上每个折线图的日期
				ctx.strokeText(arr[i][0],65+i*50,30+that.height+15);
				// ctx.lineTo(80+i*50,30+that.height-arr[i][1]);
			}
			ctx.stroke();

			//画出平均线
			ctx.beginPath();
		    ctx.lineWidth = 2;
			ctx.strokeStyle = "#FF0101";
			ctx.moveTo(55,30+that.height-(that.average*(that.height/that.ceil_max)));
			ctx.lineTo(that.width,30+that.height-(that.average*(that.height/that.ceil_max)));
			ctx.font = "oblique 18px 宋体";
			ctx.strokeText(that.average,that.width-30,25+that.height-(that.average*(that.height/that.ceil_max)))
			ctx.stroke();
		}
}

export {bar_chart, line_chart}
//继承
// bar_chart.prototype = new chart();
// bar_chart.prototype.constructor = bar_chart;


// var bar_chart1 = new bar_chart(arr);



// bar_chart1.draw();
