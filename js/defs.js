//-----------------------------------------------------------------------------

// Team definitions
teams = {
  anv: new Team({code: "anv", name: "Aneva", factor: 60}),
  rai: new Team({code: "rai", name: "Aquilen", factor: 66}),
  ard: new Team({code: "ard", name: "Ardeim", factor: 76}),
  atr: new Team({code: "atr", name: "Atrokije", factor: 89}),
  kbl: new Team({code: "kbl", name: "Benjiland", factor: 85}),
  rbu: new Team({code: "rbu", name: "Burghteland", factor: 71}),
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
  A: new Poule({teams: [teams.rfl,teams.anv,teams.ard,teams.hmk], matches: [
    new Match({date: "2017-06-10T14:00", location: "Rabensburgh", team1: 0, team2: 1}),
    new Match({date: "2017-06-11T16:00", location: "Osprossenburgh", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Rabensburgh", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Osprossenburgh", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Rabensburgh", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Osprossenburgh", team1: 3, team2: 0})
  ]}),
  B: new Poule({teams: [teams.sus,teams.vtm,teams.fno,teams.sol], matches: [
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Brimmerhavn", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Brimmerhavn", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Brimmerhavn", team1: 3, team2: 0})
  ]}),
  C: new Poule({teams: [teams.une,teams.rod,teams.edu,teams.img], matches: [
    new Match({date: "2017-07-01T14:00", location: "Osprossenburgh", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Brimmerhavn", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Osprossenburgh", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Brimmerhavn", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Osprossenburgh", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Brimmerhavn", team1: 3, team2: 0})
  ]}),
  D: new Poule({teams: [teams.car,teams.rth,teams.nad,teams.rng], matches: [
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Rabensburgh", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Rabensburgh", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Lubah-Neutalhavn", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Rabensburgh", team1: 3, team2: 0})
  ]}),
  E: new Poule({teams: [teams.atr,teams.rai,teams.kva,teams.mal], matches: [
    new Match({date: "2017-07-01T14:00", location: "Fortiporta", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Urbalongi", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Fortiporta", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Urbalongi", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Fortiporta", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Urbalongi", team1: 3, team2: 0})
  ]}),
  F: new Poule({teams: [teams.cyl,teams.for,teams.dum,teams.rzd], matches: [
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Isdera", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Isdera", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Isdera", team1: 3, team2: 0})
  ]}),
  G: new Poule({teams: [teams.brs,teams.txe,teams.rbu,teams.cqx], matches: [
    new Match({date: "2017-07-01T14:00", location: "Urbalongi", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Isdera", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Urbalongi", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Isdera", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Urbalongi", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Isdera", team1: 3, team2: 0})
  ]}),
  H: new Poule({teams: [teams.pag,teams.khy,teams.vgr,teams.kbl], matches: [
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 0, team2: 1}),
    new Match({date: "2017-07-01T16:00", location: "Fortiporta", team1: 2, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 0, team2: 2}),
    new Match({date: "2017-07-01T16:00", location: "Fortiporta", team1: 1, team2: 3}),
    new Match({date: "2017-07-01T14:00", location: "Harena", team1: 2, team2: 1}),
    new Match({date: "2017-07-01T14:00", location: "Fortiporta", team1: 3, team2: 0})
  ]})
};

//-----------------------------------------------------------------------------

// Eight final definitions
eightFinals = [
  new Match({date: "2017-07-01T19:00", location: "Brimmerhavn", team1: '1e groep A', team2: '2e groep H'}),
  new Match({date: "2017-07-01T19:00", location: "Rabensburgh", team1: '1e groep B', team2: '2e groep G'}),
  new Match({date: "2017-07-01T19:00", location: "Lubah-Neutalhavn", team1: '1e groep C', team2: '2e groep E'}),
  new Match({date: "2017-07-01T19:00", location: "Osprossenburgh", team1: '1e groep D', team2: '2e groep F'}),
  new Match({date: "2017-07-01T19:00", location: "Isdera", team1: '1e groep E', team2: '2e groep D'}),
  new Match({date: "2017-07-01T19:00", location: "Fortiporta", team1: '1e groep F', team2: '2e groep C'}),
  new Match({date: "2017-07-01T19:00", location: "Harena", team1: '1e groep G', team2: '2e groep A'}),
  new Match({date: "2017-07-01T19:00", location: "Urbalongi", team1: '1e groep H', team2: '2e groep B'})
];
  
// Quarter final definitions
quarterFinals = [
  new Match({date: "2017-07-01T19:00", location: "Osprossenburgh", team1: 'Winnaar A1', team2: 'Winnaar A2'}),
  new Match({date: "2017-07-01T19:00", location: "Urbalongi", team1: 'Winnaar A3', team2: 'Winnaar A4'}),
  new Match({date: "2017-07-01T19:00", location: "Brimmerhavn", team1: 'Winnaar A5', team2: 'Winnaar A6'}),
  new Match({date: "2017-07-01T19:00", location: "Isdera", team1: 'Winnaar A7', team2: 'Winnaar A8'})
];
  
// Half final definitions
halfFinals = [
  new Match({date: "2017-07-01T19:00", location: "Lubah-Neutalhavn", team1: 'Winnaar K1', team2: 'Winnaar K2'}),
  new Match({date: "2017-07-01T19:00", location: "Harena", team1: 'Winnaar K3', team2: 'Winnaar K4'})
];
  
// Bronze final definition
bronzeFinal = new Match({date: "2017-07-01T19:00", location: "Rabensburgh", team1: 'Verliezer H1', team2: 'Verliezer H2'});
  
// Final definition
final = new Match({date: "2017-07-01T19:00", location: "Fortiporta", team1: 'Winnaar H1', team2: 'Winnaar H2'});

//-----------------------------------------------------------------------------

// Main function
$(function()
{
  // Render poules
  $poules = $(document.createElement('div'))
    .addClass('row');
  
  for (var code in poules)
  {
    var poule = poules[code];
    
    var $poule = $(document.createElement('div'))
      .addClass('col-md-6')
      .append('<h3>Groep ' + code + '</h3>')
      .append(poule.renderStats())
      .append(poule.renderMatches());
    $poules.append($poule);
  }
  
  $('#groepsfase')
    .append($poules);
  
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
  
  // Teams
  for (var code in teams)
  {
    var team = teams[code];
    
    var $option = $(document.createElement('option'));
    team.render($option);
      
    $('.selectpicker.teams').append($option);
  }
  
  $('.selectpicker').selectpicker();
  $('[data-toggle="tooltip"]').tooltip();
});

//-----------------------------------------------------------------------------