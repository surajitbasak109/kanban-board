import { nanoid } from 'nanoid';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../support/Text';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // use expensive computation
    return {
      token_type: 'refresh',
      exp: 1675724877,
      iat: 1673132877,
      jti: '9494ab89dab74a6f9c42366cf16d1bf9',
      user_id: 132,
      username: 'user',
    };
  });

  const [token, setToken] = useState(() => {
    // use expensive computation
    return {
      refresh: '',
      access: '',
    };
  });

  const [loading, setLoading] = useState(true);
  const [remember, setRemember] = useState(true);
  const [badge, setBadge] = useState(false);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const loginUser = event => {
    const response = {
      token_type: 'refresh',
      exp: 1675724877,
      iat: 1673132877,
      jti: '9494ab89dab74a6f9c42366cf16d1bf9',
      user_id: 1,
      username: 'user',
    };
    setRemember(event.target.remember.checked);
    setToken({
      refresh: '',
      access: '',
    });
    setUser(response);
    event.target.remember.checked
      ? localStorage.setItem('authTokens', JSON.stringify(response))
      : sessionStorage.setItem(
          'authTokens',
          JSON.stringify(response)
        );
    navigate('/projects');
  };

  const updateToken = event => {
    const response = {
      refresh: '',
      access: '',
    };
    if (loading) setLoading(false);
    else if (token) {
      setToken(response);
    } else {
      logoutUser();
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    sessionStorage.removeItem('authTokens');
    navigate('/signin');
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let interval = setInterval(() => {
      if (token) {
        updateToken(token);
      }
    }, 1000 * 60 * 59 * 4);

    return () => clearInterval(interval);
  }, [loading, token]);

  useEffect(() => {
    setTimeout(() => {
      setBadge(false);
      setTitle('');
      setMessage('');
      setType('');
    }, 3000);
  }, [badge]);

  const addProject = newProject => {
    newProject = {
      ...newProject,
      slug: slugify(newProject.name),
      created: new Date().toISOString(),
      id: nanoid(),
    };
    const newProjects = projects.concat(newProject);
    setProjects(newProjects);
    return newProject;
  };

  const addTask = newTask => {
    const isoDate = new Date().toISOString();
    const newTasks = tasks.concat({
      ...newTask,
      created: isoDate,
      updated: isoDate,
      id: nanoid(),
    });
    setTasks(newTasks);
  };

  const updateProject = (id, { name, description }) => {
    const slug = slugify(name);
    const updatedProjects = projects.slice();
    const index = updatedProjects.findIndex(p => p.id === id);
    const existingProject = {
      ...projects.find(p => p.id === id),
      name,
      description,
      slug,
    };
    updatedProjects[index] = existingProject;

    setProjects(updatedProjects);

    return existingProject;
  };

  const updateTask = (id, { title, body }) => {
    const updated = new Date().toISOString();
    const updatedTasks = tasks.slice();
    const index = updatedTasks.findIndex(task => task.id === id);
    const existingTask = {
      ...tasks.find(task => task.id === id),
      title,
      body,
      updated,
    };
    updatedTasks[index] = existingTask;
    setTasks(updatedTasks);
  };

  const removeProject = projectId => {
    const updatedProjects = projects.slice();
    const index = updatedProjects.findIndex(
      project => project.id === projectId
    );
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const removeTask = taskId => {
    const updatedTasks = tasks.slice();
    const index = updatedTasks.findIndex(task => task.id === taskId);
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateLane = (taskId, { stage }) => {
    const updatedTasks = tasks.slice();
    const index = updatedTasks.findIndex(p => p.id === taskId);
    const existingTask = {
      ...tasks.find(p => p.id === taskId),
      stage,
    };
    updatedTasks[index] = existingTask;
    setTasks(updatedTasks);
  };

  const contextData = {
    loginUser,
    logoutUser,
    token,
    setToken,
    user,
    setUser,
    badge,
    setBadge,
    type,
    setType,
    message,
    setMessage,
    title,
    setTitle,
    projects,
    setProjects,
    tasks,
    setTasks,
    loading,
    remember: setRemember,
    addProject,
    removeProject,
    updateProject,
    addTask,
    updateTask,
    removeTask,
    updateLane,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
