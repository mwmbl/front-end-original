

const search = unescape(document.location.search);
console.log("Search", search);

const goString = "?q=go:+";
if (search.startsWith(goString)) {
  let newURL = "https://" + search.substr(goString.length);
  console.log("New URL", newURL);
  document.location = newURL;
}

const googleString = "?q=search:+google.com+";
if (search.startsWith(googleString)) {
  let newURL = "https://www.google.com/search?q=" + search.substr(googleString.length);
  console.log("Google URL", newURL);
  document.location = newURL;
}
