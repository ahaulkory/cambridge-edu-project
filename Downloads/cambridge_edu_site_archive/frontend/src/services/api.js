import axios from 'axios';

// Créer une instance axios avec l'URL de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion si le token est invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  // Inscription d'un nouvel utilisateur
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Connexion d'un utilisateur
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Obtenir l'utilisateur connecté
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est un administrateur
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'admin';
  },

  // Obtenir les informations de l'utilisateur connecté depuis le serveur
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  }
};

// Services pour les cours
export const courseService = {
  // Obtenir tous les cours
  getCourses: async () => {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Obtenir un cours par son slug
  getCourse: async (slug) => {
    try {
      const response = await api.get(`/courses/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Créer un nouveau cours (admin)
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Mettre à jour un cours (admin)
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Supprimer un cours (admin)
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // S'inscrire à un cours
  enrollCourse: async (id) => {
    try {
      const response = await api.post(`/courses/${id}/enroll`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  }
};

// Services pour les modules
export const moduleService = {
  // Obtenir tous les modules d'un cours
  getModules: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/modules`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Obtenir un module spécifique
  getModule: async (id) => {
    try {
      const response = await api.get(`/modules/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Créer un nouveau module (admin)
  createModule: async (courseId, moduleData) => {
    try {
      const response = await api.post(`/courses/${courseId}/modules`, moduleData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Mettre à jour un module (admin)
  updateModule: async (id, moduleData) => {
    try {
      const response = await api.put(`/modules/${id}`, moduleData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Supprimer un module (admin)
  deleteModule: async (id) => {
    try {
      const response = await api.delete(`/modules/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Mettre à jour la progression d'un utilisateur dans un module
  updateProgress: async (id, progressData) => {
    try {
      const response = await api.put(`/modules/${id}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  }
};

// Services pour les ressources
export const resourceService = {
  // Obtenir toutes les ressources d'un cours
  getResources: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/resources`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Obtenir une ressource spécifique
  getResource: async (id) => {
    try {
      const response = await api.get(`/resources/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Télécharger une ressource
  uploadResource: async (courseId, formData) => {
    try {
      const response = await api.post(`/courses/${courseId}/resources`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Supprimer une ressource (admin)
  deleteResource: async (id) => {
    try {
      const response = await api.delete(`/resources/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { success: false, message: 'Erreur de connexion au serveur' };
    }
  },

  // Obtenir l'URL de téléchargement d'une ressource
  getDownloadUrl: (id) => {
    return `${api.defaults.baseURL}/resources/${id}/download`;
  }
};

export default api;
