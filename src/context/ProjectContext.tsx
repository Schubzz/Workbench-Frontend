import {createContext, useEffect, useState} from 'react';
import Project from "../interfaces/ProjectInterface.tsx";
import useAxios from "../hooks/useAxios.tsx";


export const ProjectContext = createContext({
    projects: [] as Project[],
    getProjects: () => {
    },
    addProject: (project : Project) => {
    },
    editProject: (project : Project) => {
    },
    deleteProject: async (projectId : string) => {
    },
});

export const ProjectProvider = ({children}: { children: any }) => {

    const http = useAxios();
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjects = async () => {
        try {
            const response = await http.get('/api/projects');
            setProjects(response.data.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    function addProject(project: Project) {
        setProjects([...projects, project])
    }

    function editProject(updatedProject: Project) {
        const updatedProjects = projects.map(project => (project.id === updatedProject.id ? updatedProject : project));
        setProjects(updatedProjects);
    }

    const deleteProject = async (projectId : string) => {
        try {
            await http.delete(`/api/projects/${projectId}`);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Fehler beim Löschen des Tasks:', error);
        }
    };


    useEffect(() => {
        getProjects()
    }, [])


    return (
        <ProjectContext.Provider value={{projects, getProjects, addProject, editProject, deleteProject}}>
            {children}
        </ProjectContext.Provider>
    );
};
