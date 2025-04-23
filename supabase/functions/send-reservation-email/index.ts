// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// <div style="font-family: Arial, sans-serif; line-height: 1.6;">
// <h2>📅 Novi zahtev za zakazivanje servisa</h2>
// <p>Vozilo: <strong>${carModel}</strong></p>
// <p>Kategorija: <strong>${serviceCat}</strong></p>
// <p>Broj sasije: <strong>${chassisNumber}</strong></p>
// <p>Datum: <strong>${date}</strong></p>
// <hr />
// <h3>📄 Podaci korisnika:</h3>
// <p>Email: <strong>${userEmail}</strong></p>
// <p>Broj telefona: <strong>${phoneNumber}</strong></p>
// <p>Napomena korisnika: <strong>${notes}</strong></p>
// <hr />
// <p>Ova poruka je automatski generisana iz sistema za rezervaciju servisa.</p>
// </div>

const handler = async (request) => {
  const { carModel, date, userEmail, chassisNumber, serviceCat, phoneNumber, notes } = await request.json();
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'eldin_s12@hotmail.com',
      subject: 'Zakazivanje servisa: MERCEDES-BENZ G63 AMG',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>📅 Novi zahtev za zakazivanje servisa</h2>
        <p>Vozilo: <strong>${carModel}</strong></p>
        <p>Kategorija: <strong>${serviceCat}</strong></p>
        <p>Broj sasije: <strong>${chassisNumber}</strong></p>
        <p>Datum: <strong>${date}</strong></p>
        <hr />
        <h3>📄 Podaci korisnika:</h3>
        <p>Email: <strong>${userEmail}</strong></p>
        <p>Broj telefona: <strong>${phoneNumber}</strong></p>
        <p>Napomena korisnika: <strong>${notes}</strong></p>
        <hr />
        <p>Ova poruka je automatski generisana iz sistema za rezervaciju servisa.</p>
        </div>
      `,
    })  
  })

  const data = await res.json()

  console.log('Resend response:', data)

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)