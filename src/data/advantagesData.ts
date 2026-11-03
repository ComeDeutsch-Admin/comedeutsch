｀import { AdvantageTab } from '../types';

export const ADVANTAGES_DATA: AdvantageTab[] = [
  {
    id: 'tutor-system',
    title: '導師制度',
    shortDesc: '主任與授課老師雙倍關心，學習路上不孤單',
    bulletPoints: [
      '主任每期與授課教師親自討論您的學習狀況，調整授課進度與方式',
      '隨時可與主任預約時間，釐清學習問題',
      '諮詢報名後，立即獲得客製化學習進度表',
    ],
    iconName: 'GraduationCap',
  },
  {
    id: 'flashcards',
    title: '複習單字卡',
    shortDesc: '告別死背，利用科學間隔重複法讓單字內化入腦',
    bulletPoints: [
      '依據主題精選重點生詞，製作專屬 Quizlet 數位單字卡',
      '單字卡標註詞性、德文名詞性別 (der/die/das)、複數型態、動詞變化',
      '附上母語人士標準德式發音，零碎時間隨時練習，複習效率提高 300%',
    ],
    iconName: 'Layers',
  },
  {
    id: 'seminars',
    title: '不定期講座',
    shortDesc: '連結海外留德校友與跨國職場前輩，拓展視野與人脈',
    bulletPoints: [
      '定期邀請在德學長姐、留德碩博士及外商德語工程師舉辦深度分享',
      '主題涵蓋：德國留學申請眉角、在德實習面試與德國租屋生活秘辛',
      '學員可免費參加，並於線上進行即時 Q&A 互動',
    ],
    iconName: 'Sparkles',
  },
  {
    id: 'phone-check',
    title: '電話抽查學習進度',
    shortDesc: '主動式督促預防怠惰，保持每週德語口說肌肉記憶',
    bulletPoints: [
      '主任不定期透過語音進行 5-10 分鐘德語單字與句型小快問',
      '即時診斷學員發音弱點與文法卡關處，當場提供清晰的矯正建議',
      '打破線上教學容易被動拖延的缺點，真正做到課前有預習、課後有驗收',
    ],
    iconName: 'PhoneCall',
  },
  {
    id: 'legal-invoice',
    title: '合法開立發票',
    shortDesc: '政府立案經營，學習有保障',
    bulletPoints: [
      '每筆課程學費皆合法開立財政部電子發票，安全誠信，權益受法律保障',
      '支援企業報帳開立統編、員工教育訓練補助收據憑證',
      '清楚合規的定型化契約與透明退費機制，不會有多餘的教材手續費',
    ],
    iconName: 'ReceiptText',
  },
];
