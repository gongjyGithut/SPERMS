<template>
  <div class="menu-container">

    <el-tree
      ref="menutree"
      :data="menuData"
      :props="defaultProps"
      class="menu-tree"
      show-checkbox
      default-expand-all
      node-key="menuId"
      check-on-click-node
      @check="checkChange"/>
  </div>
</template>
<script>
import { getSysmenuAllList } from '@/api/setting/sysmenu'
export default {
  name: 'MenuContainer',
  data() {
    return {
      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  computed: {
    checkNodes: {
      get() {
        return this.$store.state.menu.checkNodes
      },
      set(val) {
        this.$emit('updata:checkNodes', val)
      }

    }
  },
  watch: {
    checkNodes(newVal) {
      this.setCheckNodes(newVal)
    }
  },
  created() {
    this.getAllMenuList()
  },
  mounted() {

  },
  methods: {
    getAllMenuList() {
      getSysmenuAllList().then(res => {
        this.menuData = this.toTree(res.records)
      })
    },
    setCheckNodes(checkNodes) {
      this.$refs.menutree.setCheckedKeys(checkNodes)
    },
    checkChange(clickNode, { checkedKeys, checkedNodes }) {
      this.$store.dispatch('setCheckNodes', this.$refs.menutree.getCheckedKeys())
    },
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.push({ menuId: 0, menuName: '根目录', children: [], parentId: null })
      data.forEach(item => {
        delete item.children
      })
      const map = {}
      data.forEach(item => {
        map[item.menuId] = item
      })
      data.forEach(item => {
        const parent = map[item.parentId]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container{
    width: 100%;
    // height: 70vh;
    // border: 1px solid #f6f6f6;
}
.toolbar{
    padding: 10px;
}
.menu-tree{
    padding: 10px;
    // height: 55vh;
}
</style>
