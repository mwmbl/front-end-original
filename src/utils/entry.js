/**
 * Handle redirect requests from the suggestion back-end.
 */


import config from "../../config";

export default () => {
  const search = unescape(document.location.search);
  console.log("Search", search);
  for (const [command, urlTemplate] of Object.entries(config.commands)) {
    if (search.startsWith(command)) {
      const newUrl = urlTemplate + search.substr(command.length);
      window.location.replace(newUrl);
      break;
    }
  }
}

//
// const goString = "?q=go:+";
// if (search.startsWith(goString)) {
//   let newURL = "https://" + search.substr(goString.length);
//   console.log("New URL", newURL);
//   document.location = newURL;
// }
//
// const googleString = "?q=search:+google.com+";
// if (search.startsWith(googleString)) {
//   let newURL = "https://www.google.com/search?q=" + search.substr(googleString.length);
//   console.log("Google URL", newURL);
//   document.location = newURL;
// }
