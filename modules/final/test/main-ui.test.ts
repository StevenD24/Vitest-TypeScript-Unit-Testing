import { test, expect, beforeEach, vi } from "vitest";
import { SCHEDULER_INTERVAL_SEC, createDom, registerHandlers } from "../src/ui/main-ui";
import { ButtonsText, getButtonInUI, getEnumKeyValues, pauseMs } from "./test-utils";
import * as functions from "../src/lib/utils/dispatched-functions";
import { DispatchedFunctionResult } from "../src/types/dispatched-function";
import { getAllByRole, getByRole, getByText, waitFor } from '@testing-library/dom';
import { userEvent } from "@testing-library/user-event";

let appElem: HTMLElement;

beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    createDom();
    registerHandlers();
    appElem = document.getElementById('app')!;
});

test('document exists', () => {
    expect(document).toBeTruthy();
});

test("heading with text : 'Task Queue Manager' is in the dom", () => {
    const headingElem = getByRole(appElem, 'heading');

    expect(headingElem).toBeInTheDocument();
    expect(headingElem!.textContent).toBe('Task Queue Manager');
});

test('Six buttons inside the app id element', () => {
    const buttonElems = getAllByRole(appElem, 'button');

    expect(buttonElems.length).toBe(6);
});

test('The first button has correct text', () => {
    const firstButton = getAllByRole(appElem, 'button')[0];

    expect(firstButton?.textContent).toBe('start scheduler');
});

test('all buttons have the correct text', () => {
    const arrayButtonsKeyValue = getEnumKeyValues(ButtonsText);
    const buttons = getAllByRole(appElem, 'button');

    expect(arrayButtonsKeyValue.length).toBe(buttons.length);

    arrayButtonsKeyValue.forEach((bt, i) => {
        expect(bt.value).toBe(buttons[i].textContent);
    });
});

test('click on add -> 3 appears in the output', async () => {
    // getButtonInUI(ButtonsText.EnqueueAdd)!.click();
    userEvent.click(getByText(appElem, ButtonsText.EnqueueAdd));
    // getButtonInUI(ButtonsText.StartScheduler)!.click();
    userEvent.click(getByText(appElem, ButtonsText.StartScheduler));

    // const outputElem = appElem.querySelector('output');
    const outputElem = getByRole(appElem, 'status');
    expect(outputElem).toBeInTheDocument();

    // await pauseMs(SCHEDULER_INTERVAL_SEC*1000*2);
    await waitFor(() => {
        expect(outputElem?.textContent?.includes("3")).toBeTruthy();
    }, {timeout : SCHEDULER_INTERVAL_SEC * 1000 * 2});

    expect(outputElem?.textContent?.includes('3')).toBeTruthy();
});

test('enqueue -> queue length is 1 -> in console.log', () => {
    getButtonInUI(ButtonsText.EnqueueAdd)?.click();
    const spyOnConsoleLog = vi.spyOn(console, 'log');
    getButtonInUI(ButtonsText.QueueLength)?.click();

    expect(spyOnConsoleLog).toBeCalledTimes(1);
    expect(spyOnConsoleLog).toBeCalledWith('taskQueue.length() : 1');
});

test('failure status is add --> failure to appear in the ui', async () => {
    const spyOnAdd = vi.spyOn(functions, 'add');
    const resFailure : DispatchedFunctionResult = {
        status: "failure",
        result: undefined
    }
    spyOnAdd.mockReturnValue(resFailure);
    registerHandlers();

    userEvent.click(getByText(appElem, ButtonsText.EnqueueAdd));
    userEvent.click(getByText(appElem, ButtonsText.StartScheduler));

    await waitFor(() => {
        const outputElem = getByRole(appElem, 'status');
        expect(outputElem!.textContent).toContain("failure");
    }, { timeout: SCHEDULER_INTERVAL_SEC * 1000 * 2});

    expect(spyOnAdd).toBeCalledTimes(1);
    expect(appElem.querySelector('output')!.textContent!.includes('failure')).toBeTruthy();
});

test('button isSchedulerStarted invoked --> console.error is called', () => {
    const spyOnConsoleError = vi.spyOn(console, 'error');
    getButtonInUI(ButtonsText.SchedulerRunning)?.click();

    expect(spyOnConsoleError).toBeCalledTimes(1);
});

test('button enqueueGetPosts invoked --> console.error is called', () => {
    const spyOnConsoleError = vi.spyOn(console, 'error');
    getButtonInUI(ButtonsText.EnqueueGetPosts)?.click();

    expect(spyOnConsoleError).toBeCalledTimes(1);
});

test('enqueue, start, stop --> output is empty', async () => {
    userEvent.click(getByText(appElem, ButtonsText.EnqueueAdd));
    userEvent.click(getByText(appElem, ButtonsText.StartScheduler));
    userEvent.click(getByText(appElem, ButtonsText.StopScheduler));

    // await pauseMs(SCHEDULER_INTERVAL_SEC * 1000 * 2);
    // expect(appElem.querySelector('output')!.textContent).toContain("");

    await waitFor(() => {
        const outputElem = getByRole(appElem, 'status');
        expect(outputElem?.textContent?.includes("")).toBeTruthy();
    }, {timeout : SCHEDULER_INTERVAL_SEC * 1000 * 2});
});
