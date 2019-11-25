<template>
  <div>
    <bmap-container ref="bmap" :map-data="mapData"/>
  </div>
</template>

<script>
import { getEqList } from '@/api/message-information/equitment-message'
import bmapContainer from './components/bmap-container'
export default {
  components: { bmapContainer },
  data() {
    return {
      mapData: []

    }
  },
  created() {
    this.getEquitmentList()
  },
  methods: {
    getEquitmentList() {
      const parmas = {}
      parmas.pageNo = 1
      parmas.pageSize = 100
      getEqList(parmas).then(res => {
        this.mapData = res.records
        this.$refs.bmap.addMarker(this.mapData)
      })
    },

    handleSearch() {

    }
  }
}
</script>
<style>

</style>
