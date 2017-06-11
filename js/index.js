//-----------------------------------------------------------------------------

// Team definitions
teams = {
  anv: new Team({code: "anv", name: "Aneva", factor: 60}),
  rai: new Team({code: "rai", name: "Aquilen", factor: 66}),
  ard: new Team({code: "ard", name: "Ardeim", factor: 76}),
  atr: new Team({code: "atr", name: "Atrokije", factor: 89}),
  kbl: new Team({code: "kbl", name: "Benjiland", factor: 85}),
  rbu: new Team({code: "rbu", name: "Burghteland", factor: 70}),
  car: new Team({code: "car", name: "Carthamië", factor: 98}),
  cyl: new Team({code: "cyl", name: "Cylenië", factor: 89}),
  dum: new Team({code: "dum", name: "Dumerië", factor: 82}),
  edu: new Team({code: "edu", name: "Eduko", factor: 78}),
  fno: new Team({code: "fno", name: "Finoccië", factor: 65}),
  for: new Team({code: "for", name: "Forezen", factor: 64}),
  rfl: new Team({code: "rfl", name: "Frankenland", factor: 55}),
  hmk: new Team({code: "hmk", name: "Hochmark", factor: 47}),
  img: new Team({code: "img", name: "Imaginië", factor: 78}),
  cqx: new Team({code: "cqx", name: "Kartjas", factor: 65}),
  kva: new Team({code: "kva", name: "Kvarinsuloj", factor: 65}),
  khy: new Team({code: "khy", name: "Kwang Yung", factor: 54}),
  mal: new Team({code: "mal", name: "Maldarië", factor: 57}),
  nad: new Team({code: "nad", name: "Nefen en Daar", factor: 7}),
  rng: new Team({code: "rng", name: "Nieuwegouwen", factor: 59}),
  pag: new Team({code: "pag", name: "Paganië", factor: 88}),
  rod: new Team({code: "rod", name: "Rodova", factor: 57}),
  brs: new Team({code: "brs", name: "Schellingen", factor: 89}),
  txe: new Team({code: "txe", name: "Seovië", factor: 62}),
  sol: new Team({code: "sol", name: "Solwezië", factor: 67}),
  sus: new Team({code: "sus", name: "Sustulië", factor: 68}),
  rth: new Team({code: "rth", name: "Tholenië", factor: 85}),
  une: new Team({code: "une", name: "Uneta", factor: 88}),
  vtm: new Team({code: "vtm", name: "Vestmark", factor: 43}),
  vgr: new Team({code: "vgr", name: "Viguros", factor: 40}),
  rzd: new Team({code: "rzd", name: "Zerderen", factor: 79})
};

//-----------------------------------------------------------------------------

