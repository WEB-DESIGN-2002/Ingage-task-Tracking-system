export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'In Progress' | 'Planned' | 'Completed' | 'On Hold';
  priority: 'High' | 'Medium' | 'Low';
  startDate: string;
  deadline: string;
  manager: {
    name: string;
    role: string;
    avatar: string;
  };
  progress: number;
  modulesCount: number;
  assignedCount: number;
}

export interface DailyLog {
  id: string;
  employee: {
    name: string;
    role: string;
    avatar: string;
    initials: string;
    color: string;
  };
  project: {
    name: string;
    code: string;
  };
  date: string;
  hours: number;
  taskTitle: string;
  taskDescription: string;
  status: 'Completed' | 'In Progress' | 'Blocked';
  priority: 'High' | 'Medium' | 'Low';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Employee' | 'Manager / Team Lead' | 'System Administrator';
  specialization: string;
  department: string;
  loadPercentage: number;
  activeProjects: number;
  avatar: string;
  status: 'Active' | 'Invited' | 'On Leave';
  employeeId: string;
  joinedDate: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-2025-01',
    code: 'PRJ-2025-01',
    name: 'Learning Management System',
    description: 'Enterprise education and corporate onboarding portal with assessment modules.',
    status: 'In Progress',
    priority: 'High',
    startDate: '2025-05-01',
    deadline: '2025-06-15',
    manager: {
      name: 'Priya Singh',
      role: 'Lead Project Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    progress: 75,
    modulesCount: 9,
    assignedCount: 6,
  },
  {
    id: 'PRJ-2025-04',
    code: 'PRJ-2025-04',
    name: 'CRM Portal',
    description: 'High-volume lead ingestion pipeline, customer account synchronization, and sales analytics.',
    status: 'In Progress',
    priority: 'Medium',
    startDate: '2025-05-10',
    deadline: '2025-06-20',
    manager: {
      name: 'Rahul Sharma',
      role: 'Technical Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    progress: 45,
    modulesCount: 6,
    assignedCount: 5,
  },
  {
    id: 'PRJ-2025-08',
    code: 'PRJ-2025-08',
    name: 'Employee Management System',
    description: 'Centralized payroll disbursement, leave tracking, and compliance directory.',
    status: 'Planned',
    priority: 'Low',
    startDate: '2025-06-01',
    deadline: '2025-07-15',
    manager: {
      name: 'Sneha Patel',
      role: 'Engineering Manager',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    progress: 30,
    modulesCount: 8,
    assignedCount: 4,
  },
  {
    id: 'PRJ-2025-02',
    code: 'PRJ-2025-02',
    name: 'Mobile App Redesign',
    description: 'React Native v3.0 release with real-time push sync and offline caching.',
    status: 'Completed',
    priority: 'Medium',
    startDate: '2025-04-01',
    deadline: '2025-05-10',
    manager: {
      name: 'Amit Kumar',
      role: 'Mobile Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    progress: 100,
    modulesCount: 5,
    assignedCount: 4,
  },
];

export const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@company.com',
    role: 'Employee',
    specialization: 'Senior React / Next.js Specialist',
    department: 'Frontend Engineering',
    loadPercentage: 60,
    activeProjects: 1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'EMP-2025-041',
    joinedDate: '2024-03-15',
  },
  {
    id: 'usr-2',
    name: 'Sneha Patel',
    email: 'sneha.patel@company.com',
    role: 'Employee',
    specialization: 'PostgreSQL & Distributed APIs',
    department: 'Backend & Cloud Platform',
    loadPercentage: 40,
    activeProjects: 1,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'EMP-2025-082',
    joinedDate: '2024-05-20',
  },
  {
    id: 'usr-3',
    name: 'Amit Kumar',
    email: 'amit.kumar@company.com',
    role: 'Employee',
    specialization: 'Cypress, Playwright & Load Testing',
    department: 'QA & Automation',
    loadPercentage: 85,
    activeProjects: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'EMP-2025-104',
    joinedDate: '2023-11-10',
  },
  {
    id: 'usr-4',
    name: 'Maya Chen',
    email: 'maya.chen@company.com',
    role: 'Employee',
    specialization: 'Design Systems & UX Research',
    department: 'Product Design',
    loadPercentage: 30,
    activeProjects: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'EMP-2025-118',
    joinedDate: '2024-08-01',
  },
  {
    id: 'usr-5',
    name: 'Vikram Sengupta',
    email: 'vikram.s@company.com',
    role: 'Employee',
    specialization: 'Go, Kubernetes & Kafka pipelines',
    department: 'DevOps & Infrastructure',
    loadPercentage: 50,
    activeProjects: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'EMP-2025-095',
    joinedDate: '2024-01-12',
  },
  {
    id: 'usr-6',
    name: 'Priya Singh',
    email: 'priya.singh@company.com',
    role: 'Manager / Team Lead',
    specialization: 'Lead Project Specialist & Agile Delivery',
    department: 'Product Management',
    loadPercentage: 75,
    activeProjects: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    status: 'Active',
    employeeId: 'MGR-2024-012',
    joinedDate: '2023-02-15',
  },
];

export const INITIAL_TEAM_MEMBERS = INITIAL_MEMBERS;

export const INITIAL_DAILY_LOGS: DailyLog[] = [
  {
    id: 'log-01',
    employee: {
      name: 'Rahul Sharma',
      role: 'Senior Frontend Eng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      initials: 'RS',
      color: 'bg-blue-600',
    },
    project: {
      name: 'LMS Portal',
      code: 'PRJ-2025-01',
    },
    date: 'Jun 10, 2025',
    hours: 8.5,
    taskTitle: 'Login UI & Form Validation',
    taskDescription: 'Zod schemas + OAuth 2.0 PKCE client flow',
    status: 'Completed',
    priority: 'High',
  },
  {
    id: 'log-02',
    employee: {
      name: 'Sneha Patel',
      role: 'Backend Architect',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      initials: 'SP',
      color: 'bg-purple-600',
    },
    project: {
      name: 'CRM Portal',
      code: 'PRJ-2025-04',
    },
    date: 'Jun 10, 2025',
    hours: 7.0,
    taskTitle: 'API Rate Limiting Middleware',
    taskDescription: 'Redis token bucket alg with 10k req burst',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 'log-03',
    employee: {
      name: 'Amit Kumar',
      role: 'QA & Automation Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      initials: 'AK',
      color: 'bg-amber-600',
    },
    project: {
      name: 'EMS Suite',
      code: 'PRJ-2025-07',
    },
    date: 'Jun 09, 2025',
    hours: 6.5,
    taskTitle: 'End-to-End Cypress Suite',
    taskDescription: 'Payroll disbursement edge cases',
    status: 'Blocked',
    priority: 'High',
  },
  {
    id: 'log-04',
    employee: {
      name: 'Vikram Sengupta',
      role: 'DevOps Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      initials: 'VS',
      color: 'bg-emerald-600',
    },
    project: {
      name: 'CRM Portal',
      code: 'PRJ-2025-04',
    },
    date: 'Jun 09, 2025',
    hours: 8.0,
    taskTitle: 'Kubernetes Ingress Helm Chart',
    taskDescription: 'TLS certificate cert-manager automated renewal',
    status: 'Completed',
    priority: 'Medium',
  },
  {
    id: 'log-05',
    employee: {
      name: 'Maya Chen',
      role: 'Lead UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      initials: 'MC',
      color: 'bg-rose-600',
    },
    project: {
      name: 'Mobile App',
      code: 'PRJ-2025-09',
    },
    date: 'Jun 08, 2025',
    hours: 8.0,
    taskTitle: 'Design System Token Audit',
    taskDescription: 'Figma variables to Tailwind schema synchronization',
    status: 'In Progress',
    priority: 'Low',
  },
  {
    id: 'log-06',
    employee: {
      name: 'Sneha Patel',
      role: 'Backend Architect',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      initials: 'SP',
      color: 'bg-purple-600',
    },
    project: {
      name: 'LMS Portal',
      code: 'PRJ-2025-01',
    },
    date: 'Jun 07, 2025',
    hours: 9.0,
    taskTitle: 'Database Partitioning & Index',
    taskDescription: 'PostgreSQL migration scripts for student quiz logs',
    status: 'Completed',
    priority: 'Medium',
  },
];
