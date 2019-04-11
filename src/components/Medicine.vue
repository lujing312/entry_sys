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
      <el-col :span="4" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">一级分类</el-header>
          <el-main
            class="col-item-wrap"
            v-if="firstCategoryList.length>0">
            <el-card
              v-for="(item, index) in firstCategoryList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectFirstCategory(index, item.id, item.active)">
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditFirstCategory(index)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteFirstCategory(item.id)"
                />
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddFirstCategory"
            >新增一级分类</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="4" v-if="showSecondCategoryList" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">二级分类</el-header>
          <el-main class="col-item-wrap">
            <el-card
              v-for="(item, index) in secondCategoryList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectSecondCategory(index, item.id, item.active)">
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditSecondCategory(index)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteSecondCategory(item.id)"
                />
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddSecondCategory"
            >新增二级分类</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="4" v-if="showMedicineNameList" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">通用名称</el-header>
          <el-main class="col-item-wrap">
            <el-card
              v-for="(item, index) in medicineNameList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectMedicineName(index, item.id, item.active)">
              <p>{{item.cnname}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-share"
                  circle
                  @click="handleRelateDrug(index)" />
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditMedicineName(index)" />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteMedicineName(item.id)" />
              </div>
              <i v-if="item.online==1" class="badge online el-icon-star-on" />
              <i v-if="item.online==0" class="badge offline el-icon-star-on" />
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddMedicineName"
            >新增通用名称</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col :span="12" v-if="showProductList" class="col-item-wrap product-list-wrap">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAddProduct">新增商品</el-button>
        <el-table :data="productList">
          <el-table-column prop="barcode" label="条形码" width="130" />
          <el-table-column prop="name" label="名称" width="250" />
          <el-table-column prop="otc" label="处方" width="60" />
          <el-table-column prop="dose" label="剂量" width="100" />
          <el-table-column prop="manufacturer" label="生产企业" width="250" />
          <el-table-column prop="expiredate" label="保质期" width="100" />
          <el-table-column prop="batchnum" label="国药批次号" width="100" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEditProduct(scope.row)" />
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDeleteProduct(scope.row.id)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 新增/编辑一级分类 -->
    <el-dialog
      title="新增/编辑一级分类"
      width="500px"
      class="category-form"
      :visible.sync="showFirstCategoryForm"
      @close="() => {
        this.$refs['firstCategoryForm'].resetFields()
      }">
      <el-form
        :model="firstCategoryForm"
        :rules="firstCategoryFormRules"
        ref="firstCategoryForm"
        label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="firstCategoryForm.name"
            auto-complete="off"
            placeholder="请输入分类名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitFirstCategory"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑二级分类 -->
    <el-dialog
      title="新增/编辑二级分类"
      width="500px"
      class="category-form"
      :visible.sync="showSecondCategoryForm"
      @close="() => {
        this.$refs['secondCategoryForm'].resetFields()
      }">
      <el-form
        :model="secondCategoryForm"
        :rules="secondCategoryFormRules"
        ref="secondCategoryForm"
        label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="secondCategoryForm.name"
            auto-complete="off"
            placeholder="请输入分类名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitSecondCategory"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入/编辑药物通用名称 -->
    <el-dialog
      title="录入/编辑通用名称"
      width="700px"
      class="medicine-form"
      :visible.sync="showMedicineNameForm"
      @close="() => {
        this.$refs['medicineNameForm'].resetFields()
      }">
      <el-form
        :model="medicineNameForm"
        :rules="medicineNameFormRules"
        ref="medicineNameForm"
        label-width="140px">
        <el-form-item label="是否上线" prop="online">
          <el-radio-group v-model="medicineNameForm.online">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="中文名称" prop="cnname">
          <el-input
            v-model.trim="medicineNameForm.cnname"
            auto-complete="off"
            placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="英文名称" prop="enname">
          <el-input
            v-model.trim="medicineNameForm.enname"
            auto-complete="off"
            placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="主要成分" prop="mainingredient">
          <el-input
            v-model.trim="medicineNameForm.mainingredient"
            auto-complete="off"
            placeholder="请输入主要成分" />
        </el-form-item>
        <el-form-item label="成分" prop="ingredient">
          <el-input
            v-model.trim="medicineNameForm.ingredient"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入成分" />
        </el-form-item>
        <el-form-item label="适应症" prop="indication">
          <el-input
            v-model.trim="medicineNameForm.indication"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入适应症" />
        </el-form-item>
        <el-form-item label="用法用量药" prop="dousage">
          <el-input
            v-model.trim="medicineNameForm.dousage"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入用法用量药" />
        </el-form-item>
        <el-form-item label="注意事项" prop="precaution">
          <el-input
            v-model.trim="medicineNameForm.precaution"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入注意事项" />
        </el-form-item>
        <el-form-item label="禁忌" prop="contraindication">
          <el-input
            v-model.trim="medicineNameForm.contraindication"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入禁忌" />
        </el-form-item>
        <el-form-item label="不良反应" prop="reaction">
          <el-input
            v-model.trim="medicineNameForm.reaction"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入不良反应" />
        </el-form-item>
        <el-form-item label="儿童用药" prop="children">
          <el-input
            v-model.trim="medicineNameForm.children"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入儿童用药" />
        </el-form-item>
        <el-form-item label="老人用药" prop="old">
          <el-input
            v-model.trim="medicineNameForm.old"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入老人用药" />
        </el-form-item>
        <el-form-item label="孕妇及哺乳期用药" prop="pregnant">
          <el-input
            v-model.trim="medicineNameForm.pregnant"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入孕妇及哺乳期用药" />
        </el-form-item>
        <el-form-item label="FDA妊娠分级" prop="fdagrade">
          <el-select
            placeholder="请选择FDA妊娠分级"
            v-model="medicineNameForm.fdagrade">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
            <el-option label="X" value="X" />
          </el-select>
        </el-form-item>
        <el-form-item label="FDA妊娠分级描述" prop="fdadesc">
          <el-input
            v-model.trim="medicineNameForm.fdadesc"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入FDA妊娠分级描述" />
        </el-form-item>
        <el-form-item label="哺乳期分级" prop="lactationgrade">
          <el-input
            v-model.trim="medicineNameForm.lactationgrade"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入哺乳期分级" />
        </el-form-item>
        <el-form-item label="药物相互作用标签" prop="interaction">
          <el-input
            v-model.trim="medicineNameForm.interaction"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入药物相互作用标签" />
        </el-form-item>
        <el-form-item label="药物相互作用描述" prop="interactiondesc">
          <el-input
            v-model.trim="medicineNameForm.interactiondesc"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入药物相互作用描述" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model.trim="medicineNameForm.remark"
            type="textarea"
            :autosize="{minRows: 2}"
            auto-complete="off"
            placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitMedicineName"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入/编辑药物商品 -->
    <el-dialog
      title="录入/编辑商品"
      width="700px"
      class="medicine-form"
      :visible.sync="showProductForm"
      @close="() => {
        this.$refs['productForm'].resetFields()
      }">
      <el-form
        :model="productForm"
        :rules="productFormRules"
        ref="productForm"
        label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model.trim="productForm.name"
            auto-complete="off"
            placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="条形码" prop="barcode">
          <el-input
            v-model.trim="productForm.barcode"
            auto-complete="off"
            placeholder="请输入条形码" />
        </el-form-item>
        <el-form-item label="处方药" prop="otc">
          <el-radio-group v-model="productForm.otc">
            <el-radio label="RX">处方药</el-radio>
            <el-radio label="OTC">非处方药</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生产厂商" prop="manufacturer">
          <el-input
            v-model.trim="productForm.manufacturer"
            type="textarea"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入药物生产厂商" />
        </el-form-item>
        <el-form-item label="剂量" prop="dose">
          <el-input
            v-model.trim="productForm.dose"
            auto-complete="off"
            placeholder="请输入剂量" />
        </el-form-item>
        <el-form-item label="保质期" prop="expiredate">
          <el-input
            v-model.trim="productForm.expiredate"
            auto-complete="off"
            placeholder="请输入保质期" />
        </el-form-item>
        <el-form-item label="国药批号" prop="batchnum">
          <el-input
            v-model.trim="productForm.batchnum"
            auto-complete="off"
            placeholder="请输入国药批号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitProduct"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 关联药物成分 -->
    <el-dialog
      title="关联药物成分"
      width="500px"
      :visible.sync="showRelateDrug"
      @close="() => {
        this.curRelateItem = ''
      }">
      <el-select
        class="relate-select"
        placeholder="请选择成分"
        @change="handleSelectDrug"
        v-model="curRelateItem">
        <el-option
          v-for="(item, index) in drugList"
          :key="index"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled" />
      </el-select>
      <div class="relate-drug-list">
        <el-tag
          v-for="(item, index) in relateDrugList"
          :key="index"
          closable
          @close="handleRemoveRelateDrug(item)">{{item.name}}</el-tag>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitRelateDrug"
        >确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getMedicineFirstCategoryList,
  addMedicineFirstCategory,
  updateMedicineCategory,
  deleteMedicineCategory,
  getMedicineSecondCategoryList,
  addMedicineSecondCategory,
  getMedicineNameList,
  getDrugList,
  getRelateDrugList,
  relateDrug,
  addMedicineName,
  updateMedicineName,
  deleteMedicineName,
  getMedicineProductList,
  addMedicineProduct,
  updateMedicineProduct,
  deleteMedicineProduct
} from '../server'
export default {
  name: 'Medicine',
  data () {
    return {
      firstCategoryList: [],
      activeFirstCategoryId: -1,
      showFirstCategoryForm: false,
      isEditFirstCategory: false,
      firstCategoryForm: {
        name: ''
      },
      firstCategoryFormRules: {
        name: [{
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        }]
      },
      showSecondCategoryList: false,
      secondCategoryList: [],
      activeSecondCategoryId: -1,
      showSecondCategoryForm: false,
      isEditSecondCategory: false,
      secondCategoryForm: {
        name: ''
      },
      secondCategoryFormRules: {
        name: [{
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        }]
      },
      showMedicineNameList: false,
      medicineNameList: [],
      activeMedicineNameId: -1,
      showMedicineNameForm: false,
      isEditMedicineName: false,
      medicineNameForm: {
        online: 0,
        cnname: '',
        enname: '',
        mainingredient: '',
        ingredient: '',
        indication: '',
        dousage: '',
        precaution: '',
        contraindication: '',
        reaction: '',
        children: '',
        old: '',
        pregnant: '',
        fdagrade: '',
        fdadesc: '',
        lactationgrade: '',
        interaction: '',
        interactiondesc: '',
        remark: ''
      },
      medicineNameFormRules: {
        cnname: [{
          required: true,
          message: '请输入中文名称',
          trigger: 'blur'
        }]
      },
      showProductList: false,
      productList: [],
      showProductForm: false,
      isEditProduct: false,
      productForm: {
        name: '',
        barcode: '',
        otc: 0,
        manufacturer: '',
        dose: '',
        expiredate: '',
        batchnum: ''
      },
      productFormRules: {
        name: [{
          required: true,
          message: '请输入药物名称',
          trigger: 'blur'
        }],
        otc: [{
          required: true,
          message: '请选择处方/非处方'
        }],
        barcode: [{
          required: true,
          message: '请输入条形码',
          trigger: 'blur'
        }],
        manufacturer: [{
          required: true,
          message: '请输入药物生产厂商',
          trigger: 'blur'
        }]
      },
      drugList: [],
      showRelateDrug: false,
      relateDrugList: [],
      curRelateItem: ''
    }
  },
  mounted () {
    let routeParams = this.$route.params
    this.activeFirstCategoryId = routeParams.fid ? parseInt(routeParams.fid, 10) : -1
    this.activeSecondCategoryId = routeParams.sid ? parseInt(routeParams.sid, 10) : -1
    this.activeMedicineNameId = routeParams.nid ? parseInt(routeParams.nid, 10) : -1
    this.getMedicineFirstCategoryList()
  },
  methods: {
    getMedicineFirstCategoryList () {
      getMedicineFirstCategoryList({}).then(res => {
        if (!res.status) {
          this.firstCategoryList = res.data || []
          this.showMedicineSecondList = false
          this.showMedicineNameList = false
          this.showProductList = false
          // 根据路由参数选中
          if (this.activeFirstCategoryId > -1) {
            let cIndex = -1
            this.firstCategoryList.map((item, index) => {
              if (item.id === this.activeFirstCategoryId) {
                cIndex = index
              }
            })
            this.handleSelectFirstCategory(cIndex, this.activeFirstCategoryId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getMedicineSecondCategoryList () {
      getMedicineSecondCategoryList({
        firstCategoryId: this.activeFirstCategoryId
      }).then(res => {
        if (!res.status) {
          this.secondCategoryList = res.data || []
          this.showSecondCategoryList = true
          this.showMedicineNameList = false
          this.showProductList = false
          // 根据路由参数选中
          if (this.activeSecondCategoryId > -1) {
            let cIndex = -1
            this.secondCategoryList.map((item, index) => {
              if (item.id === this.activeSecondCategoryId) {
                cIndex = index
              }
            })
            this.handleSelectSecondCategory(cIndex, this.activeSecondCategoryId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getMedicineNameList () {
      getMedicineNameList({
        secondCategoryId: this.activeSecondCategoryId
      }).then(res => {
        if (!res.status) {
          this.medicineNameList = res.data || []
          this.showMedicineNameList = true
          this.showProductList = false
          // 根据路由参数选中
          if (this.activeMedicineNameId > -1) {
            let cIndex = -1
            this.medicineNameList.map((item, index) => {
              if (item.id === this.activeMedicineNameId) {
                cIndex = index
              }
            })
            this.handleSelectMedicineName(cIndex, this.activeMedicineNameId, false)
          }
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getMedicineProductList () {
      getMedicineProductList({
        nameId: this.activeMedicineNameId
      }).then(res => {
        if (!res.status) {
          this.productList = res.data || []
          this.showProductList = true
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getDrugList () {
      getDrugList({}).then(res => {
        if (!res.status) {
          this.drugList = res.data || []
          // 获取已关联列表
          this.getRelateDrugList()
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    getRelateDrugList () {
      getRelateDrugList({
        nameId: this.activeMedicineNameId
      }).then(res => {
        if (!res.status) {
          this.relateDrugList = res.data || []
          // 将已关联的在下拉列表置灰
          this.disabledDrugList()
          this.showRelateDrug = true
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleSelectFirstCategory (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.firstCategoryList = this.firstCategoryList.map(item => {
        item.active = false
        return item
      })
      this.activeFirstCategoryId = id
      this.firstCategoryList[index].active = true
      // 更新路由
      this.$router.push({
        name: 'Medicine',
        params: {
          fid: this.activeFirstCategoryId
        }
      })
      // 请求二级分类列表
      this.getMedicineSecondCategoryList()
    },
    handleResetFirstCategoryForm () {
      this.$refs['firstCategoryForm'].resetFields()
      this.showFirstCategoryForm = false
      this.showMedicineSecondList = false
      this.showMedicineNameList = false
      this.showProductList = false
    },
    handleAddFirstCategory () {
      this.firstCategoryForm = {
        name: ''
      }
      this.isEditFirstCategory = false
      this.showFirstCategoryForm = true
    },
    handleEditFirstCategory (index) {
      this.firstCategoryForm = Object.assign({}, this.firstCategoryList[index])
      this.isEditFirstCategory = true
      this.showFirstCategoryForm = true
    },
    handleSubmitFirstCategory () {
      this.$refs['firstCategoryForm'].validate(valid => {
        if (valid) {
          if (this.isEditFirstCategory) {
            updateMedicineCategory({
              id: this.firstCategoryForm.id,
              name: this.firstCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getMedicineFirstCategoryList()
                // 重置表单
                this.handleResetFirstCategoryForm()
              } else {
                this.$message({
                  message: res.msg || '分类修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addMedicineFirstCategory({
              name: this.firstCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getMedicineFirstCategoryList()
                // 重置表单
                this.handleResetFirstCategoryForm()
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
    handleDeleteFirstCategory (id) {
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMedicineCategory({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '分类删除成功'
              })
              // 更新列表
              this.getMedicineFirstCategoryList()
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
    handleSelectSecondCategory (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.secondCategoryList = this.secondCategoryList.map(item => {
        item.active = false
        return item
      })
      this.activeSecondCategoryId = id
      this.secondCategoryList[index].active = true
      // 更新路由
      this.$router.push({
        name: 'Medicine',
        params: {
          fid: this.activeFirstCategoryId,
          sid: this.activeSecondCategoryId
        }
      })
      // 请求通用名称列表
      this.getMedicineNameList()
    },
    handleResetSecondCategoryForm () {
      this.$refs['secondCategoryForm'].resetFields()
      this.showSecondCategoryForm = false
      this.showMedicineNameList = false
      this.showProductList = false
    },
    handleAddSecondCategory () {
      this.secondCategoryForm = {
        name: ''
      }
      this.isEditSecondCategory = false
      this.showSecondCategoryForm = true
    },
    handleEditSecondCategory (index) {
      this.secondCategoryForm = Object.assign({}, this.secondCategoryList[index])
      this.isEditSecondCategory = true
      this.showSecondCategoryForm = true
    },
    handleSubmitSecondCategory () {
      this.$refs['secondCategoryForm'].validate(valid => {
        if (valid) {
          if (this.isEditSecondCategory) {
            updateMedicineCategory({
              id: this.secondCategoryForm.id,
              name: this.secondCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getMedicineSecondCategoryList()
                // 重置表单
                this.handleResetSecondCategoryForm()
              } else {
                this.$message({
                  message: res.msg || '分类修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addMedicineSecondCategory({
              firstCategoryId: this.activeFirstCategoryId,
              name: this.secondCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getMedicineSecondCategoryList()
                // 重置表单
                this.handleResetSecondCategoryForm()
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
    handleDeleteSecondCategory (id) {
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMedicineCategory({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '分类删除成功'
              })
              // 更新列表
              this.getMedicineSecondCategoryList()
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
    handleRelateDrug () {
      this.getDrugList()
    },
    handleSelectDrug (id) {
      let item = this.drugList.find(item => item.id === id)
      this.relateDrugList.push(item)
      // 将已关联的在下拉列表置灰
      this.disabledDrugList()
    },
    handleRemoveRelateDrug (drug) {
      this.relateDrugList = this.relateDrugList.filter(item => {
        return item.id !== drug.id
      })
      // 将已关联的在下拉列表置灰
      this.disabledDrugList()
    },
    disabledDrugList () {
      this.drugList.map(dItem => {
        dItem.disabled = false
        this.relateDrugList.map(rItem => {
          if (rItem.id === dItem.id) {
            dItem.disabled = true
          }
        })
        return dItem
      })
    },
    handleSubmitRelateDrug () {
      let drugIdList = this.relateDrugList.map(item => item.id)
      if (drugIdList.length > 0) {
        relateDrug({
          nameId: this.activeMedicineNameId,
          drugIdList: drugIdList
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '关联成功'
            })
            this.showRelateDrug = false
            this.curRelateItem = ''
          } else {
            this.$message({
              message: res.msg || '关联失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      } else {
        this.$message({
          message: '关联成分不能为空',
          type: 'error',
          duration: 5000
        })
      }
    },
    handleSelectMedicineName (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.medicineNameList = this.medicineNameList.map(item => {
        item.active = false
        return item
      })
      this.activeMedicineNameId = id
      this.medicineNameList[index].active = true
      // 更新路由
      this.$router.push({
        name: 'Medicine',
        params: {
          fid: this.activeFirstCategoryId,
          sid: this.activeSecondCategoryId,
          nid: this.activeMedicineNameId
        }
      })
      // 请求通用名称列表
      this.getMedicineProductList()
    },
    handleResetMedicineNameForm () {
      this.$refs['medicineNameForm'].resetFields()
      this.showMedicineNameForm = false
      this.showProductList = false
    },
    handleAddMedicineName () {
      this.medicineNameForm = {
        online: 0,
        cnname: '',
        enname: '',
        mainingredient: '',
        ingredient: '',
        indication: '',
        dousage: '',
        precaution: '',
        contraindication: '',
        reaction: '',
        children: '',
        old: '',
        pregnant: '',
        fdagrade: '',
        fdadesc: '',
        lactationgrade: '',
        interaction: '',
        interactiondesc: '',
        remark: ''
      }
      this.isEditMedicineName = false
      this.showMedicineNameForm = true
    },
    handleEditMedicineName (index) {
      this.medicineNameForm = Object.assign({}, this.medicineNameList[index])
      this.isEditMedicineName = true
      this.showMedicineNameForm = true
    },
    handleSubmitMedicineName () {
      this.$refs['medicineNameForm'].validate(valid => {
        if (valid) {
          if (this.isEditMedicineName) {
            updateMedicineName({
              ...this.medicineNameForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getMedicineNameList()
                // 重置表单
                this.handleResetMedicineNameForm()
              } else {
                this.$message({
                  message: res.msg || '分类修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addMedicineName({
              categoryId: this.activeSecondCategoryId,
              ...this.medicineNameForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getMedicineNameList()
                // 重置表单
                this.handleResetMedicineNameForm()
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
    handleDeleteMedicineName (id) {
      this.$confirm('此操作将删除通用名称, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMedicineName({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '通用名称删除成功'
              })
              // 更新列表
              this.getMedicineNameList()
            } else {
              this.$message({
                message: res.msg || '通用名称删除失败',
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
    handleResetProductForm () {
      this.$refs['productForm'].resetFields()
      this.showProductForm = false
    },
    handleAddProduct () {
      this.productForm = {
        name: '',
        barcode: '',
        otc: 0,
        manufacturer: '',
        dose: '',
        expiredate: '',
        batchnum: ''
      }
      this.isEditProduct = false
      this.showProductForm = true
    },
    handleEditProduct (row) {
      this.productForm = Object.assign({}, row)
      this.isEditProduct = true
      this.showProductForm = true
    },
    handleSubmitProduct () {
      this.$refs['productForm'].validate(valid => {
        if (valid) {
          if (this.isEditProduct) {
            updateMedicineProduct({
              ...this.productForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '商品修改成功'
                })
                // 刷新列表
                this.getMedicineProductList()
                // 重置表单
                this.handleResetProductForm()
              } else {
                this.$message({
                  message: res.msg || '商品修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addMedicineProduct({
              nameId: this.activeMedicineNameId,
              ...this.productForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '商品新增成功'
                })
                // 刷新列表
                this.getMedicineProductList()
                // 重置表单
                this.handleResetProductForm()
              } else {
                this.$message({
                  message: res.msg || '商品新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleDeleteProduct (id) {
      this.$confirm('此操作将删除商品, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMedicineProduct({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '商品删除成功'
              })
              // 更新列表
              this.getMedicineProductList()
            } else {
              this.$message({
                message: res.msg || '商品删除失败',
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
.col-item-wrap {
  height: 100%;
  padding: 0;
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
.col-item-active {
  border: 1px solid #409eff;
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
.relate-select.el-select {
  width: 300px;
}
.relate-drug-list {
  margin-top: 20px;
}
.relate-drug-list .el-tag {
  margin-right: 10px;
  margin-top: 10px;
}
.product-list-wrap {
  overflow-y: scroll;
}
</style>
