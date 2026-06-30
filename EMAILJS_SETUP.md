# EmailJS Setup Instructions

To enable the contact form functionality, you need to set up EmailJS:

## Steps:

1. **Create an EmailJS Account**
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Sign up or log in to your account

2. **Create an Email Service**
   - Go to "Email Services" and add a new service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an Email Template**
   - Go to "Email Templates" and create a new template
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_email}}` - Your email address
     - `{{date_time}}` - Timestamp
     - `{{user_login}}` - Your username

4. **Get Your Credentials**
   - Service ID: From your email service
   - Template ID: From your email template
   - Public Key: From Account > API Keys

5. **Update Environment Variables**
   - Open the `.env` file in the project root
   - Replace the placeholder values with your actual EmailJS credentials:
     ```
     VITE_SERVICE_ID=service_xxxxxxx
     VITE_TEMPLATE_ID=template_xxxxxxx
     VITE_PUBLIC_KEY=xxxxxxxxxxxxxxx
     ```

6. **Restart Development Server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

## Example Email Template:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Date: {{date_time}}
User: {{user_login}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

## Fallback:

If EmailJS is not configured, the contact form will show a message directing users to contact you directly at chandruk.23cse@kongu.edu.
