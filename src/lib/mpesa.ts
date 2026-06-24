export async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const env = process.env.MPESA_ENV || "sandbox";

  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa Consumer Key or Secret is missing");
  }

  const url =
    env === "production"
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
    // We shouldn't cache the token response like this because tokens expire.
    // However, in a production app, we'd cache it until it expires (3599 seconds).
    cache: "no-store", 
  });

  if (!response.ok) {
    throw new Error(`Failed to get M-Pesa token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export async function initiateStkPush(phoneNumber: string, amount: number, orderNumber: string) {
  const token = await getMpesaToken();
  const env = process.env.MPESA_ENV || "sandbox";
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  if (!shortCode || !passkey || !callbackUrl) {
    throw new Error("M-Pesa environment variables are missing");
  }

  const url =
    env === "production"
      ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  // Generate password
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3); // YYYYMMDDHHmmss
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

  // Format phone number to 254...
  let formattedPhone = phoneNumber.replace(/\s+/g, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = `254${formattedPhone.substring(1)}`;
  } else if (formattedPhone.startsWith("+")) {
    formattedPhone = formattedPhone.substring(1);
  }

  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.ceil(amount), // Mpesa takes integers
    PartyA: formattedPhone,
    PartyB: shortCode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: orderNumber.substring(0, 12), // Max 12 chars
    TransactionDesc: "Payment for Order " + orderNumber,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.ResponseCode !== "0") {
    console.error("STK Push Failed", data);
    throw new Error(`M-Pesa STK Push Failed: ${data.errorMessage || data.CustomerMessage || "Unknown Error"}`);
  }

  return data;
}
