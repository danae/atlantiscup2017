//-----------------------------------------------------------------------------

// Utilility variables and functions
Util = function(){};

// Pad a number with leading zeroes
Util.pad = function(number, width)
{
  width -= number.toString().length;
  if (width > 0)
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  return number + "";
};

// Return if a date is today
Date.prototype.isToday = function()
{
  var today = new Date();
  return Math.floor(this.getTime() / 86400000) === Math.floor(today.getTime() / 86400000);
};

// Return if a date is tomorrow
Date.prototype.isTomorrow = function()
{
  var today = new Date();
  return Math.floor(this.getTime() / 86400000) === Math.floor(today.getTime() / 86400000) + 1;
};

// Format the date part of a date
Date.prototype.formatDate = function()
{
  var days = ['ma','di','wo','do','vr','za','zo'];
  var months = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
  
  if (this.isToday())
    return 'vandaag';
  else if (this.isTomorrow())
    return 'morgen';
  else
    return days[this.getDay()] + ' ' + this.getDate() + ' ' + months[this.getMonth()];
};

// Format the fime part of a date
Date.prototype.formatTime = function()
{
  return Util.pad(this.getHours(),2) + ':' + Util.pad(this.getMinutes(),2);
};

//-----------------------------------------------------------------------------

// Team class
Team = function(data)
{
  if (typeof data !== 'object')
    throw 'Constructor data is no object, but ' + typeof data;
  
  this.name = data.name;
  this.code = data.code || null;
  this.factor = data.factor || 0;
};

// Returns an <img>-tag containing the flag for this team
Team.prototype.image = function()
{
  var im = new Image(16,11);
  im.src = 'https://atlantisgeo.nl/flags/' + this.code + '.png';
  im.alt = this.code.toUpperCase();
  im.className = 'flag';
  return im;
};

// Renders the team name and flag
Team.prototype.render = function()
{
  if (this.code === null)
    return $(document.createElement('span'))
      .addClass('team')
      .append('<i>' + this.name + '</i>');
  else
    return $(document.createElement('span'))
      .addClass('team')
      .append(this.image())
      .append(" ")
      .append(this.name);
};

// Renders first the team name, then the flag
Team.prototype.renderReverse = function()
{
  if (this.code === null)
    return $(document.createElement('span'))
      .addClass('team')
      .append('<i>' + this.name + '</i>');
  else    
    return $(document.createElement('span'))
      .addClass('team')
      .append(this.name)
      .append(" ")
      .append(this.image());
};

//-----------------------------------------------------------------------------

// Match class
Match = function(data)
{
  if (typeof data !== 'object')
    throw 'Constructor data is no object, but ' + typeof data;
  
  this.name = data.name || null;
  this.date = typeof data.date === 'string' ? new Date(data.date) : data.date;
  this.location = data.location;
  this.teams = data.teams.map(function(team)
  {
    return typeof team === 'string' ? new Team({name: team}) : team;
  });
  this.score = data.score || null;
  
  // Played or not
  this.played = this.score !== null;
  
  // Winner and loser
  this.winner = new Team({name: 'Winnaar' + (this.name !== null ? ' ' + this.name : '')});
  this.loser = new Team({name: 'Verliezer' + (this.name !== null ? ' ' + this.name : '')});
  
  // Calculate the match statistics
  this.calculate();
};

// Calculate the match statistics
Match.prototype.calculate = function()
{
  // If the match is not yet played, then return
  if (!this.played)
    return;
  
  // Determine winner
  if (this.score[0] > this.score[1])
  {
    this.winner = this.teams[0];
    this.loser = this.teams[1];
  }
  else if (this.score[0] < this.score[1])
  {
    this.loser = this.teams[0];
    this.winner = this.teams[1];
  }
  else
  {
    this.winner = null;
    this.loser = null;
  }
};

// Renders the first team cell
Match.prototype.renderFirstTeam = function()
{
  // Create a new cell
  var $team = $(document.createElement('td'))
    .addClass('right')
    .css('width','30%')
    .append(this.teams[0].renderReverse());
    
  // Winner color
  if (this.winner === this.teams[0])
    $team.addClass('text-success bold');
  
  // Return the cell
  return $team;
};

// Renders the second team cell
Match.prototype.renderSecondTeam = function()
{
  // Create a new cell
  var $team = $(document.createElement('td'))
    .addClass('left')
    .css('width','30%')
    .append(this.teams[1].render());
    
  // Winner color
  if (this.winner === this.teams[1])
    $team.addClass('text-success bold');
  
  // Return the cell
  return $team;
};

// Renders the score cell
Match.prototype.renderScore = function()
{
  // Create a new cell
  var $score = $(document.createElement('td'))
    .addClass('center')
    .css('width','8%');
    
  // If the match is played or not
  if (this.played)
    $score.append(this.score[0]).append(" - ").append(this.score[1]);
  else
    $score.addClass('text-muted').append('<i>vs</i>');
      
  // Return the cell
  return $score;
};

// Renders the info cell
Match.prototype.renderInfo = function()
{
  return $(document.createElement('td'))
    .addClass('active')
    .append('<span class="text-muted">' + this.date.formatDate() + '</span>')
    .append(' &middot; ' + this.date.formatTime());
};

// Renders the match as a <tr>-element
Match.prototype.renderAsRow = function()
{
  // Return the row
  return $(document.createElement('tr'))
    .append(this.renderInfo())
    .append(this.renderFirstTeam())
    .append(this.renderScore())
    .append(this.renderSecondTeam());
};

