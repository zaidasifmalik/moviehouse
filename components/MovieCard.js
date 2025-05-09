import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      <Heading size="md">{movie.title}</Heading>
      <Text mt={2}>{movie.description}</Text>
      <Text mt={2}>Rating: {movie.rating}</Text>
      <Link href={`/movies/${movie.id}`}>
        <Button mt={4} colorScheme="teal">
          View Details
        </Button>
      </Link>
    </Box>
  );
}
