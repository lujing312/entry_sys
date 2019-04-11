export const success = {
  status: 0,
  msg: '请求成功',
  data: null
}
export const fail = {
  status: -1,
  msg: '请求失败',
  data: null
}
export const categoryList = {
  status: 0,
  msg: '请求成功',
  data: [
    { name: '运动指导--受伤风险', ranknum: 1, parentId: 10, id: 36 },
    { parentId: 14, id: 50, name: '心理人格--工作心态', ranknum: 1 },
    { id: 51, parentId: 14, name: '心理人格--人际关系', ranknum: 2 },
    { parentId: 10, id: 37, name: '运动指导--效果提升', ranknum: 2 },
    { parentId: 10, id: 38, name: '运动指导--基础体质', ranknum: 3 },
    { ranknum: 3, parentId: 14, id: 52, name: '心理人格--性格特点' },
    { parentId: 17, ranknum: 4, name: '减肥瘦身--减肥瘦身', id: 35 },
    { id: 39, ranknum: 5, name: '饮食营养--味觉敏感', parentId: 12 },
    { ranknum: 6, name: '饮食营养--注意事项', id: 40, parentId: 12 },
    { name: '饮食营养--代谢能力', id: 41, ranknum: 7, parentId: 12 },
    { name: '饮食营养--营养补充', parentId: 12, ranknum: 8, id: 42 },
    { ranknum: 9, parentId: 9, id: 43, name: '皮肤护理--防晒' },
    { parentId: 9, id: 44, name: '皮肤护理--抗衰', ranknum: 10 },
    { parentId: 9, name: '皮肤护理--色素沉积', ranknum: 11, id: 45 },
    { name: '皮肤护理--水油平衡', ranknum: 12, id: 46, parentId: 9 },
    { parentId: 11, id: 25, name: '睡眠节律--睡眠节律', ranknum: 13 },
    { id: 30, name: '心理人格--心理人格', parentId: 14, ranknum: 14 },
    { ranknum: 15, id: 47, name: '遗传特质--智力水平', parentId: 13 },
    { ranknum: 16, name: '遗传特质--身体特质', parentId: 13, id: 48 },
    { name: '遗传特质--感官刺激', parentId: 13, ranknum: 17, id: 49 },
    { name: '疾病风险--疾病风险', id: 31, parentId: 16, ranknum: 18 },
    { ranknum: 19, name: '待定--待定_2', id: 33, parentId: 1 }
  ]
}
export const phenoList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      categoryId: 36,
      stage: 1,
      name: '腰椎间盘突出风险',
      description: '',
      ranknum: 3,
      id: 24
    },
    {
      id: 27,
      categoryId: 36,
      ranknum: 6,
      name: '肩袖损伤风险',
      stage: 1,
      description:
        '在日常进行网球、羽毛球、篮球、排球、游泳或者健身卧推等运动时，手臂的摆动和发力都是以肩部作为关键纽带完成的。在进行上述运动时，你的肩部被使用到的频率比平时增高，承受的压力增大，因此造成肩部的损伤的概率也随之升高。运动造成的肩部受损很有可能是肩袖被损伤了。肩袖是覆盖你肩关节的一类肌腱组织，对于运动时维持肩关节稳定和保持肩关节活动度起至关重要的作用'
    },
    {
      stage: 1,
      id: 35,
      ranknum: 11,
      categoryId: 36,
      description:
        '膝盖前交叉韧带保护能力衡量的是膝盖前交叉韧带在一定范围内活动发生断裂损伤的风险程度高低',
      name: '膝盖前交叉韧带损伤风险'
    },
    {
      description:
        '跟腱是人体最粗大的肌腱，主要功能是在站立时固定踝关节，防止身体前倾，同时对负重、奔跑及跳跃起重要作用。跟腱损伤的病因较多，可由外伤直接引起或其他病变如肌腱炎、滑囊炎及类风湿关节炎等所致继发性损伤',
      stage: 1,
      ranknum: 14,
      name: '跟腱损伤风险',
      id: 39,
      categoryId: 36
    },
    {
      categoryId: 36,
      ranknum: 21,
      id: 88,
      name: '脚踝受伤风险（不展示）',
      stage: 2,
      description: ''
    }
  ]
}
export const phenoInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    ranknum: 3,
    categoryId: 36,
    description: '',
    degree: 3,
    id: 24,
    level: [
      {
        tag: '宁折不屈',
        description: '腰椎保护能力较弱，容易患腰椎间盘突出',
        name: '较高',
        colorStage: 1,
        orColor: '#ff0000',
        id: 48,
        phenotypeId: 24,
        ranknum: 2,
        slogan: '低头弯腰不是你的姿态，仰望天空世界会更精彩'
      },
      {
        ranknum: 1,
        id: 47,
        colorStage: 3,
        orColor: '#dddddd',
        slogan: '腰间盘都没有你突出，你才是身体的发言人',
        tag: '人生赢家',
        name: '正常',
        phenotypeId: 24,
        description: '患腰椎间盘突出的患病风险正常'
      }
    ],
    stage: 1,
    name: '腰椎间盘突出风险',
    imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png',
    references: [
      {
        phenotype_id: 24,
        update_time: 1537358120000,
        link:
          'https://www.ncbi.nlm.nih.gov/pubmed/?term=Caspase+9+gene+polymorphism+and+susceptibility+to+lumbar+disc+disease+in+the+Han+population+in+northern+China',
        title:
          'Sun, Z.M., et al. Caspase 9 gene polymorphism and susceptibility to lumbar disc disease in the Han population in northern China. Connect Tissue Res 52, 198-202 (2011).',
        id: 930,
        create_time: 1537358120000
      }
    ]
  }
}
export const inheritInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    ranknum: 3,
    categoryId: 36,
    description: '',
    degree: 3,
    id: 24,
    level: [
      {
        tag: '宁折不屈',
        description: '腰椎保护能力较弱，容易患腰椎间盘突出',
        name: '较高',
        colorStage: 1,
        orColor: '#ff0000',
        id: 48,
        phenotypeId: 24,
        ranknum: 2,
        slogan: '低头弯腰不是你的姿态，仰望天空世界会更精彩'
      },
      {
        ranknum: 1,
        id: 47,
        colorStage: 3,
        orColor: '#dddddd',
        slogan: '腰间盘都没有你突出，你才是身体的发言人',
        tag: '人生赢家',
        name: '正常',
        phenotypeId: 24,
        description: '患腰椎间盘突出的患病风险正常'
      }
    ],
    stage: 1,
    name: '腰椎间盘突出风险',
    imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png',
    references: [
      {
        phenotype_id: 24,
        update_time: 1537358120000,
        link:
          'https://www.ncbi.nlm.nih.gov/pubmed/?term=Caspase+9+gene+polymorphism+and+susceptibility+to+lumbar+disc+disease+in+the+Han+population+in+northern+China',
        title:
          'Sun, Z.M., et al. Caspase 9 gene polymorphism and susceptibility to lumbar disc disease in the Han population in northern China. Connect Tissue Res 52, 198-202 (2011).',
        id: 930,
        create_time: 1537358120000
      }
    ]
  }
}
export const phenoGroup = {
  status: 0,
  msg: '请求成功',
  data: [
    { articleList: [], groupName: '', groupId: 1, ranknum: 1 },
    {
      ranknum: 2,
      groupName: '科普知识',
      groupId: 2,
      articleList: [
        {
          id: 748,
          data:
            '[{"content":"人体的脊柱呈现S型，可以在一定角度之间活动。这是因为在相邻的脊椎骨之间存在着纤维软骨组成的“椎间盘”。椎间盘还对脊柱起到缓冲作用。\\n\\n如果椎间盘因为劳损、纤维环破裂或髓核脱出，刺激或压迫脊神经，那么就发生了“腰椎间盘突出症”，出现腰痛、下肢痛、感觉障碍和肌力下降等症状。\\n\\n导致腰椎间盘突出的风险因素包括：青壮年、男性、孕产妇、经常进行体力劳动或长期伏案工作、过于肥胖或过于瘦弱，此外遗传因素也是引起腰椎间盘突出的重要因素。","type":3},{"content":"生活建议","type":2},{"content":"为预防腰椎间盘突出症的发生，在平时的工作生活中应该多加注意以下几点：\\n①控制体重，过度肥胖造成腰椎负担。\\n②睡床要软硬适中，避免睡床过硬或过软，使腰肌得到充分休息。\\n③避免腰部受到风、寒侵袭。\\n④避免腰部长时间处于一种姿势，肌力不平衡，造成腰的劳损。\\n⑤尽量避免特殊工种工作，如需要身体长期受力、前倾的工作。\\n⑥避免久坐，间隔1小时左右建议起立适当活动。\\n⑦避免不良姿势，同时加强腰背肌的训练。经常进行腰椎各方向的活动，使腰椎始终保持生理应力状态，加强腰肌及腹肌练习，腰肌和腹肌的力量强，可增加腰椎的稳定性，对腰的保护能力加强，防止腰椎发生退行性改变。","type":3}]',
          ranknum: 6,
          name: '',
          type: 1,
          phenotypeId: 24
        }
      ]
    },
    {
      ranknum: 3,
      groupName: '科学依据',
      groupId: 3,
      articleList: [
        {
          type: 1,
          id: 124,
          ranknum: 3,
          data:
            '[{"content":"CASP9基因\\nCASP9基因编码半胱氨酸蛋白酶9（Capsase 9），在调节细胞凋亡中起关键作用。半胱氨酸蛋白酶家族是调节细胞凋亡过程的基本组成部分，也是B细胞发育和体内平衡的调节因子。研究表明，CASP9基因的多态性位点rs1052576与腰椎间盘突出的患病风险存在相关性。","type":3}]',
          name: '',
          phenotypeId: 24
        }
      ]
    }
  ]
}
export const phenoArticle = {
  status: 0,
  msg: '请求成功',
  data: {
    levelId: 0,
    contentList: [
      {
        type: 3,
        content:
          '人体的脊柱呈现S型，可以在一定角度之间活动。这是因为在相邻的脊椎骨之间存在着纤维软骨组成的“椎间盘”。椎间盘还对脊柱起到缓冲作用。\n\n如果椎间盘因为劳损、纤维环破裂或髓核脱出，刺激或压迫脊神经，那么就发生了“腰椎间盘突出症”，出现腰痛、下肢痛、感觉障碍和肌力下降等症状。\n\n导致腰椎间盘突出的风险因素包括：青壮年、男性、孕产妇、经常进行体力劳动或长期伏案工作、过于肥胖或过于瘦弱，此外遗传因素也是引起腰椎间盘突出的重要因素。'
      },
      { content: '生活建议', type: 2 },
      {
        content:
          '为预防腰椎间盘突出症的发生，在平时的工作生活中应该多加注意以下几点：\n①控制体重，过度肥胖造成腰椎负担。\n②睡床要软硬适中，避免睡床过硬或过软，使腰肌得到充分休息。\n③避免腰部受到风、寒侵袭。\n④避免腰部长时间处于一种姿势，肌力不平衡，造成腰的劳损。\n⑤尽量避免特殊工种工作，如需要身体长期受力、前倾的工作。\n⑥避免久坐，间隔1小时左右建议起立适当活动。\n⑦避免不良姿势，同时加强腰背肌的训练。经常进行腰椎各方向的活动，使腰椎始终保持生理应力状态，加强腰肌及腹肌练习，腰肌和腹肌的力量强，可增加腰椎的稳定性，对腰的保护能力加强，防止腰椎发生退行性改变。',
        type: 3
      }
    ],
    type: 1,
    phenotypeId: 24,
    name: '',
    id: 748
  }
}
export const rsInfo = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      weight: 1,
      pValue: 'NONE',
      rsid: 'rs1052576',
      type: '1',
      pmid: '1234454,6567678,465465',
      forwordAllele: 'T/C',
      chromosome: '1',
      oddsRatio: '1.91',
      comments:
        'zhw:Compared to those with the AA genotype, subjects with the GA/GG genotype have a higher risk to develop LDH (odds ratio 1.91; 95% confidence interval 1.29-2.81).',
      effect0: '1',
      pos: 15832543,
      sampleSize: '799',
      core: 'Yes',
      keyResult:
        'The caspase 9 Ex5 + 32 AA genotype was associated with an increased risk for the development of LDH (OR = 1.91, 95% CI = 1.29–2.81) compared with the GG genotype.',
      effectAllele: 'T',
      gene: 'CASP9',
      checkStatus: 1,
      age: 'NONE',
      gender: 'both',
      dbSNPAllele: 'A/G(REV)',
      id: 27,
      effect2: '1.91',
      effect1: '1.29',
      normalAllele: 'C',
      population: 'Northern Han population',
      phenotypeId: 24
    }
  ]
}
export const rsInterval = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      bgcolor: '#FD5C47',
      levelPercent: '87.70%',
      update_time: 1541749935000,
      create_time: 1534385755000,
      percent: 0.877,
      slogan: '腰间盘都没有你突出，你才是身体的发言人',
      tag: '人生赢家',
      num: 442,
      max: 1.8,
      color_stage: 3,
      haschatbot: 0,
      name: '正常(442)',
      min: 1.0,
      ranknum: 1,
      description: '患腰椎间盘突出的患病风险正常',
      id: 47,
      phenotype_id: 24
    },
    {
      bgcolor: '#CF4B3A',
      levelPercent: '12.30%',
      id: 48,
      num: 62,
      max: 2.0,
      tag: '宁折不屈',
      ranknum: 2,
      color_stage: 1,
      phenotype_id: 24,
      name: '较高(62)',
      haschatbot: 0,
      description: '腰椎保护能力较弱，容易患腰椎间盘突出',
      update_time: 1541734386000,
      create_time: 1534385778000,
      min: 1.8,
      percent: 0.123,
      slogan: '低头弯腰不是你的姿态，仰望天空世界会更精彩'
    }
  ]
}
export const orDistributed = {
  status: 0,
  msg: '请求成功',
  data: [
    { min: 1.0, max: 1.0228, step: 0.02275, num: 217 },
    { min: 1.0228, max: 1.0455, step: 0.02275, num: 0 },
    { min: 1.0455, max: 1.0683, step: 0.02275, num: 0 },
    { min: 1.0683, max: 1.091, step: 0.02275, num: 0 },
    { min: 1.091, max: 1.1138, step: 0.02275, num: 0 },
    { min: 1.1138, max: 1.1365, step: 0.02275, num: 0 },
    { min: 1.1365, max: 1.1593, step: 0.02275, num: 0 },
    { min: 1.1593, max: 1.182, step: 0.02275, num: 0 },
    { min: 1.182, max: 1.2048, step: 0.02275, num: 0 },
    { min: 1.2048, max: 1.2275, step: 0.02275, num: 0 },
    { min: 1.2275, max: 1.2503, step: 0.02275, num: 0 },
    { min: 1.2503, max: 1.273, step: 0.02275, num: 0 },
    { min: 1.273, max: 1.2958, step: 0.02275, num: 225 },
    { min: 1.2958, max: 1.3185, step: 0.02275, num: 0 },
    { min: 1.3185, max: 1.3413, step: 0.02275, num: 0 },
    { min: 1.3413, max: 1.364, step: 0.02275, num: 0 },
    { min: 1.364, max: 1.3868, step: 0.02275, num: 0 },
    { min: 1.3868, max: 1.4095, step: 0.02275, num: 0 },
    { min: 1.4095, max: 1.4323, step: 0.02275, num: 0 },
    { min: 1.4323, max: 1.455, step: 0.02275, num: 0 },
    { min: 1.455, max: 1.4778, step: 0.02275, num: 0 },
    { min: 1.4778, max: 1.5005, step: 0.02275, num: 0 },
    { min: 1.5005, max: 1.5233, step: 0.02275, num: 0 },
    { min: 1.5233, max: 1.546, step: 0.02275, num: 0 },
    { min: 1.546, max: 1.5688, step: 0.02275, num: 0 },
    { min: 1.5688, max: 1.5915, step: 0.02275, num: 0 },
    { min: 1.5915, max: 1.6143, step: 0.02275, num: 0 },
    { min: 1.6143, max: 1.637, step: 0.02275, num: 0 },
    { min: 1.637, max: 1.6598, step: 0.02275, num: 0 },
    { min: 1.6598, max: 1.6825, step: 0.02275, num: 0 },
    { min: 1.6825, max: 1.7053, step: 0.02275, num: 0 },
    { min: 1.7053, max: 1.728, step: 0.02275, num: 0 },
    { min: 1.728, max: 1.7508, step: 0.02275, num: 0 },
    { min: 1.7508, max: 1.7735, step: 0.02275, num: 0 },
    { min: 1.7735, max: 1.7963, step: 0.02275, num: 0 },
    { min: 1.7963, max: 1.819, step: 0.02275, num: 0 },
    { min: 1.819, max: 1.8418, step: 0.02275, num: 0 },
    { min: 1.8418, max: 1.8645, step: 0.02275, num: 0 },
    { min: 1.8645, max: 1.8873, step: 0.02275, num: 0 },
    { min: 1.8873, max: 1.91, step: 0.02275, num: 62 }
  ]
}
export const epInfo = {
  status: 0,
  msg: '请求成功',
  data: { online: 1, effectPhenotype: '24-腰椎间盘突出患病风险' }
}
export const previewArticleInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    groupList: [
      { groupId: 1, articleList: [], groupName: '', ranknum: 1 },
      {
        articleList: [
          {
            id: 748,
            ranknum: 6,
            contentList: [
              {
                type: 3,
                content:
                  '人体的脊柱呈现S型，可以在一定角度之间活动。这是因为在相邻的脊椎骨之间存在着纤维软骨组成的“椎间盘”。椎间盘还对脊柱起到缓冲作用。\n\n如果椎间盘因为劳损、纤维环破裂或髓核脱出，刺激或压迫脊神经，那么就发生了“腰椎间盘突出症”，出现腰痛、下肢痛、感觉障碍和肌力下降等症状。\n\n导致腰椎间盘突出的风险因素包括：青壮年、男性、孕产妇、经常进行体力劳动或长期伏案工作、过于肥胖或过于瘦弱，此外遗传因素也是引起腰椎间盘突出的重要因素。'
              },
              { type: 2, content: '生活建议' },
              {
                content:
                  '为预防腰椎间盘突出症的发生，在平时的工作生活中应该多加注意以下几点：\n①控制体重，过度肥胖造成腰椎负担。\n②睡床要软硬适中，避免睡床过硬或过软，使腰肌得到充分休息。\n③避免腰部受到风、寒侵袭。\n④避免腰部长时间处于一种姿势，肌力不平衡，造成腰的劳损。\n⑤尽量避免特殊工种工作，如需要身体长期受力、前倾的工作。\n⑥避免久坐，间隔1小时左右建议起立适当活动。\n⑦避免不良姿势，同时加强腰背肌的训练。经常进行腰椎各方向的活动，使腰椎始终保持生理应力状态，加强腰肌及腹肌练习，腰肌和腹肌的力量强，可增加腰椎的稳定性，对腰的保护能力加强，防止腰椎发生退行性改变。',
                type: 3
              }
            ],
            phenotypeId: 24,
            type: 1,
            name: ''
          }
        ],
        ranknum: 2,
        groupName: '科普知识',
        groupId: 2
      },
      {
        articleList: [
          {
            name: '',
            id: 124,
            phenotypeId: 24,
            ranknum: 3,
            type: 1,
            contentList: [
              {
                content:
                  'CASP9基因\nCASP9基因编码半胱氨酸蛋白酶9（Capsase 9），在调节细胞凋亡中起关键作用。半胱氨酸蛋白酶家族是调节细胞凋亡过程的基本组成部分，也是B细胞发育和体内平衡的调节因子。研究表明，CASP9基因的多态性位点rs1052576与腰椎间盘突出的患病风险存在相关性。',
                type: 3
              }
            ]
          }
        ],
        groupName: '科学依据',
        ranknum: 3,
        groupId: 3
      }
    ],
    phenotypeInfo: {
      degree: 3,
      ranknum: 3,
      id: 24,
      name: '腰椎间盘突出风险',
      categoryId: 36,
      stage: 1,
      description: '',
      imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png'
    }
  }
}
export const drugCategoryList = {
  status: 0,
  msg: '请求成功',
  data: [
    { name: '常见家庭备用药', id: 2 },
    { name: '风湿免疫类药物', id: 4 },
    { id: 5, name: '心脑血管类疾病药物' },
    { name: '抗生素类药物', id: 6 },
    { name: '精神类疾病药物', id: 7 },
    { name: '肿瘤类药物', id: 8 },
    { id: 9, name: '降糖药' },
    { name: '降脂药', id: 10 },
    { name: '两性健康', id: 11 },
    { id: 12, name: '胃肠道' },
    { name: '呼吸道', id: 13 },
    { name: '待定', id: 1 }
  ]
}
export const drugMedicineList = {
  status: 0,
  msg: '请求成功',
  data: [
    { name: '布洛芬 (Ibuprofen)', categoryId: 2, id: 1 },
    { id: 5, name: '孟鲁司特钠（Montelukast Sodium）', categoryId: 2 },
    { id: 6, name: '孟鲁司特钠（Montelukast Sodium）', categoryId: 2 },
    { id: 7, name: '孟鲁司特钠（Montelukast Sodium）', categoryId: 2 }
  ]
}
export const drugMedicineInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    categoryId: 2,
    scientificDetails: [
      {
        title: '检测位点',
        contentList: [
          'CYP2C9多态性（位于CYP2C9基因）\nCYP2C8多态性（位于CYP2C8基因）'
        ]
      },
      {
        title: '药物作用机制',
        contentList: [
          '布洛芬的准确药物作用机制目前尚未完全清楚，研究认为其是通过抑制环氧酶2活性，进而降低能导致炎症、发热及疼痛的前列腺素的合成，最终实现退热的效果。\n药物基因组学表明，布洛芬主要是在肝脏中通过CYP2C9的作用代谢；另外，CYP2C8也被报道在布洛芬代谢过程中有一定作用。CYP2C8*3纯合型和CYP2C9*3纯合型（占总人群的约8%）对布洛芬的药物代谢能力差。'
        ]
      }
    ],
    id: 1,
    name: '布洛芬 (Ibuprofen)',
    references: [
      {
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/18787056',
        create_time: 1541842096000,
        title:
          'Chang, S.-Y. et al. Confirmation that cytochrome P450 2C8 (CYP2C8) plays a minor role in (S)-(+)- and (R)-(-)-ibuprofen hydroxylation in vitro. Drug Metab. Dispos. 36, 2513–2522 (2008).',
        id: 651,
        update_time: 1541842096000,
        drug_id: 1
      },
      {
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/15747501',
        drug_id: 1,
        create_time: 1541842096000,
        id: 652,
        update_time: 1541842096000,
        title:
          'Hao, H. et al. Enantioselective pharmacokinetics of ibuprofen and involved mechanisms. Drug Metab. Rev. 37, 215–234 (2005).'
      },
      {
        drug_id: 1,
        title:
          'Lopez-Rodriguez, R. et al. Influence of CYP2C8 and CYP2C9 polymorphisms on pharmacokinetic and pharmacodynamic parameters of racemic and enantiomeric forms of ibuprofen in healthy volunteers. Pharmacol. Res. 58, 77–84 (2008).',
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/18694831',
        create_time: 1541842096000,
        update_time: 1541842096000,
        id: 653
      },
      {
        title:
          'Garcia-Martin, E. et al. Interindividual variability in ibuprofen pharmacokinetics is related to interaction of cytochrome P450 2C8 and 2C9 amino acid polymorphisms. Clin. Pharmacol. Ther. 76, 119–127 (2004).',
        create_time: 1541842096000,
        id: 654,
        update_time: 1541842096000,
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/15289789',
        drug_id: 1
      },
      {
        drug_id: 1,
        id: 655,
        title:
          'Martinez, C. et al. The effect of the cytochrome P450 CYP2C8 polymorphism on the disposition of (R)-ibuprofen enantiomer in healthy subjects. Br. J. Clin. Pharmacol. 59, 62–69 (2005).',
        update_time: 1541842096000,
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/15606441',
        create_time: 1541842096000
      },
      {
        update_time: 1541842096000,
        link: 'https://www.ncbi.nlm.nih.gov/pubmed/1462152',
        title:
          'Leemann, T. et al. The biotransformation of NSAIDs: a common elimination site and drug interactions. Schweiz. Med. Wochenschr. 122, 1897–1899 (1992).',
        create_time: 1541842096000,
        id: 656,
        drug_id: 1
      }
    ]
  }
}
export const drugProductList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      id: 3,
      barcode: '6901236341582',
      name: '顺尔宁孟鲁司特钠咀嚼片',
      otc: 'OTC',
      dose: '10包*0.1克',
      manufacturer: '哈药六厂',
      expiredate: '20181231 0030',
      batchnum: '12345345'
    },
    {
      id: 69,
      barcode: '6901236341582',
      name: '孟鲁司特钠片',
      otc: 'RX',
      dose: '12袋',
      manufacturer: '吉林省利华制药有限公司',
      expiredate: '20181231 0030',
      batchnum: '12345345'
    }
  ]
}
export const drugProductInfo = {
  status: 0,
  msg: '',
  data: {
    id: 1,
    name: '哈药六厂感冒灵颗粒',
    barcode: ['6901236341582'],
    otc: 1,
    manufacturer: '吉林省利华制药有限公司'
  }
}
export const drugEffectList = {
  status: 0,
  msg: '请求成功',
  data: [{ name: '药物代谢', id: 1, effectPhenotype: '较慢' }]
}
export const drugEffectInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    name: '药物代谢',
    drugId: 1,
    id: 1,
    effectPhenotype: '较慢',
    levelList: [
      {
        name: '较慢',
        effectId: 1,
        advice: '请遵医嘱适量调整用药量',
        ranknum: 1,
        id: 2
      },
      {
        advice: '请遵医嘱正常用药',
        effectId: 1,
        id: 1,
        ranknum: 2,
        name: '正常'
      }
    ]
  }
}
export const drugEpInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    effectPhenotype: '较慢',
    effectName: '药物代谢',
    drugName: '布洛芬 (Ibuprofen)'
  }
}
export const haplotypeRsInfo = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      score: 2,
      haplotype2: 21,
      name: '*3/*3',
      update_time: 1535790805000,
      haplotype1: 21,
      gene_id: 2,
      create_time: 1535790805000,
      id: 117
    }
  ]
}
export const haplotypeGeneList = {
  status: 0,
  msg: '请求成功',
  data: [
    { weight: 1, id: 2, pmid: '18694831', gene: 'CYP2C8' },
    { id: 9, weight: 1, pmid: '15289789', gene: 'CYP2C9' }
  ]
}
export const haplotypePolymorphismList = {
  status: 0,
  msg: '请求成功',
  data: [{ geneId: 2, id: 21, name: '*3' }]
}
export const haplotypeSnpList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      pos: 96827485,
      chromosome: '10',
      polymorphismId: 21,
      id: 36,
      allele: 'A',
      rsid: 'rs11572073'
    },
    {
      id: 37,
      pos: 96827150,
      polymorphismId: 21,
      chromosome: '10',
      allele: 'T',
      rsid: 'rs11572076'
    },
    {
      pos: 96798749,
      allele: 'C',
      id: 38,
      rsid: 'rs10509681',
      polymorphismId: 21,
      chromosome: '10'
    },
    {
      rsid: 'rs11572080',
      id: 39,
      chromosome: '10',
      polymorphismId: 21,
      pos: 96827030,
      allele: 'T'
    }
  ]
}
export const chatbotList = {
  status: 0,
  msg: '',
  data: [
    {
      id: 12,
      type: 1,
      content: '嗨！时尚达人你好。',
      contentType: 1,
      link: 'www.baidu.com'
    },
    {
      id: 23,
      type: 1,
      content:
        'https://uploads.wegene.com/crowdsourcing/a53560593faeba1f2f37b0d053c86a03.jpg',
      contentType: 2,
      link: 'www.baidu.com'
    },
    {
      id: 34,
      type: 3,
      content: '好',
      contentType: 1,
      link: ''
    }
  ]
}

