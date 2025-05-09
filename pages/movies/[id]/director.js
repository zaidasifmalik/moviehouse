import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Director() {
  const router = useRouter();
  const { id } = router.query;
  const { data: director, error } = useSWR(
    id ? `/api/directors/${id}` : null,
    fetcher
  );

  if (error) return <Box>Error loading director</Box>;
  if (!director) return <Box>Loading...</Box>;

  return (
    <Box p={4}>
      <Heading>{director.name}</Heading>
      <Text mt={2}>{director.biography}</Text>
      <Heading size="md" mt={4}>
        Movies Directed
      </Heading>
      <List spacing={2} mt={2}>
        {director.movies.map((movie) => (
          <ListItem key={movie._id}>{movie.title}</ListItem>
        ))}
      </List>
    </Box>
  );
}
