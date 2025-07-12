import { render } from "@testing-library/svelte";
import CommandIconButton from "./editor-toolbar/CommandIconButton.svelte";
import { setContext } from "svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const focusMock = vi.fn();
const fakeInput = { focus: focusMock };
const noteEditorContext = {
    get: () => ({ focusedInput: fakeInput }),
};

const execCommandMock = vi.fn((key: string) => {
    execCommandCalls.push(key);
});
let execCommandCalls: string[] = [];

vi.mock("$lib/domlib", () => ({
    execCommand: execCommandMock,
    queryCommandState: vi.fn(),
}));

setContext("noteEditorContext", noteEditorContext);

describe("Undo on editor", () => {
    beforeEach(() => {
        focusMock.mockClear();
        execCommandCalls = [];
    });

    it("shortcut 'control+z' executes undo command", async () => {
        const { component } = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        });

        component.$emit("action");
        await tick();

        expect(focusMock).toHaveBeenCalled();
        expect(execCommandCalls).toEqual(["undo"]);
    });

    it("undo list on 'control+z'", async () => {
        const insertComponent = render(CommandIconButton, {
            key: "insertUnorderedList",
            tooltip: "Bullet List",
            withoutState: true,
        }).component;

        insertComponent.$emit("action");
        await tick();

        const undoComponent = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        }).component;

        undoComponent.$emit("action");
        await tick();

        expect(focusMock).toHaveBeenCalledTimes(2);
        expect(execCommandCalls).toEqual(["insertUnorderedList", "undo"]);
    });

    it("undo italic on 'control+z'", async () => {
        const italicComponent = render(CommandIconButton, {
            key: "italic",
            tooltip: "Italic",
            withoutState: true,
        }).component;

        italicComponent.$emit("action");
        await tick();

        const undoComponent = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        }).component;

        undoComponent.$emit("action");
        await tick();

        expect(focusMock).toHaveBeenCalledTimes(2);
        expect(execCommandCalls).toEqual(["italic", "undo"]);
    });

    it("undo bold on 'control+z'", async () => {
        const boldComponent = render(CommandIconButton, {
            key: "bold",
            tooltip: "Bold",
            withoutState: true,
        }).component;

        boldComponent.$emit("action");
        await tick();

        const undoComponent = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        }).component;

        undoComponent.$emit("action");
        await tick();

        expect(focusMock).toHaveBeenCalledTimes(2);
        expect(execCommandCalls).toEqual(["bold", "undo"]);
    });

    it("undo underline on 'control+z'", async () => {
        const underlineComponent = render(CommandIconButton, {
            key: "underline",
            tooltip: "Underline",
            withoutState: true,
        }).component;

        underlineComponent.$emit("action");
        await tick();

        const undoComponent = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        }).component;

        undoComponent.$emit("action");
        await tick();

        expect(focusMock).toHaveBeenCalledTimes(2);
        expect(execCommandCalls).toEqual(["underline", "undo"]);
    });
});
