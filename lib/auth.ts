import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    socialProviders: { 
        github: { 
           clientId: env.GITHUB_CLIENT_ID,
           clientSecret:env.GITHUB_CLIENT_SECRET,
        }, 
        google: { 
           clientId: process.env.GOOGLE_CLIENT_ID as string, 
           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
    },
    plugins:[
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type}) { 
                const { data, error } = await resend.emails.send({
                    from: 'EduNova <onboarding@resend.dev>',
                    to: [email ],
                    subject: 'EduNova - Email Verification',
                    html:`
                    <p>Hi there,</p>
                    <p>Thank you for signing up with EduNova! Please use the following code to verify your email address:</p>
                    <h2 style="font-size: 24px; font-weight: bold;">${otp}</h2>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Best regards,</p>
                    <p>EduNova Team</p>
                    
                    `
                  });
                  
            }, 
    }) 
    ]
});