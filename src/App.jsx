import SettingsContextProvider from "./context/SettingsContext";
import IRouters from "./routes";

export default function App() {
  return (
    <SettingsContextProvider>
      <IRouters />
    </SettingsContextProvider>
  );
}
