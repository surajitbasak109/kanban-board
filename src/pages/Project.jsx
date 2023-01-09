import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";
import ProjectHeader from "../components/ProjectHeader";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import notFound from "../static/404.svg";

const Project = () => {
  const { projects } = useContext(AuthContext);
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const { slug } = useParams();

  const loadProject = (slug) => {
    setLoading(true);
    const project = projects.find((p) => p.slug === slug);
    setProject(project);
    setLoading(false);
  };

  useEffect(() => {
    loadProject(slug);
  }, [slug]);

  return (
    <>
      {open && (
        <ProjectForm
          close={() => setOpen(false)}
          projectName={project.name}
          projectDescription={project.description}
          id={project.id}
        />
      )}
      {sidebar && <Sidebar sidebar={() => setSidebar(false)} />}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-gray-900 overflow-y-auto home">
        <Navbar sidebar={() => setSidebar(true)} />
        <div className="grow flex flex-col w-full items-center">
          {project ? (
            <>
              <ProjectHeader data={project} open={() => setOpen(true)} />
              <Board project={project} />
            </>
          ) : (
            <div className="grow grid items-center justify-center py-10">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <h1 className="text-center text-xl md:text-4xl font-semibold text-notFound">
                    Project{" "}
                    <span className="text-gray-900 dark:text-white">
                      not found!
                    </span>
                  </h1>
                  <img
                    src={notFound}
                    alt="not found"
                    className="h-96 w-auto spin"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
