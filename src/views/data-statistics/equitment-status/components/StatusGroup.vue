<template>
  <div class="status-group">
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="inline" class-name="card-panel-icon" />
        <span>在线</span>
      </div>

      <div class="group-text">
        22
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="outline" class-name="card-panel-icon" />
        <span>离线</span>
      </div>

      <div class="group-text">
        22
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="breakdown" class-name="card-panel-icon" />
        <span>故障</span>

      </div>

      <div class="group-text">
        22台
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="closedown" class-name="card-panel-icon" />
        <span>停机</span>

      </div>

      <div class="group-text">
        22台
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'StatusGroup',
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
  font-size:0px;
  .status-group-wrapper{
    font-size: 24px;
    width: calc(100% / 4);
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #c2c2c2;
    // border:1px solid #c2c2c2;
    .group-icon{
      margin-right: 15px;
    }
    .group-text{
    }
    &:not(:last-child) {
      border-right: 1px solid #c2c2c2;
    }
  }
}
</style>
