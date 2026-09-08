import { ChatSource, LanguageOption } from '../types';

export const OFFICIAL_SOURCE_REPOSITORIES = [
  {
    name: 'BIS Act 2016 & Rules 2018',
    authority: 'Ministry of Consumer Affairs, Government of India',
    scope: 'Statutory framework for Standardisation, Conformity Assessment, and Hallmarking',
    freshness: 'Statutory Act, Last updated via Gazette Amendment 2024',
    url: 'https://www.bis.gov.in/the-bureau/the-bis-act/'
  },
  {
    name: 'Manakonline Portal (e-BIS)',
    authority: 'Bureau of Indian Standards',
    scope: 'Digital licensing, Scheme I (ISI) applications, STI guidelines, lab test records',
    freshness: 'Real-time sync',
    url: 'https://www.manakonline.in'
  },
  {
    name: 'CRS BIS Portal (Compulsory Registration Scheme)',
    authority: 'BIS & MeitY / MNRE',
    scope: 'Electronics, IT goods, Solar PV modules, and Lithium batteries registration',
    freshness: 'Updated bi-weekly',
    url: 'https://www.crsbis.in'
  },
  {
    name: 'DPIIT & Central Ministries QCO Gazettes',
    authority: 'Ministry of Commerce & Industry / DPIIT / MoHI',
    scope: 'Over 400+ Mandatory Quality Control Orders requiring mandatory certification',
    freshness: 'Gazette notifications 2020 - 2026',
    url: 'https://dpiit.gov.in'
  },
  {
    name: 'BIS Care & Hallmarking Portal',
    authority: 'Central Hallmarking Directorate',
    scope: 'Jeweller registration, HUID tracking, Assaying & Hallmarking Centre (AHC) records',
    freshness: 'Live API endpoint',
    url: 'https://www.bis.gov.in/hallmarking-overview/'
  }
];

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', badge: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', badge: 'HI' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', badge: 'TA' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', badge: 'TE' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', badge: 'MR' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', badge: 'BN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', badge: 'GU' },
];

export interface PrebuiltQueryMatch {
  keywords: string[];
  intent: string;
  responseEn: string;
  sources: ChatSource[];
  confidenceScore: number;
  nextSteps: string[];
  followUps: string[];
}

