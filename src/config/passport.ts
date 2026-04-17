import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) return done(new Error("No email"), undefined);

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              password: "", // OAuth no necesita password
            },
          });
        }

        return done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);

export default passport;