export const chatbotCopyList = {
  status: 0,
  msg: '',
  data: [
    { id: 12, content: '嗨!' },
    { id: 23, content: '想' },
    { id: 34, content: '好' }
  ]
}

export const rcpInfo = {
  status: 0,
  msg: '',
  data: {
    rsid: '4782',
    chromosome: '12',
    pos: '1771055865',
    gene: 'Ab',
    forwordAllele: 'A',
    core: 'ASA'
  }
}
export const medicineNameList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      id: 3,
      barcode: '6901236341582',
      name: '顺尔宁孟鲁司特钠咀嚼片',
      otc: 'OTC',
      dose: '10包*0.1克',
      factory: '哈药六厂'
    },
    {
      id: 4,
      barcode: '6901236341582',
      name: '顺尔宁孟鲁司特钠咀嚼片',
      otc: 'RX',
      dose: '10包*0.1克',
      factory: '哈药六厂'
    }
  ]
}
export const getPmidSearchList = {
  status: 0,
  msg: '请求成功',
  data: {
    list: [{
      id: 1,
      sampleSize: '333',
      population: '222',
      age: '15',
      gender: '男',
      comments: '这是一条备注',
      pmid: '2221',
      pdfLink: 'http://pdfkit.org/demo/out.pdf',
      title: 'Leemann, T. et al. The biotransformation of NSAIDs: a common elimination site and drug interactions. Schweiz. Med. Wochenschr. 122, 1897–1899 (1992).',
      link: 'http://www.baidu.com'
    },
    {
      id: 1,
      sampleSize: '333',
      population: '222',
      age: '15',
      gender: '男',
      comments: '这是一条备注',
      pmid: '2221',
      pdfLink: 'http://pdfkit.org/demo/out.pdf',
      title: 'Leemann, T. et al. The biotransformation of NSAIDs: a common elimination site and drug interactions. Schweiz. Med. Wochenschr. 122, 1897–1899 (1992).',
      link: 'http://www.baidu.com'
    },
    {
      id: 1,
      sampleSize: '333',
      population: '222',
      age: '15',
      gender: '男',
      comments: '这是一条备注',
      pmid: '2221',
      pdfLink: 'http://pdfkit.org/demo/out.pdf',
      title: 'Leemann, T. et al. The biotransformation of NSAIDs: a common elimination site and drug interactions. Schweiz. Med. Wochenschr. 122, 1897–1899 (1992).',
      link: 'http://www.baidu.com'
    }],
    totalCount: 0
  }
}
export const diseaseCategoryList = {
  status: 0,
  msg: '请求成功',
  data: [
    { name: '运动指导--受伤风险', ranknum: 1, parentId: 10, id: 36 },
    { parentId: 14, id: 50, name: '心理人格--工作心态', ranknum: 1 },
    { id: 51, parentId: 14, name: '心理人格--人际关系', ranknum: 2 },
    { parentId: 10, id: 37, name: '运动指导--效果提升', ranknum: 2 },
    { parentId: 10, id: 38, name: '运动指导--基础体质', ranknum: 3 },
    { ranknum: 3, parentId: 14, id: 52, name: '心理人格--性格特点' },
    { parentId: 17, ranknum: 4, name: '减肥瘦身--减肥瘦身', id: 35 },
    { id: 39, ranknum: 5, name: '饮食营养--味觉敏感', parentId: 12 },
    { ranknum: 6, name: '饮食营养--注意事项', id: 40, parentId: 12 },
    { name: '饮食营养--代谢能力', id: 41, ranknum: 7, parentId: 12 },
    { name: '饮食营养--营养补充', parentId: 12, ranknum: 8, id: 42 },
    { ranknum: 9, parentId: 9, id: 43, name: '皮肤护理--防晒' },
    { parentId: 9, id: 44, name: '皮肤护理--抗衰', ranknum: 10 },
    { parentId: 9, name: '皮肤护理--色素沉积', ranknum: 11, id: 45 },
    { name: '皮肤护理--水油平衡', ranknum: 12, id: 46, parentId: 9 },
    { parentId: 11, id: 25, name: '睡眠节律--睡眠节律', ranknum: 13 },
    { id: 30, name: '心理人格--心理人格', parentId: 14, ranknum: 14 },
    { ranknum: 15, id: 47, name: '遗传特质--智力水平', parentId: 13 },
    { ranknum: 16, name: '遗传特质--身体特质', parentId: 13, id: 48 },
    { name: '遗传特质--感官刺激', parentId: 13, ranknum: 17, id: 49 },
    { name: '疾病风险--疾病风险', id: 31, parentId: 16, ranknum: 18 },
    { ranknum: 19, name: '待定--待定_2', id: 33, parentId: 1 }
  ]
}
export const diseaseList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      categoryId: 36,
      stage: 1,
      name: '腰椎间盘突出风险',
      description: '',
      ranknum: 3,
      id: 24
    },
    {
      id: 27,
      categoryId: 36,
      ranknum: 6,
      name: '肩袖损伤风险',
      stage: 1,
      description:
        '在日常进行网球、羽毛球、篮球、排球、游泳或者健身卧推等运动时，手臂的摆动和发力都是以肩部作为关键纽带完成的。在进行上述运动时，你的肩部被使用到的频率比平时增高，承受的压力增大，因此造成肩部的损伤的概率也随之升高。运动造成的肩部受损很有可能是肩袖被损伤了。肩袖是覆盖你肩关节的一类肌腱组织，对于运动时维持肩关节稳定和保持肩关节活动度起至关重要的作用'
    },
    {
      stage: 1,
      id: 35,
      ranknum: 11,
      categoryId: 36,
      description:
        '膝盖前交叉韧带保护能力衡量的是膝盖前交叉韧带在一定范围内活动发生断裂损伤的风险程度高低',
      name: '膝盖前交叉韧带损伤风险'
    },
    {
      description:
        '跟腱是人体最粗大的肌腱，主要功能是在站立时固定踝关节，防止身体前倾，同时对负重、奔跑及跳跃起重要作用。跟腱损伤的病因较多，可由外伤直接引起或其他病变如肌腱炎、滑囊炎及类风湿关节炎等所致继发性损伤',
      stage: 1,
      ranknum: 14,
      name: '跟腱损伤风险',
      id: 39,
      categoryId: 36
    },
    {
      categoryId: 36,
      ranknum: 21,
      id: 88,
      name: '脚踝受伤风险（不展示）',
      stage: 2,
      description: ''
    }
  ]
}
export const diseaseInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    ranknum: 3,
    categoryId: 36,
    description: '',
    degree: 3,
    id: 24,
    level: [
      {
        tag: '宁折不屈',
        description: '腰椎保护能力较弱，容易患腰椎间盘突出',
        name: '较高',
        colorStage: 1,
        orColor: '#ff0000',
        id: 48,
        phenotypeId: 24,
        ranknum: 2,
        slogan: '低头弯腰不是你的姿态，仰望天空世界会更精彩'
      },
      {
        ranknum: 1,
        id: 47,
        colorStage: 3,
        orColor: '#dddddd',
        slogan: '腰间盘都没有你突出，你才是身体的发言人',
        tag: '人生赢家',
        name: '正常',
        phenotypeId: 24,
        description: '患腰椎间盘突出的患病风险正常'
      }
    ],
    stage: 1,
    name: '腰椎间盘突出风险',
    imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png',
    references: [
      {
        phenotype_id: 24,
        update_time: 1537358120000,
        link:
          'https://www.ncbi.nlm.nih.gov/pubmed/?term=Caspase+9+gene+polymorphism+and+susceptibility+to+lumbar+disc+disease+in+the+Han+population+in+northern+China',
        title:
          'Sun, Z.M., et al. Caspase 9 gene polymorphism and susceptibility to lumbar disc disease in the Han population in northern China. Connect Tissue Res 52, 198-202 (2011).',
        id: 930,
        create_time: 1537358120000
      }
    ]
  }
}
export const previewDiseaseArticleInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    groupList: [
      { groupId: 1, articleList: [], groupName: '', ranknum: 1 },
      {
        articleList: [
          {
            id: 748,
            ranknum: 6,
            contentList: [
              {
                type: 3,
                content:
                  '人体的脊柱呈现S型，可以在一定角度之间活动。这是因为在相邻的脊椎骨之间存在着纤维软骨组成的“椎间盘”。椎间盘还对脊柱起到缓冲作用。\n\n如果椎间盘因为劳损、纤维环破裂或髓核脱出，刺激或压迫脊神经，那么就发生了“腰椎间盘突出症”，出现腰痛、下肢痛、感觉障碍和肌力下降等症状。\n\n导致腰椎间盘突出的风险因素包括：青壮年、男性、孕产妇、经常进行体力劳动或长期伏案工作、过于肥胖或过于瘦弱，此外遗传因素也是引起腰椎间盘突出的重要因素。'
              },
              { type: 2, content: '生活建议' },
              {
                content:
                  '为预防腰椎间盘突出症的发生，在平时的工作生活中应该多加注意以下几点：\n①控制体重，过度肥胖造成腰椎负担。\n②睡床要软硬适中，避免睡床过硬或过软，使腰肌得到充分休息。\n③避免腰部受到风、寒侵袭。\n④避免腰部长时间处于一种姿势，肌力不平衡，造成腰的劳损。\n⑤尽量避免特殊工种工作，如需要身体长期受力、前倾的工作。\n⑥避免久坐，间隔1小时左右建议起立适当活动。\n⑦避免不良姿势，同时加强腰背肌的训练。经常进行腰椎各方向的活动，使腰椎始终保持生理应力状态，加强腰肌及腹肌练习，腰肌和腹肌的力量强，可增加腰椎的稳定性，对腰的保护能力加强，防止腰椎发生退行性改变。',
                type: 3
              }
            ],
            phenotypeId: 24,
            type: 1,
            name: ''
          }
        ],
        ranknum: 2,
        groupName: '科普知识',
        groupId: 2
      },
      {
        articleList: [
          {
            name: '',
            id: 124,
            phenotypeId: 24,
            ranknum: 3,
            type: 1,
            contentList: [
              {
                content:
                  'CASP9基因\nCASP9基因编码半胱氨酸蛋白酶9（Capsase 9），在调节细胞凋亡中起关键作用。半胱氨酸蛋白酶家族是调节细胞凋亡过程的基本组成部分，也是B细胞发育和体内平衡的调节因子。研究表明，CASP9基因的多态性位点rs1052576与腰椎间盘突出的患病风险存在相关性。',
                type: 3
              }
            ]
          }
        ],
        groupName: '科学依据',
        ranknum: 3,
        groupId: 3
      }
    ],
    phenotypeInfo: {
      degree: 3,
      ranknum: 3,
      id: 24,
      name: '腰椎间盘突出风险',
      categoryId: 36,
      stage: 1,
      description: '',
      imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png'
    }
  }
}
export const inheritCategoryList = {
  status: 0,
  msg: '请求成功',
  data: [
    { name: '运动指导--受伤风险', ranknum: 1, parentId: 10, id: 36 },
    { parentId: 14, id: 50, name: '心理人格--工作心态', ranknum: 1 },
    { id: 51, parentId: 14, name: '心理人格--人际关系', ranknum: 2 },
    { parentId: 10, id: 37, name: '运动指导--效果提升', ranknum: 2 },
    { parentId: 10, id: 38, name: '运动指导--基础体质', ranknum: 3 },
    { ranknum: 3, parentId: 14, id: 52, name: '心理人格--性格特点' },
    { parentId: 17, ranknum: 4, name: '减肥瘦身--减肥瘦身', id: 35 },
    { id: 39, ranknum: 5, name: '饮食营养--味觉敏感', parentId: 12 },
    { ranknum: 6, name: '饮食营养--注意事项', id: 40, parentId: 12 },
    { name: '饮食营养--代谢能力', id: 41, ranknum: 7, parentId: 12 },
    { name: '饮食营养--营养补充', parentId: 12, ranknum: 8, id: 42 },
    { ranknum: 9, parentId: 9, id: 43, name: '皮肤护理--防晒' },
    { parentId: 9, id: 44, name: '皮肤护理--抗衰', ranknum: 10 },
    { parentId: 9, name: '皮肤护理--色素沉积', ranknum: 11, id: 45 },
    { name: '皮肤护理--水油平衡', ranknum: 12, id: 46, parentId: 9 },
    { parentId: 11, id: 25, name: '睡眠节律--睡眠节律', ranknum: 13 },
    { id: 30, name: '心理人格--心理人格', parentId: 14, ranknum: 14 },
    { ranknum: 15, id: 47, name: '遗传特质--智力水平', parentId: 13 },
    { ranknum: 16, name: '遗传特质--身体特质', parentId: 13, id: 48 },
    { name: '遗传特质--感官刺激', parentId: 13, ranknum: 17, id: 49 },
    { name: '疾病风险--疾病风险', id: 31, parentId: 16, ranknum: 18 },
    { ranknum: 19, name: '待定--待定_2', id: 33, parentId: 1 }
  ]
}
export const inheritList = {
  status: 0,
  msg: '请求成功',
  data: [
    {
      categoryId: 36,
      stage: 1,
      name: '腰椎间盘突出风险',
      description: '',
      ranknum: 3,
      id: 24
    },
    {
      id: 27,
      categoryId: 36,
      ranknum: 6,
      name: '肩袖损伤风险',
      stage: 1,
      description:
        '在日常进行网球、羽毛球、篮球、排球、游泳或者健身卧推等运动时，手臂的摆动和发力都是以肩部作为关键纽带完成的。在进行上述运动时，你的肩部被使用到的频率比平时增高，承受的压力增大，因此造成肩部的损伤的概率也随之升高。运动造成的肩部受损很有可能是肩袖被损伤了。肩袖是覆盖你肩关节的一类肌腱组织，对于运动时维持肩关节稳定和保持肩关节活动度起至关重要的作用'
    },
    {
      stage: 1,
      id: 35,
      ranknum: 11,
      categoryId: 36,
      description:
        '膝盖前交叉韧带保护能力衡量的是膝盖前交叉韧带在一定范围内活动发生断裂损伤的风险程度高低',
      name: '膝盖前交叉韧带损伤风险'
    },
    {
      description:
        '跟腱是人体最粗大的肌腱，主要功能是在站立时固定踝关节，防止身体前倾，同时对负重、奔跑及跳跃起重要作用。跟腱损伤的病因较多，可由外伤直接引起或其他病变如肌腱炎、滑囊炎及类风湿关节炎等所致继发性损伤',
      stage: 1,
      ranknum: 14,
      name: '跟腱损伤风险',
      id: 39,
      categoryId: 36
    },
    {
      categoryId: 36,
      ranknum: 21,
      id: 88,
      name: '脚踝受伤风险（不展示）',
      stage: 2,
      description: ''
    }
  ]
}
export const previewInheritArticleInfo = {
  status: 0,
  msg: '请求成功',
  data: {
    groupList: [
      { groupId: 1, articleList: [], groupName: '', ranknum: 1 },
      {
        articleList: [
          {
            id: 748,
            ranknum: 6,
            contentList: [
              {
                type: 3,
                content:
                  '人体的脊柱呈现S型，可以在一定角度之间活动。这是因为在相邻的脊椎骨之间存在着纤维软骨组成的“椎间盘”。椎间盘还对脊柱起到缓冲作用。\n\n如果椎间盘因为劳损、纤维环破裂或髓核脱出，刺激或压迫脊神经，那么就发生了“腰椎间盘突出症”，出现腰痛、下肢痛、感觉障碍和肌力下降等症状。\n\n导致腰椎间盘突出的风险因素包括：青壮年、男性、孕产妇、经常进行体力劳动或长期伏案工作、过于肥胖或过于瘦弱，此外遗传因素也是引起腰椎间盘突出的重要因素。'
              },
              { type: 2, content: '生活建议' },
              {
                content:
                  '为预防腰椎间盘突出症的发生，在平时的工作生活中应该多加注意以下几点：\n①控制体重，过度肥胖造成腰椎负担。\n②睡床要软硬适中，避免睡床过硬或过软，使腰肌得到充分休息。\n③避免腰部受到风、寒侵袭。\n④避免腰部长时间处于一种姿势，肌力不平衡，造成腰的劳损。\n⑤尽量避免特殊工种工作，如需要身体长期受力、前倾的工作。\n⑥避免久坐，间隔1小时左右建议起立适当活动。\n⑦避免不良姿势，同时加强腰背肌的训练。经常进行腰椎各方向的活动，使腰椎始终保持生理应力状态，加强腰肌及腹肌练习，腰肌和腹肌的力量强，可增加腰椎的稳定性，对腰的保护能力加强，防止腰椎发生退行性改变。',
                type: 3
              }
            ],
            phenotypeId: 24,
            type: 1,
            name: ''
          }
        ],
        ranknum: 2,
        groupName: '科普知识',
        groupId: 2
      },
      {
        articleList: [
          {
            name: '',
            id: 124,
            phenotypeId: 24,
            ranknum: 3,
            type: 1,
            contentList: [
              {
                content:
                  'CASP9基因\nCASP9基因编码半胱氨酸蛋白酶9（Capsase 9），在调节细胞凋亡中起关键作用。半胱氨酸蛋白酶家族是调节细胞凋亡过程的基本组成部分，也是B细胞发育和体内平衡的调节因子。研究表明，CASP9基因的多态性位点rs1052576与腰椎间盘突出的患病风险存在相关性。',
                type: 3
              }
            ]
          }
        ],
        groupName: '科学依据',
        ranknum: 3,
        groupId: 3
      }
    ],
    phenotypeInfo: {
      degree: 3,
      ranknum: 3,
      id: 24,
      name: '腰椎间盘突出风险',
      categoryId: 36,
      stage: 1,
      description: '',
      imgUrl: 'https://static.genebox.cn/v1.0/201808/1535508000940.png'
    }
  }
}
export const pmidSelect = {
  status: 0,
  msg: '请求成功',
  data: [{
    value: '3435435',
    label: 0
  }, {
    value: '13123242',
    label: 1
  }, {
    value: '13123242',
    label: 2
  }]
}
export const pmidInfo = {
  status: 0,
  msg: '',
  data: {
    sampleSize: '444',
    population: '222',
    oddsRatio: '4www',
    pValue: '3www',
    age: '15',
    gender: '男',
    comments: '这是一条备注',
    pmid: '2221,',
    phenotype: '332',
    rsid: '478'
  }
}
export const pimdTagInfo = {
  status: 0,
  msg: '',
  data: {
    sampleSize: '444',
    population: '222',
    age: '15',
    gender: '男',
    comments: 'The caspase 9 Ex5 + 32 AA genotype was associated with an increased risk for the development of LDH (OR = 1.91, 95% CI = 1.29–2.81) compared with the GG genotype.',
    pmid: '2221',
    rsid: '478',
    title: '标题',
    link: 'https://shimo.im/docs/RbAcGb2Gv142mRyA'
  }
}
export const pmidArr = {
  status: 0,
  msg: '',
  data: {
    allPmid: ['34322', '42424', '3333333'],
    operatePmid: ['34322', '42424', '3333333']
  }
}
export const pdfUrl = {
  status: 0,
  msg: '',
  data: {
    url: 'https://www.baidu.com/'
  }
}