export const PREBUILT_KNOWLEDGE_BASE: PrebuiltQueryMatch[] = [
  {
    keywords: ['water', 'drinking water', '10500', 'packaged water', '14543', 'tds', 'ph', 'chlorine', 'purifier'],
    intent: 'Drinking Water Standards & Specifications',
    responseEn: `According to **IS 10500:2012 (Drinking Water — Specification, Second Revision)** published by the Bureau of Indian Standards (Drinking Water Sectional Committee FAD 25):

1. **Physical & Organoleptic Limits:**
   - **TDS (Total Dissolved Solids):** Maximum 500 mg/L (acceptable limit); up to 2,000 mg/L (permissible limit in the absence of an alternate source).
   - **pH Value:** Must be between **6.5 and 8.5** (no relaxation permissible).
   - **Turbidity:** Maximum 1 NTU (acceptable) and 5 NTU (permissible).

2. **Toxic & Chemical Limits:**
   - **Arsenic:** Max 0.01 mg/L.
   - **Lead:** Max 0.01 mg/L.
   - **Fluoride:** Max 1.0 mg/L (acceptable), 1.5 mg/L (permissible).

3. **Microbiological Safety:**
   - E. coli and Total Coliform organisms **shall not be detectable in any 100 mL sample**.

*Note:* For packaged drinking water, manufacturers must comply with **IS 14543:2016** and obtain a mandatory ISI CM/L license before commercial bottling.`,
    sources: [
      {
        title: 'IS 10500:2012 Drinking Water Specification',
        referenceId: 'IS 10500:2012 (Clauses 4.1 to 4.3)',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/10500',
        relevanceSummary: 'Official technical specifications for potable public drinking water parameters.'
      },
      {
        title: 'IS 14543:2016 Packaged Drinking Water Specification',
        referenceId: 'IS 14543:2016 Mandatory ISI Scheme',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/14543',
        relevanceSummary: 'Mandatory standard for commercial water packaging and bottling plants.'
      }
    ],
    confidenceScore: 99,
    nextSteps: [
      'Locate NABL accredited water testing laboratories via e-BIS portal.',
      'Check in-house laboratory setup required under Scheme of Testing & Inspection (STI 10500).',
      'Verify packaged water brand CM/L license on the Product Verification page.'
    ],
    followUps: [
      'What are the in-house test equipment needed for IS 14543 water bottling?',
      'How to verify an ISI license on a water bottle jar?',
      'What are the MSME fee concessions for water testing plants?'
    ]
  },
  {
    keywords: ['toy', 'toys', '9873', 'children', 'choking', 'dpiit toys', 'plastic toy'],
    intent: 'Toys Safety & Quality Control Order (QCO)',
    responseEn: `Under the **Toys (Quality Control) Order, 2020** issued by the Ministry of Commerce and Industry (DPIIT), **it is compulsory for all toys manufactured or imported into India to bear the ISI Mark**.

Applicable Indian Standards:
- **IS 9873 (Part 1):2019** — Safety of Toys: Mechanical and Physical Properties.
- **IS 9873 (Part 2):2017** — Flammability of Toys.
- **IS 9873 (Part 3):2017** — Migration of Certain Elements (Lead limit: 90 mg/kg, Cadmium: 75 mg/kg).
- **IS 15644:2006** — Electric Toys Safety (for battery or mains-powered toys).

**Key Rules for Manufacturers & MSMEs:**
- Selling toys without the genuine ISI mark is a cognizable offense under Section 29 of the BIS Act, 2016 (fine up to ₹2 Lakh or 2 years imprisonment).
- Micro enterprises receive an **80% concession** on the annual minimum marking fee, and Small enterprises receive a **50% concession**.
- Foreign manufacturers must apply through the FMCS (Scheme X) and undergo overseas factory inspection.`,
    sources: [
      {
        title: 'DPIIT Toys (Quality Control) Order 2020',
        referenceId: 'Gazette S.O. 853(E) dated 25 Feb 2020',
        docType: 'Gazette QCO',
        url: 'https://dpiit.gov.in/sites/default/files/Toys_QCO_2020.pdf',
        relevanceSummary: 'Enforces compulsory BIS ISI marking for all electric and non-electric toys.'
      },
      {
        title: 'IS 9873 (Part 1):2019 Toy Safety Mechanical Parameters',
        referenceId: 'IS 9873 (Part 1):2019',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/9873',
        relevanceSummary: 'Physical choke hazard small parts cylinder and drop testing protocols.'
      }
    ],
    confidenceScore: 98,
    nextSteps: [
      'Review the BIS Scheme of Testing and Inspection (STI/9873/1).',
      'Download Udyam Registration to claim 80% Micro enterprise marking fee concession.',
      'Check in-house test equipment checklist for sharp edge and drop testing.'
    ],
    followUps: [
      'What is the difference between IS 9873 Part 1 and IS 15644?',
      'Can handmade wooden toys get BIS exemption?',
      'How does an overseas toy maker get FMCS certification?'
    ]
  },
  {
    keywords: ['gold', 'jewel', 'hallmark', 'huid', 'purity', 'carat', 'karat', 'silver', '22k', '18k'],
    intent: 'Gold Jewellery Hallmarking & HUID Verification',
    responseEn: `According to the **Hallmarking of Gold Jewellery and Gold Artefacts Order** under the BIS Act, 2016:

1. **Mandatory 3 Marks on All Gold Jewellery:**
   - **BIS Logo:** The official triangular standard mark.
   - **Purity Grade & Fineness:** Clearly stamped as **22K916** (22 Karat - 91.6% pure), **18K750** (18 Karat - 75% pure), or **14K585** (14 Karat - 58.5% pure).
   - **HUID (Hallmark Unique Identification):** A **6-character alphanumeric code** (e.g., AB1234) laser engraved by a BIS-recognized Assaying and Hallmarking Centre (AHC).

2. **Consumer Rights & Protection:**
   - Every consumer has the legal right to check the 6-digit HUID code using the BIS Care App or BIAS STANDARD verification tool.
   - If jewellery is found below the declared fineness, the jeweller is legally bound to compensate the consumer **two times the shortage in purity** plus assaying charges.
   - Retail Jeweller registration on the e-BIS Manakonline portal is **100% Free** (Zero government fee).`,
    sources: [
      {
        title: 'BIS Hallmarking Regulations (Scheme IV)',
        referenceId: 'BIS (Hallmarking) Regulations, 2018 (Amended 2021)',
        docType: 'BIS Act 2016',
        url: 'https://www.manakonline.in/MANAK/hallmarkingOverview',
        relevanceSummary: 'Statutory regulation making 6-digit HUID laser marking compulsory.'
      },
      {
        title: 'IS 1417:2016 Gold Fineness and Marking',
        referenceId: 'IS 1417:2016 Table 1',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/1417',
        relevanceSummary: 'Official fineness and karat classifications (24K, 23K, 22K, 20K, 18K, 14K).'
      }
    ],
    confidenceScore: 99,
    nextSteps: [
      'Verify a 6-digit gold HUID in our Product Verification tab.',
      'Check if your district is among the 340+ mandatory hallmarked districts.',
      'Register your jewellery store for free on Manakonline.'
    ],
    followUps: [
      'How to verify HUID code on BIS Care App?',
      'What is the fee charged per gold article for hallmarking at an AHC?',
      'Are gold coins and bullion also covered under HUID?'
    ]
  },
  {
    keywords: ['crs', 'compulsory registration', 'electronics', 'meity', 'cro', 'laptop', 'mobile', 'battery', 'adapter'],
    intent: 'Compulsory Registration Scheme (CRS) for Electronics',
    responseEn: `The **Compulsory Registration Scheme (CRS - Scheme II)** is operated by BIS in cooperation with the **Ministry of Electronics and Information Technology (MeitY)** and **Ministry of New & Renewable Energy (MNRE)**:

1. **How CRS Differs from ISI Mark (Scheme I):**
   - **No Factory Audit:** Unlike Scheme I, BIS officers do not inspect the overseas or domestic manufacturing plant prior to granting registration.
   - **Lab Test Grounding:** Testing is strictly conducted in BIS-recognized labs inside India.
   - **Self-Declaration of Conformity:** Manufacturer uploads the test report within 90 days of issuance along with an Undertaking to receive an 8-digit **R-Number** (e.g., R-4100XXXX).

2. **Key Covered Categories:**
   - Laptops & Tablets (**IS 13252 Part 1**)
   - Mobile Phones & Power Banks (**IS 13252 / IS 16046**)
   - Lithium Cells & Batteries (**IS 16046 Part 2**)
   - Solar Inverters & Storage Batteries (**IS 16270 / IS 16169**)
   - LED Lamps & Luminaires (**IS 16102 Part 1**)

3. **Overseas Manufacturers:**
   - Must designate an **Authorized Indian Representative (AIR)** who is legally responsible for regulatory compliance.`,
    sources: [
      {
        title: 'MeitY Electronics & IT Goods (Requirements for Compulsory Registration) Order',
        referenceId: 'MeitY CRO Orders Phase I - V',
        docType: 'Gazette QCO',
        url: 'https://www.crsbis.in/BIS/products.do',
        relevanceSummary: 'Lists all 80+ electronic goods mandated for CRS registration.'
      },
      {
        title: 'IS 13252 (Part 1):2010 Information Technology Equipment Safety',
        referenceId: 'IS 13252:2010 / IEC 60950-1',
        docType: 'Indian Standard',
        url: 'https://www.crsbis.in',
        relevanceSummary: 'Safety parameters including insulation, fire resistance, and touch current.'
      }
    ],
    confidenceScore: 97,
    nextSteps: [
      'Check model grouping series guidelines for CRS.',
      'Submit sample to a BIS recognized NABL test lab in India.',
      'Search CRS registration number on Product Verification page.'
    ],
    followUps: [
      'What documents are needed to appoint an Authorized Indian Representative (AIR)?',
      'What is the validity period of a CRS registration number?',
      'How to add new models into an existing CRS registration?'
    ]
  },
  {
    keywords: ['fee', 'cost', 'msme', 'subsidy', 'concession', 'udyam', 'discount', 'how much'],
    intent: 'BIS Fees, Costs, and MSME Concessions',
    responseEn: `The Bureau of Indian Standards offers substantial fee concessions to promote domestic manufacturing and MSME competitiveness:

1. **Fee Concessions for MSMEs (Ministry of Consumer Affairs Notification):**
   - **Micro Enterprises:** Eligible for **80% concession** on the annual minimum marking fee and application fee under Scheme I (ISI).
   - **Small Enterprises:** Eligible for **50% concession** on annual minimum marking fee and application fee.
   - **Women Entrepreneurs & DPIIT Startups:** Granted 50% marking fee concession and fast-track 30-day processing.

2. **Standard Fee Breakdown (Scheme I - ISI):**
   - **Application Fee:** ₹1,000 (Base statutory fee).
   - **Preliminary Factory Inspection Fee:** ₹7,000 per officer day + travel/lodging.
   - **Annual Licence Fee:** ₹1,000 per licence.
   - **Minimum Marking Fee:** Product-specific (typically ₹40,000 to ₹1,50,000 per year before MSME discounts).
   - **Independent Lab Testing Charges:** As actuals billed by the BIS/NABL referral laboratory.

3. **CRS Scheme II Fee:**
   - Registration fee: ₹53,000 (for first series/model for 2 years).`,
    sources: [
      {
        title: 'BIS Conformity Assessment Regulations - Financial Guidelines',
        referenceId: 'BIS Notification Ref. CMD-I/Fee-Concession/2022',
        docType: 'e-BIS Guideline',
        url: 'https://www.manakonline.in',
        relevanceSummary: 'Official orders outlining 80% Micro and 50% Small enterprise concessions.'
      }
    ],
    confidenceScore: 98,
    nextSteps: [
      'Use the interactive Fee Calculator on the Certification Guide page.',
      'Verify Udyam Certificate category (Micro vs Small).',
      'Download STI document to estimate lab equipment setup investment.'
    ],
    followUps: [
      'How to calculate exact marking fee for my product?',
      'Do startups get expedited factory audits from BIS?',
      'What is the fee for renewing an ISI license after 2 years?'
    ]
  },
  {
    keywords: ['helmet', 'helmets', 'two wheeler', '4151', 'morth', 'rider', 'headgear'],
    intent: 'Protective Helmets for Two-Wheeler Riders',
    responseEn: `Under the **Two Wheeler Helmets (Quality Control) Order, 2020** issued by the Ministry of Road Transport & Highways (MoRTH):

1. **Mandatory Standard:**
   - All protective helmets for motorcycle/scooter riders manufactured, stocked, or sold in India must strictly adhere to **IS 4151:2020 (Protective Helmets for Two-Wheeler Riders — Specification)**.
   - Selling, importing, or manufacturing non-ISI marked helmets is a criminal violation.

2. **Key 2020 Revisions & Safety Tests:**
   - **Weight Cap:** Maximum allowed weight has been capped at **1.2 kg (1200 grams)** to reduce neck strain for riders.
   - **Impact Attenuation:** Peak headform deceleration must not exceed 300g during drop tower impact testing.
   - **Retention System:** Chin strap dynamic displacement must not exceed 35 mm under a 1,000 N tensile force.
   - **Visor Clarity:** Minimum 85% light transmittance for clear visors.`,
    sources: [
      {
        title: 'MoRTH Two-Wheeler Helmets (Quality Control) Order 2020',
        referenceId: 'MoRTH Notification S.O. 4252(E)',
        docType: 'Gazette QCO',
        url: 'https://morth.nic.in',
        relevanceSummary: 'Statutory mandate requiring mandatory ISI mark on all rider helmets.'
      },
      {
        title: 'IS 4151:2020 Specification for Two Wheeler Helmets',
        referenceId: 'IS 4151:2020 Fourth Revision',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/4151',
        relevanceSummary: 'Engineering specifications for impact energy attenuation and 1.2kg weight limit.'
      }
    ],
    confidenceScore: 98,
    nextSteps: [
      'Check helmet CM/L number on the Product Verification portal.',
      'Review IS 4151 in the Standards Explorer.',
      'Check NABL test labs qualified for helmet drop testing.'
    ],
    followUps: [
      'Why are imported DOT/ECE helmets without ISI mark not legal in India?',
      'What testing machinery is required in-house for helmet manufacturers?',
      'How to identify fake ISI logos printed on cheap helmets?'
    ]
  },
  {
    keywords: ['cable', 'wire', '694', 'pvc cable', 'copper wire', 'wiring', 'spark test'],
    intent: 'PVC Insulated Cables (IS 694) Quality Control Order',
    responseEn: `Electrical cables used in residential and commercial installations are governed by **IS 694:2010 (PVC Insulated Cables for Working Voltages up to and including 1100 V)**:

1. **Mandatory Certification:**
   - Covered under the **Cables (Quality Control) Order**. Unmarked or sub-standard wiring represents the leading cause of short-circuit fires and is prohibited from commercial sale.

2. **Core Technical Benchmarks:**
   - **Conductor Resistance:** Strictly evaluated as per IS 8130 to prevent heating due to high resistance alloys.
   - **High Voltage Spark Test:** 100% finished cables must withstand in-line spark testing without insulation puncture.
   - **Insulation Resistance Constant (Ki):** Minimum 3.67 MΩ·km at 20°C.
   - **Flame Retardance:** Must comply with IS 10810 Part 53 to resist flame propagation.`,
    sources: [
      {
        title: 'IS 694:2010 PVC Insulated Cables Specification',
        referenceId: 'IS 694:2010 Fourth Revision',
        docType: 'Indian Standard',
        url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/694',
        relevanceSummary: 'Official specifications for household and industrial power cabling.'
      }
    ],
    confidenceScore: 97,
    nextSteps: [
      'Verify cable CM/L number on Product Verification page.',
      'Check in-house test bench requirements for spark testers and Kelvin bridges.',
      'Calculate MSME concession for wire manufacturing unit.'
    ],
    followUps: [
      'What are the mandatory testing apparatus for IS 694?',
      'What is the difference between IS 694 and IS 7098 (XLPE)?',
      'What penalty applies if a wire factory produces sub-standard conductor size?'
    ]
  }
];

