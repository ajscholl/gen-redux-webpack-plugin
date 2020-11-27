import { Todo } from "./types";

export default function sortTodos(todos: Todo[]): Todo[] {
    return todos.sort((a, b): -1 | 0 | 1 => {
        if (a.task < b.task) {
            return -1;
        }
        if (a.task > b.task) {
            return 1;
        }
        return 0;
    });
}
