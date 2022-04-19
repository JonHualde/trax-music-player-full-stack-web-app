import GradientLayout from "../components/gradientLayout";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

// lib
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color="red"
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=1840&userId=&cache=v2"
      subtitle="PROFILE"
      title={`${user ? user.firstName + " " + user.lastName : "Loading..."}`}
      description={`${user.playlistsCount} public playlist${
        user.playlistsCount > 1 ? "s" : ""
      }`}
      roundImage="src"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom={"40px"}>
          <Text fontSize="2xl" fontWeight={"bold"}>
            Top artists of the month
          </Text>
          <Text fontSize={"md"}>only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX={"10px"} width="20%">
              <Box
                bg={"gray.800"}
                borderRadius="4px"
                padding="15px"
                width={"100%"}
              >
                <Image
                  src="https://place-puppy.com/400x400"
                  borderRadius={"100%"}
                  marginBottom="15px"
                />
                <Box>
                  <Text>{artist.name}</Text>
                  <Text>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
