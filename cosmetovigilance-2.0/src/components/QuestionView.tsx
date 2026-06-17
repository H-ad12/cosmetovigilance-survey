import { motion } from 'motion/react';
import React from 'react';
import { Question } from '../types';

interface QuestionViewProps {
  question: Question;
  answer: string | string[];
  onChange: (answer: string | string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionView({ question, answer, onChange, onNext, onPrev, isFirst, isLast }: QuestionViewProps) {
  
  const handleRadioChange = (id: string) => {
    onChange(id);
  };

  const handleCheckboxChange = (id: string) => {
    const currentList = Array.isArray(answer) ? answer : [];
    if (currentList.includes(id)) {
      onChange(currentList.filter(item => item !== id));
    } else {
      onChange([...currentList, id]);
    }
  };

  const isEnabled = () => {
    if (question.type === 'radio') return !!answer;
    if (question.type === 'checkbox') return Array.isArray(answer) && answer.length > 0;
    return false;
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full h-full"
    >
      <div className="mb-8 text-center" dir="rtl">
        <h3 className="text-2xl font-bold font-cairo text-emerald-300 mb-2 leading-relaxed">{question.ar}</h3>
        <p className="text-lg font-sans text-slate-400" dir="ltr">{question.en}</p>
      </div>

      <div className="space-y-3 mb-10 w-full max-w-xl mx-auto flex-1">
        {question.options.map((opt) => {
          const isSelected = question.type === 'radio' 
            ? answer === opt.id 
            : Array.isArray(answer) && answer.includes(opt.id);

          return (
            <label
              key={opt.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-emerald-600/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-4 flex-1 order-2 sm:order-1 sm:justify-end text-right" dir="rtl">
                 <span className={`font-cairo text-lg ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {opt.ar}
                 </span>
              </div>

              <div className="flex items-center gap-4 order-1 sm:order-2 sm:flex-1">
                 <div className="flex items-center justify-center min-w-[24px]">
                    {question.type === 'radio' ? (
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-400' : 'border-slate-500'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />}
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'}`}>
                        {isSelected && (
                          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-white">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  <span className={`font-sans text-sm ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {opt.en}
                  </span>
              </div>
              
              <input 
                type={question.type}
                className="hidden"
                checked={isSelected}
                onChange={() => question.type === 'radio' ? handleRadioChange(opt.id) : handleCheckboxChange(opt.id)}
              />
            </label>
          )
        })}
      </div>

      <div className="flex justify-between mt-auto pt-6 border-t border-slate-800/50">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex flex-col items-center"
        >
          <span className="font-cairo">السابق</span>
          <span className="text-xs font-sans opacity-70">Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={!isEnabled()}
          className={`px-8 py-3 rounded-lg flex flex-col items-center transition-all ${
            isEnabled() 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span className="font-cairo">{isLast ? 'مراجعة' : 'التالي'}</span>
          <span className="text-xs font-sans opacity-70">{isLast ? 'Review' : 'Next'}</span>
        </button>
      </div>
    </motion.div>
  );
}
