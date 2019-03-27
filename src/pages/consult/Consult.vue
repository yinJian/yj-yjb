<template>
	<div class="consult-container container-with-bar">
		<div class="consult-title">
			<img src="../../assets/images/title-bar@2x.png">
      <p>专业的医学顾问团队</p>
      <img src="../../assets/images/title-bar@2x.png">
		</div>
		<div class="consult-subtitle">即时响应，快速回复</div>
		<img src="../../assets/images/consult.png" class="consult-img">
		<img src="../../assets/images/condult-process.png" class="consult-service-img">
		<div class="consult-list">
			<div class="consult-item">健康咨询</div>
			<div class="consult-item">理赔咨询</div>
			<div class="consult-item">就医咨询</div>
		</div>
		<div class="bottom-bar">
			<div class="consult-submit" @click="serviceLink">确认</div>
		</div>
	</div>
</template>

<script>
	import {
    mapState
  } from 'vuex';
	export default {
		data () {
			return {

			}
		},
		mounted () {
			this.initUserinfo();
		},
		methods: {
			initUserinfo (isJump) {
        if (this.userinfo) {
          this.oldPhone = this.userinfo.phone;
          this.oldName = this.userinfo.name;
          this.oldNumber = this.userinfo.idNumber;
        } else {
          this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
        }
      },
			serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
      },
		},
		watch: {
      userinfo: {
        handler (newValue) {
          this.initUserinfo(true);
        },
        deep: true
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    }
	}
</script>

<style lang="less" scoped>
	@import '../../assets/styles/base.less';

	.consult-container {
		width: 100%;
		min-height: 100vh;
		padding: 0 0.32rem;
		background: @bg-white;
		padding-top: 0.6933rem;
	}

	.consult-title {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.4266rem;

		p {
			margin: 0 0.2666rem;
		}
	}

	.consult-subtitle {
		font-size: 0.32rem;
    color: #929292;
    line-height: 0.5866rem;
    text-align: center;
	}

	.consult-img {
		width: 100%;
		margin-top: 0.8rem;
	}

	.consult-service-img {
		width: 90%;
		display: block;
		margin: 1.0666rem auto 0 auto;
	}

	.consult-list {
		display: flex;
		margin-top: 0.4rem;
		color: #848484;
		font-size: 0.4266rem;
	}

	.consult-item {
		width: 33%;
		text-align: center;
	}

	.consult-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }
</style>