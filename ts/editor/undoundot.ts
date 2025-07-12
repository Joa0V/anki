/* 
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


let execCommandArg: string | null = null;
vi.mock("$lib/domlib", () => ({
    execCommand: (key: string) => { execCommandArg = key; },
    queryCommandState: vi.fn(),
}));


setContext("noteEditorContext", noteEditorContext);
it("desfaz comando de negrito com 'control+z'", async () => {
    describe("CommandIconButton", () => {
        const { component } = render(CommandIconButton, {
            key: "bold",
            tooltip: "Bold",
            shortcut: "Control+b",
            withoutState: true,
        });

        component.$emit("action");
        await tick();

        const { component: undoComponent } = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        });

        undoComponent.$emit("action");
        await tick();

        expect(execCommandCalls).toEqual(["bold", "undo"]);
    });

    it("desfaz comando de sublinhado com 'control+z'", async () => {
        const { component } = render(CommandIconButton, {
            key: "underline",
            tooltip: "Underline",
            shortcut: "Control+u",
            withoutState: true,
        });

        component.$emit("action");
        await tick();

        const { component: undoComponent } = render(CommandIconButton, {
            key: "undo",
            tooltip: "Undo",
            shortcut: "Control+z",
            withoutState: true,
        });

        undoComponent.$emit("action");
        await tick();

        expect(execCommandCalls).toEqual(["underline", "undo"]);
    });

    /* beforeEach(() => {
        focusMock.mockClear();
        execCommandArg = null;
        
        it("shortcut 'control+z' executes undo command on lists", async () => {
            const a = 1;
            expect(a).toBe(1);
        });

    it("shortcut 'control+z' executes undo command on italic", async () => {
        
    const x = 2;
    
    expect(x).toBe(2);
    });
});


}); */