// Renders the match as a <table>-element
Match.prototype.renderAsTable = function()
{
  // Panel as the table border
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
    
  // Table
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed')
    .append(this.renderAsRow());
  $panel.append($table);
  
  // Return the panel
  return $panel;
};

//-----------------------------------------------------------------------------

// Poule class
Poule = function(data)
{
  if (typeof data !== 'object')
    throw 'Constructor data is no object, but ' + typeof data;
  
  this.name = data.name;
  this.teams = data.teams;
  this.matches = data.matches.map(function(match)
  {
    match.teams[0] = this.resolveTeam(match.teams[0]);
    match.teams[1] = this.resolveTeam(match.teams[1]);
    match.winner = this.resolveTeam(match.winner);
    match.loser = this.resolveTeam(match.loser);
    
    return match;
  }.bind(this));
  
  // Winner and loser
  this.winners = [
    new Team({name: '1e groep ' + this.name}),
    new Team({name: '2e groep ' + this.name}),
    new Team({name: '3e groep ' + this.name}),
    new Team({name: '4e groep ' + this.name}),
  ];
  
  // Calculate the team statistics
  this.calculate();
};

// Resolve team numbers in the matches
Poule.prototype.resolveTeam = function(team)
{
  if (typeof team === 'number')
    return this.teams[team];
  else
    return team;
};

// Calculate the team statistics
Poule.prototype.calculate = function()
{
  // Amount of played matches
  this.played = 0;
  
  // Initialize the statistics per team
  for (var i = 0; i < this.teams.length; i++)
  {
    var team = this.teams[i];
    
    team.played = 0;
    team.wins = 0;
    team.ties = 0;
    team.losses = 0;
    team.goalsFor = 0;
    team.goalsAgainst = 0;
    team.goalsDelta = 0;
    team.points = 0;
  }
  
  // Add statistics per match
  this.matches.forEach(function(match)
  {
    // If the match is not yet played, then return
    if (!match.played)
      return;
    
    // Count the match as played
    this.played ++;
    
    // Played matches
    match.teams[0].played ++;
    match.teams[1].played ++;
    
    // Wins, ties and losses
    if (match.score[0] === match.score[1])
    {
      match.teams[0].ties ++;
      match.teams[1].ties ++;
    }
    else
    {
      match.winner.wins ++;
      match.loser.losses ++;
    }
      
    // Goals for and against
    match.teams[0].goalsFor += match.score[0];
    match.teams[0].goalsAgainst += match.score[1];
    match.teams[1].goalsFor += match.score[1];
    match.teams[1].goalsAgainst += match.score[0];
  }.bind(this));
  
  // Add the points and goal delta to the statistics
  this.teams.forEach(function(team)
  {
    team.goalsDelta = team.goalsFor - team.goalsAgainst;
    team.points = 3 * team.wins + team.ties;
  });
  
  // Sort the teams
  this.teams.sort(function(a, b)
  {
    // If no matches are played, then use the default order
    if (a.played === 0 || b.played === 0)
      return 0;
    
    // Team with the most points
    else if (a.points !== b.points)
      return b.points - a.points;
      
    // Team with the highest goal delta
    else if (a.goalsDelta !== b.goalsDelta)
      return b.goalsDelta - a.goalsDelta;
    
    // Team with the most goals for
    else if (a.goalsFor !== b.goalsFor)
      return b.goalsFor - a.goalsFor;
    
    // Team factor
    else
      return b.factor - a.factor;
  });
  
  // Fill the winners if all matches are played
  if (this.played === this.matches.length)
  {
    for (var i = 0; i < this.teams.length; i ++)
      this.winners[i] = this.teams[i];
  }
};

// Renders the team table for this poule
Poule.prototype.renderStats = function()
{
  // Panel as the table border
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
    
  // Table
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed')
    .addClass('table-bordered');
  $panel.append($table);
  
  // Table header
  var $header = $(document.createElement('tr'))
    .addClass('active')
    .append('<th></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Wedstrijden gespeeld">P</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Wedstrijden gewonnen">W</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Wedstrijden gelijkgespeeld">T</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Wedstrijden verloren">L</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Doelpunten">GF</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Tegendoelpunten">GA</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Doelsaldo">GD</span></th>')
    .append('<th class="center" style="width: 8%;"><span data-toggle="tooltip" data-placement="top" title="Puntentotaal">Pts</span></th>');
  $table.append($header);
  
  // Iterate over the teams
  this.teams.forEach(function(team, index)
  {
    // Team name and flag
    var $team = $(document.createElement('td'))
      .append(team.render());
    
    // Table row for the team
    var $row = $(document.createElement('tr'))
      .append($team)
      .append('<td class="center" style="font-weight: bold;">' + team.played + '</td>')
      .append('<td class="center">' + team.wins + '</td>')
      .append('<td class="center">' + team.ties + '</td>')
      .append('<td class="center">' + team.losses + '</td>')
      .append('<td class="center">' + team.goalsFor + '</td>')
      .append('<td class="center">' + team.goalsAgainst + '</td>')
      .append('<td class="center">' + (team.goalsDelta > 0 ? '+' : '') + team.goalsDelta + '</td>')
      .append('<td class="center" style="font-weight: bold;">' + team.points + '</td>');
    if (this.played === this.matches.length && index < 2)
      $row.addClass('info');
    $table.append($row);
  }.bind(this));
  
  // Return the panel
  return $panel;
};

// Renders the match table for this poule
Poule.prototype.renderMatches = function()
{
  // Panel as the table border
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
    
  // Table
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed')
  $panel.append($table);
  
  // Iterate over the matches
  this.matches.forEach(function(match)
  {
    $table.append(match.renderAsRow());
  });
  
  // Return the panel
  return $panel;
};

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