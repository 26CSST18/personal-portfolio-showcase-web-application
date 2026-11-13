const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
    try {
        const { name, email, contactNumber, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        const feedback = await Feedback.create({
            name,
            email,
            contactNumber,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Feedback submitted successfully!"
        });

    } catch (error) {
        console.error("Feedback error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to submit feedback."
        });
    }
});

module.exports = router;