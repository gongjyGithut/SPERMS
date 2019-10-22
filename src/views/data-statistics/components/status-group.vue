<template>
  <div class="status-group">
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="inline" class-name="card-panel-icon" />
      </div>

      <div class="group-text">
        在线22台
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="outline" class-name="card-panel-icon" />
      </div>

      <div class="group-text">
        离线22台
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="breakdown" class-name="card-panel-icon" />
      </div>

      <div class="group-text">
        故障22台
      </div>
    </div>
    <div class="status-group-wrapper">
      <div class="group-icon">
        <svg-icon icon-class="closedown" class-name="card-panel-icon" />
      </div>

      <div class="group-text">
        停机22台
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
    // margin: 0 auto;
    width: 100%;
    .status-group-wrapper{
        font-size: 18px;
        width: calc(100% / 5);
        height: 70px;
        line-height: 70px;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        border:1px solid rgba(8, 50, 105, 0.459);
        .group-icon{
            font-size:24px;
            margin-right: 10px;
        }
    }
}
</style>
