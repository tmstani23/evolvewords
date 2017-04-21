


// Genetic Algorithm

// A class to describe a psuedo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function newChar() {
  //generate random characters to populate the genes array
  var c = floor(random(63,122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;
  //convert numbers to a string of alphabetic letters:
  return String.fromCharCode(c);
  
}

// Constructor (makes a random DNA)
function DNA(glength) {
  // The genetic sequence
  this.genes = [];
  this.fitness = 0;
  for (var i = 0; i < glength; i++) {
    //iterate through the genes array
    //append random characters from the new char function
    this.genes[i] = newChar();  // Pick from range of chars
    }

  // Converts character array to a String
  this.getPhrase = function() {
    //join all the characters from the genes array into a string
      //remove commas between characters
    return this.genes.join("");
    
  }
  // Fitness function (returns floating point % of "correct" characters)
  this.calcFitness = function(target) {
     var score = 0;
     //iterate over each element of the genes array
     for (var i = 0; i < this.genes.length; i++) {
        //if the character matches one in the target phrase
        if (this.genes[i] == target.charAt(i)) {
          //increase score by one
          score++;
        }
     }
     //produce a fitness score for the whole "gene"
     this.fitness = score / target.length;
     //square the fitness function to make it exponentially improve
      //based on how many characters correct
     this.fitness = pow(this.fitness, 2)
  }

  // Crossover
  this.crossover = function(partner) {
    // A new child
    var child = new DNA(this.genes.length);
    
    var midpoint = floor(random(this.genes.length)); // Pick a midpoint
    
    // Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else              child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  this.mutate = function(mutationRate) {
    //iterate through each character in the this.genes array
    for (var i = 0; i < this.genes.length; i++) {
      //generate random # between 0 and 1
      if (random(1) < mutationRate) {
        //if less than mutation rate 
        //substitute new character at this.genes(i)
        this.genes[i] = newChar();
      }
    }
  }
}