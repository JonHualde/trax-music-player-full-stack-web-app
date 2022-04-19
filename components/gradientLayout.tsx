import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  children,
  color,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="scroll"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.800 45%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding={"20px"} lineHeight="45px" color="white">
          <Text fontSize={"xs"} fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize={"6xl"}>{title}</Text>
          <Text fontSize={"xs"} fontWeight="400">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="40px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
