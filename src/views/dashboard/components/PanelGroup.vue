<template>
  <el-row :gutter="40" class="panel-group">
    <el-col class="card-panel-col">
      <div  class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">设备总量</div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div  class="card-panel" >
        <div class="card-panel-description">
          <div class="card-panel-text">在线设备</div>
          
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div  class="card-panel" >
        <div class="card-panel-description">
          <div class="card-panel-text">离线设备</div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div  class="card-panel" >
        <div class="card-panel-description">
          <div class="card-panel-text">停机设备</div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div  class="card-panel" >
        <div class="card-panel-description">
          <div class="card-panel-text">故障设备</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  // margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
    width:calc(100% / 5);
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

    .card-panel-description {
      // float: right;
      text-align: center;
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
