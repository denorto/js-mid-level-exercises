import { describe, it, expect } from 'vitest';
import { greet, Animal, Dog, AnimalClass, DogClass } from './myBind.js';

describe('Function.prototype.myBind', () => {
  it('fissa correttamente il valore di "this"', () => {
    const person = { name: 'Denise' };
    const boundGreet = greet.myBind(person, 'Hi');

    expect(boundGreet('!')).toBe('Hi, Denise!');
  });

  it('concatena boundArgs e callArgs nell\'ordine corretto', () => {
    function unisci(a, b, c) {
      return [a, b, c].join('-');
    }

    const parziale = unisci.myBind(null, 'uno', 'due');
    expect(parziale('tre')).toBe('uno-due-tre');
  });

  it('ignora il context passato quando la funzione bindata viene invocata con "new"', () => {
    function Persona(nome) {
      this.nome = nome;
    }

    const contextEsterno = { nome: 'IGNORATO' };
    const PersonaBindata = Persona.myBind(contextEsterno);

    const p = new PersonaBindata('Rossi');

    expect(p.nome).toBe('Rossi');
    expect(p).toBeInstanceOf(Persona);
    expect(p).toBeInstanceOf(PersonaBindata);
  });

  it('lancia un TypeError se myBind viene chiamato su qualcosa che non è una funzione', () => {
    const nonFunzione = 42;

    expect(() => {
      Function.prototype.myBind.call(nonFunzione, {});
    }).toThrow(TypeError);
  });

  it('una funzione bindata può essere chiamata più volte con argomenti diversi, senza "ricordare" le chiamate precedenti', () => {
    function saluta(nome) {
      return `${this.prefisso} ${nome}`;
    }

    const bound = saluta.myBind({ prefisso: 'Ciao' });

    expect(bound('Anna')).toBe('Ciao Anna');
    expect(bound('Marco')).toBe('Ciao Marco');
  });
});

describe('Ereditarietà con prototipi (Animal / Dog)', () => {
  it('Dog eredita le proprietà d\'istanza da Animal tramite Animal.call', () => {
    const rex = new Dog('Rex', 'Labrador');

    expect(rex.name).toBe('Rex');
    expect(rex.breed).toBe('Labrador');
  });

  it('Dog.speak() estende il metodo speak() di Animal', () => {
    const rex = new Dog('Rex', 'Labrador');

    expect(rex.speak()).toBe('Rex emits a generic sound. But, Rex is barking!');
  });

  it('rispetta correttamente la catena dei prototipi', () => {
    const rex = new Dog('Rex', 'Labrador');

    expect(rex).toBeInstanceOf(Dog);
    expect(rex).toBeInstanceOf(Animal);
  });

  it('il constructor di Dog.prototype è stato ripristinato correttamente', () => {
    expect(Dog.prototype.constructor).toBe(Dog);
  });
});

describe('Ereditarietà con class ed extends (AnimalClass / DogClass)', () => {
  it('DogClass eredita le proprietà d\'istanza tramite super()', () => {
    const rex = new DogClass('Rex', 'Labrador');

    expect(rex.name).toBe('Rex');
    expect(rex.breed).toBe('Labrador');
  });

  it('DogClass.speak() estende il metodo speak() di AnimalClass tramite super.speak()', () => {
    const rex = new DogClass('Rex', 'Labrador');

    expect(rex.speak()).toBe('Rex emits a generic sound. But, Rex is barking!');
  });

  it('rispetta correttamente la catena di ereditarietà delle classi', () => {
    const rex = new DogClass('Rex', 'Labrador');

    expect(rex).toBeInstanceOf(DogClass);
    expect(rex).toBeInstanceOf(AnimalClass);
  });

  it('produce lo stesso identico comportamento della versione con prototipi', () => {
    const rexProto = new Dog('Rex', 'Labrador');
    const rexClass = new DogClass('Rex', 'Labrador');

    expect(rexClass.speak()).toBe(rexProto.speak());
  });
});