<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :class="{isActive:typeAction === 'equitmentStat'}" class="card-panel" @click="handleSetLineChartData('equitmentStat')">
        <div class="card-panel-icon-wrapper icon-equitmentStat" >
          <svg-icon icon-class="equitmentStat" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">设备状态统计</div>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :class="{isActive:typeAction === 'productStat'}" class="card-panel" @click="handleSetLineChartData('productStat')">
        <div class="card-panel-icon-wrapper icon-productStat">
          <svg-icon icon-class="productStat" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">产量统计</div>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :class="{isActive:typeAction === 'saleStat'}" class="card-panel" @click="handleSetLineChartData('saleStat')">
        <div class="card-panel-icon-wrapper icon-saleStat">
          <svg-icon icon-class="saleStat" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">销售统计</div>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'

export default {
  // components: {
  //   CountTo
  // },
  data() {
    return {
      typeAction: 'equitmentStat'
    }
  },
  computed: {

  },
  methods: {
    handleSetLineChartData(type) {
      this.typeAction = type
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  // margin-top: 18px;
  .card-panel-col{
    margin-bottom: 10px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &.isActive {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-equitmentStat {
         background: #40c9c6;
      }
      .icon-productStat {
        background: #36a3f7;
      }
      .icon-saleStat {
        background: #f4516c;
      }
    }
    .icon-equitmentStat {
      color: #40c9c6;
    }
    .icon-productStat {
      color: #36a3f7;
    }
    .icon-saleStat {
      color: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
