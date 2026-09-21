import { describe, it, expect } from "vitest";
import { makeCounter } from "./makeCounter";

describe(makeCounter, () => {
    it("reset 0", () => {
        const risultato = makeCounter();  
        risultato.increment();
        risultato.increment(); 
        expect(risultato.reset()).toBe(0);       
    })
    it("increase 1", () => {
        const risultato = makeCounter();   
        expect(risultato.increment()).toBe(1);       
    })
    it("decrease", () => {
        const risultato = makeCounter();   
        expect(risultato.decrement()).toBe(-1);       
    })
});