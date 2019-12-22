<template>
  <div class="status-group">
    <div class="status-group-wrapper">
      <div class="group-icon icon-inline">
        <svg-icon icon-class="inline" class-name="card-panel-icon" />
        <span>在线</span>
      </div>

      <div class="group-text">
        22
      </div>
    </div>
    <div class="status-group-wrapper ">
      <div class="group-icon icon-outline">
        <svg-icon icon-class="outline" class-name="card-panel-icon" />
        <span>离线</span>
      </div>

      <div class="group-text">
        22
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon icon-breakdown">
        <svg-icon icon-class="breakdown" class-name="card-panel-icon" />
        <span>故障</span>

      </div>

      <div class="group-text">
        22
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon icon-closedown">
        <svg-icon icon-class="closedown" class-name="card-panel-icon" />
        <span>停机</span>

      </div>

      <div class="group-text">
        22
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'StatusGroup',
  props: {

  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
div {display: inline-block;}
.status-group{
  width: 100%;
  font-size:0px;//解决inline-block增加的间距
  // border-bottom: 1px solid #EBEEF5;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  .status-group-wrapper{
    padding-top: 30px;
    height: 100px;
    // line-height: 20px;
    width: calc(100% / 4);
    text-align: center;
    cursor: pointer;
    .group-icon{
      width: 100%;
      font-size: 24px;
      border-radius:50%;
      .card-panel-icon{
        margin-right: 20px;
      }
    }
    .icon-inline{
      color:#007AEB;
    }
    .icon-outline{
      color:#E6A23C;
    }
    .icon-breakdown{
      color:#EE5D39;
    }
    .icon-closedown{
      color:#909399;
    }
    .group-text{
      color: #5b6268;
      font-size: 20px;
      margin-top: 10px;
    }
    &:not(:last-child) {
      border-right: 1px solid #EBEEF5;
    }
  }
}
</style>
