const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// CREATE PORTFOLIO
router.post("/", async (req, res) => {
    try {
        const {
            fullName,
            role,
            email,
            location,
            gender,
            course,
            about,
            education,
            github,
            linkedin,
            projects,
            theme
        } = req.body;

        if (!fullName || !role || !email || !course) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        const portfolio = await Portfolio.create({
            fullName,
            role,
            email,
            location,
            gender,
            course,
            about,
            education,
            github,
            linkedin,
            projects: Array.isArray(projects) ? projects : [],
            theme: theme || "ocean"
        });

        res.status(201).json({
            success: true,
            message: "Portfolio created successfully!",
            data: portfolio
        });

    } catch (error) {
        console.error("Portfolio creation error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Unable to save portfolio."
        });
    }
});

// GET ALL PORTFOLIOS
router.get("/", async (req, res) => {
    try {
        const portfolios = await Portfolio.find()
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        res.json(portfolios);

    } catch (error) {
        console.error("Portfolio loading error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load portfolios."
        });
    }
});

module.exports = router;