// function created to shorten the text
// export const shortenText = (text, n) => {
//     if(text.length > n) {
//         const shortenedText = text.substring(0, n).concat("..."); 

//         return shortenedText;
//     }

//     return text;
// };

export const shortenText = (html, n) => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > n ? text.substring(0, n) + "..." : text;
};