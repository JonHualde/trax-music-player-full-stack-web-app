import { Box } from "@chakra-ui/layout";
import PlayerBar from "./playerBar";

// Components
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0" height="calc(100% - 100px)">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px" height="calc(100vh - 100px)">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0" height="100px">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
