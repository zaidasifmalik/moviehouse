import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Directors() {
  const { data: directors, error } = useSWR("/api/directors", fetcher);

  if (error) return <Box>Error loading directors</Box>;
  if (!directors) return <Box>Loading...</Box>;

  return (
    <Box p={4}>
      <Heading mb={6}>Directors</Heading>
      {directors.map((director) => (
        <Box
          key={director._id}
          mb={8}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Heading size="md">{director.name}</Heading>
          <Text mt={2}>{director.biography}</Text>
          <Heading size="sm" mt={4}>
            Movies Directed
          </Heading>
          <List spacing={2} mt={2}>
            {director.movies.map((movie) => (
              <ListItem key={movie._id}>{movie.title}</ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
