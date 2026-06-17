import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    ar: 'كم مرة تستخدم مستحضرات التجميل أو العناية بالبشرة (بما في ذلك الكريمات، الغسولات، منتجات الشعر، العطور)؟',
    en: 'How frequently do you use cosmetic or skincare products (including creams, cleansers, hair products, perfumes)?',
    type: 'radio',
    options: [
      { id: 'daily', en: 'Daily', ar: 'يومياً' },
      { id: 'weekly', en: 'Several times a week', ar: 'عدة مرات في الأسبوع' },
      { id: 'rarely', en: 'Rarely / Only on occasions', ar: 'نادراً / في المناسبات' }
    ]
  },
  {
    id: 'q2',
    ar: 'ما هي طبيعة أو فئة مستحضرات التجميل التي تستخدمها بشكل متكرر؟ (يمكنك اختيار أكثر من إجابة)',
    en: 'What is the nature/category of the cosmetic products you use most frequently? (Select all that apply)',
    type: 'checkbox',
    options: [
      { id: 'medicated', en: 'Medicated / Dermaceutical brands', ar: 'ماركات طبية / علاجية' },
      { id: 'commercial', en: 'Commercial / Drugstore brands', ar: 'ماركات تجارية / صيدلانية' },
      { id: 'local', en: 'Local / Handmade / Unbranded products', ar: 'منتجات محلية / يدوية الصنع / غير معروفة' },
      { id: 'herbal', en: 'Herbal / Natural traditional formulations', ar: 'تركيبات عشبية / طبيعية تقليدية' }
    ]
  },
  {
    id: 'q3',
    ar: 'من أين تشتري مستحضرات التجميل والعناية بشكل أساسي؟',
    en: 'Where do you primarily purchase your cosmetic products?',
    type: 'radio',
    options: [
      { id: 'pharmacies', en: 'Pharmacies', ar: 'الصيدليات' },
      { id: 'specialized', en: 'Specialized cosmetic stores or malls', ar: 'متاجر التجميل المتخصصة أو المراكز التجارية' },
      { id: 'online', en: 'Online shopping pages or social media', ar: 'صفحات التسوق الإلكتروني أو وسائل التواصل الاجتماعي' },
      { id: 'supermarkets', en: 'Local supermarkets or local markets', ar: 'المحلات التجارية المحلية أو الأسواق' }
    ]
  },
  {
    id: 'q4',
    ar: 'ما القيمة التقريبية لإنفاقك على مستحضرات التجميل والعناية شهرياً؟',
    en: 'Approximately how much do you spend on cosmetic/skincare products per month?',
    type: 'radio',
    options: [
      { id: 'under_15k', en: 'Under 15,000 IQD', ar: 'أقل من ١٥,٠٠٠ دينار عراقي' },
      { id: '15k_50k', en: '15,000 to 50,000 IQD', ar: 'من ١٥,٠٠٠ إلى ٥٠,٠٠٠ دينار عراقي' },
      { id: '51k_100k', en: '51,000 to 100,000 IQD', ar: 'من ٥١,٠٠٠ إلى ١٠٠,٠٠٠ دينار عراقي' },
      { id: 'over_100k', en: 'More than 100,000 IQD', ar: 'أكثر من ١٠٠,٠٠٠ دينار عراقي' }
    ]
  },
  {
    id: 'q5',
    ar: 'هل تتحقق من تاريخ انتهاء الصلاحية، مدة الاستخدام بعد الفتح، أو المكونات قبل شراء المنتج؟',
    en: 'Do you check the expiration date, shelf life, or ingredients before buying a product?',
    type: 'radio',
    options: [
      { id: 'yes', en: 'Yes', ar: 'نعم' },
      { id: 'no', en: 'No', ar: 'لا' },
      { id: 'sometimes', en: 'Sometimes', ar: 'أحياناً' }
    ]
  },
  {
    id: 'q6',
    ar: 'هل عانيت سابقاً من أي أثر جانبي أو تأثير غير مرغوب فيه بعد استخدام مستحضر تجميلي؟',
    en: 'Have you ever experienced an undesirable or adverse effect after using a cosmetic product?',
    type: 'radio',
    options: [
      { id: 'yes', en: 'Yes', ar: 'نعم' },
      { id: 'no', en: 'No', ar: 'لا' }
    ]
  },
  {
    id: 'q7',
    ar: 'ما نوع العرض الجانبي الذي تعرضت له؟ (يمكنك اختيار أكثر من إجابة)',
    en: 'What type of adverse reaction did you experience? (Select all that apply)',
    type: 'checkbox',
    options: [
      { id: 'redness', en: 'Skin Redness, Rash, or Swelling', ar: 'احمرار الجلد، طفح جلدي، أو تورم' },
      { id: 'itching', en: 'Severe Itching or Burning sensation', ar: 'حكة شديدة أو شعور بالحرقة' },
      { id: 'acne', en: 'Sudden Acne breakouts', ar: 'ظهور مفاجئ لحب الشباب' },
      { id: 'hair', en: 'Hair thinning, Scalp issues, or Hair fall', ar: 'ترقق الشعر، مشاكل في فروة الرأس، أو تساقط الشعر' },
      { id: 'other', en: 'Other', ar: 'أخرى' }
    ]
  },
  {
    id: 'q8',
    ar: 'إذا كان العرض الجانبي بسبب منتج للعناية بالبشرة، ما نوعه بالتحديد؟ (يمكنك اختيار أكثر من إجابة)',
    en: 'If the reaction was caused by a skincare product, what specific type was it?',
    type: 'checkbox',
    options: [
      { id: 'cleanser', en: 'Facial Cleanser or Scrub', ar: 'غسول أو مقشر للوجه' },
      { id: 'moisturizer', en: 'Moisturizer or Cream', ar: 'مرطب أو كريم' },
      { id: 'serum', en: 'Facial Serum or Toner', ar: 'سيروم أو تونر للوجه' },
      { id: 'sunscreen', en: 'Sunscreen', ar: 'واقي شمس' },
      { id: 'lightening', en: 'Skin Lightening or Bleaching Cream', ar: 'كريم تفتيح أو تبييض البشرة' },
      { id: 'na', en: 'Not Applicable', ar: 'لا ينطبق' }
    ]
  },
  {
    id: 'q9',
    ar: 'إذا كان العرض الجانبي بسبب منتج للشعر، ما نوعه بالتحديد؟ (يمكنك اختيار أكثر من إجابة)',
    en: 'If the reaction was caused by a hair product, what specific type was it?',
    type: 'checkbox',
    options: [
      { id: 'shampoo', en: 'Shampoo or Conditioner', ar: 'شامبو أو بلسم' },
      { id: 'dye', en: 'Hair Dye or Bleach', ar: 'صبغة شعر أو مبيض' },
      { id: 'oil', en: 'Hair Oil or Serum', ar: 'زيت أو سيروم للشعر' },
      { id: 'straightener', en: 'Chemical Straightener or Keratin Treatment', ar: 'مملس كيميائي أو علاج الكيراتين' },
      { id: 'na', en: 'Not Applicable', ar: 'لا ينطبق' }
    ]
  },
  {
    id: 'q10',
    ar: 'كيف تصف شدة أهم عرض جانبي تعرضت له؟',
    en: 'How would you describe the severity of the most significant reaction you experienced?',
    type: 'radio',
    options: [
      { id: 'mild', en: 'Mild', ar: 'خفيف' },
      { id: 'moderate', en: 'Moderate', ar: 'متوسط' },
      { id: 'severe', en: 'Severe', ar: 'شديد' }
    ]
  },
  {
    id: 'q11',
    ar: 'ما الإجراء الذي اتخذته بعد ظهور هذا العرض الجانبي؟',
    en: 'What action did you take after experiencing this reaction?',
    type: 'radio',
    options: [
      { id: 'discontinued', en: 'Discontinued using the product immediately', ar: 'التوقف عن استخدام المنتج على الفور' },
      { id: 'kept_using', en: 'Kept using it hoping it would clear up', ar: 'الاستمرار في استخدامه على أمل أن يزول العرض' },
      { id: 'consulted', en: 'Consulted a doctor, dermatologist, or pharmacist', ar: 'استشارة طبيب، طبيب أمراض جلدية، أو صيدلاني' },
      { id: 'home_remedy', en: 'Used a home remedy or a friend\'s advice', ar: 'استخدام علاج منزلي أو نصيحة صديق' }
    ]
  }
];
