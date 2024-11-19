import { Box, Text, Badge, VStack, HStack, Avatar } from '@chakra-ui/react';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostPreviewProps {
  post: Post;
  onClick: () => void;
}

const categoryColors = {
  review: 'purple',
  info: 'blue',
  qa: 'green',
  chat: 'gray',
  tips: 'orange',
  poll: 'pink',
  social: 'red',
};

export default function PostPreview({ post, onClick }: PostPreviewProps) {
  return (
    <Box
      onClick={onClick}
      bg="white"
      p={4}
      borderRadius="lg"
      shadow="md"
      cursor="pointer"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      transition="all 0.2s"
      maxW="300px"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Badge colorScheme={categoryColors[post.category]}>
            {post.category.toUpperCase()}
          </Badge>
          <Text fontSize="sm" color="gray.500">
            {formatDistanceToNow(new Date(post.createdAt), { locale: ko, addSuffix: true })}
          </Text>
        </HStack>

        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
          {post.title}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {post.content}
        </Text>

        <HStack spacing={2}>
          <Avatar size="sm" src={post.author.avatar} name={post.author.username} />
          <Text fontSize="sm">{post.author.username}</Text>
        </HStack>

        <HStack spacing={4} fontSize="sm" color="gray.500">
          <HStack>
            <Text>👍 {post.likes}</Text>
          </HStack>
          <HStack>
            <Text>💬 {post.comments.length}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}