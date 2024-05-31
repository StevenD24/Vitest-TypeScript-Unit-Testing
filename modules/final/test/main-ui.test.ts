import { test, expect, beforeEach } from "vitest";
import { createDom, registerHandlers } from "../src/ui/main-ui";
import { ButtonsText, getEnumKeyValues } from "./test-utils";

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

test("h1 with text : 'Task Queue Manager' is in the dom", () => {
    const h1Elem = document.querySelector('h1');

    expect(h1Elem).toBeTruthy();
    expect(h1Elem!.textContent).toBe('Task Queue Manager');
});

test('Six buttons inside the app id element', () => {
    const buttonElems = appElem!.querySelectorAll('button');

    expect(buttonElems.length).toBe(6);
});

test('The first button has correct text', () => {
    const firstButton = appElem.querySelector('button');

    expect(firstButton?.textContent).toBe('start scheduler');
});

test('all buttons has correct text', () => {
    const arrayButtonsKeyValue = getEnumKeyValues(ButtonsText);
    const buttons = appElem.querySelectorAll('button');

    expect(arrayButtonsKeyValue.length).toBe(buttons.length);

    arrayButtonsKeyValue.forEach((bt, i) => {
        expect(bt.value).toBe(buttons[i].textContent);
    });
});