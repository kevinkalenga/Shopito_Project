const asyncHandler = require("express-async-handler"); 


 

 const stripeWebhook = asyncHandler(async(req, res) => {
    
      res.send('Dit it')
 });


 module.exports = {
 stripeWebhook
}
