const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema; 
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },

        email: {
            type: String, 
            required: [true, "Please add an email"],
            unique: true, 
            trim: true,
            match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([A-Za-z0-9-]+\.)+[A-Za-z]{2,}))$/,
                   "Please enter a valid email"
            ]
        },

        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be up to 6 characters"]
        },
        role: {
            type: String,
            required: [true],
            default: "customer",
            enum: ["customer", "admin"]
        },
        photo: {
            type: String, 
            required: [true, "Please add a photo"],
            default: "https://randomuser.me/api/portraits/men/57.jpg"
        },
        phone: {
            type: String,
            default: "+1",
        },
        balance: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
        },
        cartItems: {
            type: [Object],
        },
        stripeCustomerId: {
            type: String,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },{
        timestamps: true
    }
)

// Encrypt pwd before saving into the db
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;