// Poule definitions
poules = {
  A: new Poule({name: 'A', teams: [teams.rfl,teams.anv,teams.ard,teams.hmk], matches: [
    new Match({date: "2017-07-01T16:30", location: "Rabensburgh", teams: [0,1]}),
    new Match({date: "2017-07-01T19:00", location: "Osprossenburgh", teams: [2,3]}),
    new Match({date: "2017-07-06T19:00", location: "Rabensburgh", teams: [0,2]}),
    new Match({date: "2017-07-07T14:00", location: "Osprossenburgh", teams: [1,3]}),
    new Match({date: "2017-07-12T16:30", location: "Rabensburgh", teams: [2,1]}),
    new Match({date: "2017-07-12T16:30", location: "Osprossenburgh", teams: [3,0]})
  ]}),
  B: new Poule({name: 'B', teams: [teams.sus,teams.vtm,teams.fno,teams.sol], matches: [
    new Match({date: "2017-07-02T14:00", location: "Lubah-Neutalhavn", teams: [0,1]}),
    new Match({date: "2017-07-02T16:30", location: "Brimmerhavn", teams: [2,3]}),
    new Match({date: "2017-07-07T16:30", location: "Lubah-Neutalhavn", teams: [0,2]}),
    new Match({date: "2017-07-07T19:00", location: "Brimmerhavn", teams: [1,3]}),
    new Match({date: "2017-07-12T19:00", location: "Lubah-Neutalhavn", teams: [2,1]}),
    new Match({date: "2017-07-12T19:00", location: "Brimmerhavn", teams: [3,0]})
  ]}),
  C: new Poule({name: 'C', teams: [teams.une,teams.rod,teams.edu,teams.img], matches: [
    new Match({date: "2017-07-02T19:00", location: "Osprossenburgh", teams: [0,1]}),
    new Match({date: "2017-07-03T14:00", location: "Brimmerhavn", teams: [2,3]}),
    new Match({date: "2017-07-07T16:30", location: "Osprossenburgh", teams: [0,2]}),
    new Match({date: "2017-07-07T19:00", location: "Brimmerhavn", teams: [1,3]}),
    new Match({date: "2017-07-13T16:30", location: "Osprossenburgh", teams: [2,1]}),
    new Match({date: "2017-07-13T16:30", location: "Brimmerhavn", teams: [3,0]})
  ]}),
  D: new Poule({name: 'D', teams: [teams.car,teams.rth,teams.nad,teams.rng], matches: [
    new Match({date: "2017-07-03T16:30", location: "Lubah-Neutalhavn", teams: [0,1]}),
    new Match({date: "2017-07-03T19:00", location: "Rabensburgh", teams: [2,3]}),
    new Match({date: "2017-07-08T19:00", location: "Lubah-Neutalhavn", teams: [0,2]}),
    new Match({date: "2017-07-09T14:00", location: "Rabensburgh", teams: [1,3]}),
    new Match({date: "2017-07-13T19:00", location: "Lubah-Neutalhavn", teams: [2,1]}),
    new Match({date: "2017-07-13T19:00", location: "Rabensburgh", teams: [3,0]})
  ]}),
  E: new Poule({name: 'E', teams: [teams.atr,teams.rai,teams.kva,teams.mal], matches: [
    new Match({date: "2017-07-04T14:00", location: "Fortiporta", teams: [0,1]}),
    new Match({date: "2017-07-04T16:30", location: "Urbalongi", teams: [2,3]}),
    new Match({date: "2017-07-09T16:30", location: "Fortiporta", teams: [0,2]}),
    new Match({date: "2017-07-09T19:00", location: "Urbalongi", teams: [1,3]}),
    new Match({date: "2017-07-14T16:30", location: "Fortiporta", teams: [2,1]}),
    new Match({date: "2017-07-14T16:30", location: "Urbalongi", teams: [3,0]})
  ]}),
  F: new Poule({name: 'F', teams: [teams.cyl,teams.for,teams.dum,teams.rzd], matches: [
    new Match({date: "2017-07-04T19:00", location: "Harena", teams: [0,1]}),
    new Match({date: "2017-07-05T14:00", location: "Isdera", teams: [2,3]}),
    new Match({date: "2017-07-10T14:00", location: "Harena", teams: [0,2]}),
    new Match({date: "2017-07-10T16:30", location: "Isdera", teams: [1,3]}),
    new Match({date: "2017-07-14T19:00", location: "Harena", teams: [2,1]}),
    new Match({date: "2017-07-14T19:00", location: "Isdera", teams: [3,0]})
  ]}),
  G: new Poule({name: 'G', teams: [teams.brs,teams.txe,teams.rbu,teams.cqx], matches: [
    new Match({date: "2017-07-05T16:30", location: "Urbalongi", teams: [0,1]}),
    new Match({date: "2017-07-05T19:00", location: "Isdera", teams: [2,3]}),
    new Match({date: "2017-07-10T19:00", location: "Urbalongi", teams: [0,2]}),
    new Match({date: "2017-07-11T14:00", location: "Isdera", teams: [1,3]}),
    new Match({date: "2017-07-15T16:30", location: "Urbalongi", teams: [2,1]}),
    new Match({date: "2017-07-15T16:30", location: "Isdera", teams: [3,0]})
  ]}),
  H: new Poule({name: 'H', teams: [teams.pag,teams.khy,teams.vgr,teams.kbl], matches: [
    new Match({date: "2017-07-06T14:00", location: "Harena", teams: [0,1]}),
    new Match({date: "2017-07-06T16:30", location: "Fortiporta", teams: [2,3]}),
    new Match({date: "2017-07-11T16:30", location: "Harena", teams: [0,2]}),
    new Match({date: "2017-07-11T19:00", location: "Fortiporta", teams: [1,3]}),
    new Match({date: "2017-07-15T19:00", location: "Harena", teams: [2,1]}),
    new Match({date: "2017-07-15T19:00", location: "Fortiporta", teams: [3,0]})
  ]})
};

