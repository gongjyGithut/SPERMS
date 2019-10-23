<template>
  <div class="app-container">
    <el-row>
      <el-form :inline="true" label-suffix="22">
        <el-form-item >
          <el-date-picker
            v-model="startTime"
            :picker-options="pickerOptions"
            type="date"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item >
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
            type="date"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item >

          <el-input
            v-model="keywords"
            placeholder="设备编号或设备名称">
            <el-select slot="prepend" v-model="selectOption">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-input>

        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"/>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row>
      <picture-card/>
    </el-row>
  </div>
</template>
<script>
import PictureCard from './components/PictureCard'
export default {
  name: '',
  components: { PictureCard },
  data() {
    return {
      startTime: '',
      endTime: '',
      keywords: '',
      options: [{
        label: '设备名称',
        value: 'eName'
      }, {
        label: '设备编号',
        value: 'eId'
      }],
      selectOption: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    handleSearch() {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
