<template>
	<div class="address-container" v-if="addressChooseShow">
		<div class="address-header">
			<div class="address-back" @click="backChoose">返回</div>
			<div class="address-title">选择地址</div>
		</div>
		<div class="address-province" v-show="showLevel == 1">
			<div class="address-list">
				<div class="address-item" :class="province.selected ? 'address-item-active' : ''" v-for="(province, index) in province" @click="provinceChooseHandler(province)">{{ province.codeValue }}</div>
			</div>
		</div>
		<div class="address-city" v-show="showLevel == 2">
			<div class="address-list">
				<div class="address-item" :class="city.selected ? 'address-item-active' : ''" v-for="(city, index) in city" @click="cityChooseHandler(city)">{{ city.codeValue }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getChina } from '@/api';

	const PROVINCE_ID = 0;
	export default {
		props: {
			addressChooseShow: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				showLevel: 1,
				provinceChoosed: '',
				cityChoosed: '',
				areaChoosed: '',
				province: [],
				city: [],
				area: []
			}
		},
		methods: {
			initProvince () {
				getChina(PROVINCE_ID).then(data => {
					data.data.forEach(item => {
						item.selected = false;
					});
					this.province = data.data;
				});
			},
			provinceChooseHandler (province) {
				this.showLevel = 2;
				province.selected = true;
				this.provinceChoosed = `${province.codeKey},${province.codeValue}`;
				getChina(province.codeKey).then(data => {
					data.data.forEach(item => {
						item.selected = false;
					});
					this.city = data.data;
				});
			},
			cityChooseHandler (city) {
				this.cityChoosed = `${city.codeKey},${city.codeValue}`;
				this.$emit('addressConfirm', {
					provinceChoosed: this.provinceChoosed,
					cityChoosed: this.cityChoosed
				});
				this.cancelChoose();
			},
			backChoose () {
				if (this.showLevel > 1) {
					this.showLevel--;
				} else {
					this.cancelChoose();
				}
			},
			cancelChoose () {
				this.$emit('addressCancel');
			}
		},
		watch: {
			addressChooseShow (newValue) {
				if (newValue) {
					this.initProvince();
				} else {
					this.showLevel = 1;
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/styles/base.less';

.address-container {
	width: 100%;
	height: 100vh;
	overflow-y: auto;
	padding-top: 1.333rem;
	position: fixed;
	left: 0;
	top: 0;
	background: @bg-white;
	z-index: 15;
}

.address-header {
	width: 100%;
	height: 1.333rem;
	background: #E49A2D;
	position: fixed;
	top: 0;
	left: 0;
	color: @text-color-white;
}

.address-back {
	width: 1.333rem;
	height: 1.333rem;
	line-height: 1.333rem;
	text-align: center;
	font-size: 0.3733rem;
	position: relative;
	z-index: 10;
}

.address-title {
	width: 100%;
	height: 1.333rem;
	line-height: 1.333rem;
	text-align: center;
	position: absolute;
	left: 0;
	top: 0;
	font-size: 0.4rem;
}

.address-item {
	width: 100%;
	height: 1.333rem;
	font-size: 0.3733rem;
	line-height: 1.333rem;
	padding: 0 0.4rem;
	border-bottom: 1px solid @border-default;
}

.address-item-active {
	color: #E49A2D;
}
</style>