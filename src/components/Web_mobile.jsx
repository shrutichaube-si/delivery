import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Globe, 
  Smartphone, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  Server, 
  Clock,
  ChevronDown,
  ChevronUp,
  Info,
  DollarSign,
  Briefcase,
  Users,
  UserCheck,
  Plus,
  Trash2,
  RefreshCcw,
  CheckSquare,
  Square,
  Cpu
} from 'lucide-react';

// Feature data extracted from the provided CSV lists
const WEBSITE_FEATURES = [
  { feature: "Infra Setup (Staging)", basic: true, basicPlus: true, advanced: true },
  { feature: "Backend Setup (Staging)", basic: true, basicPlus: true, advanced: true },
  { feature: "Frontend Setup (Staging)", basic: true, basicPlus: true, advanced: true },
  { feature: "Production Setup", basic: true, basicPlus: true, advanced: true },
  { feature: "SI Content Middleware", basic: false, basicPlus: true, advanced: true },
  { feature: "SI User Middleware", basic: false, basicPlus: true, advanced: true },
  { feature: "SSO Integration", basic: false, basicPlus: true, advanced: true },
  { feature: "Video Player Integration", basic: false, basicPlus: true, advanced: true },
  { feature: "Fan Loyalty & Rewards", basic: false, basicPlus: true, advanced: true },
  { feature: "Basic Navigation", basic: true, basicPlus: false, advanced: false },
  { feature: "Advanced Navigation", basic: false, basicPlus: true, advanced: true },
  { feature: "Match Centre (Basic)", basic: true, basicPlus: false, advanced: false },
  { feature: "Match Centre (Advanced)", basic: false, basicPlus: true, advanced: true },
  { feature: "Gaming Hub", basic: false, basicPlus: true, advanced: true },
  { feature: "Shop & Tickets Integration", basic: true, basicPlus: true, advanced: true },
  { feature: "Auction Centre", basic: false, basicPlus: true, advanced: true },
  { feature: "GA4 Integration", basic: true, basicPlus: true, advanced: true }
];

const MOBILE_FEATURES = [
  { feature: "Infra & Backend Setup", basic: true, basicPlus: true, advanced: true },
  { feature: "App Project Setup (iOS/Android)", basic: true, basicPlus: true, advanced: true },
  { feature: "Push Notifications (Basic)", basic: true, basicPlus: false, advanced: false },
  { feature: "Push Notifications (Advanced)", basic: false, basicPlus: true, advanced: true },
  { feature: "Universal Linking", basic: false, basicPlus: true, advanced: true },
  { feature: "Home & Lock Screen Widgets", basic: false, basicPlus: false, advanced: true },
  { feature: "Live Activities (Dynamic Island)", basic: false, basicPlus: false, advanced: true },
  { feature: "Splash Screen (Video/Lottie)", basic: true, basicPlus: true, advanced: true },
  { feature: "Welcome Screen / Interests", basic: false, basicPlus: true, advanced: true },
  { feature: "User Profile (SSO)", basic: false, basicPlus: true, advanced: true },
  { feature: "Basic App Landing", basic: true, basicPlus: true, advanced: true }
];

// Component definitions outside of render
const TierBadge = ({ type, current, set }) => (
  <button
    onClick={() => set(type)}
    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
      current === type 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
    }`}
  >
    {type === 'basicPlus' ? 'Basic+' : type.charAt(0).toUpperCase() + type.slice(1)}
  </button>
);

const InputField = ({ label, value, onChange, icon: Icon, suffix = "", min = 0, disabled = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
      {Icon && <Icon size={12} />} {label}
    </label>
    <div className="relative">
      <input
        type="number"
        min={min}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50'}`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{suffix}</span>}
    </div>
  </div>
);

