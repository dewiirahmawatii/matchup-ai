import fs from 'fs';
import path from 'path';

// 1. Manually parse .env file to get keys
const envPath = path.resolve('d:/hcc/.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    envVars[key] = value;
  }
});

const openrouterKey = envVars['VITE_OPENROUTER_API_KEY'] || envVars['VITE_GEMINI_API_KEY'] || '';
console.log('Using OpenRouter Key prefix:', openrouterKey ? `${openrouterKey.substring(0, 15)}...` : 'NONE');

// 2. Read the PDF file
const pdfPath = path.resolve('d:/hcc/test/CV_DEWI RAHMAWATI (1).pdf');
if (!fs.existsSync(pdfPath)) {
  console.error(`Error: File does not exist at ${pdfPath}`);
  process.exit(1);
}

const pdfBuffer = fs.readFileSync(pdfPath);
const base64Data = pdfBuffer.toString('base64');
console.log('PDF Read successfully. Buffer size:', pdfBuffer.length, 'bytes');

// 3. Scan binary text for keywords
const binaryText = pdfBuffer.toString('binary');
const cvSectionKeywords = [
  'experience', 'education', 'skills', 'work', 'project', 'contact', 'phone', 'email', 'summary',
  'pengalaman', 'pendidikan', 'keahlian', 'proyek', 'kontak', 'telepon', 'tentang'
];

console.log('\n--- SCANNING PDF CONTENT FOR CV KEYWORDS ---');
let matchCount = 0;
cvSectionKeywords.forEach(keyword => {
  const regex = new RegExp(keyword, 'i');
  if (regex.test(binaryText)) {
    console.log(`- Matched section keyword: [${keyword}]`);
    matchCount++;
  }
});
console.log(`Total match count: ${matchCount} (Required >= 2 to pass CV check)`);

// 4. Extract tech keywords
const skillKeywords = [
  'Figma', 'Sketch', 'Adobe XD', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing', 'Interaction Design',
  'React', 'Vue', 'Angular', 'Next.js', 'Vite', 'HTML', 'CSS', 'Tailwind', 'Javascript', 'TypeScript',
  'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring', 'Go', 'Golang', 'Ruby', 'Rails', 'PHP', 'Laravel',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'AWS', 'GCP', 'Azure',
  'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'DevOps', 'Agile', 'Scrum', 'Product Management'
];
console.log('\n--- SCANNING FOR TECH SKILL KEYWORDS ---');
const foundSkills = [];
skillKeywords.forEach(skill => {
  const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escaped, 'i');
  if (regex.test(binaryText)) {
    console.log(`- Found skill: [${skill}]`);
    foundSkills.push(skill);
  }
});

// 5. Query OpenRouter
const prompt = `Anda adalah expert AI Resume Analyzer. Analisis file resume PDF berikut yang dikonversi menjadi teks.
Langkah pertama, periksa apakah dokumen ini adalah sebuah CV atau Resume. Jika dokumen ini BUKAN merupakan CV/Resume, kembalikan hasil berupa JSON murni ini:
{
  "isNotCV": true,
  "errorMessage": "Berkas tidak teridentifikasi sebagai CV/Resume. Silakan unggah berkas CV yang sesuai."
}

Jika dokumen ini benar merupakan CV/Resume, lakukan analisis mendalam.
Kembalikan hasil analisis dalam format JSON murni dengan key berikut (TANPA markdown wrapper atau text lain):
{
  "candidateName": "Nama kandidat",
  "targetRole": "Role pekerjaan target (misal: Senior Product Designer / Senior Fullstack Developer)",
  "readinessScore": 85,
  "hardSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "softSkills": [
    {"skill": "Leadership", "level": 3},
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
  "impactLevel": "Top Tier",
  "recommendation": "Target: FAANG / Unicorn / Tier-1 Tech",
  "trajectory": [
    {"role": "Junior Designer", "years": "2018 - 2020", "scorePercentage": 20},
    {"role": "Product Designer", "years": "2020 - 2022", "scorePercentage": 45},
    {"role": "Senior Lead", "years": "2022 - Present", "scorePercentage": 85}
  ]
}`;

async function testOpenRouter() {
  const cleanTextContent = binaryText.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
  const content = `${prompt}\n\nBerikut adalah isi dokumen resume/CV:\n${cleanTextContent}`;

  const models = [
    'google/gemma-2-9b-it:free',
    'nvidia/nemotron-3.5-content-safety:free',
    'openrouter/auto'
  ];

  console.log('\n--- CALLING OPENROUTER ---');
  for (const model of models) {
    try {
      console.log(`Trying model: ${model}...`);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'MatchUp AI Test'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: content
            }
          ]
        })
      });

      console.log(`Response status: ${response.status} ${response.statusText}`);
      const responseText = await response.text();
      
      if (!response.ok) {
        console.warn(`Model ${model} returned error status:`, responseText);
        continue;
      }

      console.log('\n--- SUCCESS! OPENROUTER RESPONSE ---');
      console.log(responseText);
      
      const parsedData = JSON.parse(responseText);
      const answer = parsedData?.choices?.[0]?.message?.content;
      console.log('\n--- EXTRACTED ANSWER ---');
      console.log(answer);
      return;
    } catch (err) {
      console.warn(`Failed calling model ${model}:`, err.message);
    }
  }
  console.error('\nError: All models failed.');
}

testOpenRouter();
