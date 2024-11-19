import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { usePostStore } from '../stores/postStore';
import SearchFilters, { FilterOptions } from './SearchFilters';
import PostPreview from './PostPreview';
import PostModal from './PostModal';
import { Box } from '@chakra-ui/react';
import { Post } from '../types';

export default function MapComponent() {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const { posts, filteredPosts, filterPosts } = usePostStore();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleMarkerClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handlePreviewClick = () => {
    setIsDetailModalOpen(true);
  };

  const handleFilter = (filters: FilterOptions) => {
    filterPosts(filters, center);
  };

  return (
    <Box position="relative" h="100vh">
      <Box position="absolute" top={4} left={4} zIndex={1} maxW="300px">
        <SearchFilters onFilter={handleFilter} />
      </Box>
      
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        level={3}
        onClick={() => setSelectedPost(null)}
      >
        {(filteredPosts.length > 0 ? filteredPosts : posts).map((post) => (
          <div key={post.id}>
            <MapMarker
              position={post.location}
              onClick={() => handleMarkerClick(post)}
            />
            {selectedPost?.id === post.id && (
              <CustomOverlayMap
                position={post.location}
                yAnchor={1.2}
              >
                <PostPreview post={post} onClick={handlePreviewClick} />
              </CustomOverlayMap>
            )}
          </div>
        ))}
      </Map>

      {selectedPost && (
        <PostModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          post={selectedPost}
        />
      )}
    </Box>
  );
}