import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  QrCode, 
  AlertTriangle, 
  ShieldCheck, 
  XCircle, 
  Building2, 
  FileText, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  PhoneCall, 
  Sparkles,
  Camera,
  RefreshCw
} from 'lucide-react';
import { LicenseRecord } from '../types';
import { BIS_LICENSE_DATABASE } from '../data/licensesData';

interface ProductVerificationViewProps {
  isDarkMode?: boolean;
}

export const ProductVerificationView: React.FC<ProductVerificationViewProps> = ({
  isDarkMode = true
}) => {
  const [activeMode, setActiveMode] = useState<'all' | 'cml' | 'crs' | 'huid' | 'qr'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [verificationResult, setVerificationResult] = useState<LicenseRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [notFoundQuery, setNotFoundQuery] = useState<string | null>(null);

  const handleVerify = (queryToTest?: string) => {
    const query = (queryToTest !== undefined ? queryToTest : searchQuery).trim();
    if (!query) return;

    setHasSearched(true);
    const cleanQuery = query.toUpperCase().replace(/[^A-Z0-9]/gi, '');

    const found = BIS_LICENSE_DATABASE.find((record) => {
      if (activeMode !== 'all' && record.type !== activeMode) return false;
      const recId = record.queryId.toUpperCase().replace(/[^A-Z0-9]/gi, '');
      const cmlClean = (record.cmlNumber || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');
      const regClean = (record.regNumber || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');
      const huidClean = (record.huid || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');

      return (
        recId === cleanQuery ||
        cmlClean.includes(cleanQuery) ||
        regClean.includes(cleanQuery) ||
        huidClean === cleanQuery ||
        (record.qrPayload && record.qrPayload.toUpperCase().includes(cleanQuery))
      );
    });

    if (found) {
      setVerificationResult(found);
      setNotFoundQuery(null);
    } else {
      setVerificationResult(null);
      setNotFoundQuery(query);
    }
  };

  const handleSimulateQRScan = () => {
    setIsScanningQR(true);
    setTimeout(() => {
      setIsScanningQR(false);
      setSearchQuery('QR-IS10500-DEL-99');
      handleVerify('QR-IS10500-DEL-99');
    }, 1800);
  };

  const sampleTestPresets = [
    { label: 'Active Water ISI (CM/L 8400192)', query: '8400192', mode: 'cml' as const, badge: 'Valid' },
    { label: 'Toys DPIIT License (CM/L 7200145)', query: '7200145', mode: 'cml' as const, badge: 'Valid' },
    { label: 'Suspended Cable License (CM/L 3109284)', query: '3109284', mode: 'cml' as const, badge: 'Suspended ⚠️' },
    { label: 'CRS Laptop (R-41002341)', query: '41002341', mode: 'crs' as const, badge: 'Valid' },
    { label: 'Expired CRS TV (R-98231012)', query: '98231012', mode: 'crs' as const, badge: 'Expired ❌' },
    { label: 'Gold 22K HUID (AB1234)', query: 'AB1234', mode: 'huid' as const, badge: 'Gold HUID' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-emerald-400' : 'text-emerald-800'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>National BIS Registry Verification Portal</span>
        </div>
        <h1 className={`text-2xl sm:text-4xl font-extrabold ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Product, CM/L License & Gold HUID Authenticator
        </h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Instantly verify whether a product bearing the ISI mark, CRS registration, or 6-digit Hallmark Unique Identification (HUID) is authentic and legally authorized for sale under the BIS Act 2016.
        </p>
      </div>

      {/* Verification Query Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
      }`}>
        {/* Mode Selector Tabs */}
        <div className={`flex flex-wrap gap-2 pb-4 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <button
            onClick={() => setActiveMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'all'
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Identifier Types
          </button>
          <button
            onClick={() => setActiveMode('cml')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'cml'
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ISI CM/L License Number
          </button>
          <button
            onClick={() => setActiveMode('crs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'crs'
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            CRS Registration (R-Number)
          </button>
          <button
            onClick={() => setActiveMode('huid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'huid'
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Jewellery Hallmark HUID (6-digit)
          </button>
          <button
            onClick={() => setActiveMode('qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeMode === 'qr'
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ISI QR Code Scan
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder={
                activeMode === 'huid'
                  ? 'Enter 6-character HUID code (e.g. AB1234, JK7890)...'
                  : activeMode === 'crs'
                  ? 'Enter CRS R-Number (e.g. 41002341, R-41129033)...'
                  : activeMode === 'cml'
                  ? 'Enter 7-digit CM/L number (e.g. 8400192, 7200145)...'
                  : 'Enter CM/L number, CRS R-number, or 6-digit Gold HUID...'
              }
              className={`w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm font-mono uppercase transition-all focus:outline-hidden focus:ring-2 ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-900/40' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-blue-100 focus:bg-white'
              }`}
            />
          </div>

          <button
            onClick={() => handleVerify()}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Verify Authenticity</span>
          </button>

          <button
            onClick={handleSimulateQRScan}
            disabled={isScanningQR}
            className={`px-4 py-3.5 text-sm font-semibold rounded-xl border transition-colors flex items-center justify-center space-x-2 shrink-0 ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Simulate scanning an ISI QR Code"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>{isScanningQR ? 'Scanning...' : 'Scan QR'}</span>
          </button>
        </div>

        {/* QR Scanning Animation Simulator */}
        {isScanningQR && (
          <div className="p-8 rounded-2xl bg-slate-950 text-white text-center space-y-4 animate-in fade-in border border-slate-800">
            <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-900">
              <QrCode className="w-24 h-24 text-slate-600" />
              <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce" />
            </div>
            <p className="text-xs text-emerald-400 font-mono font-medium">
              Simulating BIS Care camera optical scanner... Decoding cryptographic QR payload.
            </p>
          </div>
        )}

        {/* Preset Sample Records for Demonstration */}
        <div className="space-y-2 pt-2">
          <span className={`text-xs font-semibold block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Or test with verified sample records:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleTestPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(preset.query);
                  setActiveMode(preset.mode);
                  handleVerify(preset.query);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center space-x-1.5 ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 border-slate-750 text-slate-300 hover:border-slate-600' 
                    : 'bg-slate-50 hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-700'
                }`}
              >
                <span>{preset.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  preset.badge.includes('Valid')
                    ? isDarkMode ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-800'
                    : preset.badge.includes('Suspended')
                    ? isDarkMode ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-rose-100 text-rose-800'
                    : preset.badge.includes('Expired')
                    ? isDarkMode ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-800'
                    : isDarkMode ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {preset.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Result Display */}
      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-top-2">
          {verificationResult ? (
            <div className={`rounded-3xl border shadow-md overflow-hidden ${
              verificationResult.status === 'VALID'
                ? isDarkMode ? 'bg-slate-900 border-emerald-800/80' : 'bg-white border-emerald-300'
                : verificationResult.status === 'SUSPENDED'
                ? isDarkMode ? 'bg-slate-900 border-rose-800/80' : 'bg-white border-rose-400'
                : isDarkMode ? 'bg-slate-900 border-amber-800/80' : 'bg-white border-amber-400'
            }`}>
              {/* Result Status Banner */}
              <div className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                verificationResult.status === 'VALID'
                  ? isDarkMode ? 'bg-emerald-950/60 text-emerald-200 border-b border-emerald-900' : 'bg-emerald-50 text-emerald-900 border-b border-emerald-200'
                  : verificationResult.status === 'SUSPENDED'
                  ? isDarkMode ? 'bg-rose-950/60 text-rose-200 border-b border-rose-900' : 'bg-rose-50 text-rose-900 border-b border-rose-200'
                  : isDarkMode ? 'bg-amber-950/60 text-amber-200 border-b border-amber-900' : 'bg-amber-50 text-amber-900 border-b border-amber-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {verificationResult.status === 'VALID' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  ) : verificationResult.status === 'SUSPENDED' ? (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg">
                      STATUS: {verificationResult.status === 'VALID' ? 'GENUINE & ACTIVE LICENCE' : verificationResult.status === 'SUSPENDED' ? 'SUSPENDED / STOP-MARKING (ILLEGAL FOR SALE)' : 'EXPIRED REGISTRATION'}
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'opacity-90'}`}>
                      National Registry Record Verified via Bureau of Indian Standards Database
                    </p>
                  </div>
                </div>

                <div className={`font-mono text-xs font-bold px-3 py-1 rounded-lg border self-start sm:self-auto ${
                  isDarkMode 
                    ? 'bg-slate-800/90 text-white border-slate-700' 
                    : 'bg-white/80 border-current'
                }`}>
                  {verificationResult.cmlNumber || verificationResult.regNumber || `HUID: ${verificationResult.huid}`}
                </div>
              </div>

              {/* Result Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Manufacturer & Location */}
                  <div className="space-y-4">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-400'
                      }`}>
                        Licensed Manufacturer / Brand
                      </span>
                      <h4 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {verificationResult.manufacturerName}
                      </h4>
                      <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                        Brand Name: {verificationResult.brandName}
                      </p>
                    </div>

                    <div className={`flex items-start space-x-2 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{verificationResult.factoryAddress} ({verificationResult.districtState})</span>
                    </div>

                    {verificationResult.ahcCenter && (
                      <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                        isDarkMode 
                          ? 'bg-amber-950/30 border-amber-800/60 text-amber-200' 
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}>
                        <span className="font-bold block">Assaying & Hallmarking Centre (AHC):</span>
                        <p>{verificationResult.ahcCenter}</p>
                        <p className={`font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>Purity Grade: {verificationResult.purityGrade}</p>
                      </div>
                    )}
                  </div>

                  {/* Standard & Validity */}
                  <div className="space-y-4">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-400'
                      }`}>
                        Applicable Indian Standard
                      </span>
                      <div className={`font-mono font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {verificationResult.isStandard}
                      </div>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {verificationResult.productDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className={`p-3 rounded-xl border text-xs ${
                        isDarkMode ? 'bg-slate-800/80 border-slate-750' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`block text-[10px] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Grant Date</span>
                        <span className={`font-mono font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{verificationResult.grantDate}</span>
                      </div>
                      <div className={`p-3 rounded-xl border text-xs ${
                        isDarkMode ? 'bg-slate-800/80 border-slate-750' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`block text-[10px] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Valid Up To</span>
                        <span className={`font-mono font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{verificationResult.validUpto}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit & Compliance Remarks */}
                {verificationResult.remarks && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 ${
                    verificationResult.status === 'VALID'
                      ? isDarkMode ? 'bg-slate-800/80 text-slate-300 border border-slate-700' : 'bg-slate-50 text-slate-700 border border-slate-200'
                      : isDarkMode ? 'bg-rose-950/40 text-rose-200 border border-rose-800' : 'bg-rose-50 text-rose-950 border border-rose-200 font-medium'
                  }`}>
                    <span className="font-bold block uppercase tracking-wider text-[10px] opacity-75">
                      Statutory Compliance Notes:
                    </span>
                    <p className="leading-relaxed">{verificationResult.remarks}</p>
                  </div>
                )}

                {/* Enforcement & Grievance Alert if Suspended or Expired */}
                {verificationResult.status !== 'VALID' && (
                  <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
                    isDarkMode 
                      ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
                      : 'bg-rose-100/60 border border-rose-300'
                  }`}>
                    <div className="space-y-1">
                      <span className={`font-bold flex items-center space-x-1.5 ${
                        isDarkMode ? 'text-rose-300' : 'text-rose-950'
                      }`}>
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Consumer Protection Warning (Section 29, BIS Act 2016)</span>
                      </span>
                      <p className={isDarkMode ? 'text-rose-300/90' : 'text-rose-900'}>
                        Selling goods under a suspended or expired BIS license is punishable by heavy fines and legal prosecution. Report violations immediately.
                      </p>
                    </div>
                    <a
                      href="tel:1915"
                      className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Report to NCH (1915)</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Not Found Alert */
            <div className={`rounded-3xl border p-8 text-center space-y-4 shadow-md ${
              isDarkMode 
                ? 'bg-slate-900 border-amber-800/80' 
                : 'bg-white border-amber-300'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border ${
                isDarkMode 
                  ? 'bg-amber-950/60 text-amber-400 border-amber-800' 
                  : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}>
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  No Record Found for "{notFoundQuery}"
                </h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  We could not find an active CM/L licence, CRS R-Number, or HUID matching this identifier in the verified national database.
                </p>
              </div>
              <div className={`p-4 rounded-xl border max-w-lg mx-auto text-xs text-left space-y-2 ${
                isDarkMode 
                  ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' 
                  : 'bg-amber-50/70 border border-amber-200 text-amber-950'
              }`}>
                <span className="font-bold block">Recommended Consumer Actions:</span>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Verify if the CM/L number is 7 or 8 digits and stamped correctly under the ISI mark.</li>
                  <li>Check whether the 6-character HUID is clearly laser engraved with the BIS logo and purity grade.</li>
                  <li>If the product claims mandatory ISI compliance, exercise caution regarding potential counterfeit goods.</li>
                </ul>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className={`text-xs font-semibold hover:underline ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-900'
                }`}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
