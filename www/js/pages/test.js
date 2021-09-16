const data = [
  {title:"kljlkjlkj", description:"........"},
  {title:"222222", description:"...PP..."}, 
  {title:"33333", description:"....3333...."}
]

const main = document.createElement("main");


new Card(document.body,{title:"en premier", description:"avant les autres"});
document.body.appendChild(main);

data.forEach(carte => {
  new Card(main,carte);
});
