import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import connectToDB from "@utils/ConnectDB"
import User from "@models/User"
import type { NextAuthOptions } from "next-auth"

const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env!.GOOGLE_CLIENT_SECRET)
    })
  ],
  callbacks: {
    async session({ session }) {
      const userSession = await User.findOne({ email: session!.user!.email })
      Object.assign(session!.user!, { id: String(userSession._id) })
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()
        const userExists = await User.findOne({
          email: profile!.email
        })
        if (!userExists) {
          await User.create({
            email: profile!.email,
            username: profile!.name!.replace(" ", "").toLowerCase(),
            image: profile!.picture
          })
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
