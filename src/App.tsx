import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MapComponent from './components/Map';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <MapComponent />
      </Router>
    </ChakraProvider>
  );
}