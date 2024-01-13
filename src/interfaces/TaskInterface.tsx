export default interface Task {
    id: number;
    attributes: {
        title: string;
        priority: string;
        status: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
}