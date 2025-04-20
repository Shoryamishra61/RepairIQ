document.getElementById("submit").addEventListener("click", function() {
    const imageFile = document.getElementById("imageUpload").files[0];
    const description = document.getElementById("description").value;

    if (imageFile || description) {
        // Placeholder for API call
        // Simulate API response
        const diagnosis = "Detected issue: Flat tire";
        const parts = "Required parts: Tire, Valve";
        const delivery = "Estimated delivery: 2-3 days";

        // Display results
        document.getElementById("diagnosis").innerText = diagnosis;
        document.getElementById("parts").innerText = parts;
        document.getElementById("delivery").innerText = delivery;

        document.getElementById("results").style.display = "block";
    } else {
        alert("Please upload an image or enter a description.");
    }
});