<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta"
          :key="index"
          :to="{path:item.path}"
        >{{item.text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-menu
      mode="horizontal"
      :default-active="groupIndex"
      @select="handleSelectGroup"
    >
      <el-menu-item
        v-for="(item, index) in groupList"
        :key="index"
        :index="index.toString()"
      >{{item.name}}</el-menu-item>
      <div class="global-op el-menu-item">
        <el-dropdown
          v-if="levelList.length>0"
          trigger="click"
          @command="handlePreviewArticle"
        >
          <el-button size="small" type="primary">预览</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in levelList"
              :key="index"
              :command="item"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button
          type="warning"
          @click="handleReviewArticle()"
        >审核</el-button> -->
      </div>
    </el-menu>
    <el-row>
      <el-col :span="5">
        <el-header class="list-title">图文列表</el-header>
        <el-main class="list-wrap">
          <el-card
            v-for="(item, index) in articleList"
            :key="index"
            class="list-item"
            :class="item.active ? 'list-item-active' : ''"
            shadow="hover"
            @click.native="handleSelectItem(index, item.id)"
          >
            <p>{{item.name}}</p>
            <div
              class="level-item"
              v-if="item.active&&item.type===2"
            >
              <el-card
                v-for="(level, idx) in item.levelList"
                :key="idx"
                :class="level.active ? 'list-item-active' : ''"
                @click.native="handleSelectLevelItem(index, item.id, idx, level.id)"
              >
                <p>{{level.name}}</p>
              </el-card>
            </div>
            <div v-if="item.active" class="list-op">
              <el-button
                size="small"
                icon="el-icon-caret-top"
                circle
                :disabled="index===0"
                @click="handleRankArticle(index, 'up')"
              />
              <el-button
                size="small"
                icon="el-icon-caret-bottom"
                circle
                :disabled="index===articleList.length-1"
                @click="handleRankArticle(index, 'down')"
              />
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDeleteArticle(index)"
              />
            </div>
          </el-card>
          <el-card
            class="list-item list-add-btn"
            shadow="hover"
            @click.native="handleShowAddForm"
          >+</el-card>
        </el-main>
      </el-col>
      <el-col
        class="form-wrap"
        v-if="showArticleForm"
      >
        <el-form
          :model="articleForm"
          ref="articleForm"
          label-width="80px"
        >
          <el-form-item
            label="标题"
            class="title-card"
          >
            <el-input
              v-model.trim="articleForm.name"
              auto-complete="off"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-card
            v-for="(item, index) in articleForm.contentList"
            :key="index"
            class="item-card"
            shadow="hover"
          >
            <el-form-item
              v-if="item.type==1"
              label="图片"
              class="img-card"
            >
              <el-upload
                list-type="picture-card"
                :action="uploadPicUrl"
                :multiple="false"
                :limit="1"
                :file-list="item.content ? [{name: '', url: item.content}] : []"
                :on-success="(res) => {handelUploadSuccess(index, res)}"
                :on-remove="() => {handleRemovePic(index)}"
                :on-exceed="handleUploadExceed"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item
              v-if="item.type==2"
              label="小标题"
              class="text-card"
            >
              <el-input
                type="textarea"
                v-model.trim="item.content"
                auto-complete="off"
                placeholder="请输入小标题"
                :autosize="{minRows: 2}"
              />
            </el-form-item>
            <el-form-item
              v-if="item.type==3"
              label="普通文字"
              class="text-card"
            >
              <el-input
                type="textarea"
                v-model.trim="item.content"
                auto-complete="off"
                placeholder="请输入内容"
                :autosize="{minRows: 2}"
              />
            </el-form-item>
            <div class="item-card-op">
              <el-button
                size="small"
                icon="el-icon-caret-top"
                circle
                :disabled="index===0"
                @click="handleRankArticleItem(index, 'up')"
              />
              <el-button
                size="small"
                icon="el-icon-caret-bottom"
                circle
                :disabled="index===articleForm.contentList.length-1"
                @click="handleRankArticleItem(index, 'down')"
              />
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                circle
                @click="handleShowAddItem(index)"
              />
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                @click="handleDeleteArticleItem(index)"
              />
            </div>
          </el-card>
          <div
            v-if="articleForm.contentList.length===0"
            class="item-card item-btns"
          >
            <el-button
              type="primary"
              @click="handleShowAddItem"
            >增加图文</el-button>
          </div>
          <div
            v-if="articleForm.contentList.length>0"
            class="item-card item-btns"
          >
            <el-button
              type="primary"
              @click="handleUpdateArticle()"
            >保存</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <!-- 选择图文弹窗 -->
    <el-dialog
      title="录入图文"
      width="500px"
      :visible.sync="showAddForm"
      @close="handleResetAddForm"
    >
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item label="标题">
          <el-input
            v-model.trim="addForm.name"
            auto-complete="off"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item label="是否区分等级" prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio label="1" border>不区分</el-radio>
            <el-radio label="2" border>区分</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleAddArticle"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增图片元素弹窗 -->
    <el-dialog
      title="请选择图文类型"
      width="400px"
      :visible.sync="showAddItem"
      @close="handleResetAddItem"
    >
      <el-radio-group v-model="addItemType">
        <el-radio label="3" border>普通文字</el-radio>
        <el-radio label="2" border>小标题</el-radio>
        <el-radio label="1" border>图片</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleAddArticleItem"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="preview-dialog"
      title="预览图文"
      width="375px"
      :visible.sync="showPreviewArticle"
    >
      <div class="pd-head-wrap">
        <img :src="previewArticleInfo.phenotypeInfo.imgUrl" />
        <div class="pd-pheno-name">{{previewArticleInfo.phenotypeInfo.name}}</div>
        <div class="pd-level-name">{{previewArticleInfo.levelInfo.name}}</div>
        <div class="pd-level-slogan">{{previewArticleInfo.levelInfo.slogan}}</div>
        <div class="pd-level-tag">{{previewArticleInfo.levelInfo.tag}}</div>
      </div>
      <div
        class="pd-list"
        v-for="(gItem, gIdx) in previewArticleInfo.groupList"
        :key="gIdx"
      >
        <h2 class="pd-group-name">{{gItem.groupName}}</h2>
        <div
          class="pd-article-item"
          v-for="(aItem, aIdx) in gItem.articleList"
          :key="aIdx"
        >
          <h3 class="pd-article-title">{{aItem.name}}</h3>
          <div
            class="pd-article-list"
            v-for="(cItem, cIdx) in aItem.contentList"
            :key="cIdx"
          >
            <div v-if="cItem.type===1" class="pd-article-img-item">
              <img :src="cItem.content" />
            </div>
            <div v-if="cItem.type===2" class="pd-article-subtitle-item">
              <h4>{{cItem.content}}</h4>
            </div>
            <div v-if="cItem.type===3" class="pd-article-para-item">
              <p>{{cItem.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getPhenoGroup,
  getPhenoArticle,
  addArticle,
  updateArticle,
  rankArticle,
  deleteArticle,
  getPreviewArtcle,
  getPhenoInfo
} from '../server'
import {
  moveArray
} from '../common/utils'
import {
  uploadPic
} from '../server/config'
export default {
  name: 'Report',
  data () {
    return {
      articleGroupList: [],
      groupIndex: '0',
      groupList: [],
      articleList: [],
      showArticleForm: false,
      showAddForm: false,
      addForm: {
        type: '1',
        name: ''
      },
      articleForm: {
        name: '',
        contentList: []
      },
      showAddItem: false,
      addItemIndex: -1,
      addItemType: '3',
      uploadPicUrl: uploadPic,
      showPreviewArticle: false,
      previewArticleInfo: {
        phenotypeInfo: {},
        levelInfo: {},
        groupList: []
      },
      levelList: []
    }
  },
  mounted () {
    this.phenotypeId = this.$route.params.id
    this.getPhenoGroup()
    this.getPhenoInfo()
  },
  methods: {
    getPhenoInfo () {
      getPhenoInfo({
        id: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.levelList = (res.data && res.data.level) || []
        } else {
          this.$message.error('获取等级失败，请稍后重试')
        }
      })
    },
    getPhenoGroup () {
      getPhenoGroup({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.articleGroupList = res.data || []
          this.groupList = this.articleGroupList.map(item => {
            return {
              id: item.groupId,
              name: item.groupName
            }
          })
          this.getArticleList()
        }
      })
    },
    getArticleList () {
      this.articleList = (this.articleGroupList[this.groupIndex] &&
          Object.assign([], this.articleGroupList[this.groupIndex].articleList)) || []
    },
    getPhenoArticle (id, levelId) {
      getPhenoArticle({
        id: id,
        levelId: levelId
      }).then(res => {
        if (!res.status) {
          this.articleForm = res.data
          // 显示 form
          this.showArticleForm = true
        }
      })
    },
    handleSelectGroup (index) {
      this.groupIndex = index
      this.showArticleForm = false
      this.getArticleList()
    },
    handleSelectItem (index, id) {
      this.articleList = this.articleList.map(item => {
        item.active = false
        return item
      })
      let curActiveItem = this.articleList[index]
      curActiveItem.active = true
      this.articleForm = {
        name: '',
        contentList: []
      }
      // 如果不区分等级，请求图文数据
      if (curActiveItem.type === 1) {
        this.getPhenoArticle(id)
      }
    },
    handleSelectLevelItem (parentIndex, parentId, index, id) {
      this.articleList[parentIndex].levelList.map(item => {
        item.active = false
        return item
      })
      this.articleList[parentIndex].levelList[index].active = true
      this.getPhenoArticle(parentId, id)
    },
    handleRankArticle (index, type) {
      let articleList = moveArray(this.articleList, index, type)
      let ids = articleList.map(item => {
        return item.id
      })
      // 请求
      rankArticle({ids}).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '图文排序成功'
          })
          // 重置表单
          this.handleResetAddForm()
          // 更新列表
          this.getPhenoGroup()
        } else {
          this.$message({
            message: res.msg || '图文排序失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleShowAddForm () {
      this.handleResetAddForm()
      this.showAddForm = true
    },
    handleResetAddForm () {
      // 重置表单
      this.addForm.type = '1'
      this.addForm.name = ''
      this.showAddForm = false
      this.showArticleForm = false
    },
    handleAddArticle () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          addArticle({
            groupId: this.groupList[this.groupIndex].id,
            phenotypeId: this.phenotypeId,
            name: this.addForm.name,
            type: this.addForm.type
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '图文新增成功'
              })
              this.handleResetAddForm()
              // 更新列表
              this.getPhenoGroup()
            } else {
              this.$message({
                message: res.msg || '图文新增失败',
                type: 'error',
                duration: 5000
              })
            }
          })
        }
      })
    },
    handleRankArticleItem (index, type) {
      if (typeof index === 'number' && typeof type === 'string') {
        moveArray(this.articleForm.contentList, index, type)
      }
    },
    handleShowAddItem (index) {
      this.handleResetAddItem()
      this.addItemIndex = index
      this.showAddItem = true
    },
    handleResetAddItem () {
      this.addItemIndex = -1
      this.addItemType = '3'
    },
    handleAddArticleItem () {
      this.showAddItem = false
      this.articleForm.contentList.splice(this.addItemIndex + 1, 0, {
        type: this.addItemType,
        content: ''
      })
    },
    handleDeleteArticleItem (index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.articleForm.contentList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleUpdateArticle () {
      this.$refs['articleForm'].validate(valid => {
        if (valid) {
          updateArticle({
            id: this.articleForm.id,
            levelId: this.articleForm.levelId,
            name: this.articleForm.name,
            contentList: this.articleForm.contentList
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '图文修改成功'
              })
              // this.showArticleForm = false
              // 更新列表
              this.getPhenoGroup()
            } else {
              this.$message({
                message: res.msg || '图文修改失败',
                type: 'error',
                duration: 5000
              })
            }
          })
        }
      })
    },
    handleDeleteArticle (index) {
      this.$confirm('此操作将删除当前编辑图文下所有信息，请谨慎操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteArticle({
          id: this.articleList[index].id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getPhenoGroup()
          } else {
            this.$message({
              message: res.msg || '删除失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handelUploadSuccess (index, res) {
      if (!res.status) {
        this.articleForm.contentList[index].content = res.data.imgurl
      } else {
        this.$message.error('上传图片失败，请稍后重试')
      }
    },
    handleRemovePic (index) {
      this.articleForm.contentList[index].content = ''
    },
    handleUploadExceed () {
      this.$message({
        message: '最多上传1张图片，如要替换，请先删除当前图片',
        type: 'error',
        duration: 5000
      })
    },
    handlePreviewArticle (levelInfo) {
      let params = {
        phenotypeId: this.phenotypeId
      }
      if (levelInfo) {
        params.levelId = levelInfo.id
      }
      getPreviewArtcle(params).then(res => {
        if (!res.status) {
          this.previewArticleInfo = res.data
          this.previewArticleInfo.levelInfo = levelInfo || {}
          this.showPreviewArticle = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  height: auto!important;
  margin: 20px 0;
  padding-left: 0;
}
.list-wrap {
  padding: 0;
}
.list-title {
  font-weight: 700;
  padding: 0;
}
.list-item {
  cursor: pointer;
  margin-top: 10px;
  min-height: 50px;
}
.list-item .level-item {
  margin-bottom: 10px;
}
.list-item .level-item .el-card {
  margin-bottom: 10px;
}
.list-item-active {
  border: 1px solid #409eff;
}
.list-item >>> .el-card__body {
  padding: 0 15px;
}
.list-op {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}
.list-add-btn {
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
  padding: 10px;
  min-height: 0;
}
.form-wrap {
  margin-top: 20px;
  margin-left: 20px;
  width: 600px;
}
.form-wrap .title-card {
  margin-bottom: 0;
}
.form-wrap .title-card >>> .el-form-item__content {
  margin-bottom: 20px;
}
.item-card {
  margin-bottom: 20px;
}
.item-card >>> .el-card__body {
  padding: 0;
  padding-top: 20px;
  padding-right: 20px;
}
.item-card .item-card-op {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 0;
}
.text-card {
  margin-bottom: 0;
}
.item-btns {
  text-align: right;
}
.global-op {
  float: right!important;
}
.preview-dialog >>> .el-dialog__body {
  padding: 0;
  padding-bottom: 50px;
}
.preview-dialog .pd-head-wrap {
  position: relative;
  margin-bottom: 40px;
}
.preview-dialog .pd-head-wrap img {
  width: 100%;
}
.preview-dialog .pd-pheno-name {
  position: absolute;
  top: 40px;
  left: 20px;
  font-size: 24px;
}
.preview-dialog .pd-level-name {
  position: absolute;
  bottom: 70px;
  right: 50px;
  font-size: 42px;
}
.preview-dialog .pd-level-slogan {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.preview-dialog .pd-level-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 700
}
.preview-dialog .pd-list {
  padding: 0 20px;
}
.preview-dialog .pd-group-name {
  text-align: center;
}
.preview-dialog .pd-article-img-item img {
  width: 100%;
  height: 150px;
}
.preview-dialog .pd-article-para-item p {
  line-height: 20px;
}
</style>
