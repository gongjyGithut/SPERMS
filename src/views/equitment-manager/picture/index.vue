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
      <picture-card :picture-data="pictureData"/>
      <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="_getPictureList"/>

    </el-row>
  </div>
</template>
<script>
import PictureCard from './components/PictureCard'
import Pagination from '@/components/Pagination'
import { notifyWarning } from '@/utils/notify.js'
import { getPictureList } from '@/api/equitment-manager/picture.js'
export default {
  name: '',
  components: { PictureCard, Pagination },
  data() {
    return {
      startTime: '',
      endTime: '',
      keywords: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
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
      },
      pictureData: []
    }
  },
  created() {
    this._getPictureList()
  },
  methods: {
    _getPictureList() {
      const parmas = Object.assign({}, this.page)
      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime

        if (parmas.startTime > parmas.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }
      this.pictureData = []
      getPictureList(parmas).then(res => {
        const { records } = res
        this.total = res.totalCount
        records.forEach(item => {
          // const obj = {}
          item.picPath = process.env.BASE_API + item.picPath
          const { picFilename, picId, ...obj } = item
          this.pictureData.push(obj)
        })
      })
    },
    handleSearch() {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
