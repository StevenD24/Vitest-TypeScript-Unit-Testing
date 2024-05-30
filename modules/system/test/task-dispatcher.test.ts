import { test, expect } from "vitest";
import { DispatchedFunction } from "../src/types/dispatched-function";
import { Action, ITask } from "../src/types/i-task";
import TaskDispatcher from "../src/lib/task-dispatcher";

test('map empty -> dispatch throw', () => {
    const map: Map<Action, DispatchedFunction> = new Map();
    const oTaskDispatcher = new TaskDispatcher(map);
    const task1 : ITask = {
        action: "action1",
        payload: {}
    }
    expect(() => oTaskDispatcher.dispatch(task1)).toThrowError();
});