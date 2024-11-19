import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  Avatar,
  Text,
  Badge,
  Divider,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
  location?: { lat: number; lng: number };
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

export default function PostModal({ isOpen, onClose, post, location }: PostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'info',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시물 생성 로직
    onClose();
  };

  if (post) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack justify="space-between">
              <Badge colorScheme={categoryColors[post.category]}>
                {post.category.toUpperCase()}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                {formatDistanceToNow(new Date(post.createdAt), { locale: ko, addSuffix: true })}
              </Text>
            </HStack>
            <Text mt={2}>{post.title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Avatar size="md" src={post.author.avatar} name={post.author.username} />
                <Box>
                  <Text fontWeight="bold">{post.author.username}</Text>
                  <Text fontSize="sm" color="gray.500">
                    관심사: {post.author.interests.join(', ')}
                  </Text>
                </Box>
              </HStack>

              <Divider />

              <Text whiteSpace="pre-wrap">{post.content}</Text>

              <Divider />

              <HStack spacing={4}>
                <Button variant="ghost" leftIcon={<Text>👍</Text>}>
                  좋아요 {post.likes}
                </Button>
                <Button variant="ghost" leftIcon={<Text>💬</Text>}>
                  댓글 {post.comments.length}
                </Button>
              </HStack>

              <Box>
                <Text fontWeight="bold" mb={2}>
                  댓글
                </Text>
                <VStack align="stretch" spacing={3}>
                  {post.comments.map((comment) => (
                    <Box key={comment.id} p={2} bg="gray.50" borderRadius="md">
                      <HStack mb={1}>
                        <Avatar size="xs" src={comment.author.avatar} name={comment.author.username} />
                        <Text fontWeight="bold">{comment.author.username}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            locale: ko,
                            addSuffix: true,
                          })}
                        </Text>
                      </HStack>
                      <Text ml={8}>{comment.content}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>새 게시물 작성</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>카테고리</FormLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="review">리뷰</option>
                <option value="info">정보</option>
                <option value="qa">Q&A</option>
                <option value="chat">잡담</option>
                <option value="tips">꿀팁</option>
                <option value="poll">투표</option>
                <option value="social">소셜링</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>내용</FormLabel>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
              작성하기
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}