<template>
  <div class="picture-panel">
    <div v-for="(value, key) in pictureData" :key="key" class="picture-wrapper">
      <el-image
        :src="value.picPath"
        :preview-src-list="[value.picPath]"
        class="image-panel"/>

      <div class="picture-text">
        <ul>
          <li>设备编号：{{ value.eId }}</li>
          <li>设备名称：{{ value.eName }}</li>
          <li>日期：{{ value.picTime | parseTime }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
export default {
  name: 'PictureCard',
  components: {},
  filters: {
    parseTime(value) {
      return parseTime(value)
    }
  },
  props: {
    pictureData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.picture-panel{
    padding-top: 20px;
    // background-color: #f3f0f0;
    display: flex;
    display: -webkit-flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    .picture-wrapper{
        background-color: #fff;
        margin-bottom: 20px;
        border:1px solid #E4E7ED;
        width: 15%;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        .image-panel{
            width:100%;
            height: 220px;
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
    :not(:last-child){
      margin-right: 20px;
    }
}
</style>
