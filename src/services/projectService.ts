import api from './api';

export interface Project {
  id?: number;
  title: string;
  description: string;
  client: string;
  category: string;
  year: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const projectService = {
  // Get all projects
  getAllProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get project by ID
  getProjectById: async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Get projects by category
  getProjectsByCategory: async (category: string): Promise<Project[]> => {
    const response = await api.get(`/projects/category/${category}`);
    return response.data;
  },

  // Get projects by year
  getProjectsByYear: async (year: string): Promise<Project[]> => {
    const response = await api.get(`/projects/year/${year}`);
    return response.data;
  },

  // Create project (ADMIN only)
  createProject: async (project: Project): Promise<Project> => {
    const response = await api.post('/projects', project);
    return response.data;
  },

  // Update project (ADMIN only)
  updateProject: async (id: number, project: Project): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },

  // Delete project (ADMIN only)
  deleteProject: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};