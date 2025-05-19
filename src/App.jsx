// App.js
import { ThemeWrapper } from "./theme";
import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "contexts/AccountProvider";

// function ToggleButton() {
//   const { toggleColorMode } = useColorMode();

//   return (
//     <IconButton
//       onClick={toggleColorMode}
//       color="inherit"
//       sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}
//     >
//       <Delete />
//     </IconButton>
//   );
// }

function App() {
  return (
    <ThemeWrapper>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </GoogleOAuthProvider>
      {/* <ToggleButton /> */}
    </ThemeWrapper>
  );
}

export default App;
