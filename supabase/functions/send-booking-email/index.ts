import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  locationType: string | null;
  guestSpotName?: string;
  collectorType: string | null;
  tattooPlacement: string;
  tattooSize: string;
  portfolioFavorites: string;
  artistInspiration: string;
  story: string;
  preferredDate: string;
  additionalNotes: string;
  referenceImages: string[];
  placementImages: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BookingRequest = await req.json();
    console.log("Received booking request:", data);

    const locationText = data.locationType === 'nyc' 
      ? 'NYC Studio' 
      : data.locationType === 'traveler' 
        ? `Traveler - ${data.location}` 
        : data.guestSpotName || data.location;

    const referenceImagesHtml = data.referenceImages?.length > 0
      ? `<h3>Reference Images:</h3><ul>${data.referenceImages.map(url => `<li><a href="${url}">${url}</a></li>`).join('')}</ul>`
      : '';

    const placementImagesHtml = data.placementImages?.length > 0
      ? `<h3>Placement Photos:</h3><ul>${data.placementImages.map(url => `<li><a href="${url}">${url}</a></li>`).join('')}</ul>`
      : '';

    const emailHtml = `
      <h1>New Tattoo Booking Request</h1>
      
      <h2>Client Information</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.firstName} ${data.lastName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${locationText}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Collector Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.collectorType === 'new' ? 'New Collector' : 'Returning Collector'}</td></tr>
      </table>

      <h2>Tattoo Details</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Placement:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.tattooPlacement || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Size:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.tattooSize || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.preferredDate || 'Flexible'}</td></tr>
      </table>

      <h2>Project Details</h2>
      <h3>Portfolio Favorites:</h3>
      <p>${data.portfolioFavorites || 'Not specified'}</p>
      
      <h3>Artist Inspiration:</h3>
      <p>${data.artistInspiration || 'Not specified'}</p>
      
      <h3>Story/Meaning:</h3>
      <p>${data.story || 'Not specified'}</p>
      
      <h3>Additional Notes:</h3>
      <p>${data.additionalNotes || 'None'}</p>

      ${referenceImagesHtml}
      ${placementImagesHtml}
    `;

    // Send email to admin using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Booking <onboarding@resend.dev>",
        to: ["okanuckun@gmail.com"],
        reply_to: data.email,
        subject: `New Booking Request: ${data.firstName} ${data.lastName}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send admin email:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    console.log("Email sent successfully");

    // Send confirmation email to client
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Okan Uckun <onboarding@resend.dev>",
        to: [data.email],
        subject: "Booking Request Received",
        html: `
          <h1>Thank you for your booking request, ${data.firstName}!</h1>
          <p>I have received your tattoo consultation request and will review it carefully.</p>
          <p>You can expect to hear back from me within 24-48 hours.</p>
          <br>
          <p>Best regards,<br>Okan Uckun</p>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email");
    } else {
      console.log("Confirmation email sent");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
