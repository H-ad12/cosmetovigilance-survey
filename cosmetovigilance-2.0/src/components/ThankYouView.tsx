import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function ThankYouView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center space-y-6 py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      >
        <CheckCircle2 className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-cairo text-white">
          شكراً لمشاركتكم
        </h2>
        <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-300">
          Thank You For Participating
        </h3>
      </div>

      <div className="space-y-2 mt-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30">
        <p className="text-lg font-cairo text-emerald-300">تم استلام إجاباتكم بنجاح.</p>
        <p className="font-sans text-slate-400">Your responses have been submitted successfully.</p>
      </div>
      
      <p className="mt-8 text-sm text-slate-500 max-w-sm">
        Cosmetovigilance 2.0 Academic Research Project
      </p>
    </motion.div>
  );
}
