import { ButtonGroup, Flex, Text, Box, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderTrack, RangeSliderThumb, Center } from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdOutlinePlayCircleFilled, MdOutlinePauseCircleFilled, MdOutlineRepeat } from "react-icons/md";
import { useStoreActions } from "easy-peasy";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [seek, setSeek] = useState<number>(0.0);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const soundRef = useRef(null);

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }

        return next;
      } else {
        return state === songs.length - 1 ? 0 : state + 1;
      }
    });
  };

  const previousSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} />{" "}
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            onClick={() => onShuffle()}
            color={shuffle ? "white" : "gray.600"}
            icon={<MdShuffle />}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
          />
          <IconButton onClick={previousSong} icon={<MdSkipPrevious />} outline="none" variant="link" aria-label="skip" fontSize="24px" />
          {playing ? (
            <IconButton
              onClick={() => setPlayState(false)}
              icon={<MdOutlinePauseCircleFilled />}
              color="white"
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
            />
          ) : (
            <IconButton
              onClick={() => setPlayState(true)}
              icon={<MdOutlinePlayCircleFilled />}
              color="white"
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
            />
          )}
          <IconButton onClick={nextSong} icon={<MdSkipNext />} outline="none" variant="link" aria-label="skip" fontSize="24px" />
          <IconButton
            onClick={() => onRepeat()}
            color={repeat ? "white" : "gray.600"}
            icon={<MdOutlineRepeat />}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider aria-label={("min", "max")} step={0.1} min={0} max={100} id="player-range">
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">321</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
