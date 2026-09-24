
Function.prototype.myBind = function (context, ...boundArgs) {
   const originalFn = this;

  if (typeof originalFn !== 'function') {
    throw new TypeError('myBind can only be called on a function');
  }

  function boundFn(...callArgs) {
   
    const isNewCall = this instanceof boundFn;

    return originalFn.apply(
      isNewCall ? this : context,
      [...boundArgs, ...callArgs]
    );
  }

  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  return boundFn;
};

export function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Denise' };
const boundGreet = greet.myBind(person, 'Hi');
console.log(boundGreet('!')); // "Hi, Denise!"


export function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} emits a generic sound.`;
};

export function Dog(name, breed) {

  Animal.call(this, name);
  this.breed = breed;
}


Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; 

Dog.prototype.speak = function () {
  return `${Animal.prototype.speak.call(this)} But, ${this.name} is barking!`;
};

const rex = new Dog('Rex', 'Labrador');
console.log(rex.speak());
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true


/* ============================================================
   Rewrite with con class and extends
   ============================================================ */

export class AnimalClass {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} emits a generic sound.`;
  }
}

export class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name); 
    this.breed = breed;
  }

  speak() {
    return `${super.speak()} But, ${this.name} is barking!`;
  }
}

const rexClass = new DogClass('Rex', 'Labrador');
console.log(rexClass.speak());
console.log(rexClass instanceof DogClass);    // true
console.log(rexClass instanceof AnimalClass); // true