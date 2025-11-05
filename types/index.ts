
export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface Answers {
  [key: number]: string;
}

export interface JobOpening {
    title: string;
    company: string;
    location: string;
    url: string;
}

export interface CareerResults {
    personalityType: string;
    recommendedDomains: string[];
    topJobTitles: string[];
    roadmap: string[];
    jobOpenings: JobOpening[];
}
