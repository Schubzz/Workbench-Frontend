import {createContext, useEffect, useState} from 'react';
import Project from "../interfaces/ProjectInterface.tsx";
import useAxios from "../hooks/useAxios.tsx";



export const ProjectContext = createContext({
    projects: [] as Project[],
    getProjects : () => {},
});

export const ProjectProvider = ({ children } : { children: any}) => {

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




    useEffect(() => {
        getProjects()
    }, [])


    return (
        <ProjectContext.Provider value={{ projects, getProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};
