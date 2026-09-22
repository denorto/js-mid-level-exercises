import { describe, it, expect } from "vitest";
import { persona, funcEstratta, arrowFix, bindFix, callFix } from "./thisKeyword";

describe("persona", () => {
    it("func() return name", () => {
        const result = persona.func();
        expect(result).toBe("Luca");
    });
    it("arrow problem", () => {
        expect(() => funcEstratta()).toThrow();
    });
    it("arrow func", () => {
        const result = arrowFix();
        expect(result).toBe("Luca");
    });
    it("bind func", () => {
        const result = bindFix();
        expect(result).toBe("Luca");
    });
    it("call func", () => {
        const result = callFix;
        expect(result).toBe("Luca");
    });
});