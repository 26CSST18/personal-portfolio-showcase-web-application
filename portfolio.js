const portfolioForm = document.getElementById("portfolioForm");
const projectsContainer = document.getElementById("projectsContainer");
const addProjectButton = document.getElementById("addProject");
const formMessage = document.getElementById("formMessage");

// Add another project
addProjectButton.addEventListener("click", () => {
    const projectEntry = document.createElement("div");

    projectEntry.className = "project-entry";

    projectEntry.innerHTML = `
        <hr>
        <label>Project Title</label>
        <input type="text" name="projectTitle[]" placeholder="Project name">

        <label>Project Description</label>
        <textarea name="projectDescription[]" rows="3"
            placeholder="Describe your project"></textarea>

        <label>Project Link</label>
        <input type="url" name="projectLink[]" placeholder="https://example.com">

        <button type="button" class="secondary-btn remove-project">
            Remove Project
        </button>
    `;

    projectsContainer.appendChild(projectEntry);
});

// Remove a project
projectsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-project")) {
        event.target.closest(".project-entry").remove();
    }
});

// Submit portfolio
portfolioForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formMessage.textContent = "Saving your portfolio...";

    const formData = new FormData(portfolioForm);

    const projects = formData.getAll("projectTitle[]").map((title, index) => ({
        title: title.trim(),
        description: formData.getAll("projectDescription[]")[index].trim(),
        link: formData.getAll("projectLink[]")[index].trim()
    })).filter(project =>
        project.title || project.description || project.link
    );

    const portfolioData = {
        fullName: formData.get("fullName"),
        role: formData.get("role"),
        email: formData.get("email"),
        location: formData.get("location"),
        gender: formData.get("gender"),
        course: formData.get("course"),
        education: formData.get("education"),
        about: formData.get("about"),
        github: formData.get("github"),
        linkedin: formData.get("linkedin"),
        projects: projects,
        theme: formData.get("theme")
    };

    try {
        const response = await fetch("/api/portfolios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(portfolioData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save portfolio.");
        }

        formMessage.textContent = "Portfolio saved successfully!";

window.location.href = "/portfolio.html";
    } catch (error) {
        formMessage.textContent = error.message;
    }
});