const DropdownField = ({ label, value, onChange, options, icon: Icon }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
      {Icon && <Icon size={12} />} {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(isNaN(e.target.value) ? e.target.value : Number(e.target.value))}
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const WebandMobile = () => {
  // --- Constants ---
  const HOURLY_RATE = 10;
  const WORKING_HOURS_PER_MONTH = 160;

  // --- Initial States for Reset ---
  const initialState = {
    projectMonths: 4,
    webTier: 'basicPlus',
    mobTier: 'basicPlus',
    feDevs: 2,
    beDevs: 1,
    mobDevs: 3,
    devOpsDevs: 1,
    includeWeb: true,
    includeMob: true,
    infraType: 'shared',
    qaPercentage: 0.2,
    pmPercentage: 0.2,
    markupPercentage: 0.4,
    maintHours: 20,
    thirdPartyItems: [
      { id: '1', name: 'Google Analytics (GA4)', cost: 0 },
      { id: '2', name: 'CMS Subscription', cost: 150 }
    ]
  };

  // --- State ---
  const [projectMonths, setProjectMonths] = useState(initialState.projectMonths);
  const [webTier, setWebTier] = useState(initialState.webTier);
  const [mobTier, setMobTier] = useState(initialState.mobTier);
  const [includeWeb, setIncludeWeb] = useState(initialState.includeWeb);
  const [includeMob, setIncludeMob] = useState(initialState.includeMob);
  
  const [feDevs, setFeDevs] = useState(initialState.feDevs);
  const [beDevs, setBeDevs] = useState(initialState.beDevs);
  const [mobDevs, setMobDevs] = useState(initialState.mobDevs);
  const [devOpsDevs, setDevOpsDevs] = useState(initialState.devOpsDevs);

  const [infraType, setInfraType] = useState(initialState.infraType);
  const [qaPercentage, setQaPercentage] = useState(initialState.qaPercentage);
  const [pmPercentage, setPmPercentage] = useState(initialState.pmPercentage);
  const [markupPercentage, setMarkupPercentage] = useState(initialState.markupPercentage);
  const [maintHours, setMaintHours] = useState(initialState.maintHours);
  const [thirdPartyItems, setThirdPartyItems] = useState(initialState.thirdPartyItems);
  
  const [expandedSection, setExpandedSection] = useState('inputs');

  // --- Tier Change Handlers ---
  const handleWebTierChange = (tier) => {
    setWebTier(tier);
    if (tier === 'basic') { setFeDevs(1); setBeDevs(1); }
    else if (tier === 'basicPlus') { setFeDevs(2); setBeDevs(1); }
    else if (tier === 'advanced') { setFeDevs(3); setBeDevs(2); }
  };

  const handleMobTierChange = (tier) => {
    setMobTier(tier);
    if (tier === 'basic') setMobDevs(2);
    else if (tier === 'basicPlus') setMobDevs(3);
    else if (tier === 'advanced') setMobDevs(4);
  };

  const startFresh = () => {
    setProjectMonths(initialState.projectMonths);
    setWebTier(initialState.webTier);
    setMobTier(initialState.mobTier);
    setIncludeWeb(initialState.includeWeb);
    setIncludeMob(initialState.includeMob);
    setFeDevs(initialState.feDevs);
    setBeDevs(initialState.beDevs);
    setMobDevs(initialState.mobDevs);
    setDevOpsDevs(initialState.devOpsDevs);
    setInfraType(initialState.infraType);
    setQaPercentage(initialState.qaPercentage);
    setPmPercentage(initialState.pmPercentage);
    setMarkupPercentage(initialState.markupPercentage);
    setMaintHours(initialState.maintHours);
    setThirdPartyItems(initialState.thirdPartyItems);
  };

  // --- 3rd Party Handlers ---
  const addThirdParty = () => {
    setThirdPartyItems([...thirdPartyItems, { id: Date.now().toString(), name: '', cost: 0 }]);
  };

  const updateThirdParty = (id, field, value) => {
    setThirdPartyItems(thirdPartyItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeThirdParty = (id) => {
    setThirdPartyItems(thirdPartyItems.filter(item => item.id !== id));
  };

  // --- Calculations ---
  const totals = useMemo(() => {
    const webFTE = includeWeb ? (feDevs + beDevs) : 0;
    const mobFTE = includeMob ? mobDevs : 0;
    const activeDevOpsFTE = (includeWeb || includeMob) ? devOpsDevs : 0;
    const totalFTE = webFTE + mobFTE + activeDevOpsFTE;
    
    const totalProjectHours = totalFTE * WORKING_HOURS_PER_MONTH * projectMonths;
    
    const webDevCost = webFTE * WORKING_HOURS_PER_MONTH * HOURLY_RATE * projectMonths;
    const mobDevCost = mobFTE * WORKING_HOURS_PER_MONTH * HOURLY_RATE * projectMonths;
    const devOpsCost = activeDevOpsFTE * WORKING_HOURS_PER_MONTH * HOURLY_RATE * projectMonths;
    
    const totalDevCost = webDevCost + mobDevCost + devOpsCost;
    
    const infraBase = infraType === 'shared' ? 250 : 500;
    const totalInfraCost = (includeWeb || includeMob) ? infraBase * projectMonths : 0;
    
    const qaTotal = totalDevCost * qaPercentage;
    const pmTotal = totalDevCost * pmPercentage;
    
    const thirdPartyTotal = thirdPartyItems.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
    
    const subtotal = totalDevCost + totalInfraCost + qaTotal + pmTotal;
    const marginMarkup = subtotal * markupPercentage;
    const grandTotal = subtotal + marginMarkup + thirdPartyTotal;
    
    const monthlyMaintenance = (includeWeb || includeMob) ? maintHours * HOURLY_RATE : 0;

    // Proportion costs excluding DevOps for platform specific views
    const corePlatformDevCost = webDevCost + mobDevCost;
    const webProp = corePlatformDevCost > 0 ? webDevCost / corePlatformDevCost : 0;
    const mobProp = corePlatformDevCost > 0 ? mobDevCost / corePlatformDevCost : 0;

    return {
      totalProjectHours,
      webDevCost,
      mobDevCost,
      devOpsCost,
      totalDevCost,
      totalInfraCost,
      qaTotal,
      pmTotal,
      thirdPartyTotal,
      subtotal,
      marginMarkup,
      grandTotal,
      monthlyMaintenance,
      webBreakdown: { dev: webDevCost, qa: qaTotal * webProp, pm: pmTotal * webProp },
      mobBreakdown: { dev: mobDevCost, qa: qaTotal * mobProp, pm: pmTotal * mobProp }
    };
  }, [feDevs, beDevs, mobDevs, devOpsDevs, projectMonths, infraType, qaPercentage, pmPercentage, markupPercentage, maintHours, includeWeb, includeMob, thirdPartyItems]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <Calculator className="text-blue-600" />
              Project Cost Calculator
            </h1>
            <p className="text-slate-500 mt-1">Estimate web and mobile development costs based on project scope.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={startFresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors shadow-sm"
            >
              <RefreshCcw size={16} /> Start Fresh
            </button>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Total</p>
              <p className="text-3xl font-black text-blue-600">
                ${totals.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            
            {/* 0. Scope Toggle */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-wrap gap-6 items-center">
              <span className="font-bold text-slate-700 mr-4">Project Scope:</span>
              <button 
                onClick={() => setIncludeWeb(!includeWeb)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all bg-black/5 border-emerald-200 text-emerald-600`}
              >
                {includeWeb ? <CheckSquare size={20} /> : <Square size={20} />}
                <Globe size={18} />
                <span className="font-bold">Website</span>
              </button>
              <button 
                onClick={() => setIncludeMob(!includeMob)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all bg-black/5 border-indigo-200 text-indigo-600`}
              >
                {includeMob ? <CheckSquare size={20} /> : <Square size={20} />}
                <Smartphone size={18} />
                <span className="font-bold">Mobile App</span>
              </button>
            </section>

            {/* 1. Resources & Duration */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div 
                className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedSection(expandedSection === 'inputs' ? '' : 'inputs')}
              >
                <h2 className="font-bold flex items-center gap-2 text-slate-700">
                  <Users size={18} className="text-blue-600" /> Resource Configuration
                </h2>
                {expandedSection === 'inputs' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {expandedSection === 'inputs' && (
                <div className="p-6">
                  {/* Top Row: Resources, Duration and Rate */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                    <InputField label="Frontend Devs" value={feDevs} onChange={setFeDevs} disabled={!includeWeb} icon={Briefcase} />
                    <InputField label="Backend Devs" value={beDevs} onChange={setBeDevs} disabled={!includeWeb} icon={Briefcase} />
                    <InputField label="Mobile Devs" value={mobDevs} onChange={setMobDevs} disabled={!includeMob} icon={Smartphone} />
                    <InputField label="DevOps Devs" value={devOpsDevs} onChange={setDevOpsDevs} icon={Cpu} />
                    <InputField label="Project Duration" value={projectMonths} onChange={setProjectMonths} suffix="Months" icon={Clock} />
                    
                    <div className="flex flex-col gap-1 opacity-60">
                      <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <DollarSign size={12} /> Rate per Hour
                      </label>
                      <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 font-bold">
                        USD {HOURLY_RATE} (Fixed)
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Allocations and Markup */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                    <DropdownField 
                      label="Infra Type" 
                      value={infraType} 
                      onChange={setInfraType} 
                      icon={Server}
                      options={[
                        { label: 'Shared ($250/mo)', value: 'shared' },
                        { label: 'Dedicated ($500/mo)', value: 'dedicated' }
                      ]}
                    />

                    <DropdownField 
                      label="QA Allocation" 
                      value={qaPercentage} 
                      onChange={setQaPercentage} 
                      icon={ShieldCheck}
                      options={[
                        { label: '20% of Efforts', value: 0.2 },
                        { label: '30% of Efforts', value: 0.3 },
                        { label: '40% of Efforts', value: 0.4 },
                        { label: '60% of Efforts', value: 0.6 }
                      ]}
                    />

                    <DropdownField 
                      label="PM Allocation" 
                      value={pmPercentage} 
                      onChange={setPmPercentage} 
                      icon={UserCheck}
                      options={[
                        { label: '20% of Efforts', value: 0.2 },
                        { label: '30% of Efforts', value: 0.3 },
                        { label: '40% of Efforts', value: 0.4 },
                        { label: '60% of Efforts', value: 0.6 }
                      ]}
                    />

                    <DropdownField 
                      label="Margin Markup (40% Default)" 
                      value={markupPercentage} 
                      onChange={setMarkupPercentage} 
                      icon={TrendingUp}
                      options={[
                        { label: '20% Margin', value: 0.2 },
                        { label: '30% Margin', value: 0.3 },
                        { label: '40% Margin', value: 0.4 },
                        { label: '50% Margin', value: 0.5 },
                        { label: '60% Margin', value: 0.6 }
                      ]}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 2. 3rd Party Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2 text-slate-700">
                  <Plus size={18} className="text-blue-600" /> 3rd Party Integrations & Costs
                </h2>
                <button onClick={addThirdParty} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add Line Item
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {thirdPartyItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Item Name / Service</label>
                        <input 
                          type="text" 
                          placeholder="e.g. MoEngage, HubSpot"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                          value={item.name}
                          onChange={(e) => updateThirdParty(item.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="w-40">
                        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Total Cost (USD)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                          <input 
                            type="number" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm"
                            value={item.cost}
                            onChange={(e) => updateThirdParty(item.id, 'cost', e.target.value)}
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => removeThirdParty(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {thirdPartyItems.length === 0 && <p className="text-center text-slate-400 text-sm py-4">No 3rd party costs added.</p>}
                </div>
              </div>
            </section>

            {/* 3. Feature Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {includeWeb && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2">
                      <Globe size={18} className="text-emerald-600" /> Website Features
                    </h2>
                    <div className="flex gap-1">
                      <TierBadge type="basic" current={webTier} set={handleWebTierChange} />
                      <TierBadge type="basicPlus" current={webTier} set={handleWebTierChange} />
                      <TierBadge type="advanced" current={webTier} set={handleWebTierChange} />
                    </div>
                  </div>
                  <div className="p-0 max-h-[300px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="sticky top-0 bg-white border-b border-slate-100 z-10">
                        <tr>
                          <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">Feature Name</th>
                          <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase text-center w-16">Inc.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {WEBSITE_FEATURES.map((f, i) => {
                          const isIncluded = webTier === 'basic' ? f.basic : webTier === 'basicPlus' ? f.basicPlus : f.advanced;
                          return (
                            <tr key={i} className={isIncluded ? 'bg-white' : 'bg-slate-50 opacity-40'}>
                              <td className="px-4 py-2">{f.feature}</td>
                              <td className="px-4 py-2 text-center">
                                {isIncluded ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-slate-300">×</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {includeMob && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2">
                      <Smartphone size={18} className="text-indigo-600" /> Mobile Features
                    </h2>
                    <div className="flex gap-1">
                      <TierBadge type="basic" current={mobTier} set={handleMobTierChange} />
                      <TierBadge type="basicPlus" current={mobTier} set={handleMobTierChange} />
                      <TierBadge type="advanced" current={mobTier} set={handleMobTierChange} />
                    </div>
                  </div>
                  <div className="p-0 max-h-[300px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="sticky top-0 bg-white border-b border-slate-100 z-10">
                        <tr>
                          <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">Feature Name</th>
                          <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase text-center w-16">Inc.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {MOBILE_FEATURES.map((f, i) => {
                          const isIncluded = mobTier === 'basic' ? f.basic : mobTier === 'basicPlus' ? f.basicPlus : f.advanced;
                          return (
                            <tr key={i} className={isIncluded ? 'bg-white' : 'bg-slate-50 opacity-40'}>
                              <td className="px-4 py-2">{f.feature}</td>
                              <td className="px-4 py-2 text-center">
                                {isIncluded ? <span className="text-indigo-500 font-bold">✓</span> : <span className="text-slate-300">×</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Sidebar: Cost Breakdown */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <section className="bg-slate-800 text-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Info size={20} className="text-blue-400" /> Cost Summary
                  </h2>
                  <div className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-[10px] font-black uppercase tracking-widest">
                    USD {HOURLY_RATE}/hr
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Web Section */}
                  {includeWeb && (
                    <div>
                      <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Globe size={14} /> Website Estimation
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dev efforts ({feDevs+beDevs} FTE)</span>
                          <span>${totals.webDevCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px] italic text-slate-500">
                          <span>QA & PM share</span>
                          <span>+ ${(totals.webBreakdown.qa + totals.webBreakdown.pm).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t border-slate-700/30">
                          <span className="text-slate-300">Web Subtotal</span>
                          <span>${(totals.webDevCost + totals.webBreakdown.qa + totals.webBreakdown.pm).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Application Section */}
                  {includeMob && (
                    <div>
                      <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Smartphone size={14} /> Mobile App Estimation
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dev efforts ({mobDevs} FTE)</span>
                          <span>${totals.mobDevCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px] italic text-slate-500">
                          <span>QA & PM share</span>
                          <span>+ ${(totals.mobBreakdown.qa + totals.mobBreakdown.pm).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t border-slate-700/30">
                          <span className="text-slate-300">Mobile Subtotal</span>
                          <span>${(totals.mobDevCost + totals.mobBreakdown.qa + totals.mobBreakdown.pm).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Project Metrics */}
                  <div className="pt-4 border-t border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 flex items-center gap-2"><Clock size={12}/> Total Delivery Hours</span>
                      <span className="font-bold text-blue-400">{totals.totalProjectHours.toLocaleString()} hrs</span>
                    </div>
                    {totals.devOpsCost > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 flex items-center gap-2"><Cpu size={12}/> DevOps ({devOpsDevs} FTE)</span>
                        <span className="font-medium">${totals.devOpsCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Project Infra ({infraType})</span>
                      <span className="font-medium">${totals.totalInfraCost.toLocaleString()}</span>
                    </div>
                    {totals.thirdPartyTotal > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">3rd Party Items</span>
                        <span className="font-medium text-emerald-400">+ ${totals.thirdPartyTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-slate-400">Margin Markup ({markupPercentage * 100}%)</span>
                      <span className="font-medium text-blue-400">+ ${totals.marginMarkup.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-6 border-t-2 border-slate-700 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Grand Total</p>
                      <p className="text-[10px] text-slate-400 italic">{projectMonths} Months delivery</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-white">${totals.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-6 flex items-center gap-4 border-t border-slate-700/50">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Settings className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Monthly Maintenance</p>
                    <p className="text-xl font-bold text-white">${totals.monthlyMaintenance.toLocaleString()} / mo</p>
                  </div>
                </div>
              </section>

              {/* Information Footnote */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 shadow-sm">
                <Info size={20} className="text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Infrastructure is charged at <strong>$500/mo (Dedicated)</strong> or <strong>$250/mo (Shared)</strong>. 
                  Man-hours are calculated as: <strong>FTE Count × {WORKING_HOURS_PER_MONTH} hours × {projectMonths} months</strong>. 
                  DevOps and Infra costs are shared across platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


