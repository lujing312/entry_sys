import axios from './axios'
import config from './config'

// 获取分类和表型
export const getCategoryList = params => {
  return axios.get(config.getCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取表型列表
export const getPhenoList = params => {
  return axios.get(config.getPhenoList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 根据表型 id 得到表型基本信息
export const getPhenoInfo = params => {
  return axios.get(config.getPhenoInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 查询表型下所有组下所有图文
export const getPhenoGroup = params => {
  return axios.get(config.getPhenoGroup, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 根据图文 id 获取图文列表
export const getPhenoArticle = params => {
  return axios.get(config.getPhenoArticle, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增分类
export const addCategory = params => {
  return axios.post(config.addCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑分类
export const updateCategory = params => {
  return axios.post(config.updateCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 分类排序
export const rankCategory = params => {
  return axios.post(config.rankCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const rankDiseaseCategory = params => {
  return axios.post(config.rankDiseaseCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除分类
export const deleteCategory = params => {
  return axios.post(config.deleteCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取二级分类
export const getSecondCategoryList = params => {
  return axios.get(config.getSecondCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增二级分类
export const addSecondCategory = params => {
  return axios.post(config.addSecondCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const addSecondInheritCategory = params => {
  return axios.post(config.addSecondInheritCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑二级分类
export const updateSecondCategory = params => {
  return axios.post(config.updateCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 二级分类排序
export const rankSecondCategory = params => {
  return axios.post(config.rankCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除二级分类
export const deleteSecondCategory = params => {
  return axios.post(config.deleteCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const getAllSecondCategoryList = params => {
  return axios.get(config.getAllSecondCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const updatePhenotypeSecondCategory = params => {
  return axios.post(config.updatePhenotypeSecondCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增表型
export const addPhenotype = params => {
  return axios.post(config.addPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const addInheritPhenotype = params => {
  return axios.post(config.addInheritPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑表型
export const updatePhenotype = params => {
  return axios.post(config.updatePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 表型排序
export const rankPhenotype = params => {
  return axios.post(config.rankPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除表型
export const deletePhenotype = params => {
  return axios.post(config.deletePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增表型等级
export const addLevel = params => {
  return axios.post(config.addLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 排序表型等级
export const rankLevel = params => {
  return axios.post(config.rankLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑表型等级
export const updateLevel = params => {
  return axios.post(config.updateLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑表型等级色值
export const updateLevelORColor = params => {
  return axios.post(config.updateLevelORColor, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除表型等级
export const deleteLevel = params => {
  return axios.post(config.deleteLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增图文
export const addArticle = params => {
  return axios.post(config.addArticle, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑图文
export const updateArticle = params => {
  return axios.post(config.updateArticle, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 排序图文
export const rankArticle = params => {
  return axios.post(config.rankArticle, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除图文
export const deleteArticle = params => {
  return axios.post(config.deleteArticle, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取预览图文
export const getPreviewArtcle = params => {
  return axios.get(config.getPreviewArtcle, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 查询某表型下的基因信息
export const getRsInfo = params => {
  return axios.get(config.getRsInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增某表型下的基因信息
export const addRsInfo = params => {
  return axios.post(config.addRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取 Effect Phenotye 值
export const getEp = params => {
  return axios.get(config.getEp, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更新 Effect Phenotye 值
export const updateEp = params => {
  return axios.post(config.updateEp, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 根据 rsid 获取 chromosome 和 pos
export const getRCP = params => {
  return axios.get(config.getRCP, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更新某表型下的基因信息
export const updateRsInfo = params => {
  return axios.post(config.updateRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除某表型下的基因信息
export const deleteRsInfo = params => {
  return axios.post(config.deleteRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 查询某表型下的临界值
export const getRsInterval = params => {
  return axios.get(config.getRsInterval, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更新某表型下的临界值
export const updateRsInterval = params => {
  return axios.post(config.updateRsInterval, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新SNP状态
export const updateRsInfoStatus = params => {
  return axios.post(config.updateRsInfoStatus, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const getORDistributed = params => {
  return axios.get(config.getORDistributed, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物分类列表
export const getDrugCategoryList = params => {
  return axios.get(config.getDrugCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物分类
export const addDrugCategory = params => {
  return axios.post(config.addDrugCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物分类
export const updateDrugCategory = params => {
  return axios.post(config.updateDrugCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物分类
export const deleteDrugCategory = params => {
  return axios.post(config.deleteDrugCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物列表
export const getDrugMedicineList = params => {
  return axios.get(config.getDrugMedicineList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取单个药物
export const getDrugMedicineInfo = params => {
  return axios.get(config.getDrugMedicineInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物
export const addDrugMedicine = params => {
  return axios.post(config.addDrugMedicine, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物
export const updateDrugMedicine = params => {
  return axios.post(config.updateDrugMedicine, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物
export const deleteDrugMedicine = params => {
  return axios.post(config.deleteDrugMedicine, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取成分已关联商品列表
export const getDrugRelateProductList = params => {
  return axios.get(config.getDrugRelateProductList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取所有药物成分列表
export const getAllDrugCategoryList = params => {
  return axios.get(config.getAllDrugCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 修改药物成分分类
export const moveDrugCategory = params => {
  return axios.post(config.moveDrugCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物作用类型列表
export const getDrugEffectList = params => {
  return axios.get(config.getDrugEffectList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物作用类型
export const addDrugEffect = params => {
  return axios.post(config.addDrugEffect, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物作用类型
export const updateDrugEffect = params => {
  return axios.post(config.updateDrugEffect, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物作用类型
export const deleteDrugEffect = params => {
  return axios.post(config.deleteDrugEffect, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取单个药物作用类型
export const getDrugEffectInfo = params => {
  return axios.get(config.getDrugEffectInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物作用类型等级
export const addDrugEffectLevel = params => {
  return axios.post(config.addDrugEffectLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物作用类型等级
export const updateDrugEffectLevel = params => {
  return axios.post(config.updateDrugEffectLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 排序药物作用类型等级
export const rankDrugEffectLevel = params => {
  return axios.post(config.rankDrugEffectLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物作用类型等级
export const deleteDrugEffectLevel = params => {
  return axios.post(config.deleteDrugEffectLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取单倍型基因列表
export const getHaplotypeGeneList = params => {
  return axios.get(config.getHaplotypeGeneList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增单倍型基因
export const addHaplotypeGene = params => {
  return axios.post(config.addHaplotypeGene, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新单倍型基因
export const updateHaplotypeGene = params => {
  return axios.post(config.updateHaplotypeGene, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除单倍型基因
export const deleteHaplotypeGene = params => {
  return axios.post(config.deleteHaplotypeGene, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取单倍型列表
export const getHaplotypePolymorphismList = params => {
  return axios.get(config.getHaplotypePolymorphismList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增单倍型
export const addHaplotypePolymorphism = params => {
  return axios.post(config.addHaplotypePolymorphism, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新单倍型
export const updateHaplotypePolymorphism = params => {
  return axios.post(config.updateHaplotypePolymorphism, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除单倍型
export const deleteHaplotypePolymorphism = params => {
  return axios.post(config.deleteHaplotypePolymorphism, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取单倍型SNP列表
export const getHaplotypeSnpList = params => {
  return axios.get(config.getHaplotypeSnpList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增单倍型SNP
export const addHaplotypeSnp = params => {
  return axios.post(config.addHaplotypeSnp, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新单倍型SNP
export const updateHaplotypeSnp = params => {
  return axios.post(config.updateHaplotypeSnp, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除单倍型SNP
export const deleteHaplotypeSnp = params => {
  return axios.post(config.deleteHaplotypeSnp, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物 Effect Phenotype
export const getDrugEffectPhenotype = params => {
  return axios.get(config.getDrugEffectPhenotype, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物 Effect Phenotype
export const updateDrugEffectPhenotype = params => {
  return axios.post(config.updateDrugEffectPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物 RsInfo
export const getDrugEffectRsInfo = params => {
  return axios.get(config.getDrugEffectRsInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物 RsInfo
export const addDrugEffectRsInfo = params => {
  return axios.post(config.addDrugEffectRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物 RsInfo
export const updateDrugEffectRsInfo = params => {
  return axios.post(config.updateDrugEffectRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物 RsInfo
export const deleteDrugEffectRsInfo = params => {
  return axios.post(config.deleteDrugEffectRsInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物单倍型信息
export const getDrugEffectHaplotypeInfo = params => {
  return axios.get(config.getDrugEffectHaplotypeInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物单倍型信息
export const addDrugEffectHaplotypeInfo = params => {
  return axios.post(config.addDrugEffectHaplotypeInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物单倍型信息
export const updateDrugEffectHaplotypeInfo = params => {
  return axios.post(config.updateDrugEffectHaplotypeInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物单倍型信息
export const deleteDrugEffectHaplotypeInfo = params => {
  return axios.post(config.deleteDrugEffectHaplotypeInfo, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物作用类型等级列表
export const getDrugEffectLevelList = params => {
  return axios.get(config.getDrugEffectLevelList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物作用类型等级上下限
export const updateDrugEffectLevelInterval = params => {
  return axios.post(config.updateDrugEffectLevelInterval, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 查询chatbot列表
export const getChatbotList = params => {
  return axios.get(config.getChatbotList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增 chatbot 记录
export const addChatbotItem = params => {
  return axios.post(config.addChatbotItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑 chatbot 记录
export const updateChatbotItem = params => {
  return axios.post(config.updateChatbotItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除 chatbot 记录
export const deleteChatbotItem = params => {
  return axios.post(config.deleteChatbotItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取 chatbot 可被复制列表
export const getChatbotCopyList = params => {
  return axios.get(config.getChatbotCopyList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 复制 chatbot 节点
export const copyChatbotNode = params => {
  return axios.post(config.copyChatbotNode, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 复制 chatbot 等级下所有节点
export const copyChatbotLevel = params => {
  return axios.post(config.copyChatbotLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物商品一级分类列表
export const getMedicineFirstCategoryList = params => {
  return axios.get(config.getMedicineFirstCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物商品一级分类
export const addMedicineFirstCategory = params => {
  return axios.post(config.addMedicineFirstCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物商品一级分类
export const updateMedicineCategory = params => {
  return axios.post(config.updateMedicineCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物商品一级分类
export const deleteMedicineCategory = params => {
  return axios.post(config.deleteMedicineCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物商品二级分类列表
export const getMedicineSecondCategoryList = params => {
  return axios.get(config.getMedicineSecondCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物商品二级分类
export const addMedicineSecondCategory = params => {
  return axios.post(config.addMedicineSecondCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物通用名称列表
export const getMedicineNameList = params => {
  return axios.get(config.getMedicineNameList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const getDrugList = params => {
  return axios.get(config.getDrugList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const getRelateDrugList = params => {
  return axios.get(config.getRelateDrugList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const relateDrug = params => {
  return axios.post(config.relateDrug, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物通用名称
export const addMedicineName = params => {
  return axios.post(config.addMedicineName, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物通用名称
export const updateMedicineName = params => {
  return axios.post(config.updateMedicineName, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物通用名称
export const deleteMedicineName = params => {
  return axios.post(config.deleteMedicineName, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取药物商品列表
export const getMedicineProductList = params => {
  return axios.get(config.getMedicineProductList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增药物商品
export const addMedicineProduct = params => {
  return axios.post(config.addMedicineProduct, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新药物商品
export const updateMedicineProduct = params => {
  return axios.post(config.updateMedicineProduct, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除药物商品
export const deleteMedicineProduct = params => {
  return axios.post(config.deleteMedicineProduct, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取PMID列表
export const getPmidSearchList = params => {
  return axios.get(config.getPmidSearchList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 删除PMID列表
export const deletePmidSearchItem = params => {
  return axios.post(config.deletePmidSearchItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增PMID列表
export const addPmidSearchItem = params => {
  return axios.post(config.addPmidSearchItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑PMID列表
export const updatePmidSearchItem = params => {
  return axios.post(config.updatePmidSearchItem, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取分类和疾病
export const getDiseaseCategoryList = params => {
  return axios.get(config.getDiseaseCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取疾病列表
export const getDiseaseList = params => {
  return axios.get(config.getDiseaseList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 根据表型 id 得到疾病基本信息
export const getDiseaseInfo = params => {
  return axios.get(config.getDiseaseInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增疾病分类
export const addDiseaseCategory = params => {
  return axios.post(config.addDiseaseCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑疾病分类
export const updateDiseaseCategory = params => {
  return axios.post(config.updateDiseaseCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除疾病分类
export const deleteDiseaseCategory = params => {
  return axios.post(config.deleteDiseaseCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取疾病二级列表
export const getSecondDiseaseCategoryList = params => {
  return axios.get(config.getSecondDiseaseCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 新增二级疾病分类
export const addSecondDiseaseCategory = params => {
  return axios.post(config.addSecondDiseaseCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增疾病表型
export const addDiseasePhenotype = params => {
  return axios.post(config.addDiseasePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 更新疾病表型
export const updateDiseasePhenotype = params => {
  return axios.post(config.updateDiseasePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 疾病表型排序
export const rankDiseasePhenotype = params => {
  return axios.post(config.rankDiseasePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 疾病表型删除
export const deleteDiseasePhenotype = params => {
  return axios.post(config.deleteDiseasePhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增疾病等级
export const addDiseaseLevel = params => {
  return axios.post(config.addDiseaseLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 排序疾病等级
export const rankDiseaseLevel = params => {
  return axios.post(config.rankDiseaseLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑疾病等级
export const updateDiseaseLevel = params => {
  return axios.post(config.updateDiseaseLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑疾病等级颜色
export const updateDiseaseLevelORColor = params => {
  return axios.post(config.updateDiseaseLevelORColor, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除疾病等级
export const deleteDiseaseLevel = params => {
  return axios.post(config.deleteDiseaseLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取疾病预览图文
export const getPreviewDiseaseArtcle = params => {
  return axios.get(config.getPreviewDiseaseArtcle, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const getAllDiseaseSecondCategoryList = params => {
  return axios.get(config.getAllDiseaseSecondCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const updateDiseasetypeSecondCategory = params => {
  return axios.post(config.updateDiseasetypeSecondCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取遗传列表分类
export const getInheritCategoryList = params => {
  return axios.get(config.getInheritCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取疾病列表
export const getInheritList = params => {
  return axios.get(config.getInheritList, {params})
    .then(res => res.data, err => Promise.reject(err))
}

// 新增遗传
export const addInheritCategory = params => {
  return axios.post(config.addInheritCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑遗传分类
export const updateInheritCategory = params => {
  return axios.post(config.updateInheritCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 遗传分类排序
export const rankInheritCategory = params => {
  return axios.post(config.rankInheritCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 根据Id得到遗传基本信息
export const getInheritInfo = params => {
  return axios.get(config.getInheritInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 删除分类
export const deleteInheritCategory = params => {
  return axios.post(config.deleteInheritCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取遗传二级分类
export const getSecondInheritCategoryList = params => {
  return axios.get(config.getSecondInheritCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑遗传表型
export const updateInheritPhenotype = params => {
  return axios.post(config.updateInheritPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 遗传表型排序
export const rankInheritPhenotype = params => {
  return axios.post(config.rankInheritPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 删除遗传表型
export const deleteInheritPhenotype = params => {
  return axios.post(config.deleteInheritPhenotype, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 新增等级
export const addInheritLevel = params => {
  return axios.post(config.addInheritLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 排序遗传等级
export const rankInheritLevel = params => {
  return axios.post(config.rankInheritLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 编辑遗传等级
export const updateInheritLevel = params => {
  return axios.post(config.updateInheritLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 遗传颜色等级
export const updateInheritLevelORColor = params => {
  return axios.post(config.updateInheritLevelORColor, params)
    .then(res => res.data, err => Promise.reject(err))
}
export const deleteInheritLevel = params => {
  return axios.post(config.deleteInheritLevel, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取预览图文
export const getInheritPreviewArtcle = params => {
  return axios.get(config.getInheritPreviewArtcle, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const getAllInheritSecondCategoryList = params => {
  return axios.get(config.getAllInheritSecondCategoryList, {params})
    .then(res => res.data, err => Promise.reject(err))
}
export const updateInherittypeSecondCategory = params => {
  return axios.post(config.updateInherittypeSecondCategory, params)
    .then(res => res.data, err => Promise.reject(err))
}
// 获取基因信息搜索下拉
export const getPmidSelect = params => {
  return axios.get(config.getPmidSelect, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 根据 pmid
export const getPMID = params => {
  return axios.get(config.getPMID, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 表型录入规则pmid详情
export const getPimdTagInfo = params => {
  return axios.get(config.getPimdTagInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取pimd数组
export const getPmidArr = params => {
  return axios.get(config.getPmidArr, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 上传Pdf
export const uploadPdfUrl = params => {
  return axios.get(config.uploadPdfUrl, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 获取drug pimd数组
export const getDrugPmidArr = params => {
  return axios.get(config.getDrugPmidArr, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 药物录入规则pmid详情
export const getDrugPimdTagInfo = params => {
  return axios.get(config.getDrugPimdTagInfo, {params})
    .then(res => res.data, err => Promise.reject(err))
}
// 更改pmid
export const updatePmidList = params => {
  return axios.post(config.updatePmidList, params)
    .then(res => res.data, err => Promise.reject(err))
}
