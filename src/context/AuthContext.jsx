import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // use expensive computation
    return {
      token_type: "refresh",
      exp: 1675724877,
      iat: 1673132877,
      jti: "9494ab89dab74a6f9c42366cf16d1bf9",
      user_id: 132,
      username: "user",
    };
  });

  const [token, setToken] = useState(() => {
    // use expensive computation
    return {
      refresh: "",
      access: "",
    };
  });

  const [loading, setLoading] = useState(true);
  const [remember, setRemember] = useState(true);
  const [badge, setBadge] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const loginUser = (event) => {
    const response = {
      token_type: "refresh",
      exp: 1675724877,
      iat: 1673132877,
      jti: "9494ab89dab74a6f9c42366cf16d1bf9",
      user_id: 1,
      username: "user",
    };
    setRemember(event.target.remember.checked);
    setToken({
      refresh: "",
      access: "",
    });
    setUser(response);
    event.target.remember.checked
      ? localStorage.setItem("authTokens", JSON.stringify(response))
      : sessionStorage.setItem("authTokens", JSON.stringify(response));
    navigate("/projects");
  };

  const updateToken = (event) => {
    const response = {
      refresh: "",
      access: "",
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
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    navigate("/signin");
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

  const addProject = (newProject) => {
    const newProjects = projects.concat(newProject);
    setProjects(newProjects);
  };

  const updateProject = (id, { name, description, slug }) => {
    const updatedProjects = projects.slice();
    const index = updatedProjects.findIndex((p) => p.id === id);
    const existingProject = projects.find((p) => p.id === id);
    existingProject.name = name;
    existingProject.description = description;
    existingProject.slug = slug;
    updatedProjects[index] = existingProject;
    setProjects(updatedProjects);
  };

  const removeProject = (projectId) => {
    const updatedProjects = projects.slice();
    const index = updatedProjects.findIndex(
      (project) => project.id === projectId
    );
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
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
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
