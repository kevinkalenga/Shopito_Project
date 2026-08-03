//function created to shorten the text
export const shortenText = (text, n) => {
    if(text.length > n) {
        const shortenedText = text.substring(0, n).concat("..."); 

        return shortenedText;
    }

    return text;
};

// Calculate average Product rating
export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0; // Return 0 if the ratings array is empty or not an array
  }

  var totalStars = 0;
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }

  return totalStars / ratings.length;
}

// export const shortenText = (html, n) => {
//   const text = html.replace(/<[^>]*>/g, "");
//   return text.length > n ? text.substring(0, n) + "..." : text;
// };