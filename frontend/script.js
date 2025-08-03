async function sendEmail() {
    const email = document.getElementById("emailInput").value;
    const count = document.getElementById("countInput").value;
    const subject = document.getElementById("subjectInput").value;
    const message = document.getElementById("messageInput").value;
    const statusText = document.getElementById("status");

    if (!email || !count || !subject || !message) {
        statusText.innerText = "All fields are required!";
        return;
    }

    statusText.innerText = "Sending emails...";

    try {
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, count, subject, message }),
        });

        const data = await response.json();
        statusText.innerText = data.message;
    } catch (error) {
        console.error("Error:", error);
        statusText.innerText = "An error occurred while sending the email!";
    }
}