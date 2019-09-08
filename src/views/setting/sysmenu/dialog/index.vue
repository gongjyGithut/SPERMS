<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false">
      <el-form ref="dialogForm" :model="dialogFormData" label-width="80px" label-position="left">
        <el-form-item label="菜单名" prop="menuName">

          <el-input
            v-model="dialogFormData.menuName"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="菜单URL" prop="menuUrl">

          <el-input
            v-model="dialogFormData.menuUrl"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="图标名" prop="menuIcon">

          <el-input
            v-model="dialogFormData.menuIcon"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="所属菜单" prop="menuIcon">

          <el-cascader
            ref="cascaderTree"
            :options="options"
            :props="props"
            :show-all-levels="false"
            v-model="parentId"
            @change="handleChange"/>

        </el-form-item>

        <el-form-item label="状态" prop="menuStatus">

          <el-radio-group v-model="dialogFormData.menuStatus">
            <el-radio :label="0" >停用</el-radio>
            <el-radio :label="1" >启用</el-radio>
          </el-radio-group>

        </el-form-item>

        <el-form-item label="备注" prop="menuRemark">

          <el-input
            v-model="dialogFormData.menuRemark"
            placeholder=""/>

        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSysmenu, updataSysmenu } from '@/api/setting/sysmenu'
import { getSysmenuAllList } from '@/api/setting/sysmenu'
export default {
  name: 'FormDialog',
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogFormData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // parentId: [1],
      props: {
        label: 'menuName',
        value: 'menuId',
        checkStrictly: true
      },
      options: []
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$emit('update:isdialogShow', val)
      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    },
    parentId: {
      get() {
        return this.getPathByKey(this.dialogFormData.parentId, 'menuId', this.options)
      },
      set(val) {}
    },
    oldParentId() {
      return this.dialogFormData.parentId
    }

  },
  created() {
    this.getAllMenuList()
    console.log(this.dialogFormData)
  },
  methods: {
    getAllMenuList() {
      getSysmenuAllList().then(res => {
        this.options = this.toTree(res.records)
      })
    },
    handleSubmit() {
      const Parmas = Object.assign({}, this.dialogFormData)
      delete Parmas.parentId
      Parmas.parentId = this.$refs.cascaderTree.getCheckedNodes(true)[0].value
      // if (Parmas.parentId === +this.oldParentId) {
      //   this.$message.error('不能选择自己为父节点菜单')
      //   return false
      // }
      console.log(Parmas)
      if (this.submitStatus === 'add') {
        addSysmenu(Parmas).then(res => {
          this.$message.success('添加成功')
        })
      } else {
        updataSysmenu(Parmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    },
    handleReset() {
      console.log(this.$refs.dialogForm)
      this.$refs.dialogForm.resetFields()
    },
    handleChange(value) {
      console.log(value)
    },
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.push({ menuId: 0, menuName: '根目录', parentId: null })
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
    },
    getPathByKey(value, key, arr) {
      const temppath = []
      try {
        // eslint-disable-next-line no-inner-declarations
        function getNodePath(node) {
          temppath.push(node.menuId)
          // 找到符合条件的节点，通过throw终止掉递归
          if (node[key] === value) {
            // eslint-disable-next-line no-throw-literal
            throw ('GOT IT!')
          }
          if (node.children && node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
              getNodePath(node.children[i])
            }

            // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
            temppath.pop()
          } else {
            // 找到叶子节点时，删除路径当中的该叶子节点
            temppath.pop()
          }
        }
        for (let i = 0; i < arr.length; i++) {
          getNodePath(arr[i])
        }
      } catch (e) {
        return temppath
      }
    }
  }
}
</script>
