class Person {
    constructor(name) {
        var _name = name
        this.setName = function(name) { 
            if(typeof(name)=='string'){
                _name = name;
            } else {
                console.log('Not valid');
            }}
        this.getName = function() { return _name; }
        Object.preventExtensions(this)
    }
}

let laBest = new Person('Sandrine');
laBest.name = 'Sansan'
laBest.eyes = 'blue'
//sans Object.preventExtensions() dans le constructor, on aurait créé les propriétés name et eyes dans laBest !

console.log(laBest.name);
console.log(laBest);

console.log(laBest.getName());

laBest.setName(123);
console.log(laBest.getName());

laBest.setName('Sansan');
console.log(laBest.getName());