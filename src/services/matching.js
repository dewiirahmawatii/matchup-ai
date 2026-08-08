import { getJobs, getUserProfile } from './db';

// DEFAULT CANDIDATE PROFILE FOR AI MATCHING
const DEFAULT_CANDIDATE_SKILLS = [
  'Figma',
  'Design Systems',
  'Prototyping',
  'User Research',
  'React',
  'Tailwind',
  'UX Architect',
  'UI Engineer',
  'Product Strategy',
  'Frontend'
];

/**
 * Calculates the Skill Match score (0 - 100)
 */
function calculateSkillScore(candidateSkills, jobTags = [], jobTitle = '', jobDescription = '') {
  if (!jobTags || jobTags.length === 0) {
    const titleLower = jobTitle.toLowerCase();
    const matches = candidateSkills.filter(skill => titleLower.includes(skill.toLowerCase()));
    return matches.length > 0 ? 80 : 60;
  }

  const jobSkillsLower = jobTags.map(t => t.toLowerCase());
  const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());

  let matchedCount = 0;
  jobSkillsLower.forEach(jobSkill => {
    if (candidateSkillsLower.some(candSkill => candSkill.includes(jobSkill) || jobSkill.includes(candSkill))) {
      matchedCount++;
    }
  });

  const ratio = matchedCount / jobSkillsLower.length;
  return Math.round(ratio * 100);
}

/**
 * Calculates Education score (0 - 100)
 */
function calculateEducationScore(highestDegree = '') {
  const degreeLower = (highestDegree || '').toLowerCase();
  if (degreeLower.includes('master') || degreeLower.includes('phd') || degreeLower.includes('m.s.')) {
    return 100;
  }
  if (degreeLower.includes('bachelor') || degreeLower.includes('b.s.')) {
    return 85;
  }
  if (degreeLower.includes('associate')) {
    return 70;
  }
  return 75; // Default acceptable score
}

/**
 * Calculates Location score (0 - 100)
 */
function calculateLocationScore(userLocation = '', userWorkplacePref = '', jobLocation = '', jobType = '') {
  const locLower = (jobLocation || '').toLowerCase();
  const typeLower = (jobType || '').toLowerCase();
  const prefLower = (userWorkplacePref || '').toLowerCase();
  const userLocLower = (userLocation || '').toLowerCase();

  // If job is Remote or user prefers remote and job is remote
  if (typeLower.includes('remote') || locLower.includes('remote') || prefLower.includes('remote')) {
    return 100;
  }

  // Exact location match
  if (userLocLower && locLower && (userLocLower.includes(locLower) || locLower.includes(userLocLower))) {
    return 100;
  }

  // Hybrid match
  if (typeLower.includes('hybrid')) {
    return 80;
  }

  return 60;
}

/**
 * Calculates Career Interest score (0 - 100)
 */
function calculateCareerInterestScore(interests = {}, jobCategory = '', jobTitle = '', jobTags = []) {
  const titleLower = jobTitle.toLowerCase();
  const tagsText = (jobTags || []).join(' ').toLowerCase();

  let interestMatch = false;

  if (interests.design && (titleLower.includes('design') || titleLower.includes('ux') || titleLower.includes('ui') || tagsText.includes('figma'))) {
    interestMatch = true;
  }
  if (interests.engineering && (titleLower.includes('engineer') || titleLower.includes('developer') || titleLower.includes('architect') || titleLower.includes('system') || titleLower.includes('backend'))) {
    interestMatch = true;
  }
  if (interests.marketing && (titleLower.includes('market') || titleLower.includes('growth') || titleLower.includes('content'))) {
    interestMatch = true;
  }
  if (interests.management && (titleLower.includes('manager') || titleLower.includes('lead') || titleLower.includes('head') || titleLower.includes('strategist'))) {
    interestMatch = true;
  }

  return interestMatch ? 100 : 50;
}

/**
 * Generates human-readable AI feedback / reason when a job is not a 100% match
 */
function generateAIMatchReason(scores, job, candidateSkills) {
  const missingSkills = (job.tags || []).filter(tag => 
    !candidateSkills.some(cs => cs.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(cs.toLowerCase()))
  );

  const reasons = [];

  if (scores.totalScore >= 90) {
    reasons.push(`Top Fit: Your core expertise in ${candidateSkills.slice(0, 2).join(' & ')} strongly aligns with ${job.company}'s requirements.`);
  } else if (scores.totalScore >= 80) {
    if (missingSkills.length > 0) {
      reasons.push(`Good Fit: Minor skill gap identified in ${missingSkills.join(', ')}.`);
    } else {
      reasons.push(`Solid Alignment: Strong skill overlap with slight differences in location or domain focus.`);
    }
  } else {
    if (missingSkills.length > 0) {
      reasons.push(`Potential Gap: Requires additional experience in ${missingSkills.join(', ')}.`);
    }
    if (scores.locationScore < 80) {
      reasons.push(`Location Constraint: Job location (${job.location}) differs from preferred work setup.`);
    }
  }

  return reasons.join(' ');
}

/**
 * Main AI Job Matching Engine
 * Compares User Profile + AI Analysis against all Supabase Job listings.
 * Applies MVP Formula:
 * - Skill = 50%
 * - Education = 20%
 * - Location = 10%
 * - Career Interest = 20%
 */
export async function getMatchedJobs(userEmail) {
  try {
    const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
    const [jobs, userProfile] = await Promise.all([
      getJobs(activeEmail),
      getUserProfile(activeEmail)
    ]);

    const candidateSkills = userProfile?.extracted_skills || DEFAULT_CANDIDATE_SKILLS;
    const userLocation = userProfile?.domicile || 'San Francisco, CA';
    const userDegree = userProfile?.highest_degree || 'Master of Human-Computer Interaction';
    const userInterests = userProfile?.interests || { engineering: true, design: true };
    const userWorkplacePref = userProfile?.workplace || 'Remote Only';

    const matchedJobs = jobs.map(job => {
      const skillScore = calculateSkillScore(candidateSkills, job.tags, job.title, job.description);
      const edScore = calculateEducationScore(userDegree);
      const locScore = calculateLocationScore(userLocation, userWorkplacePref, job.location, job.type);
      const interestScore = calculateCareerInterestScore(userInterests, job.category, job.title, job.tags);

      // MVP Formula Calculation
      const rawTotal = (skillScore * 0.50) + (edScore * 0.20) + (locScore * 0.10) + (interestScore * 0.20);
      const matchScore = Math.min(99, Math.max(65, Math.round(rawTotal)));

      const scores = {
        skillScore,
        edScore,
        locScore,
        interestScore,
        totalScore: matchScore
      };

      const aiReason = generateAIMatchReason(scores, job, candidateSkills);

      return {
        ...job,
        match: matchScore,
        aiMatchDetails: {
          scores,
          reason: aiReason
        }
      };
    });

    // Sort by match score descending (highest first e.g. 98%, 95%, 88%, 76%...)
    matchedJobs.sort((a, b) => b.match - a.match);

    return matchedJobs;
  } catch (error) {
    console.error('AI Matching Engine error:', error);
    const fallbackJobs = await getJobs(userEmail);
    return fallbackJobs.sort((a, b) => b.match - a.match);
  }
}
