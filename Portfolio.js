const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        role: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 254,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Enter a valid email address"
            ]
        },

        location: {
            type: String,
            trim: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Prefer not to say", ""],
            default: ""
        },

        course: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        about: {
            type: String,
            trim: true,
            maxlength: 2000
        },

        education: {
            type: String,
            trim: true
        },

        github: String,
        linkedin: String,

        projects: [
            {
                title: String,
                description: String,
                link: String
            }
        ],

        theme: {
            type: String,
            enum: ["ocean", "midnight", "forest", "sunset"],
            default: "ocean"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);