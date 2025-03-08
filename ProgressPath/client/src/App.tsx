import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import UserProvider from "./context/userContext";
import { IdeaProvider } from "./context/ideaContext";
import { GoalsProvider } from "./context/goalContext";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token") || "";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedIdeas: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <IdeaProvider>
            <GoalsProvider>
              <main>
                <Outlet />
              </main>
            </GoalsProvider>
          </IdeaProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;