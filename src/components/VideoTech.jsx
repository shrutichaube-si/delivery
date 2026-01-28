import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Activity, 
  DollarSign, 
  Tv2, 
  Layers, 
  RotateCcw, 
  Globe, 
  Clock, 
  MousePointer2,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Briefcase,
  Calendar,
  Lock,
  Percent
} from 'lucide-react';

const VideoTech = () => {
  // --- Initial States ---
  const DEFAULT_RATE = 10;
  
  const [clientProfile, setClientProfile] = useState('Standard'); // 'Standard' or 'Athletics'
  const [events, setEvents] = useState(50);
  const [duration, setDuration] = useState(2);
  const [months, setMonths] = useState(1); 
  const [totalServiceHoursPerMonth, setTotalServiceHoursPerMonth] = useState(100); 
  const [taggersCount, setTaggersCount] = useState(2);
  const [editorsCount, setEditorsCount] = useState(1);
  const [taggerRate] = useState(DEFAULT_RATE); // Fixed rate
  const [editorRate] = useState(DEFAULT_RATE); // Fixed rate
  const [platform, setPlatform] = useState('Scoreplay'); 
  const [selectedMargin, setSelectedMargin] = useState(60); // Default set to 60%
  const [includePlatformFee, setIncludePlatformFee] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // --- Handlers ---
  const handleNumChange = (setter) => (e) => {
    const val = e.target.value;
    if (val === "") {
      setter(0);
      return;
    }
    const num = parseFloat(val);
    setter(isNaN(num) ? 0 : Math.max(0, num));
  };

  const handleClearAll = () => {
    setEvents(0);
    setDuration(0);
    setMonths(1);
    setTotalServiceHoursPerMonth(0);
    setTaggersCount(0);
    setEditorsCount(0);
    setPlatform('Scoreplay');
    setSelectedMargin(60); // Reset to default 60%
    setIncludePlatformFee(false);
  };

  // --- Calculations ---
  const totals = useMemo(() => {
    const isAthletics = clientProfile === 'Athletics';
    
    // Determine the base project hours used for cost calculations
    const projectHours = isAthletics 
      ? (totalServiceHoursPerMonth * months) 
      : (events * duration);
    
    // 1. Base Resource Costs
    const totalTaggerCost = taggersCount * projectHours * taggerRate;
    const totalEditorCost = editorsCount * projectHours * editorRate;

    // 2. Infrastructure Cost: Scoreplay = 0, Playground = 25 per hour
    const infraRatePerHour = platform === 'Playground' ? 25 : 0;
    const totalInfraCost = infraRatePerHour * projectHours;

    // 3. Subtotal (Sum of all operational components)
    const baseOperationalSubtotal = totalTaggerCost + totalEditorCost + totalInfraCost;

    // 4. Platform Fee Calculation: 10% of the operational subtotal
    const platformFeeCost = includePlatformFee ? (baseOperationalSubtotal * 0.10) : 0;

    // 5. Total SI Cost (The "Total Fee" / "Total Cost" of running the project)
    const totalSICost = baseOperationalSubtotal + platformFeeCost;

    // 6. Total SI Revenue (Markup logic: adding user-selected percentage to total SI cost)
    const revenueMarkupValue = totalSICost * (selectedMargin / 100);
    const totalSIRevenue = totalSICost + revenueMarkupValue;

    return {
      totalTaggerCost,
      totalEditorCost,
      totalInfraCost,
      platformFeeCost,
      totalSICost,
      totalSIRevenue,
      revenueMarkupValue,
      workHours: (taggersCount + editorsCount) * projectHours,
      baseOperationalSubtotal
    };
  }, [clientProfile, events, duration, months, totalServiceHoursPerMonth, taggersCount, editorsCount, taggerRate, editorRate, platform, selectedMargin, includePlatformFee]);

  const formatUSD = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);

  const inputBaseClass = "w-full bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-slate-600 px-4 py-2.5";
  const readOnlyInputClass = "w-full bg-slate-900 border border-slate-800 rounded-lg outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-slate-600 px-4 py-2.5 cursor-not-allowed opacity-70 text-slate-400 font-medium";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-auto min-w-[48px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 overflow-hidden px-2 shadow-inner">
              {!logoError ? (
                <img 
                  src="image_e8a199.png" 
                  alt="Logo" 
                  className="max-h-10 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Globe className="text-blue-400 w-6 h-6" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Video Tech Calc</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">SI Revenue Modeling</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <select 
                value={clientProfile} 
                onChange={(e) => setClientProfile(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 ring-blue-500 cursor-pointer appearance-none pr-10 shadow-lg"
              >
                <option value="Standard">Cricket / Football / Basketball</option>
                <option value="Athletics">Athletics (EA, Eurovision, etc.)</option>
              </select>
              <div className="absolute right-3 top-3 pointer-events-none text-slate-500">
                {clientProfile === 'Athletics' ? <Trophy size={16} /> : <Briefcase size={16} />}
              </div>
            </div>
            
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-700 hover:border-red-500 hover:text-red-400 rounded-xl text-sm font-medium transition-all group shadow-lg"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
              Reset
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Project Schedule Parameters */}
            <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Tv2 className="text-blue-400 w-5 h-5" />
                <h2 className="text-lg font-semibold">
                  {clientProfile === 'Athletics' ? 'Monthly Project Schedule' : 'Event Parameters'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientProfile === 'Athletics' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Hours per Month</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={totalServiceHoursPerMonth === 0 ? "" : totalServiceHoursPerMonth} 
                          onChange={handleNumChange(setTotalServiceHoursPerMonth)}
                          className={`${inputBaseClass} focus:ring-blue-500 pl-10`}
                          placeholder="Hours per service month"
                        />
                        <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Number of Months</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={months === 0 ? "" : months} 
                          onChange={handleNumChange(setMonths)}
                          className={`${inputBaseClass} focus:ring-blue-500 pl-10`}
                          placeholder="Project duration"
                        />
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">No. of Events</label>
                      <input 
                        type="number" 
                        value={events === 0 ? "" : events} 
                        onChange={handleNumChange(setEvents)}
                        className={`${inputBaseClass} focus:ring-blue-500`}
                        placeholder="e.g. 50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Avg. Event Duration (Hrs)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={duration === 0 ? "" : duration} 
                          onChange={handleNumChange(setDuration)}
                          className={`${inputBaseClass} focus:ring-blue-500 pl-10`}
                          placeholder="e.g. 2"
                        />
                        <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Operational Resources */}
            <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-orange-400">
                <Users className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-slate-100 ml-2">Operational Resources</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                {/* Taggers */}
                <div className="space-y-4 p-4 bg-slate-800/20 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">Taggers</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase">No. of Taggers</label>
                    <input 
                      type="number" 
                      value={taggersCount === 0 ? "" : taggersCount} 
                      onChange={handleNumChange(setTaggersCount)}
                      className={`${inputBaseClass} focus:ring-orange-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase flex justify-between">
                      Rate per Hour (USD)
                      <Lock size={10} className="text-slate-600" />
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={taggerRate} 
                        readOnly
                        className={`${readOnlyInputClass} pl-8`}
                      />
                      <DollarSign className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Editors */}
                <div className="space-y-4 p-4 bg-slate-800/20 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-500">Editors</h3>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase">No. of Editors</label>
                    <input 
                      type="number" 
                      value={editorsCount === 0 ? "" : editorsCount} 
                      onChange={handleNumChange(setEditorsCount)}
                      className={`${inputBaseClass} focus:ring-purple-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase flex justify-between">
                      Rate per Hour (USD)
                      <Lock size={10} className="text-slate-600" />
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={editorRate} 
                        readOnly
                        className={`${readOnlyInputClass} pl-8`}
                      />
                      <DollarSign className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Fee Logic */}
              <div className="mt-4 p-4 bg-blue-900/10 border border-blue-800/30 rounded-xl flex items-center justify-between group cursor-pointer transition-colors hover:bg-blue-900/20 shadow-inner" onClick={() => setIncludePlatformFee(!includePlatformFee)}>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${includePlatformFee ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700'}`}>
                    {includePlatformFee && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-200">Apply Platform Fee</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                       <Percent size={10} /> 10% of Operational Cost
                    </span>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-lg font-bold text-blue-400 transition-all">{formatUSD(totals.platformFeeCost)}</span>
                </div>
              </div>
            </section>

            {/* Infrastructure Section */}
            <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-cyan-400">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-slate-100 ml-2">Infrastructure Platform</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Select Platform</label>
                  <select 
                    value={platform} 
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 ring-cyan-500 outline-none transition-all cursor-pointer shadow-md"
                  >
                    <option value="Scoreplay">Scoreplay (USD 0 Infra)</option>
                    <option value="Playground">Playground (USD 25 Infra/Hr)</option>
                  </select>
                </div>
                <div className="bg-cyan-900/10 border border-cyan-800/30 p-4 rounded-xl">
                  <span className="block text-[10px] text-cyan-500 uppercase font-bold tracking-widest mb-1">Calculated Infra Cost</span>
                  <span className="text-xl font-bold text-white">{formatUSD(totals.totalInfraCost)}</span>
                  <p className="text-[10px] text-slate-500 mt-1 italic">
                    {platform === 'Playground' ? '$25.00 hourly fee applied' : 'No infra costs applied'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary & SI Results */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-8 space-y-6">
              
              {/* Main SI Revenue Display */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl shadow-blue-900/20 relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldCheck className="w-16 h-16" />
                </div>
                
                <h3 className="text-blue-100 font-bold uppercase tracking-widest text-[10px] mb-4">Total SI Revenue</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white tracking-tighter">{formatUSD(totals.totalSIRevenue)}</span>
                  <p className="text-blue-100/70 text-[11px] mt-1 font-medium tracking-wide">Final Multi-Service Valuation</p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-blue-100 font-medium">Internal Cost Basis</span>
                    <span className="text-white font-semibold">{formatUSD(totals.totalSICost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-blue-100">
                    <span className="font-medium">Applied Markup</span>
                    <span className="font-bold text-white">{selectedMargin}% / {formatUSD(totals.revenueMarkupValue)}</span>
                  </div>
                </div>
              </div>

              {/* Markup Selection Grid */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MousePointer2 className="text-blue-400 w-4 h-4" />
                  <h4 className="text-sm font-semibold">Markup Selection</h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                  {[20, 40, 50, 60, 80].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMargin(m)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedMargin === m 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {m}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Operational Itemization</h4>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-12 bg-orange-500 rounded-full shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Tagger Operations</span>
                        <span className="text-slate-100 font-bold">{formatUSD(totals.totalTaggerCost)}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{taggersCount} Taggers @ $10/hr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-12 bg-purple-500 rounded-full shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Editor Operations</span>
                        <span className="text-slate-100 font-bold">{formatUSD(totals.totalEditorCost)}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{editorsCount} Editors @ $10/hr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-b border-slate-800 pb-4 mb-4">
                    <div className="w-1.5 h-12 bg-cyan-500 rounded-full shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Platform Infra</span>
                        <span className="text-slate-100 font-bold">{formatUSD(totals.totalInfraCost)}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{platform} Hosting</p>
                    </div>
                  </div>

                  {includePlatformFee && (
                    <div className="flex items-start gap-3 animate-in fade-in duration-300 slide-in-from-top-2">
                      <div className="w-1.5 h-12 bg-blue-500 rounded-full shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-400 font-medium text-blue-400">Platform Fee (10%)</span>
                          <span className="text-slate-100 font-bold">{formatUSD(totals.platformFeeCost)}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 italic">Applied on $ {Math.round(totals.baseOperationalSubtotal).toLocaleString()} Ops Subtotal</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-4">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resource Intensity: {totals.workHours.toLocaleString()} Total Work-Hours</span>
                  </div>
                  <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-[10px] text-slate-400 leading-relaxed italic">
                    {clientProfile === 'Athletics' 
                      ? `Calculations based on ${months} months of service @ ${totalServiceHoursPerMonth} hrs/mo.`
                      : "Calculations based on standard Cricket / Football / Basketball event durations."}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default VideoTech;