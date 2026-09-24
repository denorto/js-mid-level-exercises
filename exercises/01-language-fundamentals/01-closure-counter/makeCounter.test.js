import { describe, it, expect } from "vitest";
import { makeCounter } from "./makeCounter";

describe(makeCounter, () => {
    it("reset 0", () => {
        const result = makeCounter();  
        result.increment();
        result.increment(); 
        expect(result.reset()).toBe(0);       
    })
    it("increase 1", () => {
        const result = makeCounter();   
        expect(result.increment()).toBe(1);       
    })
    it("decrease", () => {
        const result = makeCounter();   
        expect(result.decrement()).toBe(-1);       
    })
});