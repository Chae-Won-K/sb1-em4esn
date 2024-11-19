import {
  Box,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  Text,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface SearchFiltersProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  category: string;
  distance: number;
  dateRange: {
    start: string;
    end: string;
  };
  keyword: string;
}

export default function SearchFilters({ onFilter }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    distance: 5,
    dateRange: {
      start: '',
      end: '',
    },
    keyword: '',
  });

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Box p={4} bg="white" borderRadius="lg" shadow="md">
      <Stack spacing={4}>
        <Box>
          <Text mb={2}>카테고리</Text>
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">전체</option>
            <option value="review">리뷰</option>
            <option value="info">정보</option>
            <option value="qa">Q&A</option>
            <option value="chat">잡담</option>
            <option value="tips">꿀팁</option>
            <option value="poll">투표</option>
            <option value="social">소셜링</option>
          </Select>
        </Box>

        <Box>
          <Text mb={2}>거리 (km): {filters.distance}km</Text>
          <RangeSlider
            defaultValue={[0, 5]}
            min={0}
            max={20}
            step={1}
            onChange={([_, val]) => setFilters({ ...filters, distance: val })}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>

        <Box>
          <Text mb={2}>날짜 범위</Text>
          <HStack>
            <Input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value },
                })
              }
            />
            <Text>~</Text>
            <Input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value },
                })
              }
            />
          </HStack>
        </Box>

        <Box>
          <Text mb={2}>키워드 검색</Text>
          <Input
            placeholder="검색어를 입력하세요"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />
        </Box>

        <Button colorScheme="blue" onClick={handleFilter}>
          필터 적용
        </Button>
      </Stack>
    </Box>
  );
}