require("dotenv").config();

const base =
  process.env.PAYPAL_CLIENT_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {
  createReservation: async function createReservation(price: number) {
    const accessToken = await generatePaypalAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "PHP",
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  },

  capturePayment: async function capturePayment(id: string) {
    const accessToken = await generatePaypalAccessToken();
    const url = `${base}/v2/checkout/orders/${id}/capture`;

    // Check current order status before attempting capture
    const checkUrl = `${base}/v2/checkout/orders/${id}`;
    const checkResponse = await fetch(checkUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const orderData = await handleResponse(checkResponse);

    // 2. Gracefully handle if already captured
    if (orderData.status === "COMPLETED") {
      console.log(`Order ${id} was already captured. Returning existing data.`);
      return orderData;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(response);
  },
};

// Generate paypal access token
export const generatePaypalAccessToken = async () => {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64",
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
};

async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
