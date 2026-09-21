import { describe, it, expect } from "vitest";
import { makeCounter } from "./makeCounter";

describe(makeCounter, () => {
    it("parti da 0", () => {
    const risultato = makeCounter();   
    expect(risultato.reset()).toBe(0);       
    })
    it("incrementa 1", () => {
    const risultato = makeCounter();   
    expect(risultato.increment()).toBe(1);       
    })
});