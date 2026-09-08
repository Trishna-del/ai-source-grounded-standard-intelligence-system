export interface Standard {
  id: string;
  isNumber: string;
  title: string;
  category: string;
  division: string;
  status: 'Mandatory (QCO)' | 'Voluntary';
  qcoMinistry?: string;
  qcoDate?: string;
  scheme: 'Scheme I (ISI)' | 'Scheme II (CRS)' | 'Scheme IV (Hallmark)' | 'Scheme X (FMCS)' | 'ECO Mark';
  publicationYear: number;
  amendments: number;
  technicalCommittee: string;
  description: string;
  keyParameters: string[];
  testMethods: string[];
  nablLabCountApprox: number;
  markingFeeInfo: string;
  officialUrl: string;
}

export interface LicenseRecord {
  queryId: string;
  type: 'cml' | 'crs' | 'huid' | 'qr';
  status: 'VALID' | 'SUSPENDED' | 'EXPIRED' | 'NOT_FOUND';
  cmlNumber?: string;
  regNumber?: string;
  huid?: string;
  manufacturerName: string;
  brandName: string;
  factoryAddress: string;
  isStandard: string;
  productDescription: string;
  validUpto: string;
  grantDate: string;
  districtState: string;
  purityGrade?: string; // For Hallmark (e.g. 22K916)
  ahcCenter?: string; // Assaying and Hallmarking Centre
  qrPayload?: string;
  remarks?: string;
}

export interface CertificationPhase {
  step: number;
  title: string;
  duration: string;
  summary: string;
  actions: string[];
  requiredDocs: string[];
  pitfallsToAvoid: string;
}

export interface CertificationSchemeInfo {
  id: string;
  title: string;
  badge: string;
  schemeCode: string;
  targetAudience: string;
  overview: string;
  applicableSectors: string[];
  phases: CertificationPhase[];
  msmeBenefits: string[];
  applicationFeeBase: number;
  annualFeeBase: number;
}

export interface ChatSource {
  title: string;
  referenceId: string;
  docType: 'Indian Standard' | 'Gazette QCO' | 'BIS Act 2016' | 'e-BIS Guideline' | 'NABL Scope';
  url: string;
  relevanceSummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: ChatSource[];
  confidenceScore?: number;
  isGrounded: boolean;
  isUnavailableWarning?: boolean;
  suggestedFollowUps?: string[];
  actionPlan?: string[];
  detectedIntent?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  badge: string;
}
