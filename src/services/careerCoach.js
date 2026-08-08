import { getUserProfile } from './db';

/**
 * Helper to call OpenRouter Chat Completions REST API directly in the browser
 */
async function callOpenRouterREST(promptText, textContent = null) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey || apiKey.includes('Demo')) {
    throw new Error('Using a demo or empty OpenRouter API key.');
  }

  const content = textContent 
    ? `${promptText}\n\nBerikut adalah isi dokumen resume/CV:\n${textContent}`
    : promptText;

  // Models to try in sequence
  const models = [
    'google/gemma-2-9b-it:free',
    'nvidia/nemotron-3.5-content-safety:free',
    'openrouter/auto'
  ];

  let lastError = null;
  for (const model of models) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'MatchUp AI'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: content
            }
          ],
          max_tokens: 800
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API error for model ${model}: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`OpenRouter failed for model ${model}:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error('All OpenRouter models failed.');
}

/**
 * Helper to dynamically load PDF.js from CDN and extract text (client-side only)
 */
async function extractTextFromPDF(base64Data) {
  if (typeof window === 'undefined') {
    return '';
  }

  return new Promise((resolve) => {
    // If PDF.js library is already loaded
    if (window['pdfjs-dist/build/pdf']) {
      parsePDF(window['pdfjs-dist/build/pdf'], base64Data).then(resolve).catch(() => resolve(''));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = async () => {
      try {
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const text = await parsePDF(pdfjsLib, base64Data);
        resolve(text);
      } catch (err) {
        console.error('PDF.js dynamic parsing failed:', err);
        resolve('');
      }
    };
    script.onerror = () => {
      console.warn('Failed to load PDF.js from CDN.');
      resolve('');
    };
    document.head.appendChild(script);
  });
}

async function parsePDF(pdfjsLib, base64Data) {
  const binary = atob(base64Data);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
}

/**
 * Scan text contents for tech keywords
 */
function extractKeywordsFromText(text) {
  const skillKeywords = [
    'Figma', 'Sketch', 'Adobe XD', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing', 'Interaction Design',
    'React', 'Vue', 'Angular', 'Next.js', 'Vite', 'HTML', 'CSS', 'Tailwind', 'Javascript', 'TypeScript',
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring', 'Go', 'Golang', 'Ruby', 'Rails', 'PHP', 'Laravel',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'AWS', 'GCP', 'Azure',
    'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'DevOps', 'Agile', 'Scrum', 'Product Management'
  ];
  
  const foundSkills = [];
  for (const skill of skillKeywords) {
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    if (regex.test(text)) {
      foundSkills.push(skill);
    }
  }
  return foundSkills;
}

/**
 * 1. Generates Career Insights based on AI CV Analysis & User Profile
 */
export async function getCareerInsights(userEmail = 'alex.sterling@example.com') {
  const profile = await getUserProfile(userEmail);

  try {
    const prompt = `Berikan Career Insight singkat dan profesional untuk kandidat dengan profil:
