export default interface Task {
    "id": string,
    "attributes": {
        "title": string,
        "description": string,
        "priority": string,
        "status": string,
        "created_at": string,
        "updated_at":  string
    },
    "relationships": {
        "user": {
            "id": string,
            "username": string,
            "email": string,
        },
        "project": {
            "id": string,
            "title": string,
            "description":  string,
            "priority": string,
            "status": string,
            "created_at": string,
            "updated_at": string
        }
    }
}