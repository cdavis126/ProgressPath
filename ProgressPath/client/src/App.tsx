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
import { GoalsProvider } from "./context/goalContext";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem("token");
  
  if (!token || token === "undefined" || token === "null") {
    token = "";
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

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
            <GoalsProvider>
              <div>
                <main>
                  <Outlet />
                </main>
              </div>
            </GoalsProvider>
          </IdeaProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

