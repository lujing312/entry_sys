<template>
  <div>
    <el-button type="primary" size="mini" @click="handleAddPmidList" class="add-button">新增+</el-button>
    <el-form
      class="pmid-list"
      :inline="true"
      label-width="100px"
      :model="searchValue"
      ref="searchValue">
        <el-form-item prop="pmid">
          <el-input v-model="searchValue.pmid" placeholder="请输入PMID" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="getPmidSearchList">搜索</el-button>
        </el-form-item>
    </el-form>
    <el-table
      stripe
      :data="searchData"
      style="width: 100%">
      <el-table-column
        width="100px"
        prop="pmid"
        label="pmid">
      </el-table-column>
      <el-table-column
        width="80px"
        prop="population"
        label="pop">
      </el-table-column>
      <el-table-column
        width="80px"
        prop="sampleSize"
        label="sample">
      </el-table-column>
      <el-table-column
        width="60px"
        prop="numStar"
        label="rank">
      </el-table-column>
      <el-table-column
        width="150px"
        prop="comments"
        label="comments">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="title"
        label="title">
      </el-table-column>
      <el-table-column
        label="link"
        :show-overflow-tooltip="true"
        width="180px">
        <template slot-scope="scope">
          <a :href="scope.row.link"
            target="_blank"
            class="buttonText">{{scope.row.link}}</a>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEditPmidList(scope.row)"></el-button>
          <a target="_blank" :href="scope.row.pdfLink" >
            <el-button class="export-button" circle type="success" size="mini" icon="el-icon-share"></el-button>
          </a>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDeletePmidList(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalCount>pageSize"
      class="page-wrap"
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="handlePageChange">
    </el-pagination>
    <!-- 新增列表 -->
    <el-dialog
      title="新增/编辑PMID"
      :visible.sync="addDialogPmidFrom"
      width="35%"
      class="add-form">
      <el-form
        :inline="true"
        :model="updataFrom"
        :rules="updataFromRules"
        ref="updataFrom">
        <el-form-item label="PMID" prop="pmid" width="30%">
          <el-input
            auto-complete="off"
            placeholder="请输入PMID"
            v-model="updataFrom.pmid"></el-input>
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="updataFrom.gender" clearable placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-autocomplete
            v-model.trim="updataFrom.age"
            :fetch-suggestions="querySearch"
            placeholder="请输入age"/>
        </el-form-item>
        <el-form-item label="Population" prop="population">
          <el-autocomplete
            v-model.trim="updataFrom.population"
            :fetch-suggestions="querySearch"
            placeholder="请输入Population"/>
        </el-form-item>
        <el-form-item label="SampleSize" prop="sampleSize">
          <el-autocomplete
            v-model.trim="updataFrom.sampleSize"
            :fetch-suggestions="querySearch"
            placeholder="请输入SampleSize"/>
        </el-form-item>
        <el-form-item class="import">
          <el-upload
            ref="pdfUploaderRef"
            :action="uploadPdfUrl"
            :auto-upload="false"
            :on-success="handleUploadPdfSuccess"
            with-credentials>
            <el-button>导入PDF文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitpdf">上传</el-button>
        </el-form-item>
        <el-form-item prop="pdfLink" class="preview">
          <el-input
            auto-complete="off"
            placeholder="pdf预览链接"
            v-model="updataFrom.pdfLink"></el-input>
            <a target="_blank" :href="updataFrom.pdfLink" >
              <el-button type="primary">预览</el-button>
            </a>
        </el-form-item>
        <el-form-item label="title" prop="title" width="20%">
          <el-input
            auto-complete="off"
            placeholder="请输入title"
            v-model="updataFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="link" prop="link" width="20%">
          <el-input
            auto-complete="off"
            placeholder="请输入link"
            v-model="updataFrom.link"></el-input>
        </el-form-item>
        <el-form-item label="numStar" prop="numStar" width="20%">
          <el-input
            auto-complete="off"
            placeholder="请输入1~10之间数字"
            v-model="updataFrom.numStar"></el-input>
        </el-form-item>
        <el-form-item label="comments" prop="comments">
          <el-input
            class="comments-text"
            type="textarea"
            :autosize="{minRows:2}"
            placeholder="请输入备注"
            v-model="updataFrom.comments"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="handleConfirmButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPmidSearchList,
  deletePmidSearchItem,
  addPmidSearchItem,
  updatePmidSearchItem
} from '../server'
import { uploadPdfUrl } from '../server/config'
export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchData: [],
      checkData: [],
      updataFrom: {
        sampleSize: '',
        population: '',
        age: '',
        gender: '',
        comments: '',
        pmid: '',
        pdfLink: '',
        title: '',
        link: '',
        numStar: ''
      },
      uploadPdfUrl: uploadPdfUrl,
      genderOptions: ['male', 'female', 'both', 'unknown'],
      updataFromRules: {
        pmid: [{
          required: true,
          message: '请输入PMID',
          trigger: 'blur'
        }],
        sampleSize: [{
          required: true,
          message: '请输入sampleSize',
          trigger: 'blur'
        }],
        age: [{
          required: true,
          message: '请输入age',
          trigger: 'blur'
        }],
        gender: [{
          required: true,
          message: '请输入gender',
          trigger: 'blur'
        }],
        rsid: [{
          required: true,
          message: '请输入rsid',
          trigger: 'blur'
        }],
        population: [{
          required: true,
          message: '请输入population',
          trigger: 'blur'
        }]
      },
      searchValue: {
        pmid: ''
      },
      addId: '',
      addDialogPmidFrom: false,
      checkoutDialogPmidForm: false,
      isEditDialogShow: false
    }
  },
  mounted () {
    this.getPmidSearchList()
  },
  methods: {
    getPmidSearchList () {
      getPmidSearchList({
        pageNum: this.pageNum || 1,
        pageSize: this.pageSize,
        pmid: this.searchValue.pmid
      }).then(res => {
        if (!res.status) {
          this.searchData = res.data.list || []
          this.totalCount = res.data.totalCount || 0
        } else {
          this.searchData = []
        }
      })
    },
    handlePageChange (currentPage) {
      this.pageNum = currentPage
      this.getPmidSearchList()
    },
    handleAddPmidList () {
      // 新增按钮
      this.updataFrom = {
        sampleSize: '',
        population: '',
        age: '',
        gender: '',
        comments: '',
        pmid: '',
        pdfLink: '',
        title: '',
        link: '',
        numStar: ''
      }
      this.addDialogPmidFrom = true
      this.isEditDialogShow = false
    },
    handleEditPmidList (row) {
      // 编辑按钮
      this.addDialogPmidFrom = true
      this.updataFrom = Object.assign({}, row)
      this.isEditDialogShow = true
      this.addId = row.id
    },
    handleConfirmButton () {
      this.$refs['updataFrom'].validate(valid => {
        if (valid) {
          this.addDialogPmidFrom = false
          if (this.isEditDialogShow) {
            updatePmidSearchItem({
              ...this.updataFrom
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                // 刷新列表
                this.getPmidSearchList()
              } else {
                this.$message({
                  message: res.msg || '修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addPmidSearchItem({
              ...this.updataFrom
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                // 刷新列表
                this.getPmidSearchList()
              } else {
                this.$message({
                  message: res.msg || '新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeletePmidList (id) {
      if (!id) {
        this.$message.error('id为空，删除失败')
      }
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deletePmidSearchItem({id}).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getPmidSearchList()
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
    querySearch (queryString, callback) {
      let result = [{
        value: 'NONE'
      }, {
        value: 'N/A'
      }]
      var res = queryString ? result.filter(this.createFilter(queryString)) : result
      callback(res)
    },
    createFilter (queryString) {
      return restaurant => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleUploadPdfSuccess (res) {
      if (!res.status) {
        this.updataFrom.pdfLink = res.data.imgurl
        this.$message({
          message: '导入成功',
          type: 'success'
        })
        // 清空文件
        this.$refs.pdfUploaderRef.clearFiles()
        // 刷新进度列表
        this.getPmidSearchList()
      } else {
        this.$message({
          message: '系统错误：' + res.msg,
          type: 'error'
        })
      }
    },
    handleSubmitpdf () {
      // 如果没有添加文件
      if (!this.$refs.pdfUploaderRef.uploadFiles.length) {
        this.$message({
          message: '请选择Pdf文件',
          type: 'error'
        })
        return
      }
      // 上传
      this.$refs.pdfUploaderRef.submit()
    }
  }
}
</script>

<style scoped>

.pmid-list {
  margin: 20px 0;
}
.add-form .el-form-item {
  margin-bottom: 30px;
}
.add-form .el-input {
  width: 300px;
}
.add-form .el-button {
  padding: 8px 18px;
}
.pmid-list .el-input >>>.el-input__inner {
  height: 29px;
}
.el-form-item >>> .el-form-item__label {
  width: 90px;
}
.comments-text {
  width: 300px;
}
.check-form >>> .el-dialog__body {
   padding: 0px 20px 20px 20px;
}
.add-form >>> .el-dialog__body {
  padding: 10px 20px;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.add-button {
  margin-top: 20px;
}
.el-button--mini.is-circle {
  padding: 5px;
}
.export-button {
  padding: 5px;
  font-size: 12px;
}
.import {
  margin-left: 90px;
}
.preview >>> .el-input__inner {
  width: 170px;
  margin-left: 90px;
  height: 33px;
}
.preview >>> .el-input {
  width: 270px;
}
.el-table >>> .el-table__row {
  cursor: pointer;
}
</style>
