const feedbackForm = document.getElementById("feedbackForm");
const feedbackMessage = document.getElementById("feedbackMessage");

feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    feedbackMessage.textContent = "Submitting feedback...";

    const formData = new FormData(feedbackForm);

    const feedbackData = {
        name: formData.get("name"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
        message: formData.get("message")
    };

    try {
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to submit feedback.");
        }

        feedbackMessage.textContent = result.message;
        feedbackForm.reset();

    } catch (error) {
        feedbackMessage.textContent = error.message;
    }
});