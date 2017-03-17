<template>
	<div id="content">
		<div class="box_header">
			<div class="new_user_head">
				新用户注册
			</div>
			<div class="back_index">
				<img src="../../../img/home.png">
				<a href="index.html"><span>返回首页</span></a>
			</div>
		</div>
		<div class="new_tip">
			<img src="../../../img/new-tip.png">
			<span>贴心提示：请勿设置过于简单的登录密码或支付密码，防止不法分子窃取您的账户信息</span>
            <span class="catious">谨防诈骗！</span>
		</div>
		<div class="register_content">
			<form>
				<div class="input_box" @click="hehe">
					<label>手机号码</label><input class="input_obj phone" type="text" placeholder="请输入您的手机号码"><i class="r_x r_x_phone"></i><br>
                    <p class="tip tip_phone">手机号可用于登录、找回密码等服务</p>
				</div>
				<div class="input_box">
                    <label>账号名</label><input class="input_obj username" type="text"><i class="r_x r_x_username"></i><br>
                    <p class="tip tip_username">请输入2-8位账号名</p>
                </div>
                <div class="input_box">
                    <label>登录密码</label><input class="input_obj password" type="password"><i class="r_x r_x_password"></i><br>
                    <p class="tip tip_password">请输入6-10位登录密码</p>
                </div>
                <div class="input_box">
                    <label>确认密码</label><input class="input_obj confirm_password" type="password"><i class="r_x r_x_cf_pw"></i><br>
                    <p class="tip tip_cf_pw">请确认密码</p>
                </div>
                <div class="input_box">
                    <label>获取验证码</label><input class="input_obj vertify" type="text" placeholder="请输入您的手机验证码"><i class="r_x r_x_vertify"></i><div class="get_vertify">获取验证码</div><br>
                    <p class="tip tip_vertify">请输入验证码</p>
                </div>
                <a class="register_bt">立即注册</a>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		components: {
			
		},
		methods: {
			hehe(){
				this.$http.post('/register.html', { 'index': '33232' });
			}
		},
		props: ["isLogin"],
		data: function (){
			return {
				
			}
		},
		computed: {

		},
		created: function (){

		},
		watch: {

		}
	}
</script>
<style lang="sass">
	$mic: "微软雅黑";
	#content{
		width: 950px;
		margin: 40px auto 0;
		box-shadow: -10px 10px 1px #c9c9c9;
		background: #fff;
		.box_header{
			width: 920px;
			height: 75px;
			margin: 0 auto;
			border-bottom: 1px solid #dedede;
			.new_user_head{
			    text-align: center;
			    margin-top: 30px;
			    margin-left: 20px;
			    padding-top: 15px;
			    border: solid #dedede;
			    width: 137px;
			    height: 30px;
			    float:left;
			    border-width: 1px 1px 0 1px;
			    background: #fff;				
			}
			.back_index{
			    width: 70px;
			    height: 30px;
			    margin-top: 40px;
			    float: right;
			    font-size: 12px;
			    overflow: hidden;
			    img{
			    	margin-top: 10px;
			    	float: left;
			    }	
			    span{
			    	float: left;
			    	display: inline-block;
			    	margin-top: 11px;
			    	margin-left: 2px;
			    }			
			}
		}
		.new_tip{
		    width: 594px;
		    height: 24px;
		    margin: 10px auto 50px;;
		    border: 1px solid #fedbd1;
		    font-size: 13px;
		    img{
		    	margin-top: 6px;
		    	margin-left: 2px;
		    	float: left;
		    }			
		    span{
		    	display: inline-block;
		    	margin-top: 6px;
		    	margin-left: 5px;
		    }
		    .catious{
		    	color: blue;
		    }
		}
		.register_content{
			width: 440px;
			margin: 0 auto;
			padding-bottom:50px;
			.input_box{
				label{
				    margin-right: 10px;
				    font-size: 14px;
				    width: 70px;
				    display: inline-block;
				    text-align: right;
				    color: #474747;
				    font-family: $mic;				
				}
				input{
				    width: 312px;
				    height: 34px;
				    margin-bottom: 10px;
				    font-size: 13px;
				    padding-left: 8px;				
				}
				i{
				    display: inline-block;
				    width: 12px;
				    height: 12px;
				    background-size: 12px 12px;
				    margin-left: 5px;
				    margin-top: 13px;
				    vertical-align: top;				
				}
				p{
				    margin-left: 80px;
				    margin-bottom: 10px;
				    font-family: $mic;
				    font-size: 12px;				
				}
				input.vertify{
					width: 222px;
				}
				i.r_x_vertify{
					margin-left: -20px;
				}
				.get_vertify{
				    display: inline-block;
				    width: 81px;
				    height: 35px;
				    background: #dedede;
				    vertical-align: top;
				    margin-left: 15px;
				    border: 1px solid #aaa;
				    font-size: 12px;
				    text-align: center;
				    line-height: 35px;
				    font-family: $mic;
				    cursor: pointer;				
				}	
			}
			.register_bt{
			    display: block;
			    background: #ff2832;
			    width: 180px;
			    height: 50px;
			    line-height: 50px;
			    text-align: center;
			    font-size: 18px;
			    font-family: $mic;
			    color: white;
			    border-radius: 22px;
			    margin: 30px auto 0;				
			}
		}
	}
</style>