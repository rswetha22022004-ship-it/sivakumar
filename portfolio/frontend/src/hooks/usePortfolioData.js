import { useEffect, useState } from 'react';
import {
  getProfile,
  getExperience,
  getSkills,
  getProjects,
  getEducation,
} from '../services/api';

// Local project images
import skillmaxImage from '../assets/skillmax.jpeg';
import exchangeImage from '../assets/exchange.ai.jpeg';

const FALLBACK = {
  profile: {
    full_name: 'P. Sivakumar',
    title_primary: 'MERN Stack Developer',
    title_secondary: 'Full Stack Developer',
    tagline:
      'Building modern, scalable and user-focused web applications using the MERN stack, React and modern backend technologies.',
    about_text:
      'Passionate MERN Stack Developer with 2+ years of experience turning ideas and business requirements into responsive, scalable web applications. Experienced in React.js, Node.js, Express.js, and MongoDB, with a strong focus on clean code, API development, performance, and user experience. Brings a practical problem-solving mindset and the ability to work effectively across the full development lifecycle.',
    current_company: 'Crystal Delta',
    location: 'Aruppukottai, Tamil Nadu, India',
    email: 'sivap4817@gmail.com',
    phone: '8489291300',
    profile_image: null,
    social_links: [
      {
        id: 1,
        platform: 'linkedin',
        url: 'https://www.linkedin.com/',
      },
      {
        id: 2,
        platform: 'github',
        url: 'https://github.com/',
      },
    ],
  },

  experience: [
    {
      id: 1,
      company: 'Crystal Delta',
      designation: 'Software Developer',
      location: 'Aruppukottai, Tamil Nadu',
      start_date: '',
      end_date: 'Present',
      is_current: true,
      responsibilities: [
        'Developing modern web applications',
        'Building reusable React components',
        'Developing REST APIs',
        'Working with Node.js and Express.js',
        'MongoDB database integration',
        'Frontend and backend integration',
        'Authentication and authorization',
        'API testing and debugging',
        'Responsive UI development',
        'Database management',
      ],
    },
  ],

  skills: [
    {
      id: 1,
      name: 'MERN Stack',
      skills: [
        { id: 1, name: 'MongoDB', is_primary_stack: true },
        { id: 2, name: 'Express.js', is_primary_stack: true },
        { id: 3, name: 'React.js', is_primary_stack: true },
        { id: 4, name: 'Node.js', is_primary_stack: true },
      ],
    },

    {
      id: 2,
      name: 'Frontend',
      skills: [
        { id: 5, name: 'React.js', is_primary_stack: true },
        { id: 6, name: 'JavaScript' },
        { id: 7, name: 'HTML5' },
        { id: 8, name: 'CSS3' },
        { id: 9, name: 'Tailwind CSS' },
        { id: 10, name: 'Responsive Web Design' },
      ],
    },

    {
      id: 3,
      name: 'Backend',
      skills: [
        { id: 11, name: 'Node.js', is_primary_stack: true },
        { id: 12, name: 'Express.js', is_primary_stack: true },
        { id: 13, name: 'Django' },
        { id: 14, name: 'Django REST Framework' },
        { id: 15, name: 'Python' },
        { id: 16, name: 'REST APIs' },
        { id: 17, name:'Nest.js'},
        { id: 18, name:'Typescript'},
      ],
    },

    {
      id: 4,
      name: 'Database',
      skills: [
        { id: 17, name: 'MongoDB', is_primary_stack: true },
        { id: 18, name: 'MySQL' },
        { id: 19, name: 'SQL' },
      ],
    },

    {
      id: 5,
      name: 'Tools',
      skills: [
        { id: 20, name: 'Git' },
        { id: 21, name: 'GitHub' },
        { id: 22, name: 'Postman' },
        { id: 23, name: 'VS Code' },
        { id: 24, name: 'npm' },
        { id:  25, name:'Swagger'},
      ],
    },

    {
      id: 6,
      name: 'Other',
      skills: [
        { id: 25, name: 'API Integration' },
        { id: 26, name: 'Authentication' },
        { id: 27, name: 'JWT' },
        { id: 28, name: 'CRUD Applications' },
        { id: 29, name: 'Database Integration' },
        { id: 30, name: 'Debugging' },
        { id: 31, name: 'AWS' },
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: 'SkillsMax.AI',
      slug: 'skillsmax-ai',
      short_description:
        'AI-powered assessment and interview platform designed to support technical interviews, coding assessments, communication assessments, aptitude and recruitment workflows.',
      live_url: 'https://skillsmax.ai/',
      github_url: '',
      image: skillmaxImage,
      technologies: [],
    },

    {
      id: 2,
      title: 'SkillsMax Exchange',
      slug: 'skillsmax-exchange',
      short_description:
        'A web application within the SkillsMax ecosystem.',
      live_url: 'https://exchange.skillsmax.ai/',
      github_url: '',
      image: exchangeImage,
      technologies: [],
    },
  ],

  education: [
    {
      id: 1,
      degree: 'Master of Computer Applications',
      institution:
        'Rathinavel Subramaniyam College of Arts and Science-Coimbatore',
      year: '2021-2023',
      description: 'CGPA: 76%',
    },

    {
      id: 2,
      degree: 'Bachelor of Computer Science',
      institution: 'Bharathiar University-Coimbatore',
      year: '2018-2021',
      description: 'CGPA: 68%',
    },
  ],
};

export default function usePortfolioData() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadPortfolioData = async () => {
      try {
        const [
          profile,
          experience,
          skills,
          projects,
          education,
        ] = await Promise.all([
          getProfile(),
          getExperience(),
          getSkills(),
          getProjects(),
          getEducation(),
        ]);

        if (mounted) {
          /*
           * Keep the backend project data,
           * but force the correct local images.
           */
          const projectsWithImages = projects.map((project) => {
            if (project.slug === 'skillsmax-ai') {
              return {
                ...project,
                image: skillmaxImage,
              };
            }

            if (project.slug === 'skillsmax-exchange') {
              return {
                ...project,
                image: exchangeImage,
              };
            }

            return project;
          });

          setData({
            profile,
            experience,
            skills,
            projects: projectsWithImages,
            education,
          });
        }
      } catch (error) {
        console.error('Failed to load portfolio data:', error);

        if (mounted) {
          setUsingFallback(true);

          /*
           * FALLBACK already contains the correct
           * local project images.
           */
          setData(FALLBACK);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPortfolioData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    ...data,
    loading,
    usingFallback,
  };
}