//-----------------------------------------------------------------------------

// Eight final definitions
eightFinals = [
  new Match({name: "A1", date: "2017-07-17T15:00", location: "Brimmerhavn", teams: [poules.A.winners[0],poules.H.winners[1]]}),
  new Match({name: "A2", date: "2017-07-17T19:00", location: "Rabensburgh", teams: [poules.B.winners[0],poules.G.winners[1]]}),
  new Match({name: "A3", date: "2017-07-18T15:00", location: "Lubah-Neutalhavn", teams: [poules.C.winners[0],poules.E.winners[1]]}),
  new Match({name: "A4", date: "2017-07-18T19:00", location: "Osprossenburgh", teams: [poules.D.winners[0],poules.F.winners[1]]}),
  new Match({name: "A5", date: "2017-07-19T15:00", location: "Isdera", teams: [poules.E.winners[0],poules.D.winners[1]]}),
  new Match({name: "A6", date: "2017-07-19T19:00", location: "Fortiporta", teams: [poules.F.winners[0],poules.C.winners[1]]}),
  new Match({name: "A7", date: "2017-07-20T15:00", location: "Harena", teams: [poules.G.winners[0],poules.A.winners[1]]}),
  new Match({name: "A8", date: "2017-07-20T19:00", location: "Urbalongi", teams: [poules.H.winners[0],poules.B.winners[1]]})
];
  
// Quarter final definitions
quarterFinals = [
  new Match({name: "K1", date: "2017-07-22T19:00", location: "Osprossenburgh", teams: [eightFinals[0].winner,eightFinals[4].winner]}),
  new Match({name: "K2", date: "2017-07-23T19:00", location: "Urbalongi", teams: [eightFinals[1].winner,eightFinals[5].winner]}),
  new Match({name: "K3", date: "2017-07-24T19:00", location: "Brimmerhavn", teams: [eightFinals[2].winner,eightFinals[6].winner]}),
  new Match({name: "K4", date: "2017-07-25T19:00", location: "Isdera", teams: [eightFinals[3].winner,eightFinals[7].winner]})
];
  
// Half final definitions
halfFinals = [
  new Match({name: "H1", date: "2017-07-27T19:00", location: "Lubah-Neutalhavn", teams: [quarterFinals[0].winner,quarterFinals[2].winner]}),
  new Match({name: "H2", date: "2017-07-28T19:00", location: "Harena", teams: [quarterFinals[1].winner,quarterFinals[3].winner]})
];
  
// Bronze final definition
bronzeFinal = new Match({date: "2017-07-30T19:00", location: "Rabensburgh", teams: [halfFinals[1].loser,halfFinals[0].loser]});
  
// Final definition
final = new Match({date: "2017-07-31T19:00", location: "Fortiporta", teams: [halfFinals[0].winner,halfFinals[1].winner]});

//-----------------------------------------------------------------------------

