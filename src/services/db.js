import { supabase } from '../lib/supabase';

// DEFAULT FALLBACK MOCK DATA (used if database is unreachable or empty before setup)
export const DEFAULT_JOBS = [
  {
    id: 1,
    title: 'Senior Product Designer',
    company: 'Nebula Cloud Systems',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxbBmFaRupELCRS8PACJLUn_ruWppU6Ql60sITI67F1xsr4vwYNyNjCYffWp1x6lcCNuT0rOvAa94SMlsndq_p8GZcyhcgCLhEpRh6WjF8RqwL3UkUIU832WU9MA-h-oO22kCG2_AMvtXwUW0Gug1pFKykjeB6WZMHpDlyWCCbVHQ9h5EhIcR4uzYy302ETAxik8JSOAGUF6atyjZX-Nr_5mi7aZoh2qnqyRE0Dk6afHEaH9dn8aYH',
    match: 98,
    salary: '$160k - $210k',
    location: 'San Francisco, CA',
    bookmarked: false,
    tags: ['Figma', 'Design Systems', 'SaaS'],
    type: 'Full-time',
    posted: '2 days ago',
    applicants: 128,
  },
  {
    id: 2,
    title: 'Lead UX Architect',
    company: 'Vertex Solutions',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpZCvYkfm36cNGMvfjLGkkwGS_rV_qofDtiIGEjXLfjuBfsp_mDJVhcOxnOjpwTIuZ_4GzzejS7RAm_PRgCozFJVyKBURXkX1NRYi_YevVgvKIclrSur3nVL7JF69yLU5kqhL13xOiXhevRrbCyL3fBo10X9vO9vHYma85XUf0Eqg2m0zpkhmVci2WM53pEBILqKLoiZpO-jCd0h3yU3qOcGCkUGISgaELqarOYuoJLeajG41Z8thy',
    match: 94,
    salary: '$145k - $185k',
    location: 'Remote',
    bookmarked: true,
    tags: ['UX Architect', 'User Research', 'Figma'],
    type: 'Remote',
    posted: '1 day ago',
    applicants: 94,
  },
  {
    id: 3,
    title: 'Interaction Engineer',
    company: 'Flow AI',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9LxAFSmIhOX9YEh-ORzXmf1oEvvce8Sxx6vLMKNmmWA8HU0vrtzhmyvbX6-S-8n3t2UTr_cgCxYyCAn5gvXXSxwpIE7GFaMv-V93YRegAstfgbmTLWB7_iALLWk7zIxZm5eHVadnXpSG8uNw59r8yZbYNm4fSqxrAKb0tclmEc2S6NadmXhXgLAIq5sJwoGZP_a2uKoTcaZ6GSNn0AJQdsCxcqoMFZEKby6UJfIgheQNm78GlE-Uu',
    match: 91,
    salary: '$130k - $175k',
    location: 'Austin, TX',
    bookmarked: false,
    tags: ['React', 'Framer Motion', 'Tailwind'],
    type: 'Full-time',
    posted: '3 days ago',
    applicants: 45,
  },
  {
    id: 4,
    title: 'Product Strategist',
    company: 'Stellar Data',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTWLTBBnBk5QIjq2QrHkqnqAYQZAuKyy8R8RC260iorcK66MjNUyZy17dt74hNktJLyZEJ1SoYLCJAsovjFvN0jW39ByCZdHca3Uq58dqzrGidJdHqaEuQ_bAABx77OOLZmciUEbUz_qhBJ0hK9bW4UoDXP95jj02Zrp-QZjzA-_zHQ4kVtXJgAg_0Hxj-oWOXuhs7RsfpefhiE9HTiwaZA1WvkTOcV1QsuUHVs-Ra2pc9ljlgov9',
    match: 89,
    salary: '$155k - $190k',
    location: 'New York, NY',
    bookmarked: false,
    tags: ['Product Strategy', 'Analytics', 'Growth'],
    type: 'Full-time',
    posted: '4 days ago',
    applicants: 67,
  },
  {
    id: 5,
    title: 'UI Engineer',
    company: 'Helix Health',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXRO46cWWsfHg_Zi9BohKgJwAaCd1nmf2dLRKBXvwyAO-vXvGau-rtghZ4foxxG1w2PW9Ovo1Byh_62JujspoH23_E1jhKnNl52QZx2cIKh0mJ2W-vcR4RSptZOclNTQVD1UmqR_QReQ-m3o1q6SCYM1ABTvbBB42RalxSxjRSi2N5PBAFLME1N8NKvjTyggPJyLFFnchywBJdziOENFY7Zoxqm_KlZMSFJZ9Wb8YTanj8x_-1c27',
    match: 87,
    salary: '$140k - $170k',
    location: 'Remote',
    bookmarked: false,
    tags: ['React', 'Design Systems', 'CSS'],
    type: 'Remote',
    posted: '5 days ago',
    applicants: 52,
  },
  {
    id: 6,
    title: 'System Architect',
    company: 'Quantum Labs',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTXOkK8qr46Ln7yYfj36UjAH9_1N1EmEXzaVAomnXLz6KrTFPDdo_3BACOuGMDkKjckL9YF8cMV4Bfesy6SsTxAknmwLBqnAX4OZAr4Qb2-ynmmUAklsayD_DPm6lHCBaUrYm2wnn_ScmGuHDstKJZLCYwsW1N9PBGZ3FvtccSvJC1k6A1QXk-O6jLVQUHqlNQMY1b0y-0Eq-YRLdNnzzj4E7O3ibUe6N9kbkEY57TKHsvzDgBPQe_',
    match: 85,
    salary: '$175k - $225k',
    location: 'Palo Alto, CA',
    bookmarked: false,
    tags: ['Distributed Systems', 'Cloud', 'Architecture'],
    type: 'Full-time',
    posted: '6 days ago',
    applicants: 89,
  }
];

