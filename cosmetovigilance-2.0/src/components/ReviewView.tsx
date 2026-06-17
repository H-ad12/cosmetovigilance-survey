import { motion } from 'motion/react';
import React from 'react';
import { SurveyData, ParticipantInfo } from '../types';
import { questions } from '../utils/questions';

interface ReviewViewProps {
  data: SurveyData;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

export function ReviewView({ data, onPrev, onSubmit, isSubmitting, error }: ReviewViewProps) {

  const getOptionLabel = (qId: string, value: string | string[]) => {
    const q = questions.find(q => q.id === qId);
    if (!q) return '';
    if (Array.isArray(value)) {
      return value.map(v => q.options.find(o => o.id === v)?.ar || v).join('، ');
    }
    return q.options.find(o => o.id === value)?.ar || value;
  };

  const getOptionLabelEn = (qId: string, value: string | string[]) => {
    const q = questions.find(q => q.id === qId);
    if (!q) return '';
    if (Array.isArray(value)) {
      return value.map(v => q.options.find(o => o.id === v)?.en || v).join(', ');
    }
    return q.options.find(o => o.id === value)?.en || value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full h-full"
    >
      <div className="mb-6 text-center" dir="rtl">
        <h2 className="text-2xl font-bold font-cairo text-emerald-400">مراجعة الإجابات</h2>
        <p className="text-sm font-sans text-slate-400" dir="ltr">Review Answers</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl text-center space-y-2">
             <p className="font-bold font-cairo">حدث خطأ أثناء الإرسال</p>
             <p className="font-sans text-sm">{error}</p>
          </div>
        )}

        {/* Participant Info */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5" dir="rtl">
          <h3 className="text-lg font-bold font-cairo text-blue-300 mb-4 border-b border-slate-700/50 pb-2">معلومات المشارك / Participant Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-slate-400 block font-cairo">الاسم / Name</span>
              <span className="text-slate-100 font-semibold">{data.participantInfo?.fullName}</span>
            </div>
            <div>
              <span className="text-sm text-slate-400 block font-cairo">القسم / Department</span>
              <span className="text-slate-100 font-semibold">{data.participantInfo?.department}</span>
            </div>
            <div>
               <span className="text-sm text-slate-400 block font-cairo">العمر / Age</span>
               <span className="text-slate-100 font-semibold">{data.participantInfo?.age}</span>
            </div>
            <div>
               <span className="text-sm text-slate-400 block font-cairo">الجنس / Gender</span>
               <span className="text-slate-100 font-semibold">{data.participantInfo?.gender === 'male' ? 'ذكر (Male)' : 'أنثى (Female)'}</span>
            </div>
          </div>
        </div>

        {/* Survey Answers */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-cairo text-blue-300 mb-2 border-b border-slate-700/50 pb-2 text-right" dir="rtl">إجابات الاستبيان / Survey Answers</h3>
          
          {Object.entries(data.answers).map(([qId, answer]) => {
            const question = questions.find(q => q.id === qId);
            if (!question) return null;
            return (
              <div key={qId} className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
                <div className="mb-2 text-right" dir="rtl">
                  <p className="font-cairo text-slate-300 font-semibold">{question.ar}</p>
                  <p className="font-sans text-xs text-slate-500" dir="ltr">{question.en}</p>
                </div>
                <div className="bg-slate-900/50 rounded flex justify-between items-center p-3">
                  <div className="text-right" dir="rtl">
                    <span className="font-cairo text-emerald-400">{getOptionLabel(qId, answer)}</span>
                  </div>
                  <div className="text-left" dir="ltr">
                     <span className="font-sans text-sm text-emerald-300/80">{getOptionLabelEn(qId, answer)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="flex justify-between pt-6 border-t border-slate-800/50">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex flex-col items-center"
        >
          <span className="font-cairo">تعديل</span>
          <span className="text-xs font-sans opacity-70">Edit</span>
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg flex flex-col items-center transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
        >
           {isSubmitting ? (
             <div className="py-1">
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             </div>
           ) : (
             <>
               <span className="font-cairo">إرسال الاستبيان</span>
               <span className="text-xs font-sans opacity-70">Submit Survey</span>
             </>
           )}
        </button>
      </div>
    </motion.div>
  );
}
