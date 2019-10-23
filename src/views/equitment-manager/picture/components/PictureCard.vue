<template>
  <div class="picture-panel">
    <div v-for="i in 10" :key="i" class="picture-wrapper">
      <el-image
        :src="url"
        :preview-src-list="srcList"
        class="image-panel"/>

      <div class="picture-text">
        <ul>
          <li>设备编号：</li>
          <li>设备名称：</li>
          <li>日期：</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PictureCard',
  components: {},
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.picture-panel{
    padding-top: 20px;
    background-color: #f3f0f0;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .picture-wrapper{
        background-color: #fff;
        margin-bottom: 20px;
        border:1px solid #E4E7ED;
        .image-panel{
            width:200px;
        }
        .picture-text{
            ul{
                padding: 5px;
                margin: 0;
            }
            li{
                list-style: none;
                margin-bottom: 3px;
                font-size: 14px;
                color: #606266;
            }
        }
    }
}
</style>
