const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        trim: true,
        required: "Name is required",
        minLength: [2, "Too shrot"],
        maxLength: [32, "Too long"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }

}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;