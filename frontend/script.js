const BACKEND_URL = "http://127.0.0.1:8000";

// Encode JWT
async function encode() {
  const payloadText = document.getElementById("payload").value;

  let payloadObj;
  try {
    payloadObj = JSON.parse(payloadText);
  } catch (err) {
    alert("Invalid JSON!");
    return;
  }

  const response = await fetch(`${BACKEND_URL}/encode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      payload: JSON.stringify(payloadObj)
    })
  });

  const data = await response.json();
  document.getElementById("token").value =
    data.token || "Error generating token";
}

// Decode JWT
async function decode() {
  const token = document.getElementById("token").value;

  const response = await fetch(`${BACKEND_URL}/decode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token   // 🔴 MUST MATCH DecodeRequest
    })
  });

  const data = await response.json();

  if (!response.ok) {
    document.getElementById("decoded").value = data.detail;
    return;
  }

  document.getElementById("decoded").value =
    JSON.stringify(data, null, 2);
}


// Verify JWT using public key
async function verify() {
  console.log("Verify button clicked");

  const token = document.getElementById("token").value;
  const publicKey = document.getElementById("publicKey").value;

  const response = await fetch(`${BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token,
      public_key: publicKey
    })
  });

  const data = await response.json();
  document.getElementById("verifyResult").value =
    JSON.stringify(data, null, 2);
}
