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
    <el-row class="wrap">
      <el-col
        :span="4"
        class="col-wrap">
        <el-container class="col-container">
          <el-header class="col-title">一级分类</el-header>
          <el-main
            v-if="categoryList.length>0"
            class="col-item-wrap"
          >
            <el-card
              v-for="(item, index) in categoryList"
              :key="index"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectCategory(index, item.id, item.active)"
            >
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  icon="el-icon-caret-top"
                  circle
                  :disabled="index===0"
                  @click="handleRankCategory(index, 'up')"
                />
                <el-button
                  size="mini"
                  icon="el-icon-caret-bottom"
                  circle
                  :disabled="index===categoryList.length-1"
                  @click="handleRankCategory(index, 'down')"
                />
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditCategory(index, item.id)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteCategory(item.id)"
                />
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddCategory"
            >新增一级分类</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col
        v-if="showSecondCategoryList"
        :span="4"
        class="col-wrap">
        <el-container class="col-container">
          <el-header class="col-title">二级分类</el-header>
          <el-main
            v-if="secondCategoryList.length>0"
            class="col-item-wrap"
          >
            <el-card
              v-for="(item, index) in secondCategoryList"
              :key="index"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectSecondCategory(index, item.id, item.active)"
            >
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  icon="el-icon-caret-top"
                  circle
                  :disabled="index===0"
                  @click="handleRankSecondCategory(index, 'up')"
                />
                <el-button
                  size="mini"
                  icon="el-icon-caret-bottom"
                  circle
                  :disabled="index===secondCategoryList.length-1"
                  @click="handleRankSecondCategory(index, 'down')"
                />
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditSecondCategory(index, item.id)"
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
      <el-col
        v-if="showPhenoList"
        :span="4"
        class="col-wrap">
        <el-container class="col-container">
          <el-header class="col-title">表型</el-header>
          <el-main
            v-if="phenoList.length>0"
            class="col-item-wrap"
          >
            <el-card
              v-for="(item, index) in phenoList"
              :key="index"
              :class="item.active ? 'col-item-active' : ''"
              class="col-item"
              shadow="hover"
              @click.native="handleSelectPheno(index, item.id, item.active)"
            >
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="mini"
                  icon="el-icon-caret-top"
                  circle
                  :disabled="index===0"
                  @click="handleRankPheno(index, 'up')"
                />
                <el-button
                  size="mini"
                  icon="el-icon-caret-bottom"
                  circle
                  :disabled="index===phenoList.length-1"
                  @click="handleRankPheno(index, 'down')"
                />
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-refresh"
                  circle
                  @click="handleShowUpdateCategory"
                />
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditPheno(index)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeletePheno(item.id)"
                />
              </div>
              <i v-if="item.online==1" class="badge online el-icon-star-on" />
              <i v-if="item.online==0" class="badge offline el-icon-star-on" />
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddPheno"
            >新增表型</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col
        v-if="showPhenoDetail"
        :span="12"
        class="col-wrap">
        <el-container class="col-container">
          <el-header class="col-title">
            <div class="col-title-name">表型详情</div>
            <div class="btn-wrap">
              <el-button
                type="primary"
                size="mini"
                @click="handleAddLevel"
              >新增等级</el-button>
              <el-dropdown
                v-if="phenoDetail.level&&phenoDetail.level.length>0"
                trigger="click"
                @command="handlePreviewArticle"
              >
                <el-button size="mini" type="success">预览图文</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in phenoDetail.level"
                    :key="index"
                    :command="item"
                  >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                type="warning"
                size="mini"
                @click="handleAddArticle(phenoDetail.id)"
              >录入图文</el-button>

              <el-button
                type="primary"
                size="mini"
                @click="handleAddRules(phenoDetail.id)"
              >录入规则</el-button>
              <!-- <el-button
                type="warning"
                size="mini"
                @click="handleAddChatbot(phenoDetail.id)"
              >聊天机器人</el-button> -->
            </div>
          </el-header>
          <el-main class="col-item-wrap">
            <el-card>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">表型名称</el-col>
                <el-col :span="20">{{phenoDetail.name}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">基因对表型的决定程度</el-col>
                <el-col :span="20">{{phenoDetail.degree}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">表型阶段</el-col>
                <el-col :span="20">Phase {{phenoDetail.stage}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">表型描述</el-col>
                <el-col :span="20">{{phenoDetail.description}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">表型头图</el-col>
                <el-col :span="16">
                  <img class="pheno-img" :src="phenoDetail.imgUrl" />
                </el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">等级</el-col>
                <el-col :span="20">
                  <div
                    v-for="(level, index) in phenoDetail.level"
                    :key="index"
                    class="col-list-item"
                  >
                    <div class="col-level-text">名称：{{level.name}}</div>
                    <div class="col-level-text">描述：{{level.description}}</div>
                    <div class="col-level-text">slogan：{{level.slogan}}</div>
                    <div class="col-level-text">标签：{{level.tag}}</div>
                    <div class="col-level-op">
                      <el-button
                        size="mini"
                        icon="el-icon-caret-top"
                        circle
                        :disabled="index===0"
                        @click="handleRankLevel(index, 'up')"
                      />
                      <el-button
                        size="mini"
                        icon="el-icon-caret-bottom"
                        circle
                        :disabled="index===phenoDetail.level.length-1"
                        @click="handleRankLevel(index, 'down')"
                      />
                      <el-color-picker
                        v-model="level.orColor"
                        size="mini"
                        @change="color => {handleUpdateORColor(level.id, color)}" />
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        @click="handleEditLevel(index)"
                      />
                      <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="handleDeleteLevel(level.id)"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">备注</el-col>
                <el-col :span="20">{{phenoDetail.comments}}</el-col>
              </el-row>
              <el-row type="flex" class="col-item-row">
                <el-col :span="4" class="col-item-name">参考文献</el-col>
                <el-col :span="20">
                  <div
                    v-for="references in phenoDetail.references"
                    :key="references.id"
                    class="col-list-item"
                  >
                    <div class="col-level-text">标题：{{references.title}}</div>
                    <div class="col-level-text">链接：{{references.link}}</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <!-- 新增一级分类表单弹窗 -->
    <el-dialog
      title="新增分类"
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
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="categoryForm.name"
            auto-complete="off"
            placeholder="请输入分类名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitCategory"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增二级分类弹窗 -->
    <el-dialog
      title="新增二级分类"
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
    <!-- 新增表型表单弹窗 -->
    <el-dialog
      title="录入表型"
      width="700px"
      class="pheno-form"
      :visible.sync="showPhenoForm"
      @close="() => {
        this.$refs['phenoForm'].resetFields()
      }">
      <el-form
        :model="phenoForm"
        :rules="phenoFormRules"
        ref="phenoForm"
        label-width="100px"
      >
        <el-form-item label="表型名称" prop="name">
          <el-input
            v-model.trim="phenoForm.name"
            auto-complete="off"
            placeholder="请输入表型名称"
          />
        </el-form-item>
        <el-form-item class="pheno-degree" label="基因对表型的决定程度" prop="degree">
          <el-select v-model="phenoForm.degree" clearable placeholder="请选择">
            <el-option
              v-for="item in degreeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pheno-degree" label="表型阶段" prop="stage">
          <el-select v-model="phenoForm.stage" clearable placeholder="请选择">
            <el-option
              v-for="item in stageOptions"
              :key="item"
              :label="'Phase ' + item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表型描述" prop="description">
          <el-input
            type="textarea"
            v-model.trim="phenoForm.description"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入表型描述"
          />
        </el-form-item>
        <el-form-item
          label="表型头图"
          class="img-card"
        >
          <el-upload
            list-type="picture-card"
            :action="uploadPicUrl"
            :multiple="false"
            :limit="1"
            :file-list="phenoForm.imgUrl ? [{name: '', url: phenoForm.imgUrl}] : []"
            :on-success="handelUploadSuccess"
            :on-remove="handleRemovePic"
            :on-exceed="handleUploadExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="comments">
          <el-input
            type="textarea"
            v-model.trim="phenoForm.comments"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入备注"
          />
        </el-form-item>
        <el-form-item
          class="references-item"
          v-if="phenoForm.references.length===0"
        >
          <el-button
            type="primary"
            size="small"
            @click.prevent="handleAddReferences"
          >添加参考文献</el-button>
        </el-form-item>
        <div
          v-for="(references, index) in phenoForm.references"
          :key="index"
        >
          <el-form-item
            class="references-item"
            :label="'参考文献' + (index + 1)"
            :prop="'references.' + index + '.title'"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请输入标题'
            }"
          >
            <el-input
              v-model="references.title"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item
            class="references-item"
            :prop="'references.' + index + '.link'"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请输入链接'
            }"
          >
            <el-input
              v-model="references.link"
              placeholder="请输入链接"
            />
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click.prevent="handleAddReferences"
            />
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.prevent="handleRemoveReferences(index)"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitPheno"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增表型等级弹窗 -->
    <el-dialog
      title="录入等级"
      width="500px"
      class="level-form"
      :visible.sync="showLevelForm"
      @close="() => {
        this.$refs['levelForm'].resetFields()
      }">
      <el-form
        :model="levelForm"
        :rules="levelFormRules"
        ref="levelForm"
        label-width="100px"
      >
        <el-form-item
          label="等级名称"
          prop="name"
        >
          <el-input
            v-model.trim="levelForm.name"
            auto-complete="off"
            placeholder="请输入等级名称"
          />
        </el-form-item>
        <el-form-item
          label="等级描述"
          prop="description"
        >
          <el-input
            type="textarea"
            v-model.trim="levelForm.description"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入等级描述"
          />
        </el-form-item>
        <el-form-item
          label="等级slogan"
          prop="slogan"
        >
          <el-input
            type="textarea"
            v-model.trim="levelForm.slogan"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入等级 slogan"
          />
        </el-form-item>
        <el-form-item
          label="等级标签"
          prop="tag"
        >
          <el-input
            v-model.trim="levelForm.tag"
            auto-complete="off"
            placeholder="请输入等级标签"
          />
        </el-form-item>
        <el-form-item
          label="等级背景图"
        >
          <el-select v-model="levelForm.colorStage" placeholder="请选择等级背景图">
            <el-option
              v-for="item in levelBgImgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="level-bg-img-item"
            >
              <span>{{item.label}}</span>
              <img width="100" height="30" :src="item.bg" />
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitLevel"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 预览图文弹窗 -->
    <el-dialog
      class="preview-dialog"
      title="预览图文"
      width="375px"
      :visible.sync="showPreviewArticle">
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
    <!-- 修改表型分类 -->
    <el-dialog
      title="修改表型分类"
      width="400px"
      :visible.sync="showUpdatePhenoCategory"
      @close="() => {
        this.selectedPhenoCategory = ''
      }">
      <el-select
        class="relate-select"
        filterable
        placeholder="请选择分类"
        v-model="selectedPhenoCategory">
        <el-option
          v-for="(item, index) in allSecondCategoryList"
          :key="index"
          :label="item.name"
          :value="item.id" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitUpdatePhenoCategory"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDiseaseCategoryList,
  getDiseaseList,
  getDiseaseInfo,
  addDiseaseCategory,
  updateDiseaseCategory,
  rankDiseaseCategory,
  deleteDiseaseCategory,
  getSecondDiseaseCategoryList,
  addSecondDiseaseCategory,
  addDiseasePhenotype,
  updateDiseasePhenotype,
  rankDiseasePhenotype,
  deleteDiseasePhenotype,
  addDiseaseLevel,
  rankDiseaseLevel,
  updateDiseaseLevel,
  updateDiseaseLevelORColor,
  deleteDiseaseLevel,
  getPreviewDiseaseArtcle,
  getAllDiseaseSecondCategoryList,
  updateDiseasetypeSecondCategory
} from '../server'
import {
  moveArray
} from '../common/utils'
import {
  uploadPic
} from '../server/config'
import {
  LEVEL_BG_IMG_OPTIONS
} from '../common/const'
export default {
  name: 'Pheno',
  data () {
    return {
      categoryList: [],
      activeCategoryId: -1,
      phenoList: [],
      activePhenotypeId: -1,
      showPhenoDetail: false,
      phenoDetail: {},
      showCategoryForm: false,
      isEditCategory: false,
      uploadPicUrl: uploadPic,
      categoryForm: {
        name: ''
      },
      categoryFormRules: {
        name: [{
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 10,
          message: '分类名称长度在 2 到 10 个字符之间',
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
        },
        {
          min: 2,
          max: 10,
          message: '分类名称长度在 2 到 10 个字符之间',
          trigger: 'blur'
        }]
      },
      showPhenoList: false,
      showPhenoForm: false,
      isEditPheno: false,
      degreeOptions: ['1', '2', '3', '4', '5'],
      stageOptions: [1, 2, 3, 4, 5],
      phenoForm: {
        name: '',
        degree: '',
        stage: '1',
        description: '',
        imgUrl: '',
        references: []
      },
      phenoFormRules: {
        name: [{
          required: true,
          message: '请填写表型名称',
          trigger: 'blur'
        }],
        degree: [{
          required: true,
          message: '请选择基因对表型的决定程度',
          trigger: 'change'
        }],
        stage: [{
          required: true,
          message: '请选择表型阶段',
          trigger: 'change'
        }]
      },
      showLevelForm: false,
      isEditLevel: false,
      levelForm: {
        name: '',
        description: '',
        slogan: '',
        tag: ''
      },
      levelFormRules: {
        name: [{
          required: true,
          message: '请填写等级名称',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请填写等级描述',
          trigger: 'blur'
        }]
      },
      showPreviewArticle: false,
      previewArticleInfo: {
        phenotypeInfo: {},
        levelInfo: {},
        groupList: []
      },
      levelBgImgOptions: LEVEL_BG_IMG_OPTIONS,
      showUpdatePhenoCategory: false,
      selectedPhenoCategory: '',
      allSecondCategoryList: []
    }
  },
  mounted () {
    let routeParams = this.$route.params
    this.activeCategoryId = routeParams.cid ? parseInt(routeParams.cid, 10) : -1
    this.activeSecondCategoryId = routeParams.sid ? parseInt(routeParams.sid, 10) : -1
    this.activePhenotypeId = routeParams.pid ? parseInt(routeParams.pid, 10) : -1
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      getDiseaseCategoryList({}).then(res => {
        if (!res.status) {
          this.categoryList = res.data || []
          this.showSecondCategoryList = false
          this.showPhenoList = false
          this.showPhenoDetail = false
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
        }
      })
    },
    getSecondCategoryList () {
      getSecondDiseaseCategoryList({
        pid: this.activeCategoryId
      }).then(res => {
        if (!res.status) {
          this.secondCategoryList = res.data || []
          this.showSecondCategoryList = true
          this.showPhenoList = false
          this.showPhenoDetail = false
          // 根据路由参数选中
          if (this.activeSecondCategoryId > -1) {
            let sIndex = -1
            this.secondCategoryList.map((item, index) => {
              if (item.id === this.activeSecondCategoryId) {
                sIndex = index
              }
            })
            this.handleSelectSecondCategory(sIndex, this.activeSecondCategoryId, false)
          }
        }
      })
    },
    getPhenoList () {
      getDiseaseList({
        categoryId: this.activeSecondCategoryId
      }).then(res => {
        if (!res.status) {
          this.phenoList = res.data || []
          this.showPhenoDetail = false
          // 根据路由参数选中
          if (this.activePhenotypeId > -1) {
            let pIndex = -1
            this.phenoList.map((item, index) => {
              if (item.id === this.activePhenotypeId) {
                pIndex = index
              }
            })
            this.handleSelectPheno(pIndex, this.activePhenotypeId, false)
          }
        }
      })
    },
    getPhenoInfo (id) {
      getDiseaseInfo({id}).then(res => {
        if (!res.status && res.data) {
          this.phenoDetail = JSON.parse(JSON.stringify(res.data))
          this.phenoForm = JSON.parse(JSON.stringify(res.data))
        }
      })
    },
    handleResetCategoryForm () {
      this.$refs['categoryForm'].resetFields()
      this.showCategoryForm = false
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
      this.showPhenoList = false
      this.showPhenoDetail = false
      // 更新路由
      this.$router.push({
        name: 'Disease',
        params: {
          cid: this.activeCategoryId
        }
      })
      // 请求数据
      this.getSecondCategoryList()
    },
    handleAddCategory () {
      this.categoryForm = {
        name: ''
      }
      this.isEditCategory = false
      this.showCategoryForm = true
    },
    handleSubmitCategory () {
      this.$refs['categoryForm'].validate(valid => {
        if (valid) {
          if (this.isEditCategory) {
            // 请求
            updateDiseaseCategory({
              id: this.categoryForm.id,
              name: this.categoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getCategoryList()
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
            // 请求
            addDiseaseCategory({
              name: this.categoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getCategoryList()
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
    handleEditCategory (index) {
      this.categoryForm = Object.assign({}, this.categoryList[index])
      this.isEditCategory = true
      this.showCategoryForm = true
    },
    handleRankCategory (index, type) {
      let categoryList = this.categoryList.map(item => {
        return item.id
      })
      // 移动数组
      categoryList = moveArray(categoryList, index, type)
      // 请求
      rankDiseaseCategory({categoryList}).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '分类排序成功'
          })
          this.activeCategoryId = -1
          // 刷新列表
          this.getCategoryList()
        } else {
          this.$message({
            message: res.msg || '分类排序失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleDeleteCategory (id) {
      if (!id) {
        this.$message.error('id为空，删除失败')
      }
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteDiseaseCategory({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '分类删除成功'
              })
              // 刷新列表
              this.getCategoryList()
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
    handleResetSecondCategoryForm () {
      this.$refs['secondCategoryForm'].resetFields()
      this.showSecondCategoryForm = false
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
      this.showPhenoList = true
      this.showPhenoDetail = false
      // 更新路由
      this.$router.push({
        name: 'Disease',
        params: {
          cid: this.activeCategoryId,
          sid: this.activeSecondCategoryId
        }
      })
      // 请求数据
      this.getPhenoList()
    },
    handleAddSecondCategory () {
      this.secondCategoryForm = {
        name: ''
      }
      this.isEditSecondCategory = false
      this.showSecondCategoryForm = true
    },
    handleSubmitSecondCategory () {
      this.$refs['secondCategoryForm'].validate(valid => {
        if (valid) {
          if (this.isEditSecondCategory) {
            // 请求
            updateDiseaseCategory({
              id: this.secondCategoryForm.id,
              name: this.secondCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类修改成功'
                })
                // 刷新列表
                this.getSecondCategoryList()
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
            // 请求
            addSecondDiseaseCategory({
              pid: this.activeCategoryId,
              name: this.secondCategoryForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '分类新增成功'
                })
                // 刷新列表
                this.getSecondCategoryList()
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
    handleEditSecondCategory (index) {
      this.secondCategoryForm = Object.assign({}, this.secondCategoryList[index])
      this.isEditSecondCategory = true
      this.showSecondCategoryForm = true
    },
    handleRankSecondCategory (index, type) {
      let secondCategoryList = this.secondCategoryList.map(item => {
        return item.id
      })
      // 移动数组
      secondCategoryList = moveArray(secondCategoryList, index, type)
      // 请求
      rankDiseaseCategory({
        categoryList: secondCategoryList
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '分类排序成功'
          })
          this.activeSecondCategoryId = -1
          // 刷新列表
          this.getSecondCategoryList()
        } else {
          this.$message({
            message: res.msg || '分类排序失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleDeleteSecondCategory (id) {
      if (!id) {
        this.$message.error('id为空，删除失败')
      }
      this.$confirm('此操作将删除分类, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteDiseaseCategory({id}).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '分类删除成功'
            })
            // 刷新列表
            this.getSecondCategoryList()
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
    handleResetPhenoForm () {
      // 重置表单
      this.$refs['phenoForm'].resetFields()
      this.showPhenoForm = false
    },
    handleSelectPheno (index, id, active) {
      if (active || index === -1) {
        return
      }
      this.phenoList = this.phenoList.map(item => {
        item.active = false
        return item
      })
      this.activePhenotypeId = id
      this.phenoList[index].active = true
      this.showPhenoDetail = true
      // 更新路由
      this.$router.push({
        name: 'Disease',
        params: {
          cid: this.activeCategoryId,
          sid: this.activeSecondCategoryId,
          pid: this.activePhenotypeId
        }
      })
      // 请求数据
      this.getPhenoInfo(id)
    },
    handleAddPheno () {
      this.phenoForm = {
        name: '',
        degree: '',
        description: '',
        imgUrl: '',
        references: []
      }
      this.isEditPheno = false
      this.showPhenoForm = true
    },
    handleSubmitPheno () {
      this.$refs['phenoForm'].validate(valid => {
        if (valid) {
          // if (!this.phenoForm.imgUrl) {
          //   this.$message.error('请上传表型头图')
          //   return
          // }
          if (this.isEditPheno) {
            updateDiseasePhenotype({
              id: this.phenoForm.id,
              name: this.phenoForm.name,
              degree: this.phenoForm.degree,
              stage: this.phenoForm.stage,
              comments: this.phenoForm.comments,
              description: this.phenoForm.description,
              imgUrl: this.phenoForm.imgUrl,
              references: this.phenoForm.references
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '表型修改成功'
                })
                // 更新列表
                this.getPhenoList()
                // 重置表单
                this.handleResetPhenoForm()
              } else {
                this.$message({
                  message: res.msg || '表型修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDiseasePhenotype({
              categoryId: this.activeSecondCategoryId,
              name: this.phenoForm.name,
              degree: this.phenoForm.degree,
              stage: this.phenoForm.stage,
              comments: this.phenoForm.comments,
              imgUrl: this.phenoForm.imgUrl,
              description: this.phenoForm.description,
              references: this.phenoForm.references
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '表型新增成功'
                })
                // 更新列表
                this.getPhenoList()
                // 重置表单
                this.handleResetPhenoForm()
              } else {
                this.$message({
                  message: res.msg || '表型新增失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          }
        }
      })
    },
    handleEditPheno (index) {
      // this.phenoForm = Object.assign({}, this.phenoDetail)
      this.isEditPheno = true
      this.showPhenoForm = true
    },
    handleShowUpdateCategory () {
      getAllDiseaseSecondCategoryList({
        phenotypeId: this.activePhenotypeId
      }).then(res => {
        if (!res.status) {
          this.allSecondCategoryList = res.data || []
          this.showUpdatePhenoCategory = true
        } else {
          this.$message({
            message: res.msg || '获取数据失败，请稍后再试',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleSubmitUpdatePhenoCategory () {
      updateDiseasetypeSecondCategory({
        phenotypeId: this.activePhenotypeId,
        categoryId: this.selectedPhenoCategory
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '修改分类成功'
          })
          this.selectedPhenoCategory = ''
          this.showUpdatePhenoCategory = false
          // 刷新列表
          this.getPhenoList()
        } else {
          this.$message({
            message: res.msg || '修改分类失败',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    handleRankPheno (index, type) {
      let phenoList = this.phenoList.map(item => {
        return item.id
      })
      phenoList = moveArray(phenoList, index, type)
      rankDiseasePhenotype({phenoList}).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '表型排序成功'
          })
          this.showPhenoDetail = false
          // 更新列表
          this.getPhenoList()
        } else {
          this.$message({
            message: res.msg || '表型排序失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleDeletePheno (id) {
      this.$confirm('此操作将删除表型, 请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteDiseasePhenotype({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '表型删除成功'
              })
              // 更新列表
              this.getPhenoList()
            } else {
              this.$message({
                message: res.msg || '表型删除失败',
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
    handelUploadSuccess (res) {
      if (!res.status) {
        this.phenoForm.imgUrl = res.data.imgurl
      } else {
        this.phenoForm.imgUrl = ''
        this.$message({
          message: '上传图片失败，请稍后重试',
          type: 'error',
          duration: 5000
        })
      }
    },
    handleRemovePic () {
      this.phenoForm.imgUrl = ''
    },
    handleUploadExceed () {
      this.$message({
        message: '最多上传1张图片，如要替换，请先删除当前图片',
        type: 'error',
        duration: 5000
      })
    },
    handleAddLevel () {
      this.levelForm = {
        name: '',
        description: '',
        slogan: '',
        tag: ''
      }
      this.isEditLevel = false
      this.showLevelForm = true
    },
    handleRankLevel (index, type) {
      let levelList = this.phenoDetail.level.map(item => {
        return item.id
      })
      levelList = moveArray(levelList, index, type)
      rankDiseaseLevel({
        ids: levelList
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '表型等级成功'
          })
          // 刷新数据
          this.getPhenoInfo(this.phenoDetail.id)
        } else {
          this.$message({
            message: res.msg || '表型等级失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleDeleteLevel (id) {
      this.$confirm('此操作将删除等级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteDiseaseLevel({id})
          .then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '等级删除成功!'
              })
              // 刷新数据
              this.getPhenoInfo(this.phenoDetail.id)
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
    },
    handleEditLevel (index) {
      this.levelForm = Object.assign({}, this.phenoDetail.level[index])
      this.isEditLevel = true
      this.showLevelForm = true
    },
    handleUpdateORColor (id, color) {
      updateDiseaseLevelORColor({
        id: id,
        orColor: color
      }).then(res => {
        if (!res.status) {
          this.$message({
            type: 'success',
            message: '等级色值修改成功'
          })
          // 刷新数据
          this.getPhenoInfo(this.phenoDetail.id)
        } else {
          this.$message({
            message: res.msg || '等级色值修改失败',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    handleSubmitLevel () {
      this.$refs['levelForm'].validate(valid => {
        if (valid) {
          // 请求
          if (this.isEditLevel) {
            updateDiseaseLevel({
              id: this.levelForm.id,
              name: this.levelForm.name,
              description: this.levelForm.description,
              slogan: this.levelForm.slogan,
              tag: this.levelForm.tag,
              colorStage: this.levelForm.colorStage
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '等级修改成功'
                })
                // 刷新数据
                this.getPhenoInfo(this.phenoDetail.id)
                // 重置表单
                this.handleResetLevelForm()
              } else {
                this.$message({
                  message: res.msg || '等级修改失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDiseaseLevel({
              phenotypeId: this.phenoDetail.id,
              name: this.levelForm.name,
              description: this.levelForm.description,
              slogan: this.levelForm.slogan,
              tag: this.levelForm.tag,
              colorStage: this.levelForm.colorStage
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '等级新增成功'
                })
                // 刷新数据
                this.getPhenoInfo(this.phenoDetail.id)
                // 重置表单
                this.handleResetLevelForm()
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
    handleResetLevelForm () {
      this.$refs['levelForm'].resetFields()
      this.showLevelForm = false
    },
    handleAddReferences () {
      this.phenoForm.references.push({
        title: '',
        link: ''
      })
    },
    handleRemoveReferences (index) {
      index > -1 && this.phenoForm.references.splice(index, 1)
    },
    handleAddArticle (id) {
      this.$router.push({
        path: `/diseaseArticle/${id}`
      })
    },
    handleAddRules (id) {
      if (this.phenoDetail.level.length > 0) {
        this.$router.push({
          path: `/diseaseRules/${id}`
        })
      } else {
        this.$message({
          message: '请先录入表型等级',
          type: 'error',
          duration: 5000
        })
      }
    },
    handlePreviewArticle (levelInfo) {
      let params = {
        phenotypeId: this.phenoDetail.id
      }
      if (levelInfo) {
        params.levelId = levelInfo.id
      }
      getPreviewDiseaseArtcle(params).then(res => {
        if (!res.status) {
          this.previewArticleInfo = res.data
          this.previewArticleInfo.levelInfo = levelInfo || {}
          this.showPreviewArticle = true
        }
      })
    },
    handleAddChatbot (id) {
      this.$router.push({
        path: `/chatbot/${id}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  padding-bottom: 0;
}
.main {
  height: 95%;
}
.wrap {
  margin-top: 20px;
  height: 95%;
}
.breadcrumb-header {
  height: auto!important;
  margin: 20px 0;
  padding-left: 0;
}
.el-button--mini {
  padding: 8px;
}
.el-button+.el-button {
  margin-left: 0;
}
.col-wrap {
  height: 100%;
}
.col-container {
  border: 1px solid #ebeef5;
  margin-right: 10px;
  max-height: 100%;
}
.col-title {
  height: auto!important;
  padding: 0;
  font-weight: 700;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col-title .col-title-name {
  display: flex;
  align-items: center;
}
.col-item-wrap {
  max-height: 80%;
  padding: 0;
}
.col-item-op {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
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
.col-level-text {
  margin-bottom: 10px;
}
/* .col-list-item:hover .col-level-op {
  display: block;
} */
.col-level-op {
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: -8px;
  right: 0;
}
.col-item {
  cursor: pointer;
  margin: 8px;
  position: relative;
  font-size: 14px;
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
.pheno-form .references-item {
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
  padding-bottom: 0;
}
.pheno-form .references-item:last-child {
  border-top: none;
}
.pheno-form .references-item .el-input {
  width: 80%;
}
.pheno-img {
  max-width: 100%
}
.pheno-degree >>> .el-form-item__label {
  line-height: 24px;
}
.level-bg-img-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
  font-size: 16px;
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
.col-item-op .el-button--mini,
.col-level-op .el-button--mini {
  padding: 4px;
}
.relate-select {
  width: 100%;
}
</style>
