import "./App.css";
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
import "bootstrap/dist/css/bootstrap.min.css";
import { IdeaProvider } from "./context/ideaContext";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <IdeaProvider>
            <div>
              <main>
                <Outlet />
              </main>
            </div>
          </IdeaProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

