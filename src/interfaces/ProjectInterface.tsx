export default interface Project {
    id: number;
    user_id: number;
    attributes: {
        title: string;
        priority: string;
        status: string;
        description: string;
        created_at: string;
        updated_at: string;
    };

    map(element: (project: Project) => JSX.Element): any;
}