-- Create email templates table
CREATE TABLE public.email_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Allow public read (edge function needs to read)
CREATE POLICY "Email templates are readable by everyone" 
ON public.email_templates 
FOR SELECT 
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage email templates" 
ON public.email_templates 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default booking confirmation template
INSERT INTO public.email_templates (id, name, subject, body, description) VALUES (
  'booking_confirmation',
  'Booking Confirmation',
  'Booking Request Received - {{firstName}}',
  '<h1>Thank you for your booking request, {{firstName}}!</h1>

<p>I have received your tattoo consultation request and will review it carefully.</p>

<h2>Your Booking Details</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 500px;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{firstName}} {{lastName}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{location}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Placement:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{tattooPlacement}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Size:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{tattooSize}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{preferredDate}}</td>
  </tr>
</table>

<p style="margin-top: 20px;">You can expect to hear back from me within <strong>24-48 hours</strong>.</p>

<p style="margin-top: 30px;">Best regards,<br><strong>Okan Uckun</strong></p>',
  'Email sent to clients after they submit a booking request. Available variables: {{firstName}}, {{lastName}}, {{email}}, {{location}}, {{tattooPlacement}}, {{tattooSize}}, {{preferredDate}}'
);