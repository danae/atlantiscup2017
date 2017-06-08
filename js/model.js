Array.prototype.shuffle = function()
{
  var currentIndex = this.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
};

rnd = function(bound)
{
  return Math.floor((Math.random() * bound));
};

//-----------------------------------------------------------------------------

// Team class
Team = function(code, name)
{
  this.code = code;
  this.name = name;
};

// Renders the team name and flag
Team.prototype.render = function($el, reverse)
{
  if (typeof reverse === 'undefined')
    reverse = false;
  
  var $img = $(document.createElement('img'))
    .addClass('flag')
    .attr('src','https://atlantisgeo.nl/flags/' + this.code + '.png');
  
  if (!reverse)
  {
    $el
      .append($img)
      .append(" ")
      .append(this.name);
  }
  else
  {
    $el
      .append(this.name)
      .append(" ")
      .append($img);
  }
};

//-----------------------------------------------------------------------------

// Match class
Match = function(schedule, team1, team2, goals1, goals2)
{
  this.schedule = schedule;
  this.team1 = team1;
  this.team2 = team2;
  this.goals1 = goals1;
  this.goals2 = goals2;
};

// Renders the score of the match
Match.prototype.renderScore = function($el)
{
  $goals1 = $(document.createElement('span'))
    .append(this.goals1);
  if (this.goals1 > this.goals2)    
    $goals1.addClass('text-success');
    
  $goals2 = $(document.createElement('span'))
    .append(this.goals2);
  if (this.goals2 > this.goals1)    
    $goals2.addClass('text-success');
  
  $el
    .append($goals1)
    .append(" - ")
    .append($goals2);
};

// Renders the match
Match.prototype.render = function($el, singleLine)
{
  
};

//-----------------------------------------------------------------------------

// Poule class
Poule = function(teams, matches)
{
  this.teams = teams;
  this.matches = matches.map(function(match)
  {
    if (typeof match.team1 === 'number')
      match.team1 = this.teams[match.team1];
    if (typeof match.team2 === 'number')
      match.team2 = this.teams[match.team2];
    return match;
  }.bind(this));
  
  this.calculateStats();
};

// Determine the team statistics
Poule.prototype.calculateStats = function()
{
  // Initialize the statistics per team
  for (var i = 0; i < this.teams.length; i++)
  {
    this.teams[i].stats = {
      played: 0,
      wins: 0,
      ties: 0,
      losses: 0,
      gf: 0,
      ga: 0
    };
  }
  
  // Add statistics per match
  this.matches.forEach(function(match)
  {
    var t1 = match.team1;
    var t2 = match.team2;
    
    console.log(t1);
    console.log(t2);
    
    // Played
    t1.stats.played ++;
    t2.stats.played ++;
    
    // Score
    if (match.goals1 > match.goals2)
    {
      t1.stats.wins ++;
      t2.stats.losses ++;
    }
    else if (match.goals1 < match.goals2)
    {
      t1.stats.losses ++;
      t2.stats.wins ++;
    }
    else
    {
      t1.stats.ties ++;
      t2.stats.ties ++;
    }
      
    // Goals
    t1.stats.gf += match.goals1;
    t1.stats.ga += match.goals2;
    t2.stats.gf += match.goals1;
    t2.stats.ga += match.goals1;
  });
  
  // Add the points and goal delta to the statistics
  this.teams.forEach(function(team)
  {
    team.stats.gd = team.stats.gf - team.stats.ga;
    team.stats.points = 3 * team.stats.wins + team.stats.ties;
  });
  
  // Sort the teams
  this.teams.sort(function(a, b)
  {
    return b.stats.points - a.stats.points;
  });
};

// Renders the team table for this poule
Poule.prototype.renderTeamTable = function($el)
{
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
  $el.append($panel);
    
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed');
  $panel.append($table);
  
  var $header = $(document.createElement('tr'))
    .addClass('active')
    .append('<th style="width: 36%;">Team</th>')
    .append('<th style="width: 8%;"><abbr title="Wedstrijden gespeeld">P</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Wedstrijden gewonnen">W</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Wedstrijden gelijkgespeeld">T</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Wedstrijden verloren">L</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Doelpunten">GF</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Tegendoelpunten">GA</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Doelsaldo">GD</abbr></th>')
    .append('<th style="width: 8%;"><abbr title="Puntentotaal">Pts</abbr></th>');
  $table.append($header);
  
  this.teams.forEach(function(team, index)
  {
    var $team = $(document.createElement('td'));
    team.render($team);
    
    var $row = $(document.createElement('tr'))
      .append($team)
      .append('<td>' + team.stats.played + '</td>')
      .append('<td>' + team.stats.wins + '</td>')
      .append('<td>' + team.stats.ties + '</td>')
      .append('<td>' + team.stats.losses + '</td>')
      .append('<td>' + team.stats.gf + '</td>')
      .append('<td>' + team.stats.ga + '</td>')
      .append('<td>' + team.stats.gd + '</td>')
      .append('<td>' + team.stats.points + '</td>');
    if (team.stats.played === 3 && index < 2)
      $row.addClass('success');
    $table.append($row);
  });
};

// Renders the match table for this poule
Poule.prototype.renderMatchTable = function($el)
{
   var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
  $el.append($panel);
    
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed');
  $panel.append($table);
  
  this.matches.forEach(function(match)
  {
    var $team1 = $(document.createElement('td'))
      .addClass('right')
      .css('width','30%');
    match.team1.render($team1,true);
    
    var $score = $(document.createElement('td'))
      .addClass('center')
      .css('width','10%');
    match.renderScore($score);
    
    var $team2 = $(document.createElement('td'))
      .addClass('left')
      .css('width','30%');
    match.team2.render($team2);
    
    var $row = $(document.createElement('tr'))
      .append('<td>' + match.schedule.location + '</td>')
      .append($team1)
      .append($score)
      .append($team2);
    $table.append($row);
  });
};

//-----------------------------------------------------------------------------

$(function()
{
  var ts = [];
  for (var code in teams)
    ts.push(teams[code]);
  ts.shuffle();
  
  for (var i = 0; i < 8; i ++)
  {
    poules[i + 1] = new Poule([
      ts[4*i],
      ts[4*i + 1],
      ts[4*i + 2],
      ts[4*i + 3]
    ],[
      new Match({date: "2017-07-01T14:00", location: "Rabensburgh"},0,1,rnd(5),rnd(5)),
      new Match({date: "2017-07-01T16:00", location: "Osprossenburgh"},2,3,rnd(5),rnd(5)),
      new Match({date: "2017-07-01T14:00", location: "Rabensburgh"},0,2,rnd(5),rnd(5)),
      new Match({date: "2017-07-01T16:00", location: "Osprossenburgh"},1,3,rnd(5),rnd(5)),
      new Match({date: "2017-07-01T14:00", location: "Rabensburgh"},2,1,rnd(5),rnd(5)),
      new Match({date: "2017-07-01T14:00", location: "Osprossenburgh"},3,0,rnd(5),rnd(5))
    ])
  }
  
  console.log(teams);
  console.log(poules);
  
  for (var code in poules)
  {
    var poule = poules[code];
    
    var $col = $(document.createElement('div'))
      .addClass('col-md-6')
      .append('<h3>Poule ' + code + '</h3>');
      
    poule.renderTeamTable($col);
    poule.renderMatchTable($col);
    
    $('div#content').append($col);
  }
});