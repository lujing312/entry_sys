import axios from '../server/axios'
import MockAdapter from 'axios-mock-adapter'
import config from '../server/config'

import {
  success,
  fail,
  categoryList,
  inheritCategoryList,
  diseaseCategoryList,
  phenoList,
  inheritList,
  phenoInfo,
  inheritInfo,
  phenoGroup,
  phenoArticle,
  epInfo,
  rcpInfo,
  rsInfo,
  rsInterval,
  previewArticleInfo,
  drugCategoryList,
  drugMedicineList,
  drugMedicineInfo,
  drugProductList,
  drugEffectList,
  drugEffectInfo,
  drugEpInfo,
  haplotypeRsInfo,
  haplotypeGeneList,
  haplotypePolymorphismList,
  haplotypeSnpList,
  chatbotList,
  chatbotCopyList,
  orDistributed,
  medicineNameList,
  getPmidSearchList,
  diseaseList,
  diseaseInfo,
  previewDiseaseArticleInfo,
  previewInheritArticleInfo,
  pmidSelect,
  pmidInfo,
  pmidArr,
  pimdTagInfo,
  pdfUrl
  // diseaseCategoryList,
  // diseaseList,
  // diseaseInfo
} from './data'

export default {
  init () {
    let mock = new MockAdapter(axios)
    mock.onPost(config.login).reply(200, JSON.stringify(success))

    mock.onGet(config.getCategoryList).reply(200, JSON.stringify(categoryList))
    mock.onGet(config.getPhenoList).reply(200, JSON.stringify(phenoList))
    mock.onGet(config.getPhenoInfo).reply(200, JSON.stringify(phenoInfo))
    mock.onGet(config.getPhenoGroup).reply(200, JSON.stringify(phenoGroup))
    mock.onGet(config.getPhenoArticle).reply(200, JSON.stringify(phenoArticle))

    mock.onPost(config.addCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.updateCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.rankCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteCategory).reply(200, JSON.stringify(fail))

    mock.onGet(config.getSecondCategoryList).reply(200, JSON.stringify(categoryList))
    mock.onPost(config.addSecondCategory).reply(200, JSON.stringify(success))
    // mock.onPost(config.updateSecondCategory).reply(200, JSON.stringify(success))
    // mock.onPost(config.rankSecondCategory).reply(200, JSON.stringify(success))
    // mock.onPost(config.deleteSecondCategory).reply(200, JSON.stringify(fail))

    mock.onPost(config.addPhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.updatePhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.rankPhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.deletePhenotype).reply(200, JSON.stringify(fail))

    mock.onPost(config.addLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.rankLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateLevelORColor).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteLevel).reply(200, JSON.stringify(fail))

    mock.onPost(config.addArticle).reply(200, JSON.stringify(success))
    mock.onPost(config.updateArticle).reply(200, JSON.stringify(success))
    mock.onPost(config.rankArticle).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteArticle).reply(200, JSON.stringify(fail))
    mock.onGet(config.getPreviewArtcle).reply(200, JSON.stringify(previewArticleInfo))

    mock.onGet(config.getEp).reply(200, JSON.stringify(epInfo))
    mock.onPost(config.updateEp).reply(200, JSON.stringify(success))

    mock.onGet(config.getRCP).reply(200, JSON.stringify(rcpInfo))
    mock.onGet(config.getRsInfo).reply(200, JSON.stringify(rsInfo))
    mock.onPost(config.addRsInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.updateRsInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteRsInfo).reply(200, JSON.stringify(success))

    mock.onGet(config.getRsInterval).reply(200, JSON.stringify(rsInterval))
    mock.onPost(config.updateRsInterval).reply(200, JSON.stringify(success))
    mock.onGet(config.getORDistributed).reply(200, JSON.stringify(orDistributed))

    mock.onGet(config.getDrugCategoryList).reply(200, JSON.stringify(drugCategoryList))
    mock.onPost(config.addDrugCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugCategory).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugMedicineList).reply(200, JSON.stringify(drugMedicineList))
    mock.onGet(config.getDrugMedicineInfo).reply(200, JSON.stringify(drugMedicineInfo))
    mock.onPost(config.addDrugMedicine).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugMedicine).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugMedicine).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugRelateProductList).reply(200, JSON.stringify(drugProductList))

    mock.onGet(config.getDrugEffectList).reply(200, JSON.stringify(drugEffectList))
    mock.onPost(config.addDrugEffect).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugEffect).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugEffect).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugEffectInfo).reply(200, JSON.stringify(drugEffectInfo))
    mock.onPost(config.addDrugEffectLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugEffectLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.rankDrugEffectLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugEffectLevel).reply(200, JSON.stringify(success))

    mock.onGet(config.getHaplotypeGeneList).reply(200, JSON.stringify(haplotypeGeneList))
    mock.onPost(config.addHaplotypeGene).reply(200, JSON.stringify(success))
    mock.onPost(config.updateHaplotypeGene).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteHaplotypeGene).reply(200, JSON.stringify(success))

    mock.onGet(config.getHaplotypePolymorphismList).reply(200, JSON.stringify(haplotypePolymorphismList))
    mock.onPost(config.addHaplotypePolymorphism).reply(200, JSON.stringify(success))
    mock.onPost(config.updateHaplotypePolymorphism).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteHaplotypePolymorphism).reply(200, JSON.stringify(success))

    mock.onGet(config.getHaplotypeSnpList).reply(200, JSON.stringify(haplotypeSnpList))
    mock.onPost(config.addHaplotypeSnp).reply(200, JSON.stringify(success))
    mock.onPost(config.updateHaplotypeSnp).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteHaplotypeSnp).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugEffectPhenotype).reply(200, JSON.stringify(drugEpInfo))
    mock.onPost(config.updateDrugEffectPhenotype).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugEffectRsInfo).reply(200, JSON.stringify(rsInfo))
    mock.onPost(config.addDrugEffectRsInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugEffectRsInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugEffectRsInfo).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugEffectHaplotypeInfo).reply(200, JSON.stringify(haplotypeRsInfo))
    mock.onPost(config.addDrugEffectHaplotypeInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDrugEffectHaplotypeInfo).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDrugEffectHaplotypeInfo).reply(200, JSON.stringify(success))

    mock.onGet(config.getDrugEffectLevelList).reply(200, JSON.stringify(rsInterval))
    mock.onPost(config.updateDrugEffectLevelInterval).reply(200, JSON.stringify(success))

    mock.onGet(config.getChatbotList).reply(200, JSON.stringify(chatbotList))
    mock.onPost(config.addChatbotItem).reply(200, JSON.stringify(success))
    mock.onPost(config.updateChatbotItem).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteChatbotItem).reply(200, JSON.stringify(success))

    mock.onGet(config.getChatbotCopyList).reply(200, JSON.stringify(chatbotCopyList))
    mock.onPost(config.copyChatbotNode).reply(200, JSON.stringify(success))
    mock.onPost(config.copyChatbotLevel).reply(200, JSON.stringify(success))

    mock.onGet(config.getMedicineFirstCategoryList).reply(200, JSON.stringify(drugCategoryList))
    mock.onPost(config.addMedicineFirstCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.updateMedicineCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteMedicineCategory).reply(200, JSON.stringify(success))

    mock.onGet(config.getMedicineSecondCategoryList).reply(200, JSON.stringify(drugCategoryList))
    mock.onPost(config.addMedicineSecondCategory).reply(200, JSON.stringify(success))

    mock.onGet(config.getMedicineNameList).reply(200, JSON.stringify(medicineNameList))
    mock.onGet(config.getDrugList).reply(200, JSON.stringify(drugMedicineList))
    mock.onGet(config.getRelateDrugList).reply(200, JSON.stringify(drugMedicineList))
    mock.onPost(config.relateDrug).reply(200, JSON.stringify(success))
    mock.onPost(config.addMedicineName).reply(200, JSON.stringify(success))
    mock.onPost(config.updateMedicineName).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteMedicineName).reply(200, JSON.stringify(success))

    mock.onGet(config.getMedicineProductList).reply(200, JSON.stringify(drugProductList))
    mock.onPost(config.addMedicineProduct).reply(200, JSON.stringify(success))
    mock.onPost(config.updateMedicineProduct).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteMedicineProduct).reply(200, JSON.stringify(success))

    mock.onGet(config.getPmidSearchList).reply(200, JSON.stringify(getPmidSearchList))
    mock.onPost(config.deletePmidSearchItem).reply(200, JSON.stringify(success))
    mock.onPost(config.addPmidSearchItem).reply(200, JSON.stringify(success))
    mock.onPost(config.updatePmidSearchItem).reply(200, JSON.stringify(success))

    mock.onGet(config.getDiseaseCategoryList).reply(200, JSON.stringify(diseaseCategoryList))
    mock.onGet(config.getDiseaseList).reply(200, JSON.stringify(diseaseList))
    mock.onGet(config.getDiseaseInfo).reply(200, JSON.stringify(diseaseInfo))
    mock.onGet(config.getPreviewDiseaseArtcle).reply(200, JSON.stringify(previewDiseaseArticleInfo))
    mock.onGet(config.getSecondDiseaseCategoryList).reply(200, JSON.stringify(categoryList))

    mock.onPost(config.rankDiseaseCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.addDiseaseCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDiseaseCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.addSecondDiseaseCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDiseaseCategory).reply(200, JSON.stringify(fail))

    mock.onPost(config.rankDiseasePhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.addDiseasePhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDiseasePhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDiseasePhenotype).reply(200, JSON.stringify(fail))

    mock.onPost(config.addDiseaseLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.rankDiseaseLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDiseaseLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateDiseaseLevelORColor).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteDiseaseLevel).reply(200, JSON.stringify(fail))

    mock.onGet(config.getInheritList).reply(200, JSON.stringify(inheritList))
    mock.onGet(config.getInheritInfo).reply(200, JSON.stringify(inheritInfo))
    mock.onGet(config.getInheritCategoryList).reply(200, JSON.stringify(inheritCategoryList))
    mock.onGet(config.getSecondInheritCategoryList).reply(200, JSON.stringify(inheritCategoryList))
    mock.onGet(config.getInheritPreviewArtcle).reply(200, JSON.stringify(previewInheritArticleInfo))

    mock.onPost(config.addInheritCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteInheritCategory).reply(200, JSON.stringify(fail))
    mock.onPost(config.updateInheritCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.rankInheritCategory).reply(200, JSON.stringify(success))
    mock.onPost(config.addSecondInheritCategory).reply(200, JSON.stringify(success))

    mock.onPost(config.addInheritPhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.updateInheritPhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.rankInheritPhenotype).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteInheritPhenotype).reply(200, JSON.stringify(fail))

    mock.onPost(config.addInheritLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.rankInheritLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateInheritLevel).reply(200, JSON.stringify(success))
    mock.onPost(config.updateInheritLevelORColor).reply(200, JSON.stringify(success))
    mock.onPost(config.deleteInheritLevel).reply(200, JSON.stringify(fail))

    mock.onGet(config.getPmidSelect).reply(200, JSON.stringify(pmidSelect))
    mock.onGet(config.getPMID).reply(200, JSON.stringify(pmidInfo))
    mock.onGet(config.getPmidArr).reply(200, JSON.stringify(pmidArr))
    mock.onGet(config.getPimdTagInfo).reply(200, JSON.stringify(pimdTagInfo))
    mock.onPost(config.uploadPdfUrl).reply(200, JSON.stringify(pdfUrl))
    mock.onGet(config.getDrugPmidArr).reply(200, JSON.stringify(pmidArr))
    mock.onGet(config.getDrugPimdTagInfo).reply(200, JSON.stringify(pimdTagInfo))
  }
}