// Main function
$(function()
{
  // Render poules
  $poules = $(document.createElement('div'))
    .addClass('row');
  $('#groepsfase').append($poules);
  
  for (var code in poules)
  {
    var poule = poules[code];
    
    var $poule = $(document.createElement('div'))
      .addClass('col-md-6')
      .append('<h3>Groep ' + poule.name + '</h3>')
      .append(poule.renderStats())
      .append(poule.renderMatches());
    $poules.append($poule);
  }
  
  // Render eight finals
  $eight = $(document.createElement('div'))
    .addClass('row');
    
  $eightLeft = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(eightFinals[0].renderAsTable())
    .append(eightFinals[1].renderAsTable())
    .append(eightFinals[2].renderAsTable())
    .append(eightFinals[3].renderAsTable());
  $eight.append($eightLeft);
  
  $eightRight = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(eightFinals[4].renderAsTable())
    .append(eightFinals[5].renderAsTable())
    .append(eightFinals[6].renderAsTable())
    .append(eightFinals[7].renderAsTable());
  $eight.append($eightRight);
    
  $('#knockoutfase')
    .append('<h3>Achtste finales</h3>')
    .append($eight);
    
  // Render quarter finals
  $quarter = $(document.createElement('div'))
    .addClass('row');
    
  $quarterLeft = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(quarterFinals[0].renderAsTable())
    .append(quarterFinals[1].renderAsTable());
  $quarter.append($quarterLeft);
  
  $quarterRight = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(quarterFinals[2].renderAsTable())
    .append(quarterFinals[3].renderAsTable());
  $quarter.append($quarterRight);
  
  $('#knockoutfase')
    .append('<h3>Kwartifinales</h3>')
    .append($quarter);
  
  // Render half finals
  $half = $(document.createElement('div'))
    .addClass('row');
    
  $halfLeft = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(halfFinals[0].renderAsTable());
  $half.append($halfLeft);
  
  $halfRight = $(document.createElement('div'))
    .addClass('col-md-6')
    .append(halfFinals[1].renderAsTable());
  $half.append($halfRight);
    
  $('#knockoutfase')
    .append('<h3>Halve finales</h3>')
    .append($half);
    
  // Render bronze final
  $bronze = $(document.createElement('div'))
    .addClass('row');
    
  $bronzeCenter = $(document.createElement('div'))
    .addClass('col-md-6')
    .addClass('col-md-offset-3')
    .append('<h3>Troostfinale</h3>')
    .append(bronzeFinal.renderAsTable());
  $bronze
    .append($bronzeCenter);
    
  $('#knockoutfase')
    .append($bronze);
    
  // Render final
  $final = $(document.createElement('div'))
    .addClass('row');
    
  $finalCenter = $(document.createElement('div'))
    .addClass('col-md-6')
    .addClass('col-md-offset-3')
    .append('<h3>Finale</h3>')
    .append(final.renderAsTable());
  $final.append($finalCenter);
    
  $('#knockoutfase')
    .append($final);
  
  // Teams for the simulation
  for (var code in teams)
  {
    var team = teams[code];
    
    var $option1 = $(document.createElement('option'))
      .attr('value',team.code)
      .append(team.render());      
    $('select#team1').append($option1);
    
    var $option2 = $(document.createElement('option'))
      .attr('value',team.code)
      .append(team.render());
    $('select#team2').append($option2);
  }
  
  // Tooltips and other classes on load 
  $('[data-toggle="tooltip"]').tooltip();
});

//-----------------------------------------------------------------------------

// If one of the simulation inputs is changed
$('#simulate').click(function(e)
{
  var team1 = $('#team1').val();
  var team2 = $('#team2').val();
  
  var simulation = new Simulation({teams: [teams[team1],teams[team2]]});
  simulation.simulate();
  
  $('#simulation')
    .html('')
    .append(simulation.render());
});

//-----------------------------------------------------------------------------

// Enable link to tab
/*var hash = window.location.hash;
if (hash.match('#'))
  $('.nav-tabs a[href="#' + hash.split('#')[1] + '"]').tab('show');
  
// Change hash for page-reload
$('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab',function(e) 
{
  var 
  if (history.pushState)
    history.pushState(null,null,e.target.hash); 
  else
    window.location.hash = e.target.hash;
});*/

//-----------------------------------------------------------------------------