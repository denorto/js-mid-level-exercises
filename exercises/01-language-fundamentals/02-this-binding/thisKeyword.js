export let persona = {
    NAME : "Luca",
    TEL : 3498833456,
    PASSWORD: "123Test",
    func(){
        return this.NAME
    }
}

// 0) problem
export const funcEstratta = persona.func;

// 1) arrow
export const arrowFix = () => persona.func();

// 2) bind
export const bindFix = persona.func.bind(persona);

// 3) call
export const callFix = persona.func.call(persona)