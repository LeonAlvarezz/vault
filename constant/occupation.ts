export const OCCUPATION = [
  {
    label: "Software Engineer",
    value: "software_engineer",
  },
  {
    label: "Data Scientist",
    value: "data_scientist",
  },
  {
    label: "Cloud Architect",
    value: "cloud_architect",
  },
  {
    label: "DevOps Engineer",
    value: "devops_engineer",
  },
  {
    label: "UI/UX Designer",
    value: "ui_ux_designer",
  },
  {
    label: "Cybersecurity Analyst",
    value: "cybersecurity_analyst",
  },
  {
    label: "Machine Learning Engineer",
    value: "machine_learning_engineer",
  },
  {
    label: "Full Stack Developer",
    value: "full_stack_developer",
  },
  {
    label: "Backend Developer",
    value: "backend_developer",
  },
  {
    label: "Frontend Developer",
    value: "frontend_developer",
  },
  {
    label: "Mobile App Developer",
    value: "mobile_app_developer",
  },
  {
    label: "Database Administrator",
    value: "database_administrator",
  },
  {
    label: "Systems Analyst",
    value: "systems_analyst",
  },
  {
    label: "Network Engineer",
    value: "network_engineer",
  },
  {
    label: "AI Research Scientist",
    value: "ai_research_scientist",
  },
  {
    label: "Blockchain Developer",
    value: "blockchain_developer",
  },
  {
    label: "IT Project Manager",
    value: "it_project_manager",
  },
  {
    label: "Quality Assurance Engineer",
    value: "quality_assurance_engineer",
  },
  {
    label: "Technical Writer",
    value: "technical_writer",
  },
  {
    label: "Information Security Manager",
    value: "information_security_manager",
  },
  {
    label: "Business Intelligence Analyst",
    value: "business_intelligence_analyst",
  },
  {
    label: "Game Developer",
    value: "game_developer",
  },
  {
    label: "IoT Solutions Architect",
    value: "iot_solutions_architect",
  },
  {
    label: "AR/VR Developer",
    value: "ar_vr_developer",
  },
  {
    label: "Quantum Computing Researcher",
    value: "quantum_computing_researcher",
  },
  {
    label: "Robotics Engineer",
    value: "robotics_engineer",
  },
  {
    label: "Site Reliability Engineer",
    value: "site_reliability_engineer",
  },
  {
    label: "Data Engineer",
    value: "data_engineer",
  },
  {
    label: "Bioinformatics Specialist",
    value: "bioinformatics_specialist",
  },
  {
    label: "Embedded Systems Engineer",
    value: "embedded_systems_engineer",
  },
];

export const getOccupationLabel = (value: string): string => {
  const occupation = OCCUPATION.find((occ) => occ.value === value);
  return occupation ? occupation.label : "Unknown Occupation";
};
