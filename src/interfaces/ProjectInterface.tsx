export default interface Project {
    id: string;
    user_id: string;
    attributes: {
        title: string;
        priority: string;
        status: string;
        description?: string;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        tasks: {
            data: {
                id: string;
                type: string;
            }[];
        };
    };
}