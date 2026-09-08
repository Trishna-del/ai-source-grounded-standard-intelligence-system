import { CertificationSchemeInfo } from '../types';

export const BIS_SCHEMES: CertificationSchemeInfo[] = [
  {
    id: 'isi-scheme-1',
    title: 'ISI Mark Scheme (Scheme I)',
    badge: 'Product Certification Scheme',
    schemeCode: 'Schedule II, Scheme I (BIS Act 2016)',
    targetAudience: 'Domestic Manufacturers producing goods under Mandatory QCOs or Voluntary ISI Standards',
    overview: 'The iconic ISI mark is the benchmark of industrial quality and consumer safety in India. Scheme I involves factory inspection, verification of in-house testing facilities, quality personnel competency, and independent laboratory testing before grant of CM/L (Certificate of Manufacture / Licence).',
    applicableSectors: ['Packaged Water', 'Cables & Conductors', 'Toys', 'Cement & Steel', 'Helmets', 'Electrical Appliances', 'Chemicals'],
    applicationFeeBase: 1000,
    annualFeeBase: 1000,
    msmeBenefits: [
      'Micro Enterprises get an 80% concession on annual minimum marking fees and application fees.',
      'Small Enterprises get a 50% concession on marking fees.',
      'Women entrepreneurs and Startups recognised by DPIIT receive special prioritized processing within 30 days.'
    ],
    phases: [
      {
        step: 1,
        title: 'Standards Identification & Gap Analysis',
        duration: '1 - 2 Weeks',
        summary: 'Determine the applicable Indian Standard (IS Code), examine whether a Mandatory Quality Control Order (QCO) is enforced, and study the Scheme of Inspection and Testing (SIT).',
        actions: [
          'Purchase or access the official IS specification via Manakonline portal.',
          'Review the Scheme of Testing and Inspection (STI) prescribed by BIS for that standard.',
          'Identify the required product varieties, sizes, grades, or types to be covered under the licence.'
        ],
        requiredDocs: ['MSME Udyam Registration Certificate', 'Manufacturing Premise Proof (Lease/Deed)', 'Factory Electricity Bill'],
        pitfallsToAvoid: 'Applying without reviewing STI requirements leads to major audit non-conformities.'
      },
      {
        step: 2,
        title: 'In-House Laboratory Setup & Equipment Calibration',
        duration: '2 - 4 Weeks',
        summary: 'BIS requires every manufacturer applying for Scheme I to maintain an in-house laboratory equipped with calibrated testing machinery specified in the STI.',
        actions: [
          'Procure all necessary physical, chemical, and endurance testing apparatus required by the IS code.',
          'Get all test gauges, multimeters, temperature chambers, and load cells calibrated by NABL accredited calibration labs.',
          'Appoint a qualified Quality Control Incharge (Degree/Diploma in relevant science/engineering branch).'
        ],
        requiredDocs: ['List of Manufacturing Machinery & installed capacity', 'List of In-house Testing Equipment with serial numbers', 'Valid Calibration Certificates from NABL-accredited lab', 'Resume & appointment letter of QC In-charge'],
        pitfallsToAvoid: 'Expired calibration certificates or missing minor test apparatus cause immediate application hold.'
      },
      {
        step: 3,
        title: 'Preparation of Raw Material & Quality Control Protocols',
        duration: '1 - 2 Weeks',
        summary: 'Establish traceable incoming raw material acceptance norms and internal batch records as mandated in the BIS STI document.',
        actions: [
          'Procure raw materials from certified or test-approved suppliers with mill test certificates.',
          'Format standard production logbooks, batch test registers, and sample retention registers.'
        ],
        requiredDocs: ['Raw material supplier test certificates', 'Process Flowchart with quality inspection checkpoints', 'Plant layout diagram showing testing lab and raw material store'],
        pitfallsToAvoid: 'Lack of batch numbering system on finished goods.'
      },
      {
        step: 4,
        title: 'Submission of Application on Manakonline',
        duration: '3 - 5 Days',
        summary: 'File the Form-V online application through the e-BIS Manakonline portal and pay the statutory application fee of ₹1,000 + inspection charges.',
        actions: [
          'Register on manakonline.in under e-BIS Product Certification module.',
          'Upload technical documentation, layout, STI acceptance, and test equipment list.',
          'Select standard option: Normal Procedure (sample tested during audit) or Simplified Procedure (pre-tested sample from BIS-recognized lab).'
        ],
        requiredDocs: ['Signed Form-V e-application', 'Brand name registration / Trademark deed', 'Consent from Pollution Control Board (if applicable)', 'MSME certificate for fee subsidy'],
        pitfallsToAvoid: 'Discrepancy between factory address in Udyam vs Factory electricity bill.'
      },
      {
        step: 5,
        title: 'Factory Audit & Verification Inspection by BIS Officer',
        duration: '1 - 2 Weeks (Scheduling)',
        summary: 'A designated BIS Inspecting Officer visits the manufacturing premises to verify infrastructure, test machinery, inspect batch records, and draw verification samples.',
        actions: [
          'Host the BIS audit team; demonstrate in-house sample testing in their presence.',
          'Countersign the joint inspection report and seal the drawn production samples for testing in a BIS/NABL referral lab.'
        ],
        requiredDocs: ['Factory layout physical verification', 'Live witness testing logbook signed on spot', 'Original calibration records'],
        pitfallsToAvoid: 'Operating below commercial production readiness during auditor inspection.'
      },
      {
        step: 6,
        title: 'Independent Lab Testing & Grant of CM/L Licence',
        duration: '2 - 4 Weeks',
        summary: 'Once the referral lab confirms that the sealed samples pass all parameters of the Indian Standard, BIS issues the Certificate of Manufacture / Licence (CM/L).',
        actions: [
          'Track lab report status on the Manakonline portal.',
          'Deposit the annual minimum marking fee upon receipt of the grant letter.',
          'Receive the 7-digit CM/L number and begin affixing the ISI Mark with IS Number and CM/L number.'
        ],
        requiredDocs: ['Passing Test Report from BIS Referral Lab', 'Bank proof of marking fee deposit', 'Design layout of ISI mark label as per IS guideline'],
        pitfallsToAvoid: 'Selling products without affixing the exact CM/L number and standard revision year.'
      }
    ]
  },
  {
    id: 'crs-scheme-2',
    title: 'Compulsory Registration Scheme (CRS - Scheme II)',
    badge: 'Self-Declaration of Conformity',
    schemeCode: 'Schedule II, Scheme II (MeitY / MNRE / MoHFW Goods)',
    targetAudience: 'Indian and Foreign Electronics, IT Hardware, Solar PV, and Lithium Battery Manufacturers',
    overview: 'Under CRS, manufacturers do not need a prior physical factory audit. Instead, testing is performed by a BIS-recognized NABL laboratory in India, and the registration is granted based on self-declaration of conformity. Ideal for rapid compliance in fast-moving tech sectors.',
    applicableSectors: ['Laptops & Tablets', 'Mobile Phones & Chargers', 'LED Luminaires', 'Power Banks & Li-ion Batteries', 'Solar PV Modules & Inverters', 'Smart Watches', 'Cash Registers'],
    applicationFeeBase: 53000,
    annualFeeBase: 0,
    msmeBenefits: [
      'Simplified registration process without factory physical visit saves international travel audit costs.',
      'Renewal valid for 2 to 5 years with simple confirmation of unbroken compliance.',
      'Inclusion of additional models can be added under series guidelines with minimal delta testing.'
    ],
    phases: [
      {
        step: 1,
        title: 'Product Categorization & Series Formulation',
        duration: '3 - 5 Days',
        summary: 'Review MeitY / MNRE gazette notifications to determine if your model falls under CRO orders and utilize BIS Series Guidelines to group models.',
        actions: [
          'Check the product type against 80+ notified CRS categories.',
          'Formulate a product series to test the most representative "worst-case" model, covering related variants.'
        ],
        requiredDocs: ['Product specification sheet & block diagram', 'Model difference declaration matrix', 'User manual & schematics'],
        pitfallsToAvoid: 'Grouping models with different PCB layouts or higher wattage into the same series.'
      },
      {
        step: 2,
        title: 'Sample Testing in BIS-Recognized Indian Lab',
        duration: '2 - 3 Weeks',
        summary: 'Send production test samples to a BIS-recognized laboratory located within India for testing as per relevant IS/IEC standards.',
        actions: [
          'Submit test requests via crsbis.in portal.',
          'Dispatch sample units and safety-critical component test certificates (e.g. UL/IEC for fuse, capacitor, transformer).'
        ],
        requiredDocs: ['Sample dispatch challan / customs clearance for overseas samples', 'Critical Component List (CCL) with manufacturer approvals'],
        pitfallsToAvoid: 'Submitting engineering prototypes instead of mass-production units.'
      },
      {
        step: 3,
        title: 'Online Filing on CRS Portal with Test Report',
        duration: '1 - 2 Days',
        summary: 'Upload the issued test report (valid for 90 days from test completion) onto the crsbis.in portal along with the Undertaking and Brand Authorization.',
        actions: [
          'Appoint an Authorized Indian Representative (AIR) if the manufacturing facility is located outside India.',
          'Complete the Form-I self-declaration.',
          'Pay government registration fee online.'
        ],
        requiredDocs: ['Valid Test Report from Indian Lab (<90 days old)', 'Affidavit cum Undertaking on non-judicial stamp paper', 'AIR Agreement and Indian Director ID (for foreign applicants)'],
        pitfallsToAvoid: 'Submitting reports after the 90-day validity window expires.'
      },
      {
        step: 4,
        title: 'Scrutiny and Grant of CRS R-Number',
        duration: '7 - 14 Days',
        summary: 'BIS scrutinizes the test findings and documentation. Upon approval, an 8-digit Registration Number (e.g., R-4100XXXX) is granted.',
        actions: [
          'Download official Registration Certificate from crsbis.in.',
          'Apply the standard CRS Standard Mark: "IS [Number] / Registration No: R-XXXXXXXX / www.bis.gov.in" on carton and device label.'
        ],
        requiredDocs: ['Registration Certificate PDF', 'Product artwork artwork proof complying with BIS marking guidelines'],
        pitfallsToAvoid: 'Missing the mandatory URL "www.bis.gov.in" on the product labeling.'
      }
    ]
  },
  {
    id: 'hallmarking-scheme-4',
    title: 'Jewellery Hallmarking Scheme (Scheme IV)',
    badge: 'Precious Metals Purity Guarantee',
    schemeCode: 'Schedule II, Scheme IV (Gold & Silver)',
    targetAudience: 'Jewellers, Goldsmiths, Bullion Refineries, and Assaying & Hallmarking Centres (AHC)',
    overview: 'Mandatory in over 340+ districts in India. Gold jewellery must be certified for exact fineness (e.g. 22K, 18K, 14K) and stamped with a 6-character Hallmark Unique Identification (HUID) laser etched at authorized AHCs.',
    applicableSectors: ['Gold Jewellery & Artefacts', 'Silver Jewellery & Cutlery', 'Gold Bullion Coins'],
    applicationFeeBase: 0,
    annualFeeBase: 0,
    msmeBenefits: [
      'Registration of jewellers has been made completely FREE by the Government of India (Zero portal fees!).',
      'Instant online registration on Manakonline with no physical inspections required for retail jewellers.',
      'Small artisans with turnover below ₹40 Lakhs/annum are exempt from mandatory hallmarking provisions.'
    ],
    phases: [
      {
        step: 1,
        title: 'Jeweller Registration on Manakonline',
        duration: 'Instant (1 Day)',
        summary: 'Any retail or wholesale jeweller selling gold jewellery must register their showroom/firm on the e-BIS Manakonline portal.',
        actions: [
          'Fill out online portal application with GSTIN and showroom address.',
          'Receive instant registration certificate with no government fee.'
        ],
        requiredDocs: ['GST Registration Certificate', 'PAN Card of Firm/Proprietor', 'Proof of Outlet Establishment / Trade License'],
        pitfallsToAvoid: 'Operating multiple showroom branches under a single registration without registering individual branch addresses.'
      },
      {
        step: 2,
        title: 'Submission of Jewellery to Recognized AHC',
        duration: '1 - 2 Days',
        summary: 'Jewellers take manufactured or procured unhallmarked jewellery lots to an authorized Assaying & Hallmarking Centre (AHC).',
        actions: [
          'Create delivery challan on the BIS Hallmarking software portal.',
          'Deliver pieces to AHC with declared purity grade (e.g., 22K 916).'
        ],
        requiredDocs: ['Digital delivery challan generated via BIS portal', 'Declared gross weight & piece count manifest'],
        pitfallsToAvoid: 'Mixing multiple alloys or purities in a single lot without segregation.'
      },
      {
        step: 3,
        title: 'Assaying, Fire Test & Laser Inscription of HUID',
        duration: '24 - 48 Hours',
        summary: 'AHC tests sample scraping via XRF and Cupellation Fire Assay. Once verified, a unique 6-digit alphanumeric HUID is generated and laser engraved.',
        actions: [
          'AHC lasers the 3 compulsory marks: (1) BIS Logo, (2) Purity Grade like 22K916, (3) 6-digit HUID code like AB1234.',
          'AHC logs the article weight and description into the centralized BIS database.',
          'Jeweller pays ₹45 + GST per gold article.'
        ],
        requiredDocs: ['AHC Assay Test Certificate', 'HUID barcode invoice receipt'],
        pitfallsToAvoid: 'Selling jewellery that only has the BIS logo without the 6-character HUID code.'
      }
    ]
  },
  {
    id: 'fmcs-scheme-10',
    title: 'Foreign Manufacturers Certification Scheme (FMCS - Scheme X)',
    badge: 'Overseas Importers & Global Plants',
    schemeCode: 'Schedule II, Scheme X (BIS Act 2016)',
    targetAudience: 'Overseas Manufacturers exporting products into India covered under Mandatory QCOs',
    overview: 'Enables overseas manufacturers outside India to use the standard ISI mark on products exported into India. Involves appointing an Authorized Indian Representative (AIR), physical factory inspection abroad by BIS officers, and sample testing in Indian laboratories.',
    applicableSectors: ['Steel & Metal Products', 'Chemicals & Polymers', 'Automotive Components', 'Sanitaryware', 'Medical Devices'],
    applicationFeeBase: 1000,
    annualFeeBase: 2000,
    msmeBenefits: [
      'Permits direct access to Indian markets and public government tenders (GeM portal requires BIS).',
      'Bilateral Mutual Recognition Agreements (MRA) assist in fast-track documentation.'
    ],
    phases: [
      {
        step: 1,
        title: 'Appointment of Authorized Indian Representative (AIR)',
        duration: '1 - 2 Weeks',
        summary: 'Foreign applicant must legally nominate an Indian resident citizen or an Indian registered subsidiary as their AIR to be accountable for compliance.',
        actions: ['Execute AIR agreement on Indian stamp paper and get it attested/notarized.'],
        requiredDocs: ['AIR Agreement', 'Indian Resident Identity Proof & PAN', 'Power of Attorney from overseas company'],
        pitfallsToAvoid: 'Appointing an Indian agent without explicit legal power to answer BIS compliance notices.'
      },
      {
        step: 2,
        title: 'Application Submission & Preliminary Scrutiny',
        duration: '2 - 3 Weeks',
        summary: 'Submit Form-V through the FMCD (Foreign Manufacturers Certification Department) portal along with technical files in English.',
        actions: ['Pay application fee and factory inspection deposit.'],
        requiredDocs: ['Overseas Factory Registration License', 'List of In-house Lab Equipment', 'Plant layout & manufacturing flowchart'],
        pitfallsToAvoid: 'Providing non-English documents without certified apostilled translations.'
      },
      {
        step: 3,
        title: 'Overseas Factory Audit by BIS Delegation',
        duration: '3 - 6 Weeks (Visa & Scheduling)',
        summary: 'BIS officials travel to the foreign factory to inspect quality management, verify test apparatus, and draw production samples.',
        actions: ['Coordinate airfare, accommodation, and per-diem for BIS auditing team as per government norms.'],
        requiredDocs: ['Physical verification of production floor', 'Sealed samples dispatched under customs bond to India'],
        pitfallsToAvoid: 'Delays in issuing official visa recommendation letters for BIS delegates.'
      },
      {
        step: 4,
        title: 'Performance Bank Guarantee & Grant of FMCS Licence',
        duration: '2 - 3 Weeks',
        summary: 'Upon satisfactory testing of samples in India, the manufacturer furnishes a Performance Bank Guarantee (PBG) of USD 10,000 and pays marking fees.',
        actions: ['Execute PBG through an Indian branch of an RBI-scheduled bank.', 'Receive CM/L licence number.'],
        requiredDocs: ['USD 10,000 Performance Bank Guarantee from Scheduled Bank', 'Marking fee proof'],
        pitfallsToAvoid: 'Delay in submitting the PBG within statutory 60 days of approval letter.'
      }
    ]
  }
];

export const MSME_FEE_CONCESSIONS = [
  {
    category: 'Micro Enterprise',
    criteria: 'Investment in Plant & Machinery <= ₹1 Crore AND Annual Turnover <= ₹5 Crore',
    concession: '80% concession on application fee & annual minimum marking fee',
    effectiveCostMultiplier: 0.20
  },
  {
    category: 'Small Enterprise',
    criteria: 'Investment in Plant & Machinery <= ₹10 Crore AND Annual Turnover <= ₹50 Crore',
    concession: '50% concession on application fee & annual minimum marking fee',
    effectiveCostMultiplier: 0.50
  },
  {
    category: 'Medium Enterprise',
    criteria: 'Investment in Plant & Machinery <= ₹50 Crore AND Annual Turnover <= ₹250 Crore',
    concession: 'Standard fee structure with priority facilitation',
    effectiveCostMultiplier: 1.00
  },
  {
    category: 'Large Enterprise',
    criteria: 'Investment > ₹50 Crore OR Turnover > ₹250 Crore',
    concession: 'Standard statutory fees',
    effectiveCostMultiplier: 1.00
  }
];
