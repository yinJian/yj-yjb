<template>
  <div>
    <div v-if="serviceType == 1">
      <div class="service-content">
        <img src="../../../assets/images/zhongji@2x.png">
        <div class="service-info">
          <p class="service-title">疾病绿色通道</p>
          <p class="service-tip">顶级三甲医院专家门诊，一键获得一站式就医服务与保障。</p>
        </div>
      </div>
      <div class="card container-with-bar">
        <div class="card-tab-list">
          <div class="card-tab-item" :class="tab.selected ? 'card-tab-item-active' : ''" v-for="tab in serviceTabData" :key="tab.name" @click="tabHandler(tab)">
            <span>{{ tab.name }}</span>
          </div>
        </div>
        <div class="service-detail-list">
          <div class="service-detail-item" v-if="serviceTabData[0].selected">
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>专家预约</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">更好的治疗方案</div>
              <img src="../../../assets/images/expert-call@2x.png" class="service-range-img">
            </div>
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>住院预约</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">协调医疗资源</div>
              <img src="../../../assets/images/hospital-call@2x.png" class="service-range-img">
            </div>
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>手术预约</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">及时治疗</div>
              <img src="../../../assets/images/operation-call@2x.png" class="service-range-img">
            </div>
          </div>
          <div class="service-detail-item" v-if="serviceTabData[1].selected">
            <div class="service-flow-list">
              <div class="service-flow-item">
                <span>1</span>
                <div class="service-flow-tip">提交预约信息：<br/>请您详细填写相关信息，选择相应医疗服务项目进行预约。</div>
              </div>
              <div class="service-flow-item">
                <span>2</span>
                <div class="service-flow-tip">确认预约信息：<br/>0.5个工作日内，医学顾问联系您确认预约信息，并以最终沟通确认的预约信息为准。</div>
              </div>
              <div class="service-flow-item">
                <span>3</span>
                <div class="service-flow-tip">反馈预约结果：<br/>3-5个工作日内，医学顾问联系您反馈预约安排结果。</div>
              </div>
              <div class="service-flow-item">
                <span>4</span>
                <div class="service-flow-tip">就诊指导：<br/>就诊前1日，医学顾问联系您提醒就诊注意事项；就诊当日您可电话联系医学顾问指导取号及就医全过程。</div>
              </div>
              <div class="service-flow-item">
                <span>5</span>
                <div class="service-flow-tip">优加健康的医疗顾问将对您进行回访反馈。</div>
              </div>
              <div class="service-flow-item">
                <span>6</span>
                <div class="service-flow-tip">
                  <p>服务须知：</p>
                  <p>1）医学顾问确认预约信息前，您可自行关闭订单进行预约取消；但确认信息之后及已进行预约安排的，因您个人原因取消、延误取号或未前往就诊，该次预约服务视为已生效。</p>
                  <p>2）就医过程中产生的医疗费用（挂号费、检查费、治疗费、医药费、床位费等 ）需由您自行承担。</p>
                  <p>3）部分医院预约要求您提供就诊人证件（身份证、就诊卡或医保卡）原件，如不能提供，将无法进行预约。</p>
                  <p>4）由于医院原因导致的专家临时停诊或遭遇其他不可抗力因素，将为您协调同等级别其他专家门诊。</p>
                </div>
              </div>
              <!--<div class="service-flow-item">
                <img src="../../../assets/images/checked@2x.png">
                <div class="service-flow-tip">预约成功，安排就诊/入院/手术</div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="serviceType == 2">
      <div class="service-content">
        <img src="../../../assets/images/yajindianfu@2x.png">
        <div class="service-info">
          <p class="service-title">住院押金垫付</p>
          <p class="service-tip">住院不筹款，代付医疗费。</p>
        </div>
      </div>
      <div class="card">
        <div class="card-tab-list">
          <div class="card-tab-item" :class="tab.selected ? 'card-tab-item-active' : ''" v-for="tab in serviceTabData" :key="tab.name" @click="tabHandler(tab)">
            <span>{{ tab.name }}</span>
          </div>
        </div>
        <div class="service-detail-list">
          <div class="service-detail-item" v-if="serviceTabData[0].selected">
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>押金垫付</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">住院无负担出院再结算</div>
              <img src="../../../assets/images/app-intro.png" class="service-range-img">
              <div class="service-range-tip">优加专人服务，让住院、理赔更简单。</div>
            </div>
          </div>
          <div class="service-detail-item" v-if="serviceTabData[1].selected">
            <div class="service-flow-list container-with-bar">
              <div class="service-flow-item">
                <span>1</span>
                <div class="service-flow-tip">提交服务申请：<br/>请您详细填写相关信息，所填信息务必准确、真实、有效。</div>
              </div>
              <div class="service-flow-item">
                <span>2</span>
                <div class="service-flow-tip">确认申请信息：<br/>0.5个工作日内，医学顾问联系您确认申请信息，并以最终沟通确认的申请信息为准。</div>
              </div>
              <div class="service-flow-item">
                <span>3</span>
                <div class="service-flow-tip">资料上传：<br/>医学顾问指导您收集病历资料拍照上传，协助您进行住院押金垫付资格审核。</div>
              </div>
              <div class="service-flow-item">
                <span>4</span>
                <div class="service-flow-tip">协调安排：<br/>医学顾问对住院押金垫付全程服务进行协调安排，提供在线全程问题咨询解答。</div>
              </div>
              <div class="service-flow-item">
                <span>5</span>
                <div class="service-flow-tip">入院指导：<br/>服务人员协助您办理住院手续，垫付您的住院押金。</div>
              </div>
              <div class="service-flow-item">
                <span>6</span>
                <div class="service-flow-tip">诊中关怀：<br/>医学顾问全程追踪您的治疗情况及押金补垫需求，并给予医学帮助建议。</div>
              </div>
              <div class="service-flow-item">
                <span>7</span>
                <div class="service-flow-tip">出院指导：<br/>服务人员协助您办理出院手续，代您进行医疗费用结算。</div>
              </div>
              <div class="service-flow-item">
                <span>8</span>
                <div class="service-flow-tip">优加健康的医疗顾问将对您进行回访反馈。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="serviceType == 3">
      <div class="service-content">
        <img src="../../../assets/images/eczhenliao@2x.png">
        <div class="service-info">
          <p class="service-title">二次诊疗</p>
          <p class="service-tip">重大疾病不用怕，顶级专家提供优化治疗方案。</p>
        </div>
      </div>
      <div class="card">
        <div class="card-tab-list">
          <div class="card-tab-item" :class="tab.selected ? 'card-tab-item-active' : ''" v-for="tab in serviceTabData" :key="tab.name" @click="tabHandler(tab)">
            <span>{{ tab.name }}</span>
          </div>
        </div>
        <div class="service-detail-list">
          <div class="service-detail-item" v-if="serviceTabData[0].selected">
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>二次诊疗</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">客观专业的建议，获得权威的第二诊疗意见</div>
              <img src="../../../assets/images/erci-intro.png" class="service-range-img">
              <div class="service-range-tip">优加服务，只为给你更好的。</div>
            </div>
          </div>
          <div class="service-detail-item" v-if="serviceTabData[1].selected">
            <div class="service-flow-list container-with-bar">
              <div class="service-flow-item">
                <span>1</span>
                <div class="service-flow-tip">提交服务申请：<br/>请您详细填写相关信息，所填信息务必准确、真实、有效。</div>
              </div>
              <div class="service-flow-item">
                <span>2</span>
                <div class="service-flow-tip">确认申请信息：<br/>0.5个工作日内，医学顾问联系您确认申请信息，并以最终沟通确认的申请信息为准。</div>
              </div>
              <div class="service-flow-item">
                <span>3</span>
                <div class="service-flow-tip">资料收集：<br/>医学顾问协助您收集整理既往病历、诊断报告、影像学资料及报告、病理组织切片及报告、检查检验报告等，并对上述资料进行审核，确认资料的完整性及符合专家会诊要求。</div>
              </div>
              <div class="service-flow-item">
                <span>4</span>
                <div class="service-flow-tip">协调安排：<br/>医学顾问进行专家筛选推荐、与客户和专家进行会诊相关问题的协调与沟通、客户病历资料的传送和补充等。</div>
              </div>
              <div class="service-flow-item">
                <span>5</span>
                <div class="service-flow-tip">专家会诊：<br/>专家对客户的病情给出诊断结果、诊断依据和治疗意见。</div>
              </div>
              <div class="service-flow-item">
                <span>6</span>
                <div class="service-flow-tip">反馈会诊意见：<br/>医学顾问将二次诊疗意见书通过邮件或微信等发送给您，并为您解释二次诊疗意见。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="serviceType == 4">
      <div class="service-content">
        <img src="../../../assets/images/tjyuyue@2x.png">
        <div class="service-info">
          <p class="service-title">健康体检</p>
          <p class="service-tip">全国5大知名体检机构在线体检预约</p>
        </div>
      </div>
      <div class="card">
        <div class="card-tab-list">
          <div class="card-tab-item" :class="tab.selected ? 'card-tab-item-active' : ''" v-for="tab in serviceTabData" :key="tab.name" @click="tabHandler(tab)">
            <span>{{ tab.name }}</span>
          </div>
        </div>
        <div class="service-detail-list">
          <div class="service-detail-item" v-if="serviceTabData[0].selected">
            <div class="service-range">
              <div class="service-range-title">
                <img src="../../../assets/images/title-bar@2x.png">
                <p>健康体检</p>
                <img src="../../../assets/images/title-bar@2x.png">
              </div>
              <div class="service-range-subtitle">一份体检确保一年健康</div>
              <img src="../../../assets/images/erci-intro.png" class="service-range-img">
              <div class="service-range-tip">打造健康体魄，撑起家庭重担</div>
            </div>
          </div>
          <div class="service-detail-item" v-if="serviceTabData[1].selected">
            <div class="service-flow-list container-with-bar">
              <div class="service-flow-item">
                <span>1</span>
                <div class="service-flow-tip">验证手机号码：<br/>请输入您投保时预留的手机号码并获取验证码。</div>
              </div>
              <div class="service-flow-item">
                <span>2</span>
                <div class="service-flow-tip">确认申请信息：<br/>选择您所投保的保单，确认受检人的身份信息是否正确，点击下一步预约体检机构、体检时间。</div>
              </div>
              <div class="service-flow-item">
                <span>3</span>
                <div class="service-flow-tip">预约体检：<br/>选择一家离您最近的体检机构并预留一个备选时间，点击下一步确认并提交预约信息。预约成功后优加健康将在2个工作日内将预约结果以短信的方式发送给您，请您注意查收。</div>
              </div>
              <div class="service-flow-item">
                <span>4</span>
                <div class="service-flow-tip">体检结束后7个工作日您可通过体检机构官方APP或官方网站下载查看体检报告。</div>
              </div>
              <div class="service-flow-item">
                <span>5</span>
                <div class="service-flow-tip">优加健康的医学顾问将回访并为您提供体检报告解读。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 bottom -->
    <div class="bottom-bar">
      <div class="service-choose">
        <div class="service-call" @click="serviceLink">客服</div>
        <div class="service-apply" @click="viewHandler">查看保单</div>
        <!-- <router-link :to="'/signin/'+serviceType" class="service-apply">立即申请</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {
    viewPolicy,
    checkService
  } from '@/api';
  import {
    mapState
  } from 'vuex';
  const ID_MAPS = [
    {
      name: '重疾绿通',
      id: '0000'
    },
    {
      name: '押金垫付',
      id: '0005'
    },
    {
      name: '二次诊疗',
      id: '0004'
    },
    {
      name: '预约体检',
      id: '0007'
    }
  ];

  export default {
    data () {
      return {
        serviceType: 0,
        serviceTabData: [
          {
            name: '服务范围',
            selected: true
          },
          {
            name: '服务流程',
            selected: false
          }
        ]
      }
    },
    mounted () {
      this.serviceType = this.$route.params.type;
      this.initUserinfo();
    },
    methods: {
      initUserinfo () {
        if (this.userinfo) {
          this.oldPhone = this.userinfo.phone;
          this.oldName = this.userinfo.name;
          this.oldNumber = this.userinfo.idNumber;
        }
      },
      tabHandler (tabCur) {
        this.serviceTabData.forEach(tab => {
          tab.selected = false;
        });
        tabCur.selected = true;
      },
      serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
      },
      viewHandler () {
        const id = ID_MAPS[this.serviceType - 1].id;
        console.log(this.userinfo);
        if (this.userinfo) {
          checkService(id).then(data =>{
            if(data.data.success == 'OK'){
              if(id=="0007"){
                window.location.href = 'https://admin.yjhealth-china.com/healthcloud365common/static/metronic/theme/admin/index.html';
              }else {
                this.$router.push(`/service/view-policy/${this.serviceType}`);
              }
            }else {
              this.$yjToast('您不具备申请该服务的权限！')
            }
          })
        } else {
          this.$router.push('/signin?redirect='+encodeURIComponent(`/service/introduction/${this.serviceType}`));
        }
      }
    },
    watch: {
      userinfo: {
        handler (newValue) {
          this.initUserinfo();
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
  @import '../../../assets/styles/base.less';

  .container-with-bar {
    background: @bg-white;
  }

  .service-content {
    width: 100%;
    height: 3.8666rem;
    padding: 0.7466rem 0.3466rem 0.6666rem 0.5866rem;
    display: flex;
    align-items: center;
    background: @bg-white;

    img {
      width: 2.4533rem;
      height: 2.4533rem;
    }
  }

  .service-info {
    width: 5.44rem;
    margin-left: auto;
  }

  .service-title {
    font-size: 0.4266rem;
    font-weight: 600;
    color: @text-color-black;
  }

  .service-tip {
    font-size: 0.32rem;
    line-height: 0.5066rem;
    color: #747474;
    margin-top: 0.16rem;
  }

  .card-tab-list {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    display: flex;
    border-bottom: 1px solid @border-default;
  }

  .card-tab-item {
    width: 43.73%;
    cursor: pointer;

    &:first-child {
      text-align: right;
    }

    &:last-child {
      margin-left: auto;
    }

    span {
      display: inline-block;
    }
  }

  .card-tab-item-active {
    span {
      color: #E49A2D;
      border-bottom: 2px solid #E49A2D;
    }
  }

  .service-detail-item {
    padding: 0.32rem;
  }

  .service-range-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.6933rem;

    p {
      margin: 0 0.2666rem;
      font-size: 0.4266rem;
    }
  }

  .service-range-tip {
    color: #9F9F9F;
    font-size: 0.32rem;
    text-align: center;
    padding: 0.5333rem 0 0.16rem 0;
  }

  .service-range-subtitle {
    font-size: 0.32rem;
    color: #929292;
    line-height: 0.5866rem;
    text-align: center;
  }

  .service-range-img {
    width: 100%;
    height: 4.24rem;
    margin-top: 0.8rem;
  }

  .service-flow-list {
    margin-top: 0.3466rem;
  }

  .service-flow-item {
    display: flex;
    align-items: flex-start;
    padding-left: 0.1333rem;
    margin-bottom: 0.6rem;
    color: #545454;
    position: relative;

    span {
      width:0.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.4266rem;
      display: block;
      text-align: center;
      background: @bg-orange;
      color: @text-color-white;
      border-radius: 100%;
    }
  }

  .service-flow-tip {
    width: calc(~"100% - 1rem");
    margin-left: auto;
    font-size: 0.3266rem;

    span {
      color: #F09700;
    }
  }

  /*.flow-line {
    height: 1rem;
    position: absolute;
    left: 0.62rem;
    top: 1rem;
    border-left: 2px dotted #E49A2D;
  }*/

  /* 底部 */
  .service-choose {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    display: flex;
  }

  .service-apply {
    width: 70%;
    height: 1.3333rem;
    display: block;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }

  .service-call {
    width: 30%;
    height: 1.3333rem;
    text-align: center;
    background: @bg-white;
    color: #E49A2D;
  }
</style>
