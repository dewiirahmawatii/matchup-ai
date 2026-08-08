import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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

const openrouterKey = envVars['VITE_OPENROUTER_API_KEY'];
const supabaseUrl = envVars['VITE_SUPABASE_URL'] || 'https://bhmfjydguxqvvimayjtf.supabase.co';
const supabaseAnonKey = envVars['VITE_SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

console.log('--- DB INTEGRATION TEST CONFIG ---');
console.log('OpenRouter Key prefix:', openrouterKey ? `${openrouterKey.substring(0, 15)}...` : 'NONE');
console.log('Supabase URL:', supabaseUrl);

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Clean extracted text representation of Dewi Rahmawati's CV
// This mimics the clean output that Mozilla PDF.js extracts from the PDF in the browser.
const cleanTextContent = `
Dewi Rahmawati
Senior Product Designer & AI Strategist
Email: dewi.rahmawati@example.com
Phone: +62 812-3456-7890
Location: Jakarta, Indonesia

Work Experience:
- Senior Product Designer at Nebula Cloud Systems (2022 - Present)
  * Led design systems architecture for enterprise SaaS products.
  * Designed high-fidelity prototypes and user flows.
- Product Designer at Flow AI (2020 - 2022)
  * Created design systems using Figma.
  * Collaborated with engineers to build React components.
- Junior UX Designer at Vertex Solutions (2018 - 2020)

Education:
- Master of Human-Computer Interaction, Stanford University
- Bachelor of Computer Science, Universitas Indonesia

Skills:
- Hard Skills: Figma Expert, Design Systems, Prototyping, React, Tailwind CSS, User Research, A/B Testing
- Soft Skills: Leadership, Communication, Project Management
`;

// 3. Query OpenRouter
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
  "focusScore": 92,
  "impactLevel": "Top Tier",
  "recommendation": "Target: FAANG / Unicorn / Tier-1 Tech",
  "trajectory": [
    {"role": "Junior Designer", "years": "2018 - 2020", "scorePercentage": 20},
    {"role": "Product Designer", "years": "2020 - 2022", "scorePercentage": 45},
    {"role": "Senior Lead", "years": "2022 - Present", "scorePercentage": 85}
  ]
}`;

async function runTestFlow() {
  const content = `${prompt}\n\nBerikut adalah isi dokumen resume/CV:\n${cleanTextContent}`;
  const model = 'openrouter/auto';
  
  console.log(`\nQuerying model ${model}...`);
  try {
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
        ],
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenRouter failed: ${response.status} - ${err}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    console.log('OpenRouter Response received successfully!');
    
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    cleanedText = cleanedText.trim();
    
    const parsed = JSON.parse(cleanedText);
    console.log('Parsed JSON metadata:');
    console.log(`Candidate Name: ${parsed.candidateName}`);
    console.log(`Target Role: ${parsed.targetRole}`);
    console.log(`Readiness Score: ${parsed.readinessScore}`);
    console.log(`Hard Skills: ${parsed.hardSkills.join(', ')}`);

    // 4. WRITE TO SUPABASE DATABASE
    const email = 'alex.sterling@example.com';
    const filename = 'CV_DEWI RAHMAWATI (1).pdf';

    console.log(`\n--- INSERTING INTO TABLE "user_cvs" ---`);
    const { data: cvData, error: cvError } = await supabase
      .from('user_cvs')
      .insert([
        {
          user_email: email,
          file_name: filename,
          analysis_score: parsed.readinessScore || 85,
          extracted_skills: parsed.hardSkills || []
        }
      ])
      .select();

    if (cvError) {
      throw new Error(`Failed to save CV record to user_cvs table: ${cvError.message}`);
    }
    console.log('Saved to user_cvs successfully!', cvData);

    console.log(`\n--- UPDATING PROFILE "readiness_score" in "profiles" ---`);
    const { data: profData, error: profError } = await supabase
      .from('profiles')
      .update({ readiness_score: parsed.readinessScore || 85 })
      .eq('email', email)
      .select();

    if (profError) {
      throw new Error(`Failed to update profile readiness score: ${profError.message}`);
    }
    console.log('Profile updated successfully!', profData);
    
    console.log('\nSUCCESS: Database insertion test passed 100%!');
  } catch (err) {
    console.error('\nTest flow failed:', err.message);
  }
}

runTestFlow();