export const GENERAL_FALLBACK_WARNING = {
  isUnavailableWarning: true,
  content: `⚠️ **Verified Official Source Notice: Information Unavailable in Official BIS Documentation**

BIAS STANDARD operates under strict **Source Grounding Guardrails**. We only generate technical and regulatory information that is directly verifiable through:
1. The Bureau of Indian Standards (BIS Act 2016, Rules 2018)
2. Published Indian Standards specifications (IS Codes)
3. Statutory Quality Control Orders (QCOs) published in The Gazette of India
4. Official e-BIS / Manakonline / CRS registry databases

We cannot synthesize, predict, or generate non-verified technical parameters, legal interpretations, or third-party commercial claims.

**Recommended Actions:**
- Refine your query with a specific **IS Number** (e.g. *IS 10500*, *IS 9873*, *IS 694*), a regulated product name (e.g. *LED bulbs*, *Drinking Water*, *Gold Jewellery*), or a BIS scheme (*ISI Mark*, *CRS*, *Hallmarking*, *FMCS*).
- Visit the official BIS Portal at **[manakonline.in](https://www.manakonline.in)** or contact the BIS National Enquiry Point at **standards@bis.gov.in**.`,
  sources: [],
  confidenceScore: 0,
  nextSteps: [
    'Search the Standards Explorer using product name or IS code.',
    'Review the Certification Guide for step-by-step scheme workflows.',
    'Verify a CM/L, CRS R-Number, or Gold HUID on the Product Verification tab.'
  ],
  followUps: [
    'What are the drinking water quality limits under IS 10500?',
    'What is the Toys Quality Control Order (QCO)?',
    'How do I verify a 6-digit Gold HUID code?'
  ]
};
