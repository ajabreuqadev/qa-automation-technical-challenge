
import { test, expect } from '@playwright/test';

test('Create, read, update and delete a booking', async ({ request }) => {
  test.setTimeout(90000);

  // 1. Obtener token
  const authResponse = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);

  const authData = await authResponse.json();
  expect(authData.token).toBeTruthy();

  const token = authData.token;

  // 2. Crear reserva
  const booking = {
    firstname: 'QA',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-12-10',
      checkout: '2026-12-15'
    },
    additionalneeds: 'Breakfast'
  };

  const createResponse = await request.post('/booking', {
    data: booking
  });

  expect(createResponse.status()).toBe(200);

  const created = await createResponse.json();
  expect(created.bookingid).toBeGreaterThan(0);
  expect(created.booking).toMatchObject(booking);

  const bookingId = created.bookingid;

  // 3. Consultar reserva
  const getResponse = await request.get(`/booking/${bookingId}`);

  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toMatchObject(booking);

  // 4. Modificar reserva
  const updatedBooking = {
    ...booking,
    firstname: 'Updated',
    totalprice: 200
  };

  const updateResponse = await request.put(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    },
    data: updatedBooking
  });

  expect(updateResponse.status()).toBe(200);
  expect(await updateResponse.json()).toMatchObject(updatedBooking);

  // Comprobar que se guardaron los cambios
  const verifyResponse = await request.get(`/booking/${bookingId}`);

  expect(verifyResponse.status()).toBe(200);
  expect(await verifyResponse.json()).toMatchObject(updatedBooking);

  // 5. Eliminar reserva
  const deleteResponse = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    }
  });

  expect(deleteResponse.status()).toBe(201);

  // Comprobar que ya no existe
  const deletedBooking = await request.get(`/booking/${bookingId}`);
  expect(deletedBooking.status()).toBe(404);
});
