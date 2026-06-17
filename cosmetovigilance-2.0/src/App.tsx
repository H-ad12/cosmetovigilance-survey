import React, { useState } from 'react';
import { Welcome } from './components/Welcome';
import { ParticipantInfo as ParticipantInfoView } from './components/ParticipantInfo';
import { QuestionView } from './components/QuestionView';
import { ReviewView } from './components/ReviewView';
import { ThankYouView } from './components/ThankYouView';
import { SurveyData, ParticipantInfo } from './types';
import { questions } from './utils/questions';
import { AnimatePresence } from 'motion/react';

type Step = 'welcome' | 'info' | number | 'review' | 'thanks';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [surveyData, setSurveyData] = useState<SurveyData>({
    participantInfo: null,
    answers: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleStart = () => setCurrentStep('info');

  const handleInfoSubmit = (info: ParticipantInfo) => {
    setSurveyData(prev => ({ ...prev, participantInfo: info }));
    setCurrentStep(0);
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setSurveyData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const handleNextQuestion = () => {
    if (typeof currentStep !== 'number') return;
    
    // Check skipping logic for Q6
    const currentQ = questions[currentStep];
    if (currentQ.id === 'q6' && surveyData.answers['q6'] === 'no') {
      setCurrentStep('review');
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep('review');
    }
  };

  const handlePrevQuestion = () => {
    if (typeof currentStep !== 'number') return;
    if (currentStep === 0) {
      setCurrentStep('info');
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const handlePrevFromReview = () => {
    // If they skipped from Q6
    if (surveyData.answers['q6'] === 'no') {
      const qIndex = questions.findIndex(q => q.id === 'q6');
      setCurrentStep(qIndex);
    } else {
      setCurrentStep(questions.length - 1);
    }
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...surveyData.participantInfo,
        ...surveyData.answers
      };

      console.log('📦 Submitting Request Payload:', payload);

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'success') {
        console.log('✅ Success Response:', result);
        setCurrentStep('thanks');
      } else {
        console.error('❌ API Error Response:', result);
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to submit survey:', errorMessage);
      setSubmitError('Failed to submit survey: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    if (currentStep === 'welcome') return 0;
    if (currentStep === 'info') return 10;
    if (currentStep === 'thanks') return 100;
    if (currentStep === 'review') return 90;
    
    const progressPerQ = 80 / questions.length;
    return 10 + ((currentStep as number) * progressPerQ);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 relative overflow-hidden" dir="ltr">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl flex flex-col relative z-10" style={{ minHeight: '600px', maxHeight: '90vh' }}>
        
        {/* Progress Bar */}
        {currentStep !== 'welcome' && currentStep !== 'thanks' && (
          <div className="w-full h-1.5 bg-slate-800 absolute top-0 left-0 z-20">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        )}

        <div className="p-6 sm:p-10 flex-1 flex flex-col overflow-y-auto w-full h-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <Welcome key="welcome" onStart={handleStart} />
            )}
            
            {currentStep === 'info' && (
              <ParticipantInfoView key="info" onNext={handleInfoSubmit} />
            )}

            {typeof currentStep === 'number' && (
              <QuestionView 
                key={`q-${currentStep}`}
                question={questions[currentStep]}
                answer={surveyData.answers[questions[currentStep].id] || ''}
                onChange={(ans) => handleAnswerChange(questions[currentStep].id, ans)}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                isFirst={currentStep === 0}
                isLast={currentStep === questions.length - 1 || (questions[currentStep].id === 'q6' && surveyData.answers['q6'] === 'no')}
              />
            )}

            {currentStep === 'review' && (
              <ReviewView 
                key="review"
                data={surveyData}
                onPrev={handlePrevFromReview}
                onSubmit={submitSurvey}
                isSubmitting={isSubmitting}
                error={submitError}
              />
            )}

            {currentStep === 'thanks' && (
              <ThankYouView key="thanks" />
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
