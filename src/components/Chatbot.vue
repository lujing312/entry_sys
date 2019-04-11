<template>
  <div class="main">
    <el-header class="breadcrumb-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta"
          :key="index"
          :to="{path:item.path}"
        >{{item.text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-select v-model="selectedLevel" placeholder="请选择等级">
      <el-option
        v-for="item in levelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button-group>
      <el-button
        type="primary"
        @click="handleAdd">新增</el-button>
      <el-button
        type="primary"
        @click="handleCopyLevel">从其他等级复制</el-button>
    </el-button-group>
    <el-tree
      ref="chatbotTree"
      :data="chatbotList"
      node-key="id"
      :props="chatbotProps"
      default-expand-all
      lazy
      :load="lazyLoadNode"
      :expand-on-click-node="false">
      <span :class="[{'tree-node-normal': node.data.type===1, 'tree-node-fork': node.data.type===3}  ,'tree-node']" slot-scope="{node, data}">
        <span v-if="node.data.contentType===1&&node.data.type===1">{{node.label}}</span>
        <span v-if="node.data.contentType===1&&node.data.type===3">
          <span>【第{{node.level}}层第{{node.data.index}}个选项】</span>
          <span class="tree-node-text">{{node.label}}</span>
          <span>({{node.data.id}})</span>
        </span>
        <img v-if="node.data.contentType===2" :src="node.label" width="90" height="50">
        <span class="tree-node-op">
          <el-button
            v-if="node.data.type===3"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            circle
            @click="() => handleAddItem(data)" />
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="() => handleUpdateItem(data)" />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="() => handleRemoveItem(node, data)" />
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="新增/编辑"
      width="500px"
      class="add-form"
      :visible.sync="showAddForm"
      @close="() => {
        this.$refs['addForm'].resetFields()
      }"
    >
      <el-form
        :model="addForm"
        ref="addForm">
        <el-form-item
          prop="type"
          :rules="{
            required: true,
            trigger: 'change',
            message: '请选择节点类型'
          }">
          <el-select
            v-model="addForm.type"
            @change="handleChangeType"
            placeholder="请选择节点类型">
            <el-option label="图文" :value="1"/>
            <el-option label="选项" :value="3"/>
            <el-option label="从已有节点复制" :value="-1"/>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="contentType"
          v-if="addForm.type===1"
          :rules="{
            required: true,
            trigger: 'change',
            message: '请选择图文类型'
          }">
          <el-select
            v-model="addForm.contentType"
            @change="handleChangeContentType"
            placeholder="请选择图文类型">
            <el-option label="文字" :value="1"/>
            <el-option label="图片" :value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addForm.type===1&&addForm.contentType===1"
          prop="content"
          :rules="{
            required: true,
            trigger: 'blur',
            message: '请输入一段文字'
          }">
          <el-input
            v-model.trim="addForm.content"
            type="textarea"
            :autosize="{minRows:2}"
            placeholder="请输入一段文字"
          />
        </el-form-item>
        <el-form-item
          v-if="addForm.type===1&&addForm.contentType===2"
          class="img-card"
        >
          <el-upload
            list-type="picture-card"
            :action="uploadPicUrl"
            :multiple="false"
            :limit="1"
            :file-list="addForm.contentType === 2 && addForm.content !== '' ? [{name: '', url: addForm.content}] : []"
            :on-success="handelUploadSuccess"
            :on-remove="handleRemovePic"
            :on-exceed="handleUploadExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-if="addForm.type===3"
          prop="content"
          :rules="{
            required: true,
            trigger: 'blur',
            message: '请输入选项标题'
          }">
          <el-input
            v-model.trim="addForm.content"
            type="textarea"
            :autosize="{minRows:2}"
            placeholder="请输入选项标题"
          />
        </el-form-item>
        <el-form-item
         v-if="addForm.type===-1"
         prop="copyNodeId"
         :rules="{
           required: true,
           trigger: 'change',
           message: '请选择被复制节点'
         }">
            <el-select style="width:100%;" v-model="addForm.copyNodeId" filterable clearable placeholder="请选择被复制节点">
              <el-option
                v-for="item in copyNodeList"
                :key="item.id"
                :label="'(' + item.id + ')' + item.content"
                :value="item.id" />
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitAdd"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择被复制的等级"
      width="400px"
      class="copy-level-form"
      :visible.sync="showCopyLevelForm"
      @close="handleResetCopyLevelForm">
      <el-select v-model="selectedCopyLevel" placeholder="请选择被复制的等级">
        <el-option
          v-for="item in levelOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          :disabled="item.id===selectedLevel">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitCopyLevel"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRsInterval,
  getChatbotList,
  addChatbotItem,
  updateChatbotItem,
  deleteChatbotItem,
  getChatbotCopyList,
  copyChatbotNode,
  copyChatbotLevel
} from '../server'
import {
  uploadPic
} from '../server/config'
export default {
  name: 'PhenoChatbot',
  data () {
    return {
      phenotypeId: '',
      levelOptions: [],
      selectedLevel: '',
      chatbotList: [],
      chatbotProps: {
        label: 'content'
      },
      isEdit: false,
      showAddForm: false,
      addForm: {
        id: '',
        type: '',
        content: '',
        contentType: '',
        copyNodeId: ''
      },
      uploadPicUrl: uploadPic,
      copyNodeList: [],
      showCopyLevelForm: false,
      selectedCopyLevel: ''
    }
  },
  mounted () {
    this.phenotypeId = this.$route.params.id
    this.getLevelList()
    this.getChatbotList()
  },
  methods: {
    getLevelList () {
      getRsInterval({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.levelOptions = res.data || []
        }
      })
    },
    getChatbotList () {
      getChatbotList({
        levelId: this.selectedLevel,
        pid: 0
      }).then(res => {
        if (!res.status && res.data) {
          let index = 1
          let list = res.data.map(item => {
            if (item.type === 3) {
              item.index = index++
            }
            return item
          })
          this.chatbotList = list
        }
      })
    },
    getChatbotCopyList () {
      getChatbotCopyList({
        levelId: this.selectedLevel
      }).then(res => {
        if (!res.status) {
          this.copyNodeList = res.data || []
        }
      })
    },
    lazyLoadNode (node, resolve) {
      if (node.data.type === 3) {
        getChatbotList({
          levelId: this.selectedLevel,
          pid: node.data.id
        }).then(res => {
          if (!res.status && res.data) {
            let index = 1
            let list = res.data.map(item => {
              if (item.type === 3) {
                item.index = index++
              }
              return item
            })
            resolve(list)
          } else {
            resolve([])
          }
        })
      } else {
        setTimeout(function () {
          resolve([])
        }, 300)
      }
    },
    handleAdd () {
      if (!this.selectedLevel) {
        this.$message({
          message: '请选择等级',
          type: 'error',
          duration: 5000
        })
        return
      }
      this.handleResetAddForm()
      this.isEdit = false
      this.showAddForm = true
    },
    handleAddItem (data) {
      this.handleResetAddForm()
      this.isEdit = false
      this.showAddForm = true
      // 缓存父级id，新增子级时使用
      this.addForm.id = data.id
    },
    handleResetAddForm () {
      this.addForm.id = ''
      this.addForm.type = ''
      this.addForm.content = ''
      this.addForm.contentType = ''
      this.showAddForm = false
      this.$refs['addForm'] && this.$refs['addForm'].resetFields()
    },
    handleUpdateItem (data) {
      this.addForm = Object.assign({}, data)
      this.isEdit = true
      this.showAddForm = true
    },
    handleSubmitAdd () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          // 如果是图片，且图片为空，提示
          if (this.addForm.type === 1 &&
            this.addForm.contentType === 2 &&
            this.addForm.content === '') {
            this.$message({
              message: '请上传图片',
              type: 'error',
              duration: 5000
            })
            return
          }
          if (this.addForm.type !== -1) {
            let newChild = {
              type: this.addForm.type,
              content: this.addForm.content,
              contentType: this.addForm.type === 1 ? this.addForm.contentType : 1
            }
            if (this.isEdit) {
              updateChatbotItem({
                levelId: this.selectedLevel,
                id: this.addForm.id,
                ...newChild
              }).then(res => {
                if (!res.status) {
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  })
                  // 刷新列表
                  this.getChatbotList()
                  // 重置表单
                  this.handleResetAddForm()
                } else {
                  this.$message({
                    message: '更新失败',
                    type: 'error',
                    duration: 5000
                  })
                }
              })
            } else {
              addChatbotItem({
                levelId: this.selectedLevel,
                pid: this.addForm.id,
                ...newChild
              }).then(res => {
                if (!res.status) {
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                  // 刷新列表
                  this.getChatbotList()
                  // 重置表单
                  this.handleResetAddForm()
                } else {
                  this.$message({
                    message: '新增失败',
                    type: 'error',
                    duration: 5000
                  })
                }
              })
            }
          } else {
            copyChatbotNode({
              targetNodeId: this.addForm.id,
              sourceNodeId: this.addForm.copyNodeId
            }).then(res => {
              if (!res.staus) {
                this.$message({
                  message: '复制节点成功',
                  type: 'success'
                })
                // 刷新列表
                this.getChatbotList()
                // 重置表单
                this.handleResetAddForm()
              } else {
                this.$message({
                  message: res.msg || '复制节点失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleRemoveItem (node, data) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteChatbotItem({
          levelId: this.selectedLevel,
          id: data.id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新列表
            this.getChatbotList()
          } else {
            this.$message({
              message: res.msg || '删除失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      })
    },
    handelUploadSuccess (res) {
      if (!res.status) {
        this.addForm.content = res.data.imgurl
      } else {
        this.addForm.content = ''
        this.$message({
          message: '上传图片失败，请稍后重试',
          type: 'error',
          duration: 5000
        })
      }
    },
    handleRemovePic () {
      this.addForm.content = ''
    },
    handleUploadExceed () {
      this.$message({
        message: '最多上传1张图片，如要替换，请先删除当前图片',
        type: 'error',
        duration: 5000
      })
    },
    handleChangeType (value) {
      this.addForm.content = ''
      this.addForm.copyNodeId = ''
      // 如果选择复制，请求数据
      if (value === -1) {
        this.getChatbotCopyList()
      }
    },
    handleChangeContentType () {
      this.addForm.content = ''
    },
    handleCopyLevel () {
      if (!this.selectedLevel) {
        this.$message({
          message: '请选择等级',
          type: 'error',
          duration: 5000
        })
        return
      }
      this.showCopyLevelForm = true
    },
    handleResetCopyLevelForm () {
      this.selectedCopyLevel = ''
      this.showCopyLevelForm = false
    },
    handleSubmitCopyLevel () {
      if (!this.selectedCopyLevel) {
        this.$message({
          message: '请选择被复制的等级',
          type: 'error',
          duration: 5000
        })
        return
      }
      copyChatbotLevel({
        targetLevelId: this.selectedLevel,
        sourceLevelId: this.selectedCopyLevel
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '复制成功!'
          })
          // 刷新列表
          this.getChatbotList()
          // 重置
          this.handleResetCopyLevelForm()
        } else {
          this.$message({
            message: res.msg || '复制失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    }
  },
  watch: {
    'selectedLevel': function (levelId) {
      this.getChatbotList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tree {
  margin-top: 20px;
}
.el-tree >>> .el-tree-node__content {
  height: auto;
}
.breadcrumb-header {
  height: auto!important;
  margin: 20px 0;
  padding-left: 0;
}
.tree-node {
  display: flex;
  align-items: center;
  padding: 10px;
}
.tree-node-normal {
  background-color: #f0ffe8;
}
.tree-node-fork {
  background-color: #e8f3ff;
}
.tree-node-text {
  font-weight: 700;
  line-height: 24px;
}
.tree-node .tree-node-op {
  margin-left: 10px;
  width: 300px;
}
.el-tree >>> .el-tree-node {
  white-space: initial;
}
.el-tree >>> .el-tree-node__content {
  margin-bottom: 10px
}
.add-form >>> .el-dialog__body {
  padding: 10px;
}
</style>
