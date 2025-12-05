export type TaskType = {
    _id: string;
    title: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
};