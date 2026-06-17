import { motion } from 'motion/react';
import React, { useState } from 'react';
import { ParticipantInfo as InfoType } from '../types';

interface ParticipantInfoProps {
  onNext: (info: InfoType) => void;
}

export function ParticipantInfo({ onNext }: ParticipantInfoProps) {
  const [data, setData] = useState<InfoType>({
    fullName: '',
    department: '',
    studyYear: '',
    gender: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 w-full max-w-lg mx-auto"
      dir="rtl"
    >
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-2xl font-bold font-cairo text-emerald-400">معلومات المشارك</h2>
        <p className="text-sm font-sans text-slate-400" dir="ltr">Participant Information</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="flex flex-col font-cairo">
            <span className="text-slate-200">الاسم الثلاثي <span className="text-red-400">*</span></span>
            <span className="text-xs font-sans text-slate-400" dir="ltr">Full Name</span>
          </label>
          <input required type="text" name="fullName" value={data.fullName} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
        </div>

        <div className="space-y-1">
          <label className="flex flex-col font-cairo">
            <span className="text-slate-200">القسم الداوم فيه <span className="text-red-400">*</span></span>
            <span className="text-xs font-sans text-slate-400" dir="ltr">Department</span>
          </label>
          <input required type="text" name="department" value={data.department} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="flex flex-col font-cairo">
              <span className="text-slate-200">العمر <span className="text-red-400">*</span></span>
              <span className="text-xs font-sans text-slate-400" dir="ltr">Age</span>
            </label>
            <input required type="number" name="age" value={data.age} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
          </div>
          
          <div className="space-y-1">
            <label className="flex flex-col font-cairo">
              <span className="text-slate-200">المرحلة الدراسية <span className="text-red-400">*</span></span>
              <span className="text-xs font-sans text-slate-400" dir="ltr">Study Year</span>
            </label>
            <select required name="studyYear" value={data.studyYear} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors">
              <option value="" disabled>اختر / Select</option>
              <option value="1">First (الأولى)</option>
              <option value="2">Second (الثانية)</option>
              <option value="3">Third (الثالثة)</option>
              <option value="4">Fourth (الرابعة)</option>
              <option value="5">Fifth (الخامسة)</option>
              <option value="6">Sixth (السادسة)</option>
              <option value="graduated">Graduated (خريج)</option>
              <option value="other">Other (أخرى)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="flex flex-col font-cairo">
            <span className="text-slate-200">الجنس <span className="text-red-400">*</span></span>
            <span className="text-xs font-sans text-slate-400" dir="ltr">Gender</span>
          </label>
          <select required name="gender" value={data.gender} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors">
            <option value="" disabled>اختر / Select</option>
            <option value="male">Male (ذكر)</option>
            <option value="female">Female (أنثى)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors flex flex-col items-center justify-center font-cairo shadow-lg shadow-emerald-900/50"
      >
        <span>التالي</span>
        <span className="text-xs font-sans text-emerald-200">Next</span>
      </button>
    </motion.form>
  );
}
