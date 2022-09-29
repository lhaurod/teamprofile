const fs = require(`fs`);
const Manager = require(`../lib/Manager`);
const Engineer = require(`../lib/Engineer`);
const Intern = require(`../lib/Intern`);



const generateIcon = (teamMember) => {
  if (teamMember instanceof Manager) {
      return `<i class="fas fa-mug-hot"></i> Manager`;
  } else if (teamMember instanceof Engineer) {
      return `<i class="fas fa-glasses"></i>︁ Engineer`;
  } else if (teamMember instanceof Intern) {
      return `<i class="fas fa-user-graduate"></i> Intern`;
  } else {
    console.log(`ERROR AT GENERATEICON IN GENERATE HTML***********************`)
    return `ERROR AT GENERATEICON IN GENERATE HTML***********************`
  }
}


const generateClassSpecificAttribute = (teamMember) => {
  if(teamMember instanceof Manager) {
      return `Office Number: ${teamMember.officeNumber}`
  } else if (teamMember instanceof Engineer) {
      return `GitHub Page: <a href="http://www.github.com/${teamMember.github}">${teamMember.github}</a>`
  } else if (teamMember instanceof Intern) {
      return `School: ${teamMember.school}`
  }
}


const generateTeamMemberCards = (teamMemberArray) => {
  let teamHtmlCards = ``;
  teamMemberArray.forEach(teamMember => {
    teamHtmlCards += `
    <div 
    class="col-9 col-md-3 border border-primary mx-2 my-2 p-0">
      <div class="bg-primary text-light">
        <h3 class="mx-0 p-2">${generateIcon(teamMember)}</h3>
        <h3 class="mx-0 p-2">${teamMember.name}</h3>
      </div> 
      <div class="p-2">
        <p>Email: <a href="mailto:${teamMember.email}">${teamMember.email}</a></p>
        <p>ID: ${teamMember.id}</p>
        <p>${generateClassSpecificAttribute(teamMember)}</p>
      </div>
    </div>
    `
  })
  return teamHtmlCards;
}

const generateHtml = (teamMemberArray) => {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/3e60e776d3.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <link rel="shortcut icon" type="image/jpg" href="./Images/TeamworkIcon.png"/>
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile </title>
  </head>
  <body>
  <header class="row">
    <h1 class="bg-danger py-3 col-12 text-light text-center">Team Profile Generator</h1>
  </header>
   
  <main class="container mx-auto">
    <section class="row mx-auto d-flex justify-content-around">
      ${generateTeamMemberCards(teamMemberArray)}
     </section>
   </main>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
 </body>
</html>
`;
}
let writeFile = (teamMemberArray) => {
  fs.writeFile(`dist/index.html`, generateHtml(teamMemberArray), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`\nYour Team Profile Page has been successfully generated. \n`)
    }
  })
}

module.exports = writeFile;