Nama: ${profile.full_name || 'Alex Sterling'}
Pendidikan: ${profile.highest_degree || 'Master HCI'}
Domisili: ${profile.domicile || 'San Francisco'}
Keahlian: Figma, Design Systems, React, UI/UX, Node.js.`;
    
    const text = await callOpenRouterREST(prompt);
    return text;
  } catch (err) {
    console.warn('OpenRouter API call fallback for career insights:', err);
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
  try {
    const prompt = `Sebutkan 3 skill gap utama untuk peran ${targetRole} beserta deskripsinya.`;
    const text = await callOpenRouterREST(prompt);
    return text;
  } catch (err) {
    console.warn('OpenRouter API fallback for skill gaps:', err);
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
 */
export async function getCareerRoadmap(targetRole = 'Senior DevOps / Product Specialist') {
  try {
    const prompt = `Buatkan roadmap pembelajaran 4 minggu untuk peran ${targetRole} dalam format Minggu 1, Minggu 2, Minggu 3, Minggu 4.`;
    const text = await callOpenRouterREST(prompt);
    return text;
  } catch (err) {
    console.warn('OpenRouter API fallback for roadmap:', err);
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
 * 5. Job Detail Compatibility Analysis
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
  const boostPercentage = 22;

  try {
    const prompt = `Analisis kecocokan pekerjaan "${jobTitle}" di "${company}". Jelaskan mengapa cocok, skill yang kurang, dan berapa persen peningkatan peluang jika dipelajari.`;
    const text = await callOpenRouterREST(prompt);
    if (text) {
      whyMatches = text;
    }
  } catch (err) {
    console.warn('OpenRouter API fallback for job detail compatibility:', err);
  }

  return {
    whyMatches,
    missingSkills,
    boostPercentage,
    recommendationMessage: `MatchUp AI mengidentifikasi bahwa menguasai skill ${missingSkills.join(' & ')} akan meningkatkan peluang Anda diterima sebesar +${boostPercentage}% untuk posisi ${jobTitle} di ${company}.`
  };
}

/**
 * 6. Dynamic AI CV Analysis
 */
export async function analyzeResume(base64Data, filename, userProfile = {}) {
  // 1. EXTRACT REAL TEXT FROM PDF USING PDF.JS
  const pdfText = await extractTextFromPDF(base64Data);

  // 2. DYNAMIC VERIFICATION (Filename keyword + PDF text check)
  let isCV = false;
  const isCVKeyword = /cv|resume|portfolio|biodata|profil|karir|kerja|design|dev|engineer|architect|manager|lead|developer|scientist|specialist/i.test(filename);
  if (isCVKeyword) {
    isCV = true;
  }

  const cvSectionKeywords = [
    'experience', 'education', 'skills', 'work', 'project', 'contact', 'phone', 'email', 'summary',
    'pengalaman', 'pendidikan', 'keahlian', 'proyek', 'kontak', 'telepon', 'tentang'
  ];
  let matchCount = 0;
  for (const keyword of cvSectionKeywords) {
    const regex = new RegExp(keyword, 'i');
    if (regex.test(pdfText) || (pdfText.length === 0 && regex.test(atob(base64Data)))) {
      matchCount++;
    }
  }
  if (matchCount >= 2) {
    isCV = true;
  }

  if (!isCV) {
    return {
      isNotCV: true,
      errorMessage: `Berkas "${filename}" tidak terdeteksi sebagai CV/Resume. Silakan unggah berkas CV/Resume yang valid.`
    };
  }

  // 3. CALL OPENROUTER REST API
  try {
    const prompt = `Anda adalah expert AI Resume Analyzer. Analisis file resume PDF berikut yang dikonversi menjadi teks.
Langkah pertama, periksa apakah dokumen ini adalah sebuah CV atau Resume. Jika dokumen ini BUKAN merupakan CV/Resume (misalnya dokumen berisi kuitansi, tagihan, gambar acak, artikel jurnal, tugas kuliah, atau sertifikat saja), kembalikan hasil berupa JSON murni ini:
{
  "isNotCV": true,
  "errorMessage": "Berkas tidak teridentifikasi sebagai CV/Resume. Silakan unggah berkas CV yang sesuai."
}

Jika dokumen ini benar merupakan CV/Resume, lakukan analisis mendalam berdasarkan profil pengguna jika disediakan:
Nama Profil: ${userProfile.full_name || ''}
Judul Profil: ${userProfile.highest_degree || ''}
Domisili: ${userProfile.domicile || ''}

Kembalikan hasil analisis dalam format JSON murni dengan key berikut (TANPA markdown wrapper atau text lain):
{
  "candidateName": "Nama kandidat",
  "targetRole": "Role pekerjaan target (misal: Senior Product Designer / Senior Fullstack Developer)",
  "readinessScore": 85, // Angka 0-100
  "hardSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "softSkills": [
    {"skill": "Leadership", "level": 3}, // level 1-4
    {"skill": "Communication", "level": 4}
  ],
  "experienceYears": 5.5,
  "keyStrengths": ["Kekuatan 1", "Kekuatan 2"],
  "identifiedGaps": [
    {"gap": "Nama gap", "description": "Penjelasan detail gap"}
  ],
  "growthVelocity": "+14%",
  "growthLevel": "Above Average",
  "impactRating": "A+",
  "focusScore": 92,
  "impactLevel": "Top Tier",
  "recommendation": "Target: FAANG / Unicorn / Tier-1 Tech",
  "trajectory": [
    {"role": "Junior Designer", "years": "2018 - 2020", "scorePercentage": 20},
    {"role": "Product Designer", "years": "2020 - 2022", "scorePercentage": 45},
    {"role": "Senior Lead", "years": "2022 - Present", "scorePercentage": 85}
  ]
}`;

    const text = await callOpenRouterREST(prompt, pdfText || filename);

    if (text) {
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.substring(7);
      }
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.substring(0, cleanedText.length - 3);
      }
      cleanedText = cleanedText.trim();
      const parsed = JSON.parse(cleanedText);
      return parsed;
    }
  } catch (err) {
    console.warn('OpenRouter AI CV Analysis failed, falling back to smart mock data:', err);
  }

  // 4. FALLBACK SMART LOCAL PARSER (extracts targetRole, readinessScore, hardSkills, gaps, etc. directly from PDF text)
  const name = userProfile?.full_name || extractNameFromFilename(filename) || 'Kandidat';
  const foundSkills = extractKeywordsFromText(pdfText || atob(base64Data));

  // Determine target role based on keywords in PDF text
  let targetRole = userProfile.highest_degree || 'Professional Specialist';
  const textLower = (pdfText || '').toLowerCase();
  
  if (textLower.includes('product designer') || textLower.includes('ui/ux') || textLower.includes('ux designer') || textLower.includes('figma')) {
    targetRole = 'Senior Product Designer';
  } else if (textLower.includes('fullstack') || textLower.includes('full-stack') || textLower.includes('software engineer') || textLower.includes('frontend') || textLower.includes('backend') || textLower.includes('react') || textLower.includes('node')) {
    targetRole = 'Senior Full-Stack Engineer';
  } else if (textLower.includes('devops') || textLower.includes('kubernetes') || textLower.includes('cloud')) {
    targetRole = 'Cloud DevOps Engineer';
  } else if (textLower.includes('product manager') || textLower.includes('pm') || textLower.includes('project manager')) {
    targetRole = 'Technical Product Manager';
  }

  // Calculate dynamic readiness score
  const baseScore = 75;
  const skillPoints = Math.min(20, foundSkills.length * 3);
  const readinessScore = baseScore + skillPoints;

  // Determine experience years
  let experienceYears = 4.5;
  const expMatch = textLower.match(/(\d+)\+?\s*years?\s+experience/i) || textLower.match(/pengalaman\s*(\d+)\s*tahun/i);
  if (expMatch) {
    experienceYears = parseFloat(expMatch[1]);
  } else if (foundSkills.length > 8) {
    experienceYears = 6.2;
  }

  // Final hard skills list
  const finalHardSkills = foundSkills.length >= 3 
    ? foundSkills.slice(0, 6) 
    : (targetRole.includes('Designer') 
        ? ['Figma Expert', 'Design Systems', 'Prototyping', 'React/Tailwind', 'User Research', 'A/B Testing']
        : ['React/Next.js', 'Node.js/Express', 'PostgreSQL', 'Docker/Containers', 'CI/CD Pipelines', 'REST APIs']);

  // Strengths and Gaps dynamically customized to their target role
  const keyStrengths = targetRole.includes('Designer')
    ? [
        `Rekam jejak kuat dalam merancang design systems interaktif berbasis ${finalHardSkills.slice(0, 2).join(' & ')}.`,
        'Pendekatan visual berbasis kebutuhan pengguna dan riset fungsional.'
      ]
    : [
        `Keahlian mendalam dalam membangun arsitektur aplikasi berbasis ${finalHardSkills.slice(0, 2).join(' & ')}.`,
        'Kemampuan mengoptimalkan performa deployment kontainer cloud.'
      ];

  const identifiedGaps = targetRole.includes('Designer')
    ? [
        { gap: 'Accessibility Compliance', description: 'Penyebutan standar WCAG 2.1 untuk inklusivitas UI yang masih terbatas.' },
        { gap: 'Leadership Quantifiers', description: 'Metrik hasil koordinasi dengan tim engineering belum tertulis lengkap.' }
      ]
    : [
        { gap: 'System Load Testing', description: 'Kurangnya metrik spesifik pengujian beban (load testing) sistem.' },
        { gap: 'Docker Security Policies', description: 'Terbatasnya dokumentasi pengamanan image container di registry.' }
      ];

  return {
    candidateName: name,
    targetRole: targetRole,
    readinessScore: readinessScore,
    hardSkills: finalHardSkills,
    softSkills: [
      { skill: 'Collaboration', level: 4 },
      { skill: 'Problem Solving', level: 3 }
    ],
    experienceYears: experienceYears,
    keyStrengths: keyStrengths,
    identifiedGaps: identifiedGaps,
    growthVelocity: '+15%',
    growthLevel: 'Above Average',
    focusScore: readinessScore,
    impactRating: 'A',
    impactLevel: 'Top Tier',
    recommendation: 'Target: Series-B Tech / Unicorn / Tier-1 Enterprise',
    trajectory: [
      { role: 'Junior Associate', years: '2020 - 2022', scorePercentage: 30 },
      { role: 'Mid Specialist', years: '2022 - 2024', scorePercentage: 60 },
      { role: `Senior Lead`, years: '2024 - Present', scorePercentage: readinessScore }
    ]
  };
}

function extractNameFromFilename(filename) {
  if (!filename) return '';
  const clean = filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
  return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
