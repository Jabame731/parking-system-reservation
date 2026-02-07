import { generatePaypalAccessToken, paypal } from "./paypal";

// Test to generate access token from paypal
test("generates token from paypal", async () => {
  const tokenResponse = await generatePaypalAccessToken();

  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test("creates a paypal order", async () => {
  const token = await generatePaypalAccessToken();

  const price = 25.0;

  const orderResponse = await paypal.createReservation(price);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

// Test to capture payment with mock order
test("simulate capturing a payment from a reservation", async () => {
  const reservationId = "123";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(reservationId);

  expect(captureResponse).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore;
});
