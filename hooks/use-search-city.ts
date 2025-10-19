import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { getCityBySearch } from '@/api/weather-api';
import { useSettings } from '@/contexts/settings-context';

export const useCitySearch = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { units } = useSettings();

    const searchCity = async (text: string) => {
        const trimmedText = text.trim();

        if (trimmedText.length <= 1) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const searchData = await getCityBySearch(trimmedText, units);
            if (searchData?.list) {
                setSearchResults(searchData.list);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            searchCity(text);
        }, 800),
        [units]
    );

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchResults([]);
    };

    return {
        searchText,
        searchResults,
        isSearching,
        handleSearchTextChange,
        clearSearch,
    };
};