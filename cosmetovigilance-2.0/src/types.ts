export type QType = 'radio' | 'checkbox';

export interface Option {
  id: string;
  en: string;
  ar: string;
}

export interface Question {
  id: string;
  en: string;
  ar: string;
  type: QType;
  options: Option[];
}

export interface ParticipantInfo {
  fullName: string;
  department: string;
  studyYear: string;
  gender: string;
  age: string;
}

export interface SurveyData {
  participantInfo: ParticipantInfo | null;
  answers: Record<string, string | string[]>;
}
