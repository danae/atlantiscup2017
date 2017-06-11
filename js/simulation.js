//-----------------------------------------------------------------------------

// Simulation class
Simulation = function(data)
{
  if (typeof data !== 'object')
    throw 'Constructor data is no object, but ' + typeof data;
  
  // If the data is a match
  if (data instanceof Match)
    this.match = data;
  else
    this.match = new Match({teams: data.teams});
};

// Roll a dice
Simulation.dice = function(bound)
{
  return Math.floor((Math.random() * bound)) + 1;
}

// Returns if a match is a tie based on two factors
Simulation.isTie = function(diff)
{
  if (diff >= 14 && diff <= 18)
    return Simulation.dice(6) >= 6;
  else if (diff >= 9 && diff <= 13)
    return Simulation.dice(6) >= 5;
  else if (diff >= 6 && diff <= 8)
    return Simulation.dice(6) >= 4;
  else if (diff >= 3 && diff <= 5)
    return Simulation.dice(6) >= 3;
  else if (diff >= 1 && diff <= 2)
    return Simulation.dice(6) >= 2;
  else if (diff === 0)
    return true;
  else
    return false;
}

// Returns if a goal chance for is scored
Simulation.isGoalForScored = function(number)
{
  if (number === 1)
    return true;
  else if (number === 2)
    return Simulation.dice(6) >= 5;
  else if (number === 3)
    return Simulation.dice(6) >= 4;
  else if (number === 4)
    return Simulation.dice(6) >= 3;
  else if (number >= 5 && number <= 8)
    return Simulation.dice(6) >= 4;
  else 
    return Simulation.dice(5) >= 5;  
}

// Returns if a goal chance against is scored
Simulation.isGoalAgainstScored = function(number, diff)
{
  if (number === 1)
    return false;
  else if (diff >= 0 && diff <= 12)
    return Simulation.dice(6) >= number;
  else if (diff >= 13 && diff <= 22)
    return Simulation.dice(6) >= number + 1;
  else if (diff >= 23 && diff <= 32)
    return Simulation.dice(6) >= number + 2;
  else
    return Simulation.dice(6) >= number + 3;
}

// Simulate the score of this match
Simulation.prototype.simulate = function()
{
  // The match is played
  this.match.played = true;
  
  // Calculate the team factors
  this.factors = [
    this.match.teams[0].factor + Simulation.dice(20),
    this.match.teams[1].factor + Simulation.dice(20)
  ];
  var diff = Math.abs(this.factors[0] - this.factors[1]);
  
  // Check if the match is a tie
  var tie = Simulation.isTie(diff);
  //if (!tie)
  //{
    // Determine the winner
    if (this.factors[0] > this.factors[1])
    {
      this.winner = this.match.teams[0];
      this.loser = this.match.teams[1];
    }
    else if (this.factors[0] < this.factors[1])
    {
      this.loser = this.match.teams[0];
      this.winner = this.match.teams[1];
    }
  
    // Determine goal chances
    this.chances = Math.ceil(diff / 5);
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    
    // Handle all goal chances
    for (var i = 0; i < this.chances; i ++)
    {
      // Check goal chances for and against
      if (Simulation.isGoalForScored(i + 1))
      {
        this.goalsFor ++;
        if (Simulation.isGoalAgainstScored(i + 1,diff))
          this.goalsAgainst ++;
      }
    }
    
    // Set the score
    if (this.winner === this.match.teams[0])
      this.match.score = [this.goalsFor,this.goalsAgainst];
    else //if (this.winner === this.match.teams[1])
      this.match.score = [this.goalsAgainst,this.goalsFor];
  //}
  /*else
  {
    this.goals1 = 0;
    this.goals2 = 0;
  }*/
  
  // Calculate the match statistics
  this.match.calculate();
};

// Render the simulation
Simulation.prototype.render = function()
{
  // Panel as the table border
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
    
  // Table
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed')
    .addClass('center');
  $panel.append($table);
  
  // Teams and score
  var $team1 = $(document.createElement('td'))
    .css('width','35%')
    .append(this.match.teams[0].renderReverse());
    
  var $score = $(document.createElement('td'))
    .css('width','30%')
    .append(this.match.score[0])
    .append(" - ")
    .append(this.match.score[1]);
    
  var $team2 = $(document.createElement('td'))
    .css('width','35%')
    .append(this.match.teams[1].render());
  
  var $header = $(document.createElement('tr'))
    .addClass('active')
    .append($team1)
    .append($score)
    .append($team2);
  $table.append($header);
  
  // Team factors
  var $rowFactor = $(document.createElement('tr'))
    .append('<td>' + this.match.teams[0].factor + '</td>')
    .append('<td class="bold">Teamfactor</td>')
    .append('<td>' + this.match.teams[1].factor + '</td>')
  $table.append($rowFactor);
  
  // Match factors
  var $rowMatchFactor = $(document.createElement('tr'))
    .append('<td>' + this.factors[0] + '</td>')
    .append('<td class="bold">Teamfactor</td>')
    .append('<td>' + this.factors[1] + '</td>')
  $table.append($rowMatchFactor);
  
  // Goal chances
  var $rowChances = $(document.createElement('tr'))
    .append('<td>' + this.chances + '</td>')
    .append('<td class="bold">Doelkansen</td>')
    .append('<td>' + this.chances + '</td>')
  $table.append($rowChances);
  
  // Goals
  var $rowGoals = $(document.createElement('tr'))
    .append('<td>' + this.match.score[0] + '</td>')
    .append('<td class="bold">Doelpunten</td>')
    .append('<td>' + this.match.score[1] + '</td>')
  $table.append($rowGoals);
  
  // Return the panel
  return $panel;
};

//-----------------------------------------------------------------------------