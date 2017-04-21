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
var totalPopulation = 200;      // Total Population
var generations = 0;

var population;             // Array to hold the current population
var matingPool;    // ArrayList which we will use for our "mating pool"
var target;                // Target phrase

var finishedEvolve = false;   
var answer = "";   //final result phrase



function setup() {
  //create html paragraph with the string: "STARTING"
  display = createP("STARTING");
  //create css style class "results""
  display.class("results");
  display.position(600, 10);

  genePool = createP("");
  genePool.class("geneP");
  genePool.position(10, 410);

  bestPhrase = createP("");
  bestPhrase.class("best");
  
  stats = createP("Stats");
  stats.class("stats");

  everything = "";

  target = 'Natural causes explain the wonders of nature';
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
  //Calculate Fitness 
  
  //loop through the entire population:
  for (var i = 0; i < population.length; i++) {
    //call calcFitness function on each element of the population
    population[i].calcFitness(target);
    //store current gene element from the population in evaluatePhrase variable
      //getPhrase() function removes spaces and converts to a string
    var evaluatePhrase = population[i].getPhrase()
    //if the current iteration of the gene = the target phrase
    if (evaluatePhrase == target) {
      //end evolution and store the gene in the answer variable
      finishedEvolve = true;
      answer = evaluatePhrase;
    }
  }

  var matingPool = [];  // ArrayList which we will use for our "mating pool"
  //begin iteration loop until population length is reached
  for (var i = 0; i < population.length; i++) {
    //create variable that holds fitness score of each element in the population
    var nnnn = floor(population[i].fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
    //iterate j until it reaches score value
    for (var j = 0; j <nnnn; j++) {              // and pick two random numbers
      //add the score to the mating pool
      matingPool.push(population[i]);
    }
  }
  
  //Generate function that creates a new generation
  
  //refill the population with children from the mating pool array
  for (var i = 0; i < population.length; i++) {
    //pick 2 random #s between 0 and length of all elements in the mating pool
    //assign it to var a and b
    var a = floor(random(matingPool.length));
    var b = floor(random(matingPool.length));
    //assign gene at location a in the mating pool to new partnerA
    var partnerA = matingPool[a];
    var partnerB = matingPool[b];
    //apply crossover function to create child
    var child = partnerA.crossover(partnerB);
    //apply mutate function to the child
    child.mutate(mutationRate);
    //add the child to the population
    population[i] = child;
    
  }
  //add one to generation variable
  generations++;
  
  var everything = "";
  //displayLimit = lowest # between pop length and 50
  var displayLimit = min(population.length, 50);
  //iterate until displayLimit is reached
  for (var i = 0; i < displayLimit; i++) {
    //add the phrase with a line break to everything variable
    //getPhrase function strips all the commas and separators out
      //to make it more readable
    everything += population[i].getPhrase() + "<br>";
  }
  //execute display html to update the current phrase "genes" on the screen
    //this must remain inside the draw loop as it is constantly updated
  display.html("All Phrases:<br>" + everything + "<br>");
  genePool.html("Genes in pool: " + matingPool.length + "<br>" + "Created by Tim Stanislav - Indoorkin Productions");
  //call a final display function for the stats and other text html
  displayStats();
  
  if (finishedEvolve == true) {
  noLoop();  
  }
}
//function that displays different variables to the screen as text
function displayStats() {
  var stats_text = "Total Population: " + totalPopulation + "<br>";
  //here additional text information is added on to the stats_text variable
    //which has the effect of appending the information rather than overwriting
  stats_text += "Target Phrase: " + "<br>" + target + "<br>";
  stats_text += "Generations: " + generations + "<br>";
  stats_text += "Mutation Rate: " + mutationRate*100 + "%" + "<br>";
  var answer_text = "Best Phrase: " + "<br>" + answer + "<br>";
 
  
  //display the answer above the stats
  bestPhrase.html(answer_text)
  stats.html(stats_text)
}
