<template>
  <el-container>
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
    <el-header class="custom-header">表型基本信息</el-header>
    <el-form
      :inline="true"
      :model="epForm"
      :rules="epFormRules"
      ref="epForm"
      label-width="140px"
      class="ep-form">
      <el-form-item label="Effect Phenotype" prop="effectPhenotype">
        <el-input v-model="epForm.effectPhenotype" />
      </el-form-item>
      <el-form-item label="是否在APP展示" prop="online">
        <el-radio-group v-model="epForm.online">
          <el-radio :label="0">不展示</el-radio>
          <el-radio :label="1">展示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitEp">确定</el-button>
      </el-form-item>
    </el-form>
    <el-header class="custom-header">基因信息</el-header>
    <el-table
      :data="rsInfo"
      border
      stripe
      :highlight-current-row="true"
      style="width: 100%">
      <template slot="append">
        <el-button
          size="mini"
          type="primary"
          @click="handleEditRsInfo(-1)"
        >新增一条数据</el-button>
      </template>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="col-table-expand col-table-expand-small">
            <el-form-item label="Chromosome">
              <span>{{props.row.chromosome}}</span>
            </el-form-item>
            <el-form-item label="POS">
              <span>{{props.row.pos}}</span>
            </el-form-item>
            <el-form-item label="Gene">
              <span>{{props.row.gene}}</span>
            </el-form-item>
            <el-form-item label="Sample Size">
              <span>{{props.row.sampleSize}}</span>
            </el-form-item>
            <el-form-item label="Population">
              <span>{{props.row.population}}</span>
            </el-form-item>
            <el-form-item label="Odds Ratio">
              <span>{{props.row.oddsRatio}}</span>
            </el-form-item>
            <el-form-item label="P Value">
              <span>{{props.row.pValue}}</span>
            </el-form-item>
            <el-form-item label="Age">
              <span>{{props.row.age}}</span>
            </el-form-item>
            <el-form-item label="Gender">
              <span>{{props.row.gender}}</span>
            </el-form-item>
            <el-form-item label="标准芯片">
              <span>{{props.row.core}}</span>
            </el-form-item>
            <el-form-item label="Key Result">
              <span>{{props.row.keyResult}}</span>
            </el-form-item>
            <el-form-item label="Comments">
              <span>{{props.row.comments}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="rsid" label="SNP RSID" width="100" />
      <el-table-column prop="forwordAllele" label="Forward Allele" width="80" />
      <el-table-column prop="dbSNPAllele" label="dbSNP Allele" width="80" />
      <el-table-column prop="effectAllele" label="Effect Allele" width="80" />
      <el-table-column prop="normalAllele" label="Normal Allele" width="80" />
      <el-table-column prop="effect0" label="OR1-NN" width="80" />
      <el-table-column prop="effect1" label="OR1-NE" width="80" />
      <el-table-column prop="effect2" label="OR1-EE" width="80" />
      <el-table-column prop="weight" label="Weight" width="72" />
      <el-table-column
        prop="weightPercent"
        label="Weight（%）"
        width="80"
        :formatter="handleFormatterWeight"
      />
      <el-table-column prop="pmid" label="PMID" width="90" />
      <el-table-column
        prop="checkStatus"
        label="Status"
        width="72"
        :formatter="handleFormatterCheckStatus"
      />
      <el-table-column label="Operation" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEditRsInfo(scope.$index, scope.row)"
          />
          <el-button
            size="mini"
            type="success"
            icon="el-icon-info"
            circle
            @click="handleEditRsInfoStatus(scope.$index, scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDeleteRsInfo(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-header class="custom-header">
      等级临界值
      <span v-if="epForm.comments">（{{epForm.comments}}）</span>
    </el-header>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-table
          :data="rsInterval"
          border
          stripe
          :highlight-current-row="true"
        >
          <template v-if="rsInterval.length===0" slot="append">
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenPheno()"
            >暂无数据，请先录入表型等级</el-button>
          </template>
          <el-table-column prop="name" label="等级名称" />
          <el-table-column prop="min" label="下限值" />
          <el-table-column prop="max" label="上限值" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEditInterval(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="16">
        <v-chart :options="barOption" ref="orBarRef" />
      </el-col>
    </el-row>
    <el-dialog
      title="录入基因信息"
      width="500px"
      :visible.sync="showRsInfoForm"
      @close="() => {
        this.$refs['rsInfoForm'].resetFields()
      }">
      <el-form
        :model="rsInfoForm"
        :rules="rsInfoFormRules"
        ref="rsInfoForm"
        label-width="155px"
      >
        <el-form-item label="RSID" prop="rsid">
          <el-input
            v-model.trim="rsInfoForm.rsid"
            auto-complete="off"
            @keyup.enter.native="handleGetRCP"
            placeholder="请输入 RSID"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click.enter="handleGetRCP" />
          </el-input>
        </el-form-item>
        <el-form-item label="Chromosome" prop="chromosome">
          <el-input
            v-model.trim="rsInfoForm.chromosome"
            disabled
          />
        </el-form-item>
        <el-form-item label="POS" prop="pos">
          <el-input
            v-model.trim="rsInfoForm.pos"
            disabled
          />
        </el-form-item>
        <el-form-item label="Gene" prop="gene">
          <el-input
            v-model.trim="rsInfoForm.gene"
            disabled
          />
        </el-form-item>
        <el-form-item label="Forward Allele" prop="forwordAllele">
          <el-input
            v-model.trim="rsInfoForm.forwordAllele"
            disabled
          />
        </el-form-item>
        <el-form-item label="标准芯片" prop="core">
          <el-input
            v-model.trim="rsInfoForm.core"
            disabled
          />
        </el-form-item>
        <el-form-item label="dbSNP Allele" prop="dbSNPAllele">
          <el-input
            v-model.trim="rsInfoForm.dbSNPAllele"
            auto-complete="off"
            placeholder="请输入 dbSNP Allele"
          />
        </el-form-item>
        <el-form-item label="Effect Allele" prop="effectAllele">
          <el-input
            v-model.trim="rsInfoForm.effectAllele"
            auto-complete="off"
            placeholder="请输入 Effect Allele"
          />
        </el-form-item>
        <el-form-item label="Normal Allele" prop="normalAllele">
          <el-input
            v-model.trim="rsInfoForm.normalAllele"
            auto-complete="off"
            placeholder="请输入 Normal Allele"
          />
        </el-form-item>
        <el-form-item label="OR1-NN" prop="effect0">
          <el-input
            v-model.trim="rsInfoForm.effect0"
            auto-complete="off"
            placeholder="请输入 OR1-NN"
          />
        </el-form-item>
        <el-form-item label="OR1-NE" prop="effect1">
          <el-input
            v-model.trim="rsInfoForm.effect1"
            auto-complete="off"
            placeholder="请输入 OR1-NE"
          />
        </el-form-item>
        <el-form-item label="OR1-EE" prop="effect2">
          <el-input
            v-model.trim="rsInfoForm.effect2"
            auto-complete="off"
            placeholder="请输入 OR1-EE"
          />
        </el-form-item>
        <el-form-item label="Weight" prop="weight">
          <el-input
            v-model.number="rsInfoForm.weight"
            auto-complete="off"
            placeholder="请输入 Weight"
          >
            <template v-if="weightPercent" slot="append">当前占比：{{weightPercent}}</template>
          </el-input>
        </el-form-item>
         <el-form-item label="PMID" prop="pmid">
          <el-input
            v-model.trim="rsInfoForm.pmid"
            auto-complete="off"
            placeholder="请输入 PMID"
            @keyup.enter.native="handleGetPMID"
            >
            <el-button @click.enter="handleGetPMID" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="Sample Size" prop="sampleSize">
          <el-autocomplete
            v-model.trim="rsInfoForm.sampleSize"
            :fetch-suggestions="querySearch"
            placeholder="请输入 Sample Size"
          />
        </el-form-item>
        <el-form-item label="Population" prop="population">
          <el-autocomplete
            v-model.trim="rsInfoForm.population"
            :fetch-suggestions="querySearch"
            placeholder="请输入 Population"
          />
        </el-form-item>
        <el-form-item label="P Value" prop="pValue">
          <el-autocomplete
            v-model.trim="rsInfoForm.pValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入 P Value"
          />
        </el-form-item>
        <el-form-item label="Odds Ratio" prop="oddsRatio">
          <el-autocomplete
            v-model.trim="rsInfoForm.oddsRatio"
            :fetch-suggestions="querySearch"
            placeholder="请输入 Odds Ratio"
          />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-autocomplete
            v-model.trim="rsInfoForm.age"
            :fetch-suggestions="querySearch"
            placeholder="请输入 Age"
          />
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="rsInfoForm.gender" clearable placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Key Result" prop="keyResult">
          <el-input
            type="textarea"
            v-model.trim="rsInfoForm.keyResult"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入 Key Result"
          />
        </el-form-item>
        <el-form-item label="Comments" prop="comments">
          <el-input
            type="textarea"
            v-model.trim="rsInfoForm.comments"
            auto-complete="off"
            :autosize="{minRows: 2}"
            placeholder="请输入 Comments"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitRsInfo"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="录入等级临界值"
      width="400px"
      :visible.sync="showRsIntervalForm"
      @close="() => {
        this.$refs['rsIntervalForm'].resetFields()
      }"
    >
      <el-form
        :model="rsIntervalForm"
        :rules="rsIntervalFormRules"
        ref="rsIntervalForm"
        label-width="80px"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input
            v-model="rsIntervalForm.name"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="下限值" prop="min">
          <el-input
            v-model.number="rsIntervalForm.min"
            auto-complete="off"
            placeholder="请输入下限值"
          />
        </el-form-item>
        <el-form-item label="上限值" prop="max">
          <el-input
            v-model.number="rsIntervalForm.max"
            auto-complete="off"
            placeholder="请输入上限值"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitRsInterval"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改状态"
      width="400px"
      :visible.sync="showRsInfoStatusForm"
      @close="() => {
        this.$refs['rsInfoStatusForm'].resetFields()
      }"
    >
      <el-form
        :model="rsInfoStatusForm"
        :rules="rsInfoStatusFormRules"
        ref="rsInfoStatusForm"
        label-width="80px"
      >
        <el-form-item label="选择状态" prop="checkStatus">
          <el-radio-group v-model="rsInfoStatusForm.checkStatus">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">修改</el-radio>
            <el-radio :label="3">暂停</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitRsInfoStatus"
        >确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getEp,
  updateEp,
  getRCP,
  getPMID,
  getRsInfo,
  addRsInfo,
  updateRsInfo,
  deleteRsInfo,
  getRsInterval,
  updateRsInterval,
  updateRsInfoStatus,
  getORDistributed
} from '../server'
import {
  sumArray
} from '../common/utils'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
export default {
  name: 'PhenoRules',
  data () {
    return {
      phenotypeId: '',
      rsInfo: [],
      rsInterval: [],
      epForm: {
        effectPhenotype: '',
        online: -1,
        phenoComments: ''
      },
      epFormRules: {
        effectPhenotype: [{
          required: true,
          message: '请输入 Effect Phenotype',
          trigger: 'blur'
        }],
        online: [{
          required: true,
          message: '请选择是否在APP展示',
          trigger: 'change'
        }]
      },
      showRsInfoForm: false,
      weightPercent: '',
      editRsInfoIndex: -1,
      genderOptions: ['male', 'female', 'both', 'unknown'],
      // coreOptions: ['yes', 'no', 'unknown'],
      rsInfoForm: {
        rsid: '',
        chromosome: '',
        pos: '',
        gene: '',
        forwordAllele: '',
        dbSNPAllele: '',
        effectAllele: '',
        normalAllele: '',
        effect0: '',
        effect1: '',
        effect2: '',
        weight: '',
        sampleSize: '',
        population: '',
        oddsRatio: '',
        pValue: '',
        age: '',
        gender: '',
        comments: '',
        pmid: '',
        core: '',
        keyResult: '',
        checkStatus: ''
      },
      rsInfoFormRules: {
        rsid: [{
          required: true,
          message: '请输入 RSID',
          trigger: 'blur'
        }],
        dbSNPAllele: [{
          required: true,
          message: '请输入 dbSNP Allele',
          trigger: 'blur'
        }],
        effectAllele: [{
          required: true,
          message: '请输入 Effect Allele',
          trigger: 'blur'
        }],
        normalAllele: [{
          required: true,
          message: '请输入 Normal Allele',
          trigger: 'blur'
        }],
        effect0: [{
          required: true,
          message: '请输入 Score 0 Effect Allele',
          trigger: 'blur'
        }],
        effect1: [{
          required: true,
          message: '请输入 Score 1 Effect Allele',
          trigger: 'blur'
        }],
        effect2: [{
          required: true,
          message: '请输入 Score 2 Effect Allele',
          trigger: 'blur'
        }],
        weight: [{
          required: true,
          message: '请输入 Weight',
          trigger: 'blur'
        }],
        sampleSize: [{
          required: true,
          message: '请输入 Sample Size',
          trigger: 'change'
        }],
        pValue: [{
          required: true,
          message: '请输入 P value',
          trigger: 'change'
        }],
        population: [{
          required: true,
          message: '请输入 Population',
          trigger: 'change'
        }],
        oddsRatio: [{
          required: true,
          message: '请输入 Odds Ratios',
          trigger: 'change'
        }],
        age: [{
          required: true,
          message: '请输入 Age',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: '请选择 Gender',
          trigger: 'change'
        }],
        keyResult: [{
          required: true,
          message: '请输入 Key Result',
          trigger: 'blur'
        }],
        pmid: [{
          required: true,
          message: '请输入 PMID',
          trigger: 'blur'
        }]
      },
      showRsIntervalForm: false,
      rsIntervalForm: {
        id: 0,
        name: '',
        min: 0,
        max: 0
      },
      rsIntervalFormRules: {
        min: [{
          required: true,
          message: '请输入下限值',
          trigger: 'blur'
        }],
        max: [{
          required: true,
          message: '请输入上限值',
          trigger: 'blur'
        }]
      },
      showRsInfoStatusForm: false,
      rsInfoStatusForm: {
        checkStatus: -1
      },
      rsInfoStatusFormRules: {
        checkStatus: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }]
      },
      barOption: {
        color: ['#409eff'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '个数',
            type: 'bar',
            barWidth: '30%',
            label: {
              show: true,
              color: '#000',
              position: 'top'
            },
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.phenotypeId = this.$route.params.id
    this.getEp()
    this.getRsInfo()
    this.getRsInterval()
    this.$refs.orBarRef.showLoading({
      text: '正在拼命加载中...',
      color: '#409eff',
      textColor: '#000',
      zlevel: 0
    })
    this.getORDistributed()
  },
  methods: {
    getEp () {
      getEp({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.epForm = res.data
        }
      })
    },
    getRsInfo () {
      getRsInfo({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.rsInfo = res.data
        }
      })
    },
    getRsInterval () {
      getRsInterval({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.rsInterval = res.data
        }
      })
    },
    getORDistributed () {
      getORDistributed({
        phenotypeId: this.phenotypeId
      }).then(res => {
        if (!res.status) {
          this.$refs.orBarRef.hideLoading()
          let result = res.data || []
          this.barOption.xAxis[0].data = result.map(item => item.min + '-' + item.max)
          this.barOption.series[0].data = result.map(item => item.num)
        }
      })
    },
    onSubmitEp () {
      this.$refs['epForm'].validate(valid => {
        if (valid) {
          updateEp({
            phenotypeId: this.phenotypeId,
            effectPhenotype: this.epForm.effectPhenotype,
            online: this.epForm.online
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '更新失败'
              })
            }
          })
        }
      })
    },
    handleResetRsInfoForm () {
      this.$refs['rsInfoForm'].resetFields()
      this.showRsInfoForm = false
    },
    handleEditRsInfo (index, row) {
      this.editRsInfoIndex = index
      this.rsInfoForm = row ? Object.assign({}, row) : {
        rsid: '',
        chromosome: '',
        pos: '',
        gene: '',
        forwordAllele: '',
        core: ''
      }
      this.showRsInfoForm = true
    },
    handleSubmitRsInfo () {
      this.$refs['rsInfoForm'].validate(valid => {
        if (valid) {
          // 编辑
          if (this.editRsInfoIndex > -1) {
            updateRsInfo({
              ...this.rsInfoForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                this.handleResetRsInfoForm()
                // 刷新列表
                this.getRsInfo()
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg || '更新失败'
                })
              }
            })
          } else {
            addRsInfo({
              phenotypeId: this.phenotypeId,
              ...this.rsInfoForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.handleResetRsInfoForm()
                // 刷新列表
                this.getRsInfo()
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg || '新增失败'
                })
              }
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '信息填写不全，请检查后再提交'
          })
        }
      })
    },
    handleDeleteRsInfo (index, row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteRsInfo({
          id: row.id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getRsInfo()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleResetRsIntervalForm () {
      this.$refs['rsIntervalForm'].resetFields()
      this.showRsIntervalForm = false
    },
    handleEditInterval (index, row) {
      this.rsIntervalForm = Object.assign({}, row) || {}
      this.showRsIntervalForm = true
    },
    handleSubmitRsInterval () {
      this.$refs['rsIntervalForm'].validate(valid => {
        if (valid) {
          updateRsInterval({
            phenotypeId: this.phenotypeId,
            ...this.rsIntervalForm
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleResetRsIntervalForm()
              // 刷新列表
              this.getRsInterval()
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '操作失败'
              })
            }
          })
        }
      })
    },
    handleResetRsInfoStatusForm () {
      this.$refs['rsInfoStatusForm'].resetFields()
      this.showRsInfoStatusForm = false
    },
    handleEditRsInfoStatus (index, row) {
      this.rsInfoStatusForm = Object.assign({}, row) || {}
      this.showRsInfoStatusForm = true
    },
    handleSubmitRsInfoStatus () {
      this.$refs['rsInfoStatusForm'].validate(valid => {
        if (valid) {
          updateRsInfoStatus({
            id: this.rsInfoStatusForm.id,
            checkStatus: this.rsInfoStatusForm.checkStatus
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleResetRsInfoStatusForm()
              // 刷新列表
              this.getRsInfo()
            } else {
              this.$message({
                type: 'error',
                message: res.msg || '操作失败'
              })
            }
          })
        }
      })
    },
    handleOpenPheno () {
      this.$router.go(-1)
    },
    handleFormatterWeight (row) {
      // 计算权重总和
      let weights = this.rsInfo.map(item => {
        return item.weight
      })
      let totalWeight = sumArray(weights)
      return this.calculateWeightPercent(row.weight, totalWeight)
    },
    calculateWeightPercent (val, totalWeight) {
      if (typeof val === 'number') {
        // 计算百分比
        let res = 100 * val / totalWeight
        return res.toFixed(2) + '%'
      } else {
        return ''
      }
    },
    handleFormatterCheckStatus (row) {
      if (row.checkStatus === 1) {
        return '通过'
      }
      if (row.checkStatus === 2) {
        return '修改'
      }
      if (row.checkStatus === 3) {
        return '暂停'
      }
      return '-'
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
    handleGetRCP () {
      if (this.rsInfoForm.rsid && this.rsInfoForm.rsid.length > 2) {
        getRCP({
          rsid: this.rsInfoForm.rsid.toString().toLowerCase()
        }).then(res => {
          if (!res.status) {
            this.rsInfoForm.chromosome = res.data.chromosome
            this.rsInfoForm.pos = res.data.pos
            this.rsInfoForm.gene = res.data.gene
            this.rsInfoForm.forwordAllele = res.data.forwordAllele
            this.rsInfoForm.core = res.data.core
          } else {
            this.rsInfoForm.chromosome = ''
            this.rsInfoForm.pos = ''
            this.rsInfoForm.gene = ''
            this.rsInfoForm.forwordAllele = ''
            this.rsInfoForm.core = ''
          }
        })
      }
    },
    handleGetPMID () {
      if (this.rsInfoForm.pmid && this.rsInfoForm.pmid.length > 2) {
        getPMID({
          pmid: this.rsInfoForm.pmid.toString().toLowerCase()
        }).then(res => {
          if (!res.status) {
            this.rsInfoForm.sampleSize = res.data.sampleSize
            this.rsInfoForm.population = res.data.population
            this.rsInfoForm.oddsRatio = res.data.oddsRatio
            this.rsInfoForm.pValue = res.data.pValue
            this.rsInfoForm.age = res.data.age
            this.rsInfoForm.gender = res.data.gender
            this.rsInfoForm.comments = res.data.comments
            this.rsInfoForm.pmid = res.data.pmid
            this.rsInfoForm.phenotype = res.data.phenotype
          } else {
            this.rsInfoForm.sampleSize = ''
            this.rsInfoForm.population = ''
            this.rsInfoForm.oddsRatio = ''
            this.rsInfoForm.pValue = ''
            this.rsInfoForm.age = ''
            this.rsInfoForm.gender = ''
            this.rsInfoForm.comments = ''
            this.rsInfoForm.pmid = ''
            this.rsInfoForm.phenotype = ''
          }
        })
      }
    }
  },
  watch: {
    'rsInfoForm.weight': function (val) {
      let weights = 0
      if (this.editRsInfoIndex > -1) {
        weights = this.rsInfo.map((item, index) => {
          return this.editRsInfoIndex !== index && item.weight
        })
      } else {
        weights = this.rsInfo.map(item => {
          return item.weight
        })
      }
      let totalWeight = sumArray(weights) + val
      this.weightPercent = this.calculateWeightPercent(val, totalWeight)
    },
    'rsInfoForm.rsid': function (nextVal, prevVal) {
      if (nextVal === '') {
        this.rsInfoForm.chromosome = ''
        this.rsInfoForm.pos = ''
        this.rsInfoForm.gene = ''
        this.rsInfoForm.forwordAllele = ''
        this.rsInfoForm.core = ''
      }
      // if (nextVal !== prevVal) {
      //   this.handleGetRCP()
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-header {
  height: auto!important;
  padding: 20px 0;
}
.ep-form .el-form--inline .el-form-item {
  margin: 0;
}
.el-table >>> .el-table__empty-block {
  display: none;
}
.el-table >>> .el-table__append-wrapper {
  text-align: center;
  margin: 20px 0;
}
.col-table-expand {
  font-size: 0;
}
.col-table-expand >>> .el-form-item__label {
  width: 100px;
  font-weight: 700;
}
.col-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.col-table-expand-small .el-form-item {
  width: 33%
}
.col-table-expand >>> .el-form-item__content {
  width: 55%;
  word-break: break-all;
}
.el-table >>> .el-table__expanded-cell {
  padding: 20px;
}
.el-autocomplete {
  display: block;
}
.echarts {
  width: 100%;
  height: 200px;
}
</style>
