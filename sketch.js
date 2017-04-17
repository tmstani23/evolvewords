// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population 
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection 
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function, 
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it 
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//  
//   # Rinse and repeat


var mutationRate = 0.01;    // Mutation rate
var totalPopulation = 150;      // Total Population

var population;             // Array to hold the current population
var matingPool;    // ArrayList which we will use for our "mating pool"
var target;                // Target phrase
var stats;
var display;
var bestPhrase;     //html paragraph that holds the result
var finishedEvolve = false;   
var answer;   //final result phrase

function setup() {
  //create html paragraph with the string: "STARTING"
  display = createP("STARTING");
  //create css style class "results""
  display.class("results");
  display.position(600, 10);

  bestPhrase = createP("Best Phrase: ")
  bestPhrase.class("best")
  
  stats = createP("Stats");
  stats.class("stats");

  

  //createCanvas(800, 200);
  target = 'To be or not to be.';
  //create new empty population array
  population = [];
  // iterate through the population
  for (var i = 0; i < totalPopulation; i++) {
    //create a new dna element for each element in the population
    //each dna element is itself an array of "genes" - a character set of target length
    population[i] = new DNA(target.length);
  }
}

function draw() {
  //calculate fitness 
  //loop through the entire population:
  for (var i = 0; i < population.length; i++) {
    //call calcFitness function on each element of the population
    population[i].calcFitness(target);
  }

  var matingPool = [];  // ArrayList which we will use for our "mating pool"
  //begin iteration loop until popluation length is reached
  for (var i = 0; i < population.length; i++) {
    //create variable that holds fitness score of each element in the population
    var nnnn = floor(population[i].fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
    //iterate through each score
    for (var j = 0; j <nnnn; j++) {              // and pick two random numbers
      print(j);
      print(nnnn);
      print(population[i])
      print("iterate");
      //add the score to the mating pool
      matingPool.push(population[i]);
    }
  }
  //Generate function that creates new generation
  //refill the population with children from the mating pool array
  for (var i = 0; i < population.length; i++) {
    var a = floor(random(matingPool.length));
    var b = floor(random(matingPool.length));
    var partnerA = matingPool[a];
    var partnerB = matingPool[b];
    //apply crossover function to create child
    var child = partnerA.crossover(partnerB);
    //apply mutate function to the child
    child.mutate(mutationRate);
    //add the child to the population
    population[i] = child;
  }
  
  var everything = "";
  var displayLimit = min(population.length, 50);
  for (var i = 0; i < displayLimit; i++) {
    if (i % 4 == 0);
    everything += population[i].getPhrase() + "<br>";
}
  
  display.html("All Phrases:<br>" + everything);
   //noLoop();
  displayStats();
}
function displayStats() {
  var stats_text = "Total Population: " + totalPopulation + "<br>";
  stats_text += "Target Phrase: " + target + "<br>";
  
  //bestPhrase.html(answer)
  
  stats.html(stats_text)
  
  
  
}
