const fetch = require("node-fetch");

const SERVER_URL = "http://localhost:3000/api/ecg";

async function sendFakeECGData() {
  const fakeValue = (Math.random() * 2 + 1).toFixed(2);

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: fakeValue }),
    });

    if (response.ok) {
      console.log(`Sent ECG Data: ${fakeValue}`);
    } else {
      console.error("Failed to send ECG data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

setInterval(sendFakeECGData, 1000);
