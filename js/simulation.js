//-----------------------------------------------------------------------------

dice = function(bound)
{
  return Math.floor((Math.random() * bound)) + 1;
}

//-----------------------------------------------------------------------------

// Simulation class
Simulation = function(team1, team2)
{
  this.team1 = team1;
  this.team2 = team2;
};

// Returns if a match is a tie based on two factors
Simulation.isTie = function(diff)
{
  if (diff >= 14 && diff <= 18)
    return dice(6) >= 6;
  else if (diff >= 9 && diff <= 13)
    return dice(6) >= 5;
  else if (diff >= 6 && diff <= 8)
    return dice(6) >= 4;
  else if (diff >= 3 && diff <= 5)
    return dice(6) >= 3;
  else if (diff >= 1 && diff <= 2)
    return dice(6) >= 2;
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
    return dice(6) >= 5;
  else if (number === 3)
    return dice(6) >= 4;
  else if (number === 4)
    return dice(6) >= 3;
  else if (number >= 5 && number <= 8)
    return dice(6) >= 4;
  else 
    return dice(5) >= 5;  
}

// Returns if a goal chance against is scored
Simulation.isGoalAgainstScored = function(number, diff)
{
  if (number === 1)
    return false;
  else if (diff >= 0 && diff <= 12)
    return dice(6) >= number;
  else if (diff >= 13 && diff <= 22)
    return dice(6) >= number + 1;
  else if (diff >= 23 && diff <= 32)
    return dice(6) >= number + 2;
  else
    return dice(6) >= number + 3;
}

// Simulate the score of this match
Simulation.prototype.simulate = function()
{
  // Calculate the team factors
  this.team1.matchFactor = this.team1.factor + dice(20);
  this.team2.matchFactor = this.team2.factor + dice(20);
  var diff = Math.abs(this.team1.matchFactor - this.team2.matchFactor);
  
  // Check if the match is a tie
  var tie = Simulation.isTie(diff);
  //if (!tie)
  //{
    this.chances = Math.ceil(diff / 5);
    var gf = 0, ga = 0;
    
    // Handle all goal chances
    for (var i = 0; i < this.chances; i ++)
    {
      // Check goal chances for and against
      if (Simulation.isGoalForScored(i + 1))
      {
        gf ++;
        if (Simulation.isGoalAgainstScored(i + 1,diff))
          ga ++;
      }
    }
    
    // Set the score
    if (this.team1.matchFactor > this.team2.matchFactor)
    {
      this.goals1 = gf;
      this.goals2 = ga;
    }
    else if (this.team1.matchFactor < this.team2.matchFactor)
    {
      this.goals2 = gf;
      this.goals1 = ga;
    }
  //}
  /*else
  {
    this.goals1 = 0;
    this.goals2 = 0;
  }*/
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
    .append(this.team1.renderReverse());
    
  var $score = $(document.createElement('td'))
    .css('width','30%')
    .append(this.goals1)
    .append(" - ")
    .append(this.goals2);
    
  var $team2 = $(document.createElement('td'))
    .css('width','35%')
    .append(this.team2.render());
  
  var $header = $(document.createElement('tr'))
    .addClass('active')
    .append($team1)
    .append($score)
    .append($team2);
  $table.append($header);
  
  // Team factors
  var $rowFactor = $(document.createElement('tr'))
    .append('<td>' + this.team1.factor + '</td>')
    .append('<td class="bold">Teamfactor</td>')
    .append('<td>' + this.team2.factor + '</td>')
  $table.append($rowFactor);
  
  // Match factors
  var $rowMatchFactor = $(document.createElement('tr'))
    .append('<td>' + this.team1.matchFactor + '</td>')
    .append('<td class="bold">Wedstrijdfactor</td>')
    .append('<td>' + this.team2.matchFactor + '</td>')
  $table.append($rowMatchFactor);
  
  // Goal chances
  var $rowChances = $(document.createElement('tr'))
    .append('<td>' + this.chances + '</td>')
    .append('<td class="bold">Doelkansen</td>')
    .append('<td>' + this.chances + '</td>')
  $table.append($rowChances);
  
  // Goals
  var $rowGoals = $(document.createElement('tr'))
    .append('<td>' + this.goals1 + '</td>')
    .append('<td class="bold">Doelpunten</td>')
    .append('<td>' + this.goals2 + '</td>')
  $table.append($rowGoals);
  
  // Return the panel
  return $panel;
};

//-----------------------------------------------------------------------------