import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullName: {
            type: String,
            require: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            require: true,

        },
        coverImage: {
            type: String,

        },
        watchHistry: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            require: [true, "Password is reequired"]
        },
        refreshToken: {
            type: String,

        }
    }, { timestamps: true }
);
// data save tahye tyare just pela aa pre hook run thase , 1. sukarvanu aanu atyare ? password incrypt karvanu , 2. aama callback function tarike  simple function use karelu kem ke eanathi this keywor through values access kari sakay 
userSchema.pre("save", async function (req, res, next) {

    if (!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    var token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        return token
}


userSchema.methods.generateRefreshToken = function () {
    var token = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    return token
}


export const User = mongoose.model('User', userSchema);
