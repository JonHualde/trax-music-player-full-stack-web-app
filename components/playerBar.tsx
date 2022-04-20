import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";
import { useStoreState } from "easy-peasy";

const PlayerBar = () => {
  const songsList = useStoreState((store: any) => store.activeSongs);
  const activeSong = useStoreState((store: any) => store.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
          {activeSong && (
            <>
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </>
          )}
        </Box>
        <Box width="40%">{activeSong && <Player songs={songsList} activeSong={activeSong} />}</Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
