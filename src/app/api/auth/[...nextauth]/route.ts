import Auth0Provider from 'next-auth/providers/auth0';
import NextAuth, { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    Auth0Provider({
      clientId: <string>process.env.AUTH0_CLIENTID,
      clientSecret: <string>process.env.AUTH0_CLIENTSECRET,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
      token: {
        params: {
          audience: process.env.AUTH0_AUDIENCE
        }
      },
      authorization: {
        params: {
          audience: encodeURI(<string>process.env.AUTH0_AUDIENCE)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs to auth0
      else if (new URL(url).hostname === process.env.AUTH0_DOMAIN) return url;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
