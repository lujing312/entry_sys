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
        <el-breadcrumb-item>{{epForm.drugName}} - {{epForm.effectName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-header class="custom-header">Effect Phenotype</el-header>
    <el-form
      :inline="true"
      :model="epForm"
      :rules="epFormRules"
      ref="epForm"
      label-width="140px"
      class="ep-form">
      <el-form-item label="Effect Phenotype" prop="effectPhenotype">
        <el-input size="small" v-model="epForm.effectPhenotype" />
      </el-form-item>
      <!-- <el-form-item label="是否在APP展示" prop="online">
        <el-radio-group v-model="epForm.online">
          <el-radio :label="0">不展示</el-radio>
          <el-radio :label="1">展示</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <el-button size="mini" type="primary" @click="onSubmitEp">确定</el-button>
      </el-form-item>
    </el-form>
    <el-header class="custom-header">SNP RSID Based</el-header>
    <el-table
      :data="rsInfo"
      :highlight-current-row="true"
      style="width: 100%"
      border>
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
            <el-form-item label="Comments">
              <span>{{props.row.comments}}</span>
            </el-form-item>
            <el-form-item label="PMID">
              <span>{{props.row.pmid}}</span>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-message"
                circle
                @click="handleGetDrugPmidList(props.row.id, props.row.type)"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="rsid" label="SNP RSID" width="120" />
      <el-table-column prop="chromosome" label="Chromosome" width="120" />
      <el-table-column prop="pos" label="POS" width="100" />
      <el-table-column prop="gene" label="Gene" width="100" />
      <el-table-column prop="effectAllele" label="Effect Allele" width="60" />
      <el-table-column prop="normalAllele" label="Normal Allele" width="80" />
      <el-table-column prop="effect0" label="Score 0 Effect Allele" width="72" />
      <el-table-column prop="effect1" label="Score 1 Effect Allele" width="72" />
      <el-table-column prop="effect2" label="Score 2 Effect Allele" width="72" />
      <el-table-column prop="weight" label="Weight" />
      <el-table-column
        label="Weight（%）"
        :formatter="handleFormatterWeight"
      />
      <el-table-column label="Operation" fixed="right" width="120">
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
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDeleteRsInfo(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-header class="custom-header">Haplotype Based</el-header>
    <el-row class="row-wrap">
      <el-col :span="10" class="col-item-wrap">
        <el-container class="col-item-container">
          <el-header class="col-title">单倍型基因</el-header>
          <el-main class="col-item-wrap">
            <el-table
              :data="haplotypeGeneList"
              :highlight-current-row="true"
              @row-click="handleHaplotypeGeneRowClick"
              style="width:100%;"
            >
              <template slot="append">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEditHaplotypeGene(-1)"
                >新增单倍型基因</el-button>
              </template>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="col-table-expand">
                    <el-form-item label="Gene">
                      <span>{{props.row.gene}}</span>
                    </el-form-item>
                    <el-form-item label="Weight">
                      <span>{{props.row.weight}}</span>
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
                    <el-form-item label="PMID">
                      <span>{{props.row.pmid}}222222</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="Gene" prop="gene" />
              <el-table-column label="Weight" prop="weight" />
              <el-table-column label="PMID" prop="pmid" />
              <el-table-column label="Operation">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click.stop="handleEditHaplotypeGene(scope.$index, scope.row)"
                  />
                  <el-button
                    size="small"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click.stop="handleDeleteHaplotypeGene(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
      <el-col
        :span="4"
        class="col-item-wrap"
        v-if="showHaplotypePolymorphismList">
        <el-container class="col-item-container">
          <el-header class="col-title">单倍型多态</el-header>
          <el-main
            class="col-item-wrap"
            v-if="haplotypePolymorphismList.length>0"
          >
            <el-card
              v-for="(item, index) in haplotypePolymorphismList"
              :key="item.id"
              class="col-item"
              :class="item.active ? 'col-item-active' : ''"
              shadow="hover"
              @click.native="handleSelectHaplotypePolymorphism(index, item.id, item.active)"
            >
              <p>{{item.name}}</p>
              <div v-if="item.active" class="col-item-op">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleEditHaplotypePolymorphism(index, item)"
                />
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteHaplotypePolymorphism(item.id)"
                />
              </div>
            </el-card>
          </el-main>
          <el-footer class="col-footer">
            <el-button
              type="primary"
              size="small"
              @click="handleEditHaplotypePolymorphism(-1)"
            >新增单倍型多态</el-button>
          </el-footer>
        </el-container>
      </el-col>
      <el-col
        :span="10"
        class="col-item-wrap"
        v-if="showHaplotypeSnpList">
        <el-container
          class="col-item-container"
        >
          <el-header class="col-title">单倍型SNP</el-header>
          <el-main class="col-item-wrap">
            <el-table
              :data="haplotypeSnpList"
              :highlight-current-row="true"
              style="width: 100%"
            >
              <template slot="append">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEditHaplotypeSnp(-1)"
                >新增单倍型SNP</el-button>
              </template>
              <el-table-column label="RSID" prop="rsid" />
              <el-table-column label="Allele" prop="allele" />
              <el-table-column label="Chromosome" prop="chromosome" />
              <el-table-column label="POS" prop="pos" />
              <el-table-column label="Operation" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleEditHaplotypeSnp(scope.$index, scope.row)"
                  />
                  <el-button
                    size="small"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDeleteHaplotypeSnp(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <el-header
      class="custom-header"
      v-if="showHaplotypePolymorphismList"
      >单倍型多态组合(根据单倍型多态自动计算)</el-header>
    <el-table
      :data="haplotypeInfo"
      border
      stripe
      :highlight-current-row="true"
      style="width:360px;"
      v-if="showHaplotypePolymorphismList">
      <template
        slot="append"
        v-if="haplotypeInfo.length===0"
      >
        <!-- <el-button
          size="mini"
          type="primary"
          @click="handleEditHaplotypeInfo(-1)"
        >新增一条数据</el-button> -->
        暂无数据，请先添加单倍型多态哦
      </template>
      <el-table-column prop="name" label="Haplotype" />
      <el-table-column prop="score" label="Score" />
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEditHaplotypeInfo(scope.$index, scope.row)"
          />
          <!-- <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDeleteHaplotypeInfo(scope.$index, scope.row)"
          /> -->
        </template>
      </el-table-column>
    </el-table>
    <el-header class="custom-header">等级临界值</el-header>
    <el-table
      :data="rsInterval"
      border
      stripe
      :highlight-current-row="true"
      style="width:500px;">
      <template v-if="rsInterval.length===0" slot="append">
        <el-button
          size="mini"
          type="primary"
          @click="handleBack()"
        >暂无数据，请先录入等级</el-button>
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
    <!-- 录入/修改 SNP RSID Based -->
    <el-dialog
      title="录入/修改 SNP RSID Based"
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
        <el-form-item label="SNP RSID" prop="rsid">
          <el-input
            v-model.trim="rsInfoForm.rsid"
            auto-complete="off"
            @keyup.enter.native="handleRsInfoGetRCP"
            placeholder="请输入 SNP RSID"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleRsInfoGetRCP" />
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
        <el-form-item label="Score 0 Effect Allele" prop="effect0">
          <el-input
            v-model.trim="rsInfoForm.effect0"
            auto-complete="off"
            placeholder="请输入 Score 0 Effect Allele"
          />
        </el-form-item>
        <el-form-item label="Score 1 Effect Allele" prop="effect1">
          <el-input
            v-model.trim="rsInfoForm.effect1"
            auto-complete="off"
            placeholder="请输入 Score 1 Effect Allele"
          />
        </el-form-item>
        <el-form-item label="Score 2 Effect Allele" prop="effect2">
          <el-input
            v-model.trim="rsInfoForm.effect2"
            auto-complete="off"
            placeholder="请输入 Score 2 Effect Allele"
          />
        </el-form-item>
        <el-form-item label="Weight" prop="weight">
          <el-input
            v-model.number="rsInfoForm.weight"
            auto-complete="off"
            placeholder="请输入 Weight"
          >
            <template v-if="rsInfoWeightPercent" slot="append">当前占比：{{rsInfoWeightPercent}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Sample Size" prop="sampleSize">
          <el-input
            v-model.trim="rsInfoForm.sampleSize"
            auto-complete="off"
            placeholder="请输入 Sample Size"
          />
        </el-form-item>
        <el-form-item label="Population" prop="population">
          <el-input
            v-model.trim="rsInfoForm.population"
            auto-complete="off"
            placeholder="请输入 Population"
          />
        </el-form-item>
        <el-form-item label="Odds Ratio" prop="oddsRatio">
          <el-input
            v-model.trim="rsInfoForm.oddsRatio"
            auto-complete="off"
            placeholder="请输入 Odds Ratio"
          />
        </el-form-item>
        <el-form-item label="P Value" prop="pValue">
          <el-input
            v-model.trim="rsInfoForm.pValue"
            auto-complete="off"
            placeholder="请输入 P Value"
          />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input
            v-model.trim="rsInfoForm.age"
            auto-complete="off"
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
        <el-form-item label="Comments" prop="comments">
          <el-input
            v-model.trim="rsInfoForm.comments"
            auto-complete="off"
            placeholder="请输入 Comments"
          />
        </el-form-item>
        <el-form-item label="PMID" prop="pmid">
          <el-input
            v-model.trim="rsInfoForm.pmid"
            auto-complete="off"
            placeholder="请输入 PMID"
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
    <!-- 录入/修改单倍型基因 -->
    <el-dialog
      title="录入/修改单倍型基因"
      width="400px"
      :visible.sync="showHaplotypeGeneForm"
      @close="() => {
        this.$refs['haplotypeGeneForm'].resetFields()
      }">
      <el-form
        :model="haplotypeGeneForm"
        :rules="haplotypeGeneFormRules"
        ref="haplotypeGeneForm"
        label-width="100px"
      >
        <el-form-item label="Gene" prop="gene">
          <el-input
            v-model.trim="haplotypeGeneForm.gene"
            auto-complete="off"
            placeholder="请输入 Gene"
          />
        </el-form-item>
        <el-form-item label="Weight" prop="weight">
          <el-input
            v-model.number="haplotypeGeneForm.weight"
            auto-complete="off"
            placeholder="请输入 Weight"
          >
            <template v-if="haplotypeGeneWeightPercent" slot="append">当前占比：{{haplotypeGeneWeightPercent}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Sample Size" prop="sampleSize">
          <el-input
            v-model.trim="haplotypeGeneForm.sampleSize"
            auto-complete="off"
            placeholder="请输入 Sample Size"
          />
        </el-form-item>
        <el-form-item label="Population" prop="population">
          <el-input
            v-model.trim="haplotypeGeneForm.population"
            auto-complete="off"
            placeholder="请输入 Population"
          />
        </el-form-item>
        <el-form-item label="Odds Ratio" prop="oddsRatio">
          <el-input
            v-model.trim="haplotypeGeneForm.oddsRatio"
            auto-complete="off"
            placeholder="请输入 Odds Ratio"
          />
        </el-form-item>
        <el-form-item label="P Value" prop="pValue">
          <el-input
            v-model.trim="haplotypeGeneForm.pValue"
            auto-complete="off"
            placeholder="请输入 P Value"
          />
        </el-form-item>
        <el-form-item label="PMID" prop="pmid">
          <el-input
            v-model.trim="haplotypeGeneForm.pmid"
            auto-complete="off"
            placeholder="请输入 PMID"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitHaplotypeGene"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入/修改单倍型多态 -->
    <el-dialog
      title="录入/修改单倍型多态"
      width="300px"
      :visible.sync="showHaplotypePolymorphismForm"
      @close="() => {
        this.$refs['haplotypePolymorphismForm'].resetFields()
      }">
      <el-form
        :model="haplotypePolymorphismForm"
        :rules="haplotypePolymorphismFormRules"
        ref="haplotypePolymorphismForm"
        label-position="top"
      >
        <el-form-item label="Polymorphism" prop="name">
          <el-input
            v-model.trim="haplotypePolymorphismForm.name"
            auto-complete="off"
            placeholder="请输入单倍型多态名称"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitHaplotypePolymorphism"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入/修改单倍型SNP -->
    <el-dialog
      title="录入/修改单倍型SNP"
      width="500px"
      :visible.sync="showHaplotypeSnpForm"
      @close="() => {
        this.$refs['haplotypeSnpForm'].resetFields()
      }">
      <el-form
        :model="haplotypeSnpForm"
        :rules="haplotypeSnpFormRules"
        ref="haplotypeSnpForm"
        label-width="155px"
      >
        <el-form-item label="Allele" prop="allele">
          <el-input
            v-model.trim="haplotypeSnpForm.allele"
            auto-complete="off"
            placeholder="请输入 Allele"
          />
        </el-form-item>
        <el-form-item label="RSID" prop="rsid">
          <el-input
            v-model.trim="haplotypeSnpForm.rsid"
            auto-complete="off"
            @keyup.enter.native="handleSnpGetRCP"
            placeholder="请输入 RSID"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click.enter="handleSnpGetRCP" />
          </el-input>
        </el-form-item>
        <el-form-item label="Chromosome" prop="chromosome">
          <el-input
            v-model="haplotypeSnpForm.chromosome"
            disabled
          />
        </el-form-item>
        <el-form-item label="POS" prop="pos">
          <el-input
            v-model.trim="haplotypeSnpForm.pos"
            disabled
          />
        </el-form-item>
        <el-form-item label="Gene" prop="gene">
          <el-input
            v-model.trim="haplotypeSnpForm.gene"
            disabled
          />
        </el-form-item>
        <el-form-item label="Forward Allele" prop="forwordAllele">
          <el-input
            v-model.trim="haplotypeSnpForm.forwordAllele"
            disabled
          />
        </el-form-item>
        <el-form-item label="标准芯片" prop="core">
          <el-input
            v-model.trim="haplotypeSnpForm.core"
            disabled
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitHaplotypeSnp"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改单倍型多态组合分值 -->
    <el-dialog
      title="修改分值"
      width="300px"
      :visible.sync="showHaplotypeInfoForm"
      @close="() => {
        this.$refs['haplotypeInfoForm'].resetFields()
      }">
      <el-form
        :model="haplotypeInfoForm"
        :rules="haplotypeInfoFormRules"
        ref="haplotypeInfoForm"
        label-width="50px"
      >
        <el-form-item label="Score" prop="score">
          <el-input
            v-model.trim="haplotypeInfoForm.score"
            auto-complete="off"
            placeholder="请输入 Score"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handleSubmitHaplotypeInfo"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 录入等级临界值 -->
    <el-dialog
      title="录入等级临界值"
      width="400px"
      :visible.sync="showRsIntervalForm"
      @close="() => {
        this.$refs['rsIntervalForm'].resetFields()
      }">
      <el-form
        :model="rsIntervalForm"
        :rules="rsIntervalFormRules"
        ref="rsIntervalForm"
        label-width="80px"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input
            v-model.trim="rsIntervalForm.name"
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
      title="PMID"
      :visible.sync="handleOpenDrugPmidListDialog"
      width="25%"
      class="pmid-select-dialog">
        <el-autocomplete
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
          class="tag-input"
        ></el-autocomplete>
        <el-tag
          class="pmid-search—tag"
          v-for="(tag, index) in operatePmid"
          :key="index"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          @click.native="handleGetDrugPmid(tag)">{{tag}}</el-tag>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleOpenDrugPmidListDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="PMID详情"
      :visible.sync="handlePmidSelectDialog"
      width="25%"
      class="pmid-select-dialog"
      :before-close="handlePmidClose">
      <p>sampleSize：<span class="pmid-dialog-text">{{pmidInfo.sampleSize}}</span></p>
      <p>population：<span class="pmid-dialog-text">{{pmidInfo.population}}</span></p>
      <p>age：<span class="pmid-dialog-text">{{pmidInfo.age}}</span></p>
      <p>gender：<span class="pmid-dialog-text">{{pmidInfo.gender}}</span></p>
      <p>rank：<span class="pmid-dialog-text">{{pmidInfo.numStar}}</span></p>
      <p>标题：<span class="pmid-dialog-text">{{pmidInfo.title}}</span></p>
      <p>链接：<span class="pmid-dialog-text">{{pmidInfo.link}}</span></p>
      <p>comments：<span class="pmid-dialog-text key-result">{{pmidInfo.comments}}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlePmidSelectDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  getRCP,
  getHaplotypeGeneList,
  addHaplotypeGene,
  updateHaplotypeGene,
  deleteHaplotypeGene,
  getHaplotypePolymorphismList,
  addHaplotypePolymorphism,
  updateHaplotypePolymorphism,
  deleteHaplotypePolymorphism,
  getHaplotypeSnpList,
  addHaplotypeSnp,
  updateHaplotypeSnp,
  deleteHaplotypeSnp,
  getDrugEffectPhenotype,
  updateDrugEffectPhenotype,
  getDrugEffectRsInfo,
  addDrugEffectRsInfo,
  updateDrugEffectRsInfo,
  deleteDrugEffectRsInfo,
  getDrugEffectHaplotypeInfo,
  updateDrugEffectHaplotypeInfo,
  getDrugEffectLevelList,
  updateDrugEffectLevelInterval,
  getDrugPmidArr,
  getDrugPimdTagInfo
} from '../server'
import {
  sumArray
} from '../common/utils'
export default {
  name: 'PhenoRules',
  data () {
    return {
      restaurants: [],
      operatePmid: [],
      state4: '',
      pmidInfo: {
        sampleSize: '',
        population: '',
        age: '',
        comments: '',
        numStar: '',
        title: '',
        link: ''
      },
      effectId: '',
      rsInfo: [],
      rsInterval: [],
      // Effect Phenotype
      epForm: {
        effectPhenotype: '',
        online: -1
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
      // SNP RSID based
      showRsInfoForm: false,
      handleOpenDrugPmidListDialog: false,
      handlePmidSelectDialog: false,
      rsInfoWeightPercent: '',
      editRsInfoIndex: -1,
      genderOptions: ['male', 'female'],
      rsInfoForm: {
        rsid: '',
        chromosome: '',
        pos: '',
        gene: '',
        forwordAllele: '',
        core: '',
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
        pmid: ''
      },
      rsInfoFormRules: {
        rsid: [{
          required: true,
          message: '请输入 SNP RSID',
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
        }, {
          type: 'number',
          message: 'Weight 必须为数字值'
        }],
        pmid: [{
          required: true,
          message: '请输入 PMID',
          trigger: 'blur'
        }]
      },
      // 单倍型基因
      haplotypeGeneList: [],
      activePaplotypeGeneId: 0,
      editHaplotypeGeneIndex: -1,
      showHaplotypeGeneForm: false,
      haplotypeGeneWeightPercent: '',
      haplotypeGeneForm: {
        gene: '',
        weight: '',
        sampleSize: '',
        population: '',
        oddsRatio: '',
        pValue: '',
        pmid: ''
      },
      haplotypeGeneFormRules: {
        gene: [{
          required: true,
          message: '请输入 Gene',
          trigger: 'blur'
        }],
        weight: [{
          required: true,
          message: '请输入 Weight',
          trigger: 'blur'
        }, {
          type: 'number',
          message: 'Weight 必须为数字值'
        }],
        pmid: [{
          required: true,
          message: '请输入 PMID',
          trigger: 'blur'
        }]
      },
      // 单倍型多态
      haplotypePolymorphismList: [],
      showHaplotypePolymorphismList: false,
      activeHaplotypePolymorphismId: 0,
      editHaplotypePolymorphismIndex: -1,
      showHaplotypePolymorphismForm: false,
      haplotypePolymorphismForm: {
        name: ''
      },
      haplotypePolymorphismFormRules: {
        name: [{
          required: true,
          message: '请输入多态名称',
          trigger: 'blur'
        }]
      },
      showHaplotypeSnpList: false,
      // 单倍型SNP
      haplotypeSnpList: [],
      editHaplotypeSnpIndex: -1,
      showHaplotypeSnpForm: false,
      haplotypeSnpForm: {
        allele: '',
        rsid: '',
        chromosome: '',
        pos: '',
        gene: '',
        forwordAllele: '',
        core: ''
      },
      haplotypeSnpFormRules: {
        allele: [{
          required: true,
          message: '请输入 Allele',
          trigger: 'blur'
        }],
        rsid: [{
          required: true,
          message: '请输入 RSID',
          trigger: 'blur'
        }]
      },
      // 单倍型多态组合
      haplotypeInfo: [],
      showHaplotypeInfoForm: false,
      haplotypeInfoWeightPercent: '',
      editHaplotypeInfoIndex: -1,
      haplotypeInfoForm: {
        score: ''
      },
      haplotypeInfoFormRules: {
        score: [{
          required: true,
          message: '请输入 Score',
          trigger: 'blur'
        }]
      },
      // 等级
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
        }, {
          type: 'number',
          message: '下限值必须为数字值'
        }],
        max: [{
          required: true,
          message: '请输入上限值',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '上限值必须为数字值'
        }]
      }
    }
  },
  mounted () {
    this.effectId = this.$route.params.id
    this.getDrugEffectPhenotype()
    this.getDrugEffectRsInfo()
    this.getDrugEffectLevelList()
    this.getHaplotypeGeneList()
  },
  methods: {
    getDrugEffectPhenotype () {
      getDrugEffectPhenotype({
        effectId: this.effectId
      }).then(res => {
        if (!res.status) {
          this.epForm = res.data
        }
      })
    },
    getDrugEffectRsInfo () {
      getDrugEffectRsInfo({
        effectId: this.effectId
      }).then(res => {
        if (!res.status) {
          this.rsInfo = res.data
        }
      })
    },
    getDrugEffectHaplotypeInfo () {
      getDrugEffectHaplotypeInfo({
        geneId: this.activePaplotypeGeneId
      }).then(res => {
        if (!res.status) {
          this.haplotypeInfo = res.data
        }
      })
    },
    getDrugEffectLevelList () {
      getDrugEffectLevelList({
        effectId: this.effectId
      }).then(res => {
        if (!res.status) {
          this.rsInterval = res.data
        }
      })
    },
    getHaplotypeGeneList () {
      getHaplotypeGeneList({
        effectId: this.effectId
      }).then(res => {
        if (!res.status) {
          this.haplotypeGeneList = res.data
          this.showHaplotypePolymorphismList = false
          this.showHaplotypeSnpList = false
        }
      })
    },
    getHaplotypePolymorphismList () {
      getHaplotypePolymorphismList({
        geneId: this.activePaplotypeGeneId
      }).then(res => {
        if (!res.status) {
          this.haplotypePolymorphismList = res.data
          this.showHaplotypePolymorphismList = true
          this.showHaplotypeSnpList = false
        }
      })
    },
    getHaplotypeSnpList () {
      getHaplotypeSnpList({
        polymorphismId: this.activeHaplotypePolymorphismId
      }).then(res => {
        if (!res.status) {
          this.haplotypeSnpList = res.data
          this.showHaplotypeSnpList = true
        } else {
          this.showHaplotypeSnpList = true
        }
      })
    },
    onSubmitEp () {
      this.$refs['epForm'].validate(valid => {
        if (valid) {
          updateDrugEffectPhenotype({
            effectId: this.effectId,
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
                message: res.msg || '更新失败',
                type: 'error',
                duration: 5000
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
            updateDrugEffectRsInfo({
              ...this.rsInfoForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                // 刷新列表
                this.getDrugEffectRsInfo()
                this.handleResetRsInfoForm()
              } else {
                this.$message({
                  message: res.msg || '更新失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addDrugEffectRsInfo({
              effectId: this.effectId,
              ...this.rsInfoForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                // 刷新列表
                this.getDrugEffectRsInfo()
                this.handleResetRsInfoForm()
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
    handleDeleteRsInfo (row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteDrugEffectRsInfo({
          id: row.id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getDrugEffectRsInfo()
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
    handleResetHaplotypeGeneForm () {
      this.$refs['haplotypeGeneForm'].resetFields()
      this.showHaplotypeGeneForm = false
    },
    handleHaplotypeGeneRowClick (row) {
      this.showHaplotypePolymorphismList = false
      this.activePaplotypeGeneId = row.id
      this.getHaplotypePolymorphismList()
      this.getDrugEffectHaplotypeInfo()
    },
    handleEditHaplotypeGene (index, row) {
      this.editHaplotypeGeneIndex = index
      this.haplotypeGeneForm = row ? Object.assign({}, row) : {}
      this.showHaplotypeGeneForm = true
    },
    handleSubmitHaplotypeGene () {
      this.$refs['haplotypeGeneForm'].validate(valid => {
        if (valid) {
          // 编辑
          if (this.editHaplotypeGeneIndex > -1) {
            updateHaplotypeGene({
              ...this.haplotypeGeneForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                // 更新列表
                this.getHaplotypeGeneList()
                // 重置表单
                this.handleResetHaplotypeGeneForm()
              } else {
                this.$message({
                  message: res.msg || '更新失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addHaplotypeGene({
              effectId: this.effectId,
              ...this.haplotypeGeneForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                // 更新列表
                this.getHaplotypeGeneList()
                // 重置表单
                this.handleResetHaplotypeGeneForm()
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
    handleDeleteHaplotypeGene (row) {
      this.$confirm('确定删除单倍型基因吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteHaplotypeGene({
          id: row.id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getHaplotypeGeneList()
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
    handleResetHaplotypeInfoForm () {
      this.$refs['haplotypeInfoForm'].resetFields()
      this.showHaplotypeInfoForm = false
    },
    handleEditHaplotypeInfo (index, row) {
      this.editHaplotypeInfoIndex = index
      this.haplotypeInfoForm = row ? Object.assign({}, row) : {}
      this.showHaplotypeInfoForm = true
    },
    handleSubmitHaplotypeInfo () {
      this.$refs['haplotypeInfoForm'].validate(valid => {
        if (valid) {
          // 编辑
          updateDrugEffectHaplotypeInfo({
            haplotype1: this.haplotypeInfoForm.haplotype1,
            haplotype2: this.haplotypeInfoForm.haplotype2,
            score: this.haplotypeInfoForm.score
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
              // 刷新列表
              this.getDrugEffectHaplotypeInfo()
              this.handleResetHaplotypeInfoForm()
            } else {
              this.$message({
                message: res.msg || '更新失败',
                type: 'error',
                duration: 5000
              })
            }
          })
          // if (this.editHaplotypeInfoIndex > -1) {
          //   updateDrugEffectHaplotypeInfo({
          //     ...this.haplotypeInfoForm
          //   }).then(res => {
          //     if (!res.status) {
          //       this.$message({
          //         type: 'success',
          //         message: '更新成功'
          //       })
          //       // 刷新列表
          //       this.getDrugEffectHaplotypeInfo()
          //     } else {
          //       this.$message({
          //         message: res.msg || '更新失败',
          //         type: 'error',
          //         duration: 5000
          //       })
          //     }
          //   })
          // } else {
          //   addDrugEffectHaplotypeInfo({
          //     effectId: this.effectId,
          //     ...this.haplotypeInfoForm
          //   }).then(res => {
          //     if (!res.status) {
          //       this.$message({
          //         type: 'success',
          //         message: '新增成功'
          //       })
          //       // 刷新列表
          //       this.getDrugEffectHaplotypeInfo()
          //     } else {
          //       this.$message({
          //         message: res.msg || '新增失败',
          //         type: 'error',
          //         duration: 5000
          //       })
          //     }
          //   })
          // }
        }
      })
    },
    // handleDeleteHaplotypeInfo (index, row) {
    //   this.$confirm('确定删除吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     // 请求删除
    //     deleteDrugEffectHaplotypeInfo({
    //       id: row.id
    //     }).then(res => {
    //       if (!res.status) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功'
    //         })
    //         // 刷新列表
    //         this.getDrugEffectHaplotypeInfo()
    //       } else {
    //         this.$message({
    //           message: res.msg || '删除失败',
    //           type: 'error',
    //           duration: 5000
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    handleSelectHaplotypePolymorphism (index, id, active) {
      if (active) {
        return
      }
      this.haplotypePolymorphismList = this.haplotypePolymorphismList.map(item => {
        item.active = false
        return item
      })
      this.activeHaplotypePolymorphismId = id
      this.haplotypePolymorphismList[index].active = true
      this.getHaplotypeSnpList(id)
    },
    handleResetHaplotypePolymorphismForm () {
      this.$refs['haplotypePolymorphismForm'].resetFields()
      this.showHaplotypePolymorphismForm = false
    },
    handleEditHaplotypePolymorphism (index, row) {
      this.editHaplotypePolymorphismIndex = index
      this.haplotypePolymorphismForm = row ? Object.assign({}, row) : {}
      this.showHaplotypePolymorphismForm = true
    },
    handleSubmitHaplotypePolymorphism () {
      this.$refs['haplotypePolymorphismForm'].validate(valid => {
        if (valid) {
          if (this.editHaplotypePolymorphismIndex > -1) {
            updateHaplotypePolymorphism({
              id: this.haplotypePolymorphismForm.id,
              name: this.haplotypePolymorphismForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                // 刷新列表
                this.getHaplotypePolymorphismList()
                this.getDrugEffectHaplotypeInfo()
                this.handleResetHaplotypePolymorphismForm()
              } else {
                this.$message({
                  message: res.msg || '更新失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addHaplotypePolymorphism({
              geneId: this.activePaplotypeGeneId,
              name: this.haplotypePolymorphismForm.name
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                // 刷新列表
                this.getHaplotypePolymorphismList()
                this.getDrugEffectHaplotypeInfo()
                this.handleResetHaplotypePolymorphismForm()
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
    handleDeleteHaplotypePolymorphism (id) {
      this.$confirm('确定删除单倍型多态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteHaplotypePolymorphism({
          id: id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getHaplotypePolymorphismList()
            this.getDrugEffectHaplotypeInfo()
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
    handleResetHaplotypeSnpForm () {
      this.$refs['haplotypeSnpForm'].resetFields()
      this.showHaplotypeSnpForm = false
    },
    handleEditHaplotypeSnp (index, row) {
      this.editHaplotypeSnpIndex = index
      this.haplotypeSnpForm = row ? Object.assign({}, row) : {
        allele: '',
        rsid: '',
        chromosome: '',
        pos: '',
        gene: '',
        forwordAllele: '',
        core: ''
      }
      this.showHaplotypeSnpForm = true
    },
    handleSubmitHaplotypeSnp () {
      this.$refs['haplotypeSnpForm'].validate(valid => {
        if (valid) {
          // 编辑
          if (this.editHaplotypeSnpIndex > -1) {
            updateHaplotypeSnp({
              ...this.haplotypeSnpForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '更新成功'
                })
                // 更新列表
                this.getHaplotypeSnpList()
                // 重置表单
                this.handleResetHaplotypeSnpForm()
              } else {
                this.$message({
                  message: res.msg || '更新失败',
                  type: 'error',
                  duration: 5000
                })
              }
            })
          } else {
            addHaplotypeSnp({
              polymorphismId: this.activeHaplotypePolymorphismId,
              ...this.haplotypeSnpForm
            }).then(res => {
              if (!res.status) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                // 更新列表
                this.getHaplotypeSnpList()
                // 重置表单
                this.handleResetHaplotypeSnpForm()
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
    handleDeleteHaplotypeSnp (row) {
      this.$confirm('确定删除单倍型基因吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteHaplotypeSnp({
          id: row.id
        }).then(res => {
          if (!res.status) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.getHaplotypeSnpList()
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
    handleResetRsIntervalForm () {
      this.$refs['rsIntervalForm'].resetFields()
      this.showRsIntervalForm = false
    },
    handleEditInterval (index, row) {
      this.rsIntervalForm = Object.assign({}, row)
      this.showRsIntervalForm = true
    },
    handleSubmitRsInterval () {
      this.$refs['rsIntervalForm'].validate(valid => {
        if (valid) {
          updateDrugEffectLevelInterval({
            effectId: this.effectId,
            ...this.rsIntervalForm
          }).then(res => {
            if (!res.status) {
              this.$message({
                type: 'success',
                message: '更新成功'
              })
              this.handleResetRsIntervalForm()
              // 刷新列表
              this.getDrugEffectLevelList()
            } else {
              this.$message({
                message: res.msg || '更新失败',
                type: 'error',
                duration: 5000
              })
            }
          })
        }
      })
    },
    handleBack () {
      this.$router.go(-1)
    },
    handleFormatterWeight (row) {
      // 计算权重总和
      let weights = this.rsInfo.map(item => {
        return item.weight
      })
      let haplotypeGeneWeights = this.haplotypeGeneList.map(item => {
        return item.weight
      })
      let totalWeight = sumArray(weights) + sumArray(haplotypeGeneWeights)
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
    handleRsInfoGetRCP () {
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
          this.$forceUpdate()
        })
      }
    },
    handleSnpGetRCP () {
      if (this.haplotypeSnpForm.rsid && this.haplotypeSnpForm.rsid.length > 2) {
        getRCP({
          rsid: this.haplotypeSnpForm.rsid.toString().toLowerCase()
        }).then(res => {
          if (!res.status) {
            this.haplotypeSnpForm.chromosome = res.data.chromosome
            this.haplotypeSnpForm.pos = res.data.pos
            this.haplotypeSnpForm.gene = res.data.gene
            this.haplotypeSnpForm.forwordAllele = res.data.forwordAllele
            this.haplotypeSnpForm.core = res.data.core
          } else {
            this.haplotypeSnpForm.chromosome = ''
            this.haplotypeSnpForm.pos = ''
            this.haplotypeSnpForm.gene = ''
            this.haplotypeSnpForm.forwordAllele = ''
            this.haplotypeSnpForm.core = ''
          }
          this.$forceUpdate()
        })
      }
    },
    handleGetDrugPmidList (id, type) {
      getDrugPmidArr({
        id: id,
        type: type
      }).then(res => {
        if (!res.status) {
          this.restaurants = res.data.allPmid || []
          this.operatePmid = res.data.operatePmid || []
          this.handleOpenDrugPmidListDialog = true
        } else {
          this.restaurants = []
          this.operatePmid = []
        }
      })
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants.map(item => {
        return {value: item, label: item}
      })
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      cb(results)
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.operatePmid.push(item.value)
    },
    handleClose (tag) {
      this.operatePmid.splice(this.operatePmid.indexOf(tag), 1)
    },
    handleGetDrugPmid (pmid) {
      getDrugPimdTagInfo({
        pmid: pmid
      }).then(res => {
        if (!res.status) {
          this.pmidInfo.sampleSize = res.data.sampleSize
          this.pmidInfo.population = res.data.population
          this.pmidInfo.age = res.data.age
          this.pmidInfo.gender = res.data.gender
          this.pmidInfo.comments = res.data.comments
          this.pmidInfo.title = res.data.title
          this.pmidInfo.link = res.data.link
          this.pmidInfo.numStar = res.data.numStar
          this.handlePmidSelectDialog = true
        } else {
          this.pmidInfo.sampleSize = ''
          this.pmidInfo.population = ''
          this.pmidInfo.age = ''
          this.pmidInfo.gender = ''
          this.pmidInfo.comments = ''
          this.pmidInfo.numStar = ''
          this.pmidInfo.title = ''
          this.pmidInfo.link = ''
        }
      })
    },
    handlePmidClose () {
      this.handlePmidSelectDialog = false
    }
  },
  watch: {
    'rsInfoForm.weight': function (val) {
      let weights = []
      if (this.editRsInfoIndex > -1) {
        weights = this.rsInfo.map((item, index) => {
          return this.editRsInfoIndex !== index && item.weight
        })
      } else {
        weights = this.rsInfo.map(item => {
          return item.weight
        })
      }
      let haplotypeGeneWeights = this.haplotypeGeneList.map(item => {
        return item.weight
      })
      let totalWeight = sumArray(weights) + val + sumArray(haplotypeGeneWeights)
      this.rsInfoWeightPercent = this.calculateWeightPercent(val, totalWeight)
    },
    'haplotypeGeneForm.weight': function (val) {
      let haplotypeGeneWeights = []
      if (this.editHaplotypeGeneIndex === -1) {
        haplotypeGeneWeights = this.haplotypeGeneList.map(item => {
          return item.weight
        })
      } else {
        haplotypeGeneWeights = this.haplotypeGeneList.map((item, index) => {
          return this.editHaplotypeGeneIndex !== index && item.weight
        })
      }
      let rsInfoWeights = this.rsInfo.map(item => {
        return item.weight
      })
      let totalWeight = sumArray(haplotypeGeneWeights) + val + sumArray(rsInfoWeights)
      this.haplotypeGeneWeightPercent = this.calculateWeightPercent(val, totalWeight)
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
      //   this.handleRsInfoGetRCP()
      // }
    },
    'haplotypeSnpForm.rsid': function (nextVal, prevVal) {
      if (nextVal === '') {
        this.haplotypeSnpForm.chromosome = ''
        this.haplotypeSnpForm.pos = ''
        this.haplotypeSnpForm.gene = ''
        this.haplotypeSnpForm.forwordAllele = ''
        this.haplotypeSnpForm.core = ''
      }
      // if (nextVal !== prevVal) {
      //   this.handleSnpGetRCP()
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
  font-weight: 700;
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
.col-item-container {
  border: 1px solid #ebeef5;
  margin-right: 10px;
  max-height: 100%;
  overflow-y: scroll;
}
.col-title {
  height: auto!important;
  padding: 0;
  margin: 10px;
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
  margin: 10px;
}
.col-item-wrap {
  max-height: 80%;
  overflow-y: scroll;
  padding: 0;
}
.col-item-op {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.col-item-wrap >>> .el-card__body {
  padding: 0 15px;
}
.col-item-name {
  font-weight: 700;
}
.col-item-row {
  margin: 20px 0;
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
.pmid-search—tag {
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.pmid-select-dialog >>> .el-dialog__body  {
  padding: 0px 20px;
}
.tag-input {
  display: block;
}
</style>
