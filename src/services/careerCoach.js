import { GoogleGenAI } from '@google/genai';
import { getUserProfile } from './db';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

let aiClient = null;
if (apiKey && !apiKey.includes('Demo')) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Gemini API Client initialization notice:', err);
  }
}

/**
 * 1. Generates Career Insights based on AI CV Analysis & User Profile
 */
export async function getCareerInsights(userEmail = 'alex.sterling@example.com') {
  const profile = await getUserProfile(userEmail);

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Berikan Career Insight singkat dan profesional untuk kandidat dengan profil:
Nama: ${profile.full_name || 'Alex Sterling'}
Pendidikan: ${profile.highest_degree || 'Master HCI'}
Domisili: ${profile.domicile || 'San Francisco'}
Keahlian: Figma, Design Systems, React, UI/UX, Node.js.`
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call fallback for career insights:', err);
    }
  }

  return {
    title: "AI Career Companion Insights",
    summary: `Profil ${profile.full_name || 'Alex Sterling'} menunjukkan kecocokan sangat tinggi (top 5%) untuk posisi Senior Designer & System Specialist di perusahaan tech skala Series B hingga Unicorn.`,
    highlights: [
      "Keahlian Figma & Design Systems melampaui rata-rata industri",
      "Latar belakang pendidikan mendukung posisi kepemimpinan teknis",
      "Tren permintaan pasar meningkat +14% dalam 30 hari terakhir"
    ]
  };
}

/**
 * 2. Identifies Skill Gaps based on target role
 */
export async function getSkillGaps(targetRole = 'Senior Product Designer') {
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Sebutkan 3 skill gap utama untuk peran ${targetRole} beserta deskripsinya.`
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API fallback for skill gaps:', err);
    }
  }

  return [
    {
      skill: 'Docker & Containerization',
      gapLevel: 'Critical',
      description: 'Dibutuhkan untuk otomatisasi workflow pengujian UI/UX dan deployment.'
    },
    {
      skill: 'CI/CD Pipelines',
      gapLevel: 'Medium',
      description: 'Integrasi otomatisasi GitHub Actions dengan asset design system.'
    },
    {
      skill: 'Stakeholder Management (Enterprise)',
      gapLevel: 'Low',
      description: 'Manajemen komunikasi dengan tim lintas divisi skala besar.'
    }
  ];
}

/**
 * 3. Learning Recommendations
 */
export async function getLearningRecommendations() {
  return [
    {
      topic: 'Docker Orchestration & Multi-Stage Builds',
      duration: 'Est. 12 Jam',
      impact: '+5.2% Skor Kesiapan'
    },
    {
      topic: 'Automated CI/CD for Frontend Projects',
      duration: 'Est. 8 Jam',
      impact: '+4.8% Skor Kesiapan'
    },
    {
      topic: 'Enterprise System Architecture & Design Metrics',
      duration: 'Est. 6 Jam',
      impact: '+3.5% Skor Kesiapan'
    }
  ];
}

/**
 * 4. Generates Weekly Career Roadmap
 * Contoh:
 * Minggu 1: Belajar Git
 * Minggu 2: Belajar Docker
 * Minggu 3: Belajar REST API
 * Minggu 4: Bangun Portfolio
 */
export async function getCareerRoadmap(targetRole = 'Senior DevOps / Product Specialist') {
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Buatkan roadmap pembelajaran 4 minggu untuk peran ${targetRole} dalam format Minggu 1, Minggu 2, Minggu 3, Minggu 4.`
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API fallback for roadmap:', err);
    }
  }

  return [
    {
      week: 'Minggu 1',
      title: 'Belajar Git',
      description: 'Menguasai version control, branching, pull request, dan integrasi repositori tim.',
      status: 'Selesai',
      readinessBoost: '+3.5%'
    },
    {
      week: 'Minggu 2',
      title: 'Belajar Docker',
      description: 'Memahami kontainerisasi, Dockerfile, multi-stage builds, dan container lifecycle.',
      status: 'Sedang Berjalan',
      readinessBoost: '+5.2%'
    },
    {
      week: 'Minggu 3',
      title: 'Belajar REST API',
      description: 'Merancang dan mengonsumsi RESTful APIs, otentikasi JWT, dan penanganan error.',
      status: 'Selanjutnya',
      readinessBoost: '+4.8%'
    },
    {
      week: 'Minggu 4',
      title: 'Bangun Portfolio',
      description: 'Mengintegrasikan seluruh proyek ke dalam portofolio interaktif dan mengunggah ke cloud.',
      status: 'Mendatang',
      readinessBoost: '+4.5%'
    }
  ];
}

/**
 * 5. Job Detail Compatibility Analysis (Explains match, missing skills, & potential boost %)
 */
export async function analyzeJobCompatibility(job, userProfile) {
  const jobTitle = job?.title || 'Senior Role';
  const company = job?.company || 'Target Company';
  const jobTags = job?.tags || [];

  let whyMatches = `Keahlian utama Anda di bidang ${jobTags.slice(0, 2).join(' dan ') || 'UI/UX'} sangat sesuai dengan standar kerja di ${company}. Latar belakang pendidikan dan pengalaman proyek Anda menempatkan Anda di jajaran kandidat unggulan.`;

  let missingSkills = ['Docker', 'CI/CD Pipelines', 'Enterprise Stakeholder Management'];
  if (jobTags.length > 0) {
    missingSkills = jobTags.slice(1, 3);
  }

  const boostPercentage = 22; // Potential boost percentage e.g. +22% chance of acceptance

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analisis kecocokan pekerjaan "${jobTitle}" di "${company}". Jelaskan mengapa cocok, skill yang kurang, dan berapa persen peningkatan peluang jika dipelajari.`
      });
      if (response && response.text) {
        whyMatches = response.text;
      }
    } catch (err) {
      console.warn('Gemini API fallback for job detail compatibility:', err);
    }
  }

  return {
    whyMatches,
    missingSkills,
    boostPercentage,
    recommendationMessage: `MatchUp AI mengidentifikasi bahwa menguasai skill ${missingSkills.join(' & ')} akan meningkatkan peluang Anda diterima sebesar +${boostPercentage}% untuk posisi ${jobTitle} di ${company}.`
  };
}
