<template>
  <el-container class="main-container">
    <el-header class="custom-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta"
          :key="index"
          :to="{path:item.path}"
        >{{item.text}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-row class="row-wrap">
      <el-col :span="5" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">分类</el-header>
          <el-main
            class="col-item-wrap"
            v-if="categoryList.length>0">
            <el-card
              v-for="(item, index) in categoryList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectCategory(index, item.id, item.active)">
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditCategory(index)"/>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteCategory(item.id)"/>
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddCategory">新增分类</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col
        v-if="showMedicineList"
        :span="5"
        class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">成分</el-header>
          <el-main
            class="col-item-wrap"
            v-if="medicineList.length>0">
            <el-card
              v-for="(item, index) in medicineList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectMedicine(index, item.id, item.active)">
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  v-if="item.hasRelated"
                  type="warning"
                  size="mini"
                  @click="handleShowProductList"
                  >已关联商品</el-button>
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-refresh"
                  circle
                  @click="handleShowDrugCategory"/>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditMedicine(item.id)"/>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteMedicine(item.id)"/>
              </div>
              <i v-if="item.online==1" class="badge online el-icon-star-on" />
              <i v-if="item.online==0" class="badge offline el-icon-star-on" />
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddMedicine"
            >新增成分</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col v-if="showEffectList" :span="5" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">作用类型</el-header>
          <el-main
            class="col-item-wrap"
            v-if="effectList.length>0">
            <el-card
              v-for="(item, index) in effectList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectEffect(index, item.id, item.active)">
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditEffect(index)"/>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteEffect(item.id)"/>
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddEffect"
            >新增作用类型</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col v-if="showEffectInfo" :span="9" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">
            <div class="col-title-name">详情</div>
            <div class="btn-wrap">
              <el-button
                type="primary"
                size="mini"
                @click="handleAddEffectLevel"
              >新增等级</el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleAddEffectRules(effectInfo.id)"
              >录入规则</el-button>
            </div>
          </el-header>
          <el-main class="col-item-wrap">
            <el-card>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">名称</el-col>
                <el-col :span="20">{{effectInfo.name}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">等级</el-col>
                <el-col :span="20">
                  <div
                    v-for="(level, index) in effectInfo.levelList"
                    :key="level.id"
                    class="col-list-item">
                    <div class="col-level-text">名称：{{level.name}}</div>
                    <div class="col-level-text">建议：{{level.advice}}</div>
                    <div class="col-level-text">建议1：{{level.advice1}}</div>
                    <div class="col-level-op">
                      <el-button
                        size="mini"
                        icon="el-icon-caret-top"
                        circle
                        :disabled="index===0"
                        @click="handleRankEffectLevel(index, 'up')"/>
                      <el-button
                        size="mini"
                        icon="el-icon-caret-bottom"
                        circle
                        :disabled="index===effectInfo.levelList.length-1"
                        @click="handleRankEffectLevel(index, 'down')"/>
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        @click="handleEditEffectLevel(index)"/>
                      <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="handleDeleteEffectLevel(level.id)"/>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <!-- 新增/编辑分类 -->
    <el-dialog
      title="新增/编辑分类"
      width="500px"
      class="category-form"
      :visible.sync="showCategoryForm"
      @close="() => {
        this.$refs['categoryForm'].resetFields()
      }">
      <el-form
        :model="categoryForm"
        :rules="categoryFormRules"
        ref="categoryForm"
        label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="categoryForm.name"
            auto-complete="off"
            placeholder="请输入分类名称"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitCategory"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入/编辑药物成分 -->
    <el-dialog
      title="录入/编辑成分"
      width="700px"
      class="medicine-form"
      :visible.sync="showMedicineForm"
      @close="() => {
        this.$refs['medicineForm'].resetFields()
      }">
      <el-form
        :model="medicineForm"
        :rules="medicineFormRules"
        ref="medicineForm"
        label-width="100px">
        <el-form-item label="是否上线" prop="online">
          <el-radio-group v-model="medicineForm.online">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主要成分" prop="name">
          <el-input
            type="textarea"
            v-model.trim="medicineForm.name"
            auto-complete="off"
            placeholder="请输入药物主要成分"
            :autosize="{minRows: 2}"/>
        </el-form-item>
        <el-form-item
          class="mf-sd-add"
          v-if="medicineForm.scientificDetails.length===0">
          <el-button
            type="primary"
            size="small"
            @click.prevent="handleAddMedicineSD"
          >添加科学细节</el-button>
        </el-form-item>
        <div
          class="mf-sd-wrap"
          v-for="(detail, index) in medicineForm.scientificDetails"
          :key="index">
          <el-form-item
            class="mf-st-item"
            :label="'科学细节' + (index + 1)"
            :prop="'scientificDetails.' + index + '.title'"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请输入标题'
            }">
            <el-input
              v-model="detail.title"
              placeholder="请输入科学细节"/>
          </el-form-item>
          <div class="mf-btn-wrap">
            <el-button
              type="success"
              size="small"
              @click.prevent="handleShowMedicineSD(index)"
            >详细内容</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click.prevent="handleAddMedicineSD"/>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.prevent="handleRemoveMedicineSD(index)"/>
          </div>
        </div>
        <el-form-item
          class="references-add"
          v-if="medicineForm.references.length===0">
          <el-button
            type="primary"
            size="small"
            @click.prevent="handleAddMedicineReferences"
          >添加参考文献</el-button>
        </el-form-item>
        <div
          v-for="(references, index) in medicineForm.references"
          :key="index">
          <el-form-item
            class="references-item"
            :label="'参考文献' + (index + 1)"
            :prop="'references.' + index + '.title'"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请输入标题'
            }">
            <el-input
              v-model="references.title"
              placeholder="请输入标题"/>
          </el-form-item>
          <el-form-item
            class="references-item"
            :prop="'references.' + index + '.link'"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请输入链接'
            }">
            <el-input
              v-model="references.link"
              placeholder="请输入链接"/>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click.prevent="handleAddMedicineReferences"/>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.prevent="handleRemoveMedicineReferences(index)"/>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitMedicine"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑科学细节内容 -->
    <el-dialog
      title="新增/编辑科学细节内容"
      width="500px"
      class="msd-form"
      :visible.sync="showMedicineSDForm"
      @close="() => {
        this.$refs['medicineSDForm'].resetFields()
      }">
      <el-button
        v-if="medicineSDForm.contentList.length===0"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click.prevent="handleAddSDContent"
      >添加一条数据</el-button>
      <el-form
        :model="medicineSDForm"
        ref="medicineSDForm"
        label-width="60px">
        <el-form-item
          v-for="(content, index) in medicineSDForm.contentList"
          :key="index"
          :label="'内容' + (index + 1)"
          :prop="'contentList.' + index + '.value'"
          :rules="{
            required: true,
            trigger: 'blur',
            message: '请输入内容'
          }">
          <el-input
            type="textarea"
            v-model="content.value"
            placeholder="请输入内容"
            :autosize="{minRows:2}"/>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click.prevent="handleAddSDContent"/>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click.prevent="handleRemoveSDContent(index)"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitSDContent"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- "新增/编辑药物作用类型 -->
    <el-dialog
      title="新增/编辑药物作用类型"
      width="500px"
      class="effect-form"
      :visible.sync="showEffectForm"
      @close="() => {
        this.$refs['effectForm'].resetFields()
      }">
      <el-form
        :model="effectForm"
        :rules="effectFormRules"
        ref="effectForm"
        label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="effectForm.name"
            auto-complete="off"
            placeholder="请输入分类名称"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitEffect"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑药物作用类型等级 -->
    <el-dialog
      title="新增/编辑药物作用类型等级"
      width="500px"
      class="effect-form"
      :visible.sync="showEffectLevelForm"
      @close="() => {
        this.$refs['effectLevelForm'].resetFields()
      }">
      <el-form
        :model="effectLevelForm"
        :rules="effectLevelFormRules"
        ref="effectLevelForm"
        label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model.trim="effectLevelForm.name"
            auto-complete="off"
            placeholder="请输入药物名称"/>
        </el-form-item>
        <el-form-item label="建议" prop="advice">
          <el-input
            type="textarea"
            v-model.trim="effectLevelForm.advice"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入药物建议"/>
        </el-form-item>
        <el-form-item label="建议1" prop="advice1">
          <el-input
            type="textarea"
            v-model.trim="effectLevelForm.advice1"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入药物建议"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitEffectLevel"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 显示已关联药物商品 -->
    <el-dialog
      title="已关联药物商品列表"
      width="800px"
      :visible.sync="showProductList">
      <el-table :data="productList">
        <el-table-column prop="barcode" label="条形码" width="130" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="otc" label="处方" width="60" />
        <el-table-column prop="dose" label="剂量" width="100" />
        <el-table-column prop="manufacturer" label="生产企业" />
        <el-table-column prop="expiredate" label="保质期" />
        <el-table-column prop="batchnum" label="国药批次号" />
      </el-table>
    </el-dialog>
    <!-- 修改药物成分分类 -->
    <el-dialog
      title="修改药物成分分类"
      width="400px"
      :visible.sync="showMoveDrugCategory"
      @close="() => {
        this.selectedDrugCategory = ''
      }">
      <el-select
        class="relate-select"
        filterable
        placeholder="请选择分类"
        v-model="selectedDrugCategory">
        <el-option
          v-for="(item, index) in allDrugCategoryList"
          :key="index"
          :label="item.name"
          :value="item.id" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitMoveDrugCategory"
        >确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getDrugCategoryList,
  addDrugCategory,
  updateDrugCategory,
  deleteDrugCategory,
  getDrugMedicineList,
  getDrugMedicineInfo,
  addDrugMedicine,
  updateDrugMedicine,
  deleteDrugMedicine,
  getDrugRelateProductList,
  getDrugEffectList,
  getDrugEffectInfo,
  addDrugEffect,
  updateDrugEffect,
  deleteDrugEffect,
  addDrugEffectLevel,
  updateDrugEffectLevel,
  deleteDrugEffectLevel,
  rankDrugEffectLevel,
  getAllDrugCategoryList,
  moveDrugCategory
} from '../server'
import {
  moveArray
} from '../common/utils'
export default {
  name: 'Drug',
  data () {
    return {
      categoryList: [],
      activeCategoryId: -1,
      showCategoryForm: false,
      isEditCategory: false,
      categoryForm: {
        name: ''
      },
      categoryFormRules: {
        name: [{
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        }]
      },
      showMedicineList: false,
      medicineList: [],
      activeMedicineId: -1,
      showMedicineForm: false,
      isEditMedicine: false,
      medicineForm: {
        online: 0,
        name: '',
        scientificDetails: [],
        references: []
      },
      medicineFormRules: {
        name: [{
          required: true,
          message: '请填写药物药物主要成分',
          trigger: 'blur'
        }]
      },
      showProductList: false,
      productList: [],
      activeMedicineSDIndex: -1,
      showMedicineSDForm: false,
      medicineSDForm: {
        contentList: []
      },
      showEffectList: false,
      effectList: [],
      activeEffectId: -1,
      showEffectForm: false,
      isEditEffect: false,
      effectForm: {
        name: ''
      },
      effectFormRules: {
        name: [{
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        }]
      },
      showEffectInfo: false,
      effectInfo: {
        levelList: []
      },
      showEffectLevelForm: false,
      isEditEffectLevel: false,
      effectLevelForm: {
        name: '',
        advice: '',
        advice1: ''
      },
      effectLevelFormRules: {
        name: [{
          required: true,
          message: '请填写名称',
          trigger: 'blur'
        }],
        advice: [{
          required: true,
          message: '请填写药物建议',
          trigger: 'blur'
        }]
      },
      showMoveDrugCategory: false,
      selectedDrugCategory: '',
      allDrugCategoryList: []
    }
  },
  mounted () {
    let routeParams = this.$route.params
    this.activeCategoryId = parseInt(routeParams.cid, 10) || -1
    this.activeMedicineId = parseInt(routeParams.mid, 10) || -1
    this.activeEffectId = parseInt(routeParams.eid, 10) || -1
    this.getDrugCategoryList()
  },
  methods: {
    getDrugCategoryList () {
      getDrugCategoryList({}).then(res => {
        if (!res.status) {
          this.categoryList = res.data || []
          // 根据路由参数选中
          if (this.activeCategoryId > -1) {
            let cIndex = -1
            this.categoryList.map((item, index) => {
              if (item.id === this.activeCategoryId) {
                cIndex = index
              }
            })
            this.handleSelectCategory(cIndex, this.activeCategoryId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取药物分类列表失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getDrugMedicineList () {
      getDrugMedicineList({
        categoryId: this.activeCategoryId
      }).then(res => {
        if (!res.status) {
          this.medicineList = res.data || []
          this.showMedicineList = true
          // 根据路由参数选中
          if (this.activeMedicineId > -1) {
            let mIndex = -1
            this.medicineList.map((item, index) => {
              if (item.id === this.activeMedicineId) {
                mIndex = index
              }
            })
            this.handleSelectMedicine(mIndex, this.activeMedicineId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取药物成分列表失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getDrugRelateProductList () {
      getDrugRelateProductList({
        drugId: this.activeMedicineId
      }).then(res => {
        if (!res.status) {
          this.productList = res.data || []
          this.showProductList = true
        } else {
          this.$message({
            message: res.msg || '获取药物商品列表失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getDrugEffectList () {
      getDrugEffectList({
        drugId: this.activeMedicineId
      }).then(res => {
        if (!res.status) {
          this.effectList = res.data || []
          this.showEffectList = true
          // 根据路由参数选中
          if (this.activeEffectId > -1) {
            let eIndex = -1
            this.effectList.map((item, index) => {
              if (item.id === this.activeEffectId) {
                eIndex = index
              }
            })
            this.handleSelectEffect(eIndex, this.activeEffectId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取药物作用类型列表失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getDrugEffectInfo () {
      getDrugEffectInfo({
        effectId: this.activeEffectId
      }).then(res => {
        if (!res.status) {
          this.effectInfo = res.data
          this.showEffectInfo = true
        } else {
          this.$message({
            message: res.msg || '获取药物作用类型信息失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleSelectCategory (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.categoryList = this.categoryList.map(item => {
        item.active = false
        return item
      })
      this.activeCategoryId = id
      this.categoryList[index].active = true
      this.showEffectList = false
      this.showEffectInfo = false
      // 更新路由
      this.$router.push({
        name: 'Drug',
        params: {
          cid: this.activeCategoryId
        }
      })
      // 请求药物列表
      this.getDrugMedicineList()
    },
    handleResetCategoryForm () {
      this.$refs['categoryForm'].resetFields()
      this.showCategoryForm = false
      this.showMedicineList = false
      this.showEffectList = false
      this.showEffectInfo = false
    },
    handleAddCategory () {
      this.categoryForm = {
        name: ''
      }
      this.isEditCategory = false
      this.showCategoryForm = true
    },
    handleEditCategory (index) {
      this.categoryForm = Object.assign({}, this.categoryList[index])
      this.isEditCategory = true
      this.showCategoryForm = true
    },
    handleSubmitCategory () {
      this.$refs['categoryForm'].validate(valid => {
        if (valid) {
          if (this.isEditCategory) {
            updateDrugCategory({
              id: this.categoryForm.id,
              name: this.categoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getDrugCategoryList()
                // 重置表单
                this.handleResetCategoryForm()
              } else {
                this.$message({
                  message: res.msg || '分类修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDrugCategory({
              name: this.categoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getDrugCategoryList()
                // 重置表单
                this.handleResetCategoryForm()
              } else {
                this.$message({
                  message: res.msg || '分类新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeleteCategory (id) {
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDrugCategory({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '分类删除成功'
              })
              // 更新列表
              this.getDrugCategoryList()
            } else {
              this.$message({
                message: res.msg || '分类删除失败',
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
    handleSelectMedicine (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.medicineList = this.medicineList.map(item => {
        item.active = false
        return item
      })
      this.activeMedicineId = id
      this.medicineList[index].active = true
      this.showEffectInfo = false
      // 更新路由
      this.$router.push({
        name: 'Drug',
        params: {
          cid: this.activeCategoryId,
          mid: this.activeMedicineId
        }
      })
      // 请求药物作用类型列表
      this.getDrugEffectList()
    },
    handleResetMedicineForm () {
      this.$refs['medicineForm'].resetFields()
      this.showMedicineForm = false
      this.showEffectList = false
      this.showEffectInfo = false
    },
    handleAddMedicine () {
      this.medicineForm = {
        constituent: '',
        scientificDetails: [],
        references: []
      }
      this.isEditMedicine = false
      this.showMedicineForm = true
    },
    handleEditMedicine (id) {
      getDrugMedicineInfo({
        id: id
      }).then(res => {
        if (!res.status) {
          this.medicineForm = Object.assign({}, res.data)
          this.isEditMedicine = true
          this.showMedicineForm = true
        } else {
          this.$message({
            message: res.msg || '获取药物失败，请稍后再试',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleSubmitMedicine () {
      this.$refs['medicineForm'].validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.medicineForm)
          // if (!this.medicineForm.imgUrl) {
          //   this.$message.error('请上传药物头图')
          //   return
          // }
          if (this.isEditMedicine) {
            updateDrugMedicine({
              ...params
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '药物修改成功'
                })
                // 刷新列表
                this.getDrugMedicineList()
                // 重置表单
                this.handleResetMedicineForm()
              } else {
                this.$message({
                  message: res.msg || '药物修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDrugMedicine({
              categoryId: this.activeCategoryId,
              ...params
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '药物新增成功'
                })
                // 刷新列表
                this.getDrugMedicineList()
                // 重置表单
                this.handleResetMedicineForm()
              } else {
                this.$message({
                  message: res.msg || '药物新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeleteMedicine (id) {
      this.$confirm('此操作将删除药物, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDrugMedicine({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '药物删除成功'
              })
              // 更新列表
              this.getDrugMedicineList()
            } else {
              this.$message({
                message: res.msg || '药物删除失败',
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
    handleShowDrugCategory () {
      getAllDrugCategoryList({
        drugId: this.activeMedicineId
      }).then(res => {
        if (!res.status) {
          this.allDrugCategoryList = res.data || []
          this.showMoveDrugCategory = true
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleSubmitMoveDrugCategory () {
      moveDrugCategory({
        id: this.activeMedicineId,
        categoryId: this.selectedDrugCategory
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '修改分类成功'
          })
          this.selectedDrugCategory = ''
          this.showMoveDrugCategory = false
          // 刷新列表
          this.getDrugMedicineList()
        } else {
          this.$message({
            message: res.msg || '修改分类失败',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleShowMedicineSD (index) {
      this.activeMedicineSDIndex = index
      this.medicineSDForm = Object.assign({}, this.medicineForm.scientificDetails[index]) || {
        title: '',
        contentList: []
      }
      this.medicineSDForm.contentList = this.medicineSDForm.contentList.map((item, index) => {
        return {
          index: index,
          value: item
        }
      })
      this.showMedicineSDForm = true
    },
    handleAddSDContent () {
      this.medicineSDForm.contentList.push({
        index: this.medicineSDForm.contentList.length,
        value: ''
      })
    },
    handleRemoveSDContent (index) {
      index > -1 && this.medicineSDForm.contentList.splice(index, 1)
    },
    handleSubmitSDContent () {
      this.$refs['medicineSDForm'].validate(valid => {
        if (valid) {
          this.medicineForm.scientificDetails[this.activeMedicineSDIndex].contentList = this.medicineSDForm.contentList.map(item => {
            return item.value
          })
          this.$refs['medicineSDForm'].resetFields()
          this.showMedicineSDForm = false
        }
      })
    },
    handleAddMedicineSD () {
      this.medicineForm.scientificDetails.push({
        title: '',
        contentList: []
      })
    },
    handleRemoveMedicineSD (index) {
      index > -1 && this.medicineForm.scientificDetails.splice(index, 1)
    },
    handleAddMedicineReferences () {
      this.medicineForm.references.push({
        title: '',
        link: ''
      })
    },
    handleRemoveMedicineReferences (index) {
      index > -1 && this.medicineForm.references.splice(index, 1)
    },
    handleSelectEffect (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.effectList = this.effectList.map(item => {
        item.active = false
        return item
      })
      this.activeEffectId = id
      this.effectList[index].active = true
      // 更新路由
      this.$router.push({
        name: 'Drug',
        params: {
          cid: this.activeCategoryId,
          mid: this.activeMedicineId,
          eid: this.activeEffectId
        }
      })
      // 请求单个药物作用类型信息
      this.getDrugEffectInfo()
    },
    handleResetEffectForm () {
      this.$refs['effectForm'].resetFields()
      this.showEffectForm = false
      this.showEffectInfo = false
    },
    handleAddEffect () {
      this.effectForm = {
        name: ''
      }
      this.isEditEffect = false
      this.showEffectForm = true
    },
    handleEditEffect (index) {
      this.effectForm = Object.assign({}, this.effectList[index])
      this.isEditEffect = true
      this.showEffectForm = true
    },
    handleSubmitEffect () {
      this.$refs['effectForm'].validate(valid => {
        if (valid) {
          if (this.isEditEffect) {
            updateDrugEffect({
              id: this.effectForm.id,
              name: this.effectForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '药物作用类型修改成功'
                })
                // 刷新列表
                this.getDrugEffectList()
                // 重置表单
                this.handleResetEffectForm()
              } else {
                this.$message({
                  message: res.msg || '药物作用类型修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDrugEffect({
              drugId: this.activeMedicineId,
              name: this.effectForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '药物作用类型新增成功'
                })
                // 刷新列表
                this.getDrugEffectList()
                // 重置表单
                this.handleResetEffectForm()
              } else {
                this.$message({
                  message: res.msg || '药物作用类型新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeleteEffect (id) {
      this.$confirm('此操作将删除药物作用类型, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDrugEffect({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '药物作用类型删除成功'
              })
              // 更新列表
              this.getDrugEffectList()
            } else {
              this.$message({
                message: res.msg || '药物作用类型删除失败',
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
    handleShowProductList () {
      this.getDrugRelateProductList()
    },
    handleAddEffectLevel () {
      this.effectLevelForm = {
        name: '',
        advice: ''
      }
      this.isEditEffectLevel = false
      this.showEffectLevelForm = true
    },
    handleAddEffectRules (id) {
      if (this.effectInfo.levelList.length > 0) {
        this.$router.push('/drugRules/' + id)
      } else {
        this.$message({
          message: '请先录入等级',
          type: 'error',
          duration: 5000
        })
      }
    },
    handleResetEffectLevelForm () {
      this.$refs['effectLevelForm'].resetFields()
      this.showEffectLevelForm = false
    },
    handleRankEffectLevel (index, type) {
      let levelList = this.effectInfo.levelList.map(item => {
        return item.id
      })
      // 移动数组
      levelList = moveArray(levelList, index, type)
      // 请求
      rankDrugEffectLevel({
        ids: levelList
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '等级排序成功'
          })
          // 刷新
          this.getDrugEffectInfo()
        } else {
          this.$message({
            message: res.msg || '等级排序失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleEditEffectLevel (index) {
      this.effectLevelForm = Object.assign({}, this.effectInfo.levelList[index])
      this.isEditEffectLevel = true
      this.showEffectLevelForm = true
    },
    handleSubmitEffectLevel () {
      this.$refs['effectLevelForm'].validate(valid => {
        if (valid) {
          if (this.isEditEffectLevel) {
            updateDrugEffectLevel({
              ...this.effectLevelForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '等级修改成功'
                })
                // 刷新数据
                this.getDrugEffectInfo()
                // 重置表单
                this.handleResetEffectLevelForm()
              } else {
                this.$message({
                  message: res.msg || '等级修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDrugEffectLevel({
              effectId: this.activeEffectId,
              name: this.effectLevelForm.name,
              advice: this.effectLevelForm.advice
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '等级新增成功'
                })
                // 刷新列表
                this.getDrugEffectInfo()
                // 重置表单
                this.handleResetEffectLevelForm()
              } else {
                this.$message({
                  message: res.msg || '等级新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeleteEffectLevel (id) {
      this.$confirm('此操作将删除等级, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDrugEffectLevel({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '等级删除成功'
              })
              // 更新列表
              this.getDrugEffectInfo()
            } else {
              this.$message({
                message: res.msg || '等级删除失败',
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
    }
  }
}
</script>
<style scoped>
.main-container {
  height: 100%;
}
.custom-header {
  height: auto!important;
  padding: 20px 0;
}
.row-wrap {
  height: 90%;
}
.el-button--mini {
  padding: 8px;
}
.el-button+.el-button {
  margin-left: 6px;
}
.col-item-container {
  border: 1px solid #ebeef5;
  margin-right: 10px;
  max-height: 100%;
}
.col-title {
  height: auto!important;
  padding: 0;
  margin: 10px;
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col-title .col-title-name {
  display: flex;
  align-items: center;
}
.col-item {
  cursor: pointer;
  margin: 8px;
  position: relative;
  font-size: 14px;
}
.col-item-wrap {
  padding: 0;
  height: 100%;
}
.col-item-op {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.col-item .badge {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 12px;
}
.col-item .online.el-icon-star-on {
  color: #67c23a;
}
.col-item .offline.el-icon-star-on {
  color: #f56c6c;
}
.drug-item-op {
  display: none;
}
.col-item:hover .drug-item-op {
  display: flex;
}
.col-item-wrap >>> .el-card__body {
  padding: 0 8px;
}
.col-item-name {
  font-weight: 700;
}
.col-item-row {
  margin: 20px 0;
}
.col-list-item {
  border-bottom: 1px solid #ebeef5;
  position: relative;
  margin-top: 10px;
}
.col-list-item:first-child {
  margin-top: 0;
}
.col-item-active {
  border: 1px solid #409eff;
}
.col-level-text {
  margin-bottom: 10px;
}
.col-list-item:hover .col-level-op {
  display: block;
}
.col-level-op {
  display: none;
  position: absolute;
  top: -8px;
  right: 0;
}
.col-footer {
  padding: 0;
  height: auto!important;
  text-align: center;
  margin: 10px 0;
}
.category-form .el-form-item {
  margin-bottom: 0;
}
.category-form .el-input {
  width: 300px;
}
.medicine-form .mf-sd-add,
.medicine-form .references-add {
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
}
.medicine-form .references-item:first-child {
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
  padding-bottom: 0;
}
.medicine-form .references-item .el-input {
  width: 80%;
}
.medicine-form .medicine-img {
  max-width: 100%
}
.medicine-form .mf-sd-wrap {
  display: flex;
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
}
.medicine-form .mf-st-item {
  width: 65%;
}
.medicine-form .mf-btn-wrap {
  line-height: 40px;
  margin-left: 5px;
}
.msd-form >>> .el-textarea {
  width: 70%;
}
.relate-select {
  width: 100%;
}
</style>
