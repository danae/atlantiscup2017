//-----------------------------------------------------------------------------

pad = function(number, width)
{
  width -= number.toString().length;
  if (width > 0)
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  return number + "";
};

Date.prototype.isToday = function()
{
  var today = new Date();
  return Math.floor(this.getTime() / 86400000) === Math.floor(today.getTime() / 86400000);
};

Date.prototype.isTomorrow = function()
{
  var today = new Date();
  return Math.floor(this.getTime() / 86400000) === Math.floor(today.getTime() / 86400000) + 1;
};

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

Date.prototype.formatTime = function()
{
  return pad(this.getHours(),2) + ':' + pad(this.getMinutes(),2);
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
};

// Returns the winner of this match
Match.prototype.winner = function()
{
  if (this.score === null)
    return null;
  else if (this.score[0] > this.score[1])
    return this.teams[0];
  else if (this.score[0] < this.score[1])
    return this.teams[1];
  else
    return null;
};

// Renders the match as a <tr>-element
Match.prototype.renderAsRow = function($el)
{
  var $info = $(document.createElement('td'))
    .addClass('active')
    .append(this.name !== null ? this.name + ' &middot; ' : '')
    .append('<span class="text-muted">' + this.date.formatDate() + '</span>')
    .append(' &middot; ' + this.date.formatTime());
  
  var $team1 = $(document.createElement('td'))
    .addClass('right')
    .css('width','30%')
    .append(this.teams[0].renderReverse());
  if (this.winner() === this.teams[0])
    $team1.addClass('text-success bold');
    
  var $score = $(document.createElement('td'))
    .addClass('center')
    .css('width','8%');
  if (this.score !== null)
    $score
      .append(this.score[0])
      .append(" - ")
      .append(this.score[1]);
  else
    $score
      .addClass('text-muted')
      .append('<i>vs</i>');
    
  var $team2 = $(document.createElement('td'))
    .addClass('left')
    .css('width','30%')
    .append(this.teams[1].render());
  if (this.winner() === this.teams[1])
    $team2.addClass('text-success bold');
  
  var $row = $(document.createElement('tr'))
    .append($info)
    .append($team1)
    .append($score)
    .append($team2);
  $el.append($row);
};

// Renders the match as a <table>-element
Match.prototype.renderAsTable = function()
{
  var $panel = $(document.createElement('div'))
    .addClass('panel')
    .addClass('panel-default');
    
  var $table = $(document.createElement('table'))
    .addClass('table')
    .addClass('table-condensed');
  this.renderAsRow($table);
  $panel.append($table);
  
  return $panel;
};

//-----------------------------------------------------------------------------

// Poule class
Poule = function(data)
{
  if (typeof data !== 'object')
    throw 'Constructor data is no object, but ' + typeof data;
  
  this.teams = data.teams;
  this.matches = data.matches.map(function(match)
  {
    if (typeof match.teams[0] === 'number')
      match.teams[0] = this.teams[match.teams[0]];
    if (typeof match.teams[1] === 'number')
      match.teams[1] = this.teams[match.teams[1]];
    return match;
  }.bind(this));
  
  this.calculateStats();
};

// Returns how many matches are played
Poule.prototype.totalPlayed = function()
{
  var played = 0;
  this.matches.forEach(function(match)
  {
    if (match.score !== null)
      played ++;
  });
  return played;
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
    if (match.score === null)
      return;
    
    var t1 = match.teams[0];
    var t2 = match.teams[1];
    
    // Played
    t1.stats.played ++;
    t2.stats.played ++;
    
    // Score
    if (match.score[0] > match.score[1])
    {
      t1.stats.wins ++;
      t2.stats.losses ++;
    }
    else if (match.score[0] < match.score[1])
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
    t1.stats.gf += match.score[0];
    t1.stats.ga += match.score[1];
    t2.stats.gf += match.score[1];
    t2.stats.ga += match.score[0];
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
    if (a.stats.played === 0 || b.stats.played === 0)
      return 0;
    
    if (a.stats.points !== b.stats.points)
      return b.stats.points - a.stats.points;
    else if (a.stats.gd !== b.stats.gd)
      return b.stats.gd - a.stats.gd;
    else if (a.stats.gf !== b.stats.gf)
      return b.stats.gf - a.stats.gf;
    else
      return b.factor - a.factor;
  });
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
    var $team = $(document.createElement('td'))
      .append(team.render());
    
    // Table row for the team
    var $row = $(document.createElement('tr'))
      .append($team)
      .append('<td class="center" style="font-weight: bold;">' + team.stats.played + '</td>')
      .append('<td class="center">' + team.stats.wins + '</td>')
      .append('<td class="center">' + team.stats.ties + '</td>')
      .append('<td class="center">' + team.stats.losses + '</td>')
      .append('<td class="center">' + team.stats.gf + '</td>')
      .append('<td class="center">' + team.stats.ga + '</td>')
      .append('<td class="center">' + (team.stats.gd > 0 ? '+' : '') + team.stats.gd + '</td>')
      .append('<td class="center" style="font-weight: bold;">' + team.stats.points + '</td>');
    if (this.totalPlayed() === 6 && index < 2)
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
    .addClass('table-condensed');
  $panel.append($table);
  
  // Iterate over the matches
  this.matches.forEach(function(match)
  {
    match.renderAsRow($table);
  });
  
  // Return the panel
  return $panel;
};

//-----------------------------------------------------------------------------