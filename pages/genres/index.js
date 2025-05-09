import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Genres() {
  const { data: genres, error } = useSWR("/api/genres", fetcher);

  if (error) return <Box>Error loading genres</Box>;
  if (!genres) return <Box>Loading...</Box>;

  return (
    <Box p={4}>
      <Heading mb={6}>Genres</Heading>
      <List spacing={3}>
        {genres.map((genre) => (
          <ListItem key={genre._id}>
            <Link href={`/genres/${genre._id}`}>
              <Box as="span" _hover={{ color: "teal.500" }}>
                {genre.name}
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
