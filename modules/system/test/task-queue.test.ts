import { test, expect, beforeEach } from 'vitest';
import taskQueue from '../src/lib/task-queue';
import { ITask } from '../src/types/i-task';

beforeEach(() => {
    taskQueue.clear();
});

test('if queue is empty -> length is 0', () => {
    expect(taskQueue.length()).toBe(0);
});

test('if queue is empty -> dequeue return falsy', () => {
    expect(taskQueue.dequeue()).toBeFalsy;
});

test('queue has some items -> length is ok', () => {
    expect(taskQueue.length()).toBe(0);

    const task : ITask = {
        action: 'action1',
        payload: {}
    }

    taskQueue.enqueue(task);
    expect(taskQueue.length()).toBe(1);


    taskQueue.enqueue(task);
    expect(taskQueue.length()).toBe(2);
});

test('queue not empty -> dequeue return correct task', () => {
    expect(taskQueue.length()).toBe(0);

    const task1 : ITask = {
        action: 'action1',
        payload: {}
    }

    const task2 : ITask = {
        action: 'action2',
        payload: {}
    }

    taskQueue.enqueue(task1);
    taskQueue.enqueue(task2);
    expect(taskQueue.length()).toBe(2);
});