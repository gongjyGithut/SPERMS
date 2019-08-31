<template>
    <div class="menu-container">
        
        <el-tree
        class="menu-tree"
        :data="menuData"
        show-checkbox
        default-expand-all
        node-key="menuId"
        ref="menutree"
        :props="defaultProps"
        check-on-click-node
        @check="checkChange">
        </el-tree>
    </div>
</template>
<script>
import {getSysmenuAllList} from '@/api/setting/sysmenu'
export default {
    name:'MenuContainer',
    computed: {
        checkNodes:{
            get(){
                return this.$store.state.menu.checkNodes
            },
            set(val){
                this.$emit('updata:checkNodes',val)
            }
            
        }
    },
    data() {
        return {
            menuData:[],
            defaultProps:{
                children: 'children',
                label: 'menuName'
            }
        }
    },
    created() {
        this.getAllMenuList()
        
    },
    watch: {
        checkNodes(newVal){
            this.setCheckNodes(newVal)
        }
    },
    mounted() {

    },
    methods: {
        getAllMenuList(){
            getSysmenuAllList().then(res =>{
                this.menuData = this.toTree(res.records)
            })
        },
        setCheckNodes(checkNodes){
            this.$refs.menutree.setCheckedKeys(checkNodes)
            
        },
        checkChange(clickNode,{checkedKeys,checkedNodes}){
            this.$store.dispatch('setCheckNodes',this.$refs.menutree.getCheckedKeys())
        },
        toTree(data) {
            let result = []
            if(!Array.isArray(data)) {
                return result
            }
            data.forEach(item => {
                delete item.children;
            });
            let map = {};
            data.forEach(item => {
                map[item.menuId] = item;
            });
            data.forEach(item => {
                let parent = map[item.parentId];
                if(parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    result.push(item);
                }
            });
            return result;
        }
    },
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