/**
 * 请求地址映射
 */
module.exports = {
  login: '/manage/login',
  logout: '/manage/logout',
  uploadPic: '/manage/report/uploadPic',
  getCategoryList: '/manage/report/getCategoryList',
  getPhenoList: '/manage/report/getPhenotypeListByCategoryId',
  getPhenoInfo: '/manage/report/getPhenotypeInfoById',
  getPhenoGroup: '/manage/report/getArticleListByPhenotypeId',
  getPhenoArticle: '/manage/report/getArticleById',
  addCategory: '/manage/report/addCategory',
  updateCategory: '/manage/report/updateCategory',
  rankCategory: '/manage/report/rankCategory',
  rankDiseaseCategory: '/manage/disease/rankCategory',
  deleteCategory: '/manage/report/deleteCategory',
  getSecondCategoryList: '/manage/report/getSecondCategoryList',
  addSecondCategory: '/manage/report/addSecondCategory',
  getAllSecondCategoryList: '/manage/report/category/second/all',
  updatePhenotypeSecondCategory: '/manage/report/category/phenotype/move',
  addPhenotype: '/manage/report/addPhenotype',
  updatePhenotype: '/manage/report/updatePhenotype',
  rankPhenotype: '/manage/report/rankPhenotype',
  deletePhenotype: '/manage/report/deletePhenotype',
  addLevel: '/manage/report/addPheLevel',
  rankLevel: '/manage/report/rankPheLevel',
  updateLevel: '/manage/report/updatePheLevel',
  updateLevelORColor: '/manage/report/updatePheLevelORColor',
  deleteLevel: '/manage/report/deletePheLevel',
  addArticle: '/manage/report/addArticle',
  updateArticle: '/manage/report/updateArticle',
  rankArticle: '/manage/report/rankArticle',
  deleteArticle: '/manage/report/deleteArticle',
  getPreviewArtcle: '/manage/report/previewArticle',
  getRsInfo: '/manage/report/getRsInfoListByPhenotypeId',
  addRsInfo: '/manage/report/addRsInfoOfPhenotype',
  getEp: '/manage/report/getEffectPhenotype',
  updateEp: '/manage/report/updateEffectPhenotype',
  getRCP: '/manage/report/getAnnotationByRsid',
  updateRsInfo: '/manage/report/updateRsInfoOfPhenotype',
  deleteRsInfo: '/manage/report/deleteRsInfoOfPhenotype',
  getRsInterval: '/manage/report/getIntervalByPhenotypeId',
  updateRsInterval: '/manage/report/updateIntervalByPhenotypeId',
  updateRsInfoStatus: '/manage/report/updateRsInfoStatus',
  getORDistributed: '/manage/report/getORDistributed',
  getDrugCategoryList: '/manage/drug/category/getList',
  addDrugCategory: '/manage/drug/category/add',
  updateDrugCategory: '/manage/drug/category/update',
  deleteDrugCategory: '/manage/drug/category/delete',
  getDrugMedicineList: '/manage/drug/ingredients/getList',
  getDrugMedicineInfo: '/manage/drug/ingredients/getInfo',
  addDrugMedicine: '/manage/drug/ingredients/add',
  updateDrugMedicine: '/manage/drug/ingredients/update',
  deleteDrugMedicine: '/manage/drug/ingredients/delete',
  getDrugRelateProductList: '/manage/drug/product/getRelateList',
  getAllDrugCategoryList: '/manage/drug/ingredients/category/all',
  moveDrugCategory: '/manage/drug/ingredients/category/drug/move',
  getDrugEffectList: '/manage/drug/effect/getList',
  addDrugEffect: '/manage/drug/effect/add',
  updateDrugEffect: '/manage/drug/effect/update',
  deleteDrugEffect: '/manage/drug/effect/delete',
  getDrugEffectInfo: '/manage/drug/effect/getInfo',
  addDrugEffectLevel: '/manage/drug/effect/level/add',
  updateDrugEffectLevel: '/manage/drug/effect/level/update',
  rankDrugEffectLevel: '/manage/drug/effect/level/rank',
  deleteDrugEffectLevel: '/manage/drug/effect/level/delete',
  getHaplotypeGeneList: '/manage/drug/haplotype/gene/getList',
  addHaplotypeGene: '/manage/drug/haplotype/gene/add',
  updateHaplotypeGene: '/manage/drug/haplotype/gene/update',
  deleteHaplotypeGene: '/manage/drug/haplotype/gene/delete',
  getHaplotypePolymorphismList: '/manage/drug/haplotype/polymorphism/getList',
  addHaplotypePolymorphism: '/manage/drug/haplotype/polymorphism/add',
  updateHaplotypePolymorphism: '/manage/drug/haplotype/polymorphism/update',
  deleteHaplotypePolymorphism: '/manage/drug/haplotype/polymorphism/delete',
  getHaplotypeSnpList: '/manage/drug/haplotype/snp/getList',
  addHaplotypeSnp: '/manage/drug/haplotype/snp/add',
  updateHaplotypeSnp: '/manage/drug/haplotype/snp/update',
  deleteHaplotypeSnp: '/manage/drug/haplotype/snp/delete',
  getDrugEffectPhenotype: '/manage/drug/effect/getEffectPhenotype',
  updateDrugEffectPhenotype: '/manage/drug/effect/updateEffectPhenotype',
  getDrugEffectRsInfo: '/manage/drug/effect/rsInfo/getList',
  addDrugEffectRsInfo: '/manage/drug/effect/rsInfo/add',
  updateDrugEffectRsInfo: '/manage/drug/effect/rsInfo/update',
  deleteDrugEffectRsInfo: '/manage/drug/effect/rsInfo/delete',
  getDrugEffectHaplotypeInfo: '/manage/drug/effect/haplotypeInfo/getList',
  addDrugEffectHaplotypeInfo: '/manage/drug/effect/haplotypeInfo/add',
  updateDrugEffectHaplotypeInfo: '/manage/drug/effect/haplotypeInfo/update',
  deleteDrugEffectHaplotypeInfo: '/manage/drug/effect/haplotypeInfo/delete',
  getDrugEffectLevelList: '/manage/drug/effect/level/getList',
  updateDrugEffectLevelInterval: '/manage/drug/effect/level/updateInterval',
  getChatbotList: '/manage/chatbot/query',
  addChatbotItem: '/manage/chatbot/add',
  updateChatbotItem: '/manage/chatbot/update',
  deleteChatbotItem: '/manage/chatbot/delete',
  getChatbotCopyList: '/manage/chatbot/copyList',
  copyChatbotNode: '/manage/chatbot/copyNode',
  copyChatbotLevel: '/manage/chatbot/copyLevel',
  getMedicineFirstCategoryList: '/manage/medicine/category/getFirstList',
  addMedicineFirstCategory: '/manage/medicine/category/addFirst',
  updateMedicineCategory: '/manage/medicine/category/update',
  deleteMedicineCategory: '/manage/medicine/category/delete',
  getMedicineSecondCategoryList: '/manage/medicine/category/getSecondList',
  addMedicineSecondCategory: '/manage/medicine/category/addSecond',
  getMedicineNameList: '/manage/medicine/name/getList',
  getDrugList: '/manage/medicine/name/getDrugList',
  getRelateDrugList: '/manage/medicine/name/getRelateDrug',
  relateDrug: '/manage/medicine/name/relateDrug',
  addMedicineName: '/manage/medicine/name/add',
  updateMedicineName: '/manage/medicine/name/update',
  deleteMedicineName: '/manage/medicine/name/delete',
  getMedicineProductList: '/manage/medicine/product/getList',
  addMedicineProduct: '/manage/medicine/product/add',
  updateMedicineProduct: '/manage/medicine/product/update',
  deleteMedicineProduct: '/manage/medicine/product/delete',
  getPmidSearchList: '/manage/pmid/getList',
  deletePmidSearchItem: '/manage/pmid/delete',
  addPmidSearchItem: '/manage/pmid/add',
  updatePmidSearchItem: '/manage/pmid/update',
  getDiseaseCategoryList: '/disease/getCategoryList',
  getDiseaseList: '/manage/disease/getPhenotypeListByCategoryId',
  getDiseaseInfo: '/manage/disease/getPhenotypeInfoById',
  addDiseaseCategory: '/manage/disease/addCategory',
  updateDiseaseCategory: '/manage/disease/updateCategory',
  deleteDiseaseCategory: '/manage/disease/deleteCategory',
  getSecondDiseaseCategoryList: '/manage/disease/getSecondDiseaseCategoryList',
  addSecondDiseaseCategory: '/manage/disease/addSecondCategory',
  addDiseasePhenotype: '/manage/disease/addPhenotype',
  updateDiseasePhenotype: '/manage/disease/updatePhenotype',
  rankDiseasePhenotype: '/manage/report/rankPhenotype',
  deleteDiseasePhenotype: '/manage/disease/deletePhenotype',
  addDiseaseLevel: '/manage/disease/addPheLevel',
  rankDiseaseLevel: '/manage/disease/rankPheLevel',
  updateDiseaseLevel: '/manage/disease/updatePheLevel',
  updateDiseaseLevelORColor: '/manage/disease/updatePheLevelORColor',
  deleteDiseaseLevel: '/manage/disease/deletePheLevel',
  getPreviewDiseaseArtcle: '/manage/disease/previewArticle',
  getAllDiseaseSecondCategoryList: '/manage/disease/category/second/all',
  updateDiseasetypeSecondCategory: '/manage/report/category/phenotype/move',
  getInheritCategoryList: '/manage/inherit/getCategoryList',
  getInheritList: '/manage/inherit/getPhenotypeListByCategoryId',
  addInheritCategory: '/manage/inherit/addCategory',
  updateInheritCategory: '/manage/inherit/updateCategory',
  rankInheritCategory: '/manage/inherit/rankCategory',
  getInheritInfo: '/manage/inherit/getPhenotypeInfoById',
  deleteInheritCategory: '/manage/inherit/deleteCategory',
  getSecondInheritCategoryList: '/manage/inherit/getSecondCategoryList',
  addSecondInheritCategory: '/manage/inherit/addSecondCategory',
  addInheritPhenotype: '/manage/inherit/addPhenotype',
  updateInheritPhenotype: '/manage/inherit/updatePhenotype',
  rankInheritPhenotype: '/manage/inherit/rankPhenotype',
  deleteInheritPhenotype: '/manage/inherit/deletePhenotype',
  addInheritLevel: '/manage/inherit/addPheLevel',
  rankInheritLevel: '/manage/inherit/rankPheLevel',
  updateInheritLevel: '/manage/inherit/updatePheLevel',
  updateInheritLevelORColor: '/manage/inherit/updatePheLevelORColor',
  deleteInheritLevel: '/manage/inherit/deletePheLevel',
  getInheritPreviewArtcle: '/manage/inherit/previewArticle',
  getAllInheritSecondCategoryList: '/manage/inherit/category/second/all',
  updateInherittypeSecondCategory: '/manage/inherit/category/phenotype/move',
  getPmidSelect: '/manage/report/getPmidSelect',
  getPMID: '/manage/report/getAnnotationByPmidSerech',
  getPmidArr: '/manage/pmid/getArrListByIdAndType',
  getPimdTagInfo: '/manage/pmid/getAnnotationByPmid',
  uploadPdfUrl: '/manage/pmid/pdf_upload',
  getDrugPmidArr: '/manage/pmid/getArrListByIdAndType',
  getDrugPimdTagInfo: '/manage/pmid/getDrugEffectRsInfoByPmid',
  updatePmidList: '/manage/pmid/updatePmidOfRs'
}
