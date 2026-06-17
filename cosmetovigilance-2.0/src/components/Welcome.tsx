import { motion } from 'motion/react';
import { ShieldCheck, Clock, BookOpen } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold font-cairo text-blue-400">
          مرحباً بكم في عصر الوعي التجميلي
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Cosmetovigilance 2.0
        </h2>
      </div>

      <div className="space-y-2">
        <p className="text-xl font-cairo text-slate-300">الجمال الآمن أم المخاطر الخفية؟</p>
        <p className="text-lg text-slate-400">Safe Beauty or Hidden Risks?</p>
      </div>

      <div className="max-w-2xl bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 space-y-6 text-right">
        <p className="font-cairo text-lg leading-relaxed text-slate-200" dir="rtl">
          مع الانتشار الواسع لمستحضرات التجميل المتاحة دون وصفة طبية، أصبح استخدامها جزءاً من الروتين اليومي لملايين الأشخاص. لكن هل جميع هذه المنتجات آمنة كما تبدو؟
        </p>
        <p className="font-cairo text-lg leading-relaxed text-slate-200" dir="rtl">
          يهدف علم <strong>Cosmetovigilance</strong> (اليقظة التجميلية) إلى مراقبة الآثار الجانبية والمشكلات المرتبطة باستخدام مستحضرات التجميل، والكشف المبكر عن المخاطر المحتملة لضمان الاستخدام الآمن وحماية صحة المستهلكين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
          <span className="font-cairo font-semibold">إجابات مجهولة</span>
          <span className="text-sm text-slate-400">Anonymous Responses</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <Clock className="w-8 h-8 text-blue-400 mb-2" />
          <span className="font-cairo font-semibold">٢-٣ دقائق</span>
          <span className="text-sm text-slate-400">Takes 2-3 Minutes</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <BookOpen className="w-8 h-8 text-purple-400 mb-2" />
          <span className="font-cairo font-semibold">للبحث الأكاديمي فقط</span>
          <span className="text-sm text-slate-400">Academic Research Only</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-full overflow-hidden transition-all duration-300 w-full max-w-md shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
        <span className="flex flex-col items-center justify-center">
          <span className="font-cairo text-lg">بدء الاستبيان</span>
          <span className="text-sm text-blue-200">Start Survey</span>
        </span>
      </button>
    </motion.div>
  );
}
