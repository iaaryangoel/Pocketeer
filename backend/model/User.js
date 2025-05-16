const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // bcrypt is used for password hashing

const UserSchema = new mongoose.Schema(
    {
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImageUrl: {type: String, default: null},
    },
    {timestamps: true} // adds createdAt and updatedAt automatically
);

// If password is new or changed, hash it before saving
UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema); // Creates a model called User from schema