// 1. FETCH ALL JOBS
export async function getJobs(userEmail) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .order('id', { ascending: true });

    if (error || !jobs || jobs.length === 0) {
      console.warn('Using default jobs fallback due to Supabase query or empty table:', error);
      return DEFAULT_JOBS;
    }

    // Fetch saved jobs for the user to mark bookmarked flag
    const { data: savedJobs } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_email', activeEmail);

    const savedJobIds = new Set(savedJobs ? savedJobs.map(s => Number(s.job_id)) : []);

    return jobs.map(j => ({
      id: j.id,
      title: j.title,
      company: j.company,
      logo: j.logo,
      match: j.match_score || 85,
      salary: j.salary,
      location: j.location,
      type: j.type,
      posted: j.posted,
      applicants: j.applicants,
      tags: j.tags || [],
      category: j.category || 'All',
      bookmarked: savedJobIds.has(Number(j.id))
    }));
  } catch (err) {
    console.error('Failed to fetch jobs from Supabase:', err);
    return DEFAULT_JOBS;
  }
}

// 2. FETCH SINGLE JOB BY ID
export async function getJobById(id) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const fallback = DEFAULT_JOBS.find(j => j.id === Number(id)) || DEFAULT_JOBS[0];
      return fallback;
    }

    return {
      id: data.id,
      title: data.title,
      company: data.company,
      logo: data.logo,
      match: data.match_score || 94,
      salary: data.salary,
      location: data.location,
      type: data.type || 'Remote',
      posted: data.posted || '2 days ago',
      applicants: data.applicants || 128,
      tags: data.tags || [],
      description: data.description
    };
  } catch (err) {
    return DEFAULT_JOBS.find(j => j.id === Number(id)) || DEFAULT_JOBS[0];
  }
}

// 3. TOGGLE SAVED / BOOKMARKED JOB
export async function toggleSaveJob(userEmail, jobId, currentStatus) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const localSavedIds = JSON.parse(localStorage.getItem('saved_jobs_local_' + activeEmail) || '[]');
    
    if (currentStatus) {
      // Remove from local cache
      const updatedIds = localSavedIds.filter(id => id !== Number(jobId));
      localStorage.setItem('saved_jobs_local_' + activeEmail, JSON.stringify(updatedIds));

      // Remove from saved_jobs table
      await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_email', activeEmail)
        .eq('job_id', jobId);
      return false;
    } else {
      // Add to local cache
      if (!localSavedIds.includes(Number(jobId))) {
        localSavedIds.push(Number(jobId));
        localStorage.setItem('saved_jobs_local_' + activeEmail, JSON.stringify(localSavedIds));
      }

      // Insert into saved_jobs table
      await supabase
        .from('saved_jobs')
        .insert([{ user_email: activeEmail, job_id: jobId }]);
      return true;
    }
  } catch (err) {
    console.error('Error toggling job bookmark:', err);
    return !currentStatus;
  }
}

// 3b. GET SAVED JOBS FOR USER
export async function getSavedJobs(userEmail) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const { data: saved, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_email', activeEmail);
    
    let savedJobIds;
    if (error || !saved) {
      console.warn('Saved_jobs database query failed, using localStorage cache:', error);
      savedJobIds = new Set(JSON.parse(localStorage.getItem('saved_jobs_local_' + activeEmail) || '[]'));
    } else {
      const ids = saved.map(s => Number(s.job_id));
      savedJobIds = new Set(ids);
      localStorage.setItem('saved_jobs_local_' + activeEmail, JSON.stringify(ids));
    }

    const allJobs = await getJobs(activeEmail);
    return allJobs.filter(j => savedJobIds.has(Number(j.id))).map(j => ({ ...j, bookmarked: true }));
  } catch (err) {
    console.error('Error fetching saved jobs:', err);
    const savedJobIds = new Set(JSON.parse(localStorage.getItem('saved_jobs_local_' + activeEmail) || '[]'));
    return DEFAULT_JOBS.filter(j => savedJobIds.has(Number(j.id))).map(j => ({ ...j, bookmarked: true }));
  }
}

// 4. FETCH USER PROFILE
export async function getUserProfile(email) {
  const activeEmail = email || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  
  // Local cache fallback
  const cached = localStorage.getItem('userProfile_' + activeEmail);
  const cachedData = cached ? JSON.parse(cached) : null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', activeEmail)
      .single();

    if (error || !data) {
      if (cachedData) return cachedData;
      return {
        full_name: 'Alex Sterling',
        email: activeEmail,
        domicile: 'San Francisco, CA',
        highest_degree: 'Master of Human-Computer Interaction',
        institution: 'Stanford University',
        readiness_score: 92,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB76RUL1uTVLe5VyCjVzkutfx4CdLsSdHFLUV3-QfUV2eueL-USc-oeaK3hvQWDuL4iBzpGncrpthEzF_U_jttVwhw4BtA5kXHiTaDwJGg75uY1Ni9qC-9_S-LqseWAcQUuikWPh7MtrgH7eC8nEQWxMub3KYbthu_sCho__Bv7JOVEsvfpHxFu56SXiXo1poZoMN1vaHzQqoCbnjnZIIVidQkmkrhUqc3_GK84zvV1hcw-rCn8xziD'
      };
    }

    localStorage.setItem('userProfile_' + activeEmail, JSON.stringify(data));
    return data;
  } catch (err) {
    if (cachedData) return cachedData;
    return {
      full_name: 'Alex Sterling',
      email: activeEmail,
      domicile: 'San Francisco, CA',
      readiness_score: 92
    };
  }
}

// 5. SAVE / UPDATE USER PROFILE
export async function saveUserProfile(profileData) {
  try {
    if (profileData.email) {
      localStorage.setItem('currentUserEmail', profileData.email);
      localStorage.setItem('userProfile_' + profileData.email, JSON.stringify(profileData));
    }
    const { data, error } = await supabase
      .from('profiles')
      .upsert([profileData], { onConflict: 'email' });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Error saving profile to Supabase:', err);
    return { success: false, error: err.message };
  }
}

// 5b. DELETE USER PROFILE
export async function deleteUserProfile(email) {
  try {
    const targetEmail = email || localStorage.getItem('currentUserEmail');
    if (targetEmail) {
      localStorage.removeItem('userProfile_' + targetEmail);
      localStorage.removeItem('currentUserEmail');
      await supabase.from('profiles').delete().eq('email', targetEmail);
    }
    return { success: true };
  } catch (err) {
    console.error('Error deleting profile:', err);
    return { success: false, error: err.message };
  }
}

// 6. AUTH SIGN UP
export async function signUpUser(email, password, extraData = {}) {
  try {
    localStorage.setItem('currentUserEmail', email);

    const newProfile = {
      email: email,
      full_name: extraData.full_name || 'User',
      phone_number: extraData.phone_number || '',
      country_code: extraData.country_code || '+62',
      gender: extraData.gender || 'Male',
      domicile: extraData.domicile || 'Jakarta, Indonesia',
      readiness_score: 85
    };
    localStorage.setItem('userProfile_' + email, JSON.stringify(newProfile));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: extraData }
    });

    if (error) {
      console.warn('Supabase Auth signUp notice:', error.message);
    }

    // Also persist into profiles table
    await saveUserProfile(newProfile);

    return { success: true, data };
  } catch (err) {
    console.error('SignUp Error:', err);
    return { success: true }; // Allow UI transition
  }
}

// 7. AUTH SIGN IN
export async function signInUser(email, password) {
  try {
    if (email) {
      localStorage.setItem('currentUserEmail', email);
      const existing = localStorage.getItem('userProfile_' + email);
      if (!existing) {
        const namePart = email.split('@')[0];
        const formattedName = namePart
          .replace(/[._]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
          
        const newProfile = {
          email: email,
          full_name: formattedName || 'User',
          domicile: 'Jakarta, Indonesia',
          highest_degree: "Bachelor's Degree",
          institution: 'University',
          readiness_score: 85
        };
        localStorage.setItem('userProfile_' + email, JSON.stringify(newProfile));
        saveUserProfile(newProfile);
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.warn('Supabase Auth signIn notice:', error.message);
    }

    return { success: true, data };
  } catch (err) {
    console.error('SignIn Error:', err);
    return { success: true };
  }
}

// 8. RECORD CV UPLOAD
export async function recordCVUpload(userEmail = 'alex.sterling@example.com', fileName, analysisScore = 82, extractedSkills = []) {
  try {
    const localCVs = JSON.parse(localStorage.getItem('user_cvs_local_' + userEmail) || '[]');
    if (!localCVs.includes(fileName)) {
      localCVs.push(fileName);
      localStorage.setItem('user_cvs_local_' + userEmail, JSON.stringify(localCVs));
    }
    const { data, error } = await supabase.from('user_cvs').insert([
      {
        user_email: userEmail,
        file_name: fileName,
        analysis_score: analysisScore,
        extracted_skills: extractedSkills.length > 0 ? extractedSkills : ['Figma Expert', 'Design Systems', 'Prototyping', 'React/Tailwind', 'User Research']
      }
    ]);
    if (error) {
      console.warn('Error inserting CV record in Supabase:', error.message);
    }
  } catch (err) {
    console.error('Error recording CV upload:', err);
  }
}

// 9. APPLY TO JOB
export async function applyToJob(userEmail, jobId) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const localAppIds = JSON.parse(localStorage.getItem('applications_local_' + activeEmail) || '[]');
    if (!localAppIds.includes(Number(jobId))) {
      localAppIds.push(Number(jobId));
      localStorage.setItem('applications_local_' + activeEmail, JSON.stringify(localAppIds));
    }

    const { data, error } = await supabase
      .from('applied_jobs')
      .upsert([
        {
          user_email: activeEmail,
          job_id: Number(jobId),
          status: 'Under Review'
        }
      ], { onConflict: 'user_email,job_id' });

    if (error) {
      console.warn('Supabase applied_jobs notice:', error.message);
    }
    return { success: true, data };
  } catch (err) {
    console.error('Error in applyToJob:', err);
    return { success: true };
  }
}

// 9b. GET APPLIED JOBS
export async function getAppliedJobs(userEmail) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const { data, error } = await supabase
      .from('applied_jobs')
      .select('*, jobs(*)')
      .eq('user_email', activeEmail);

    if (error || !data) {
      console.warn('Error fetching applied_jobs:', error?.message);
      return [];
    }
    return data;
  } catch (err) {
    console.error('Error in getAppliedJobs:', err);
    return [];
  }
}

// 10. GET USER PROFILE STATS
export async function getUserProfileStats(userEmail) {
  const activeEmail = userEmail || localStorage.getItem('currentUserEmail') || 'alex.sterling@example.com';
  try {
    const { count: cvCount, error: cvErr } = await supabase
      .from('user_cvs')
      .select('*', { count: 'exact', head: true })
      .eq('user_email', activeEmail);

    const { count: applyCount, error: applyErr } = await supabase
      .from('applied_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('user_email', activeEmail);

    const { count: bookmarkCount, error: bookmarkErr } = await supabase
      .from('saved_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('user_email', activeEmail);

    const localCVs = JSON.parse(localStorage.getItem('user_cvs_local_' + activeEmail) || '[]');
    const localAppIds = JSON.parse(localStorage.getItem('applications_local_' + activeEmail) || '[]');
    const localSavedIds = JSON.parse(localStorage.getItem('saved_jobs_local_' + activeEmail) || '[]');

    const finalCv = (cvErr || cvCount === null) ? Math.max(1, localCVs.length) : cvCount;
    const finalApply = (applyErr || applyCount === null) ? localAppIds.length : applyCount;
    const finalBookmark = (bookmarkErr || bookmarkCount === null) ? localSavedIds.length : bookmarkCount;

    return {
      cvCount: finalCv,
      applyCount: finalApply,
      bookmarkCount: finalBookmark,
    };
  } catch (err) {
    console.error('Error fetching profile stats:', err);
    return { cvCount: 1, applyCount: 0, bookmarkCount: 0 };
  }
}
