import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import DistrictsJSON from 'hanhchinhvn/dist/quan_huyen.json';
import CitiesJSON from 'hanhchinhvn/dist/tinh_tp.json';
import { useDebounce } from '@/hooks';


const districts = Object.values(DistrictsJSON);
const cities = Object.values(CitiesJSON);
const locations = cities.concat(districts);


function LocationInput({ getLocation }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        getLocation(searchValue);
    }, [searchValue]);

    useEffect(() => {
        let filteredResults =
            debouncedSearch === ''
                ? []
                : locations.filter((location) => {
                    let result = true;
                    debouncedSearch
                        .toLowerCase()
                        .replace(',', ' ')
                        .split(' ')
                        .map((value) => {
                            if (!location.name_with_type.toLowerCase().includes(value)) {
                                if ('path_with_type' in location) {
                                    if (!location.path_with_type.toLowerCase().includes(value)) {
                                        result = false;
                                    }
                                } else {
                                    result = false;
                                }
                            }
                        });
                    return result;
                });
        setSearchResult(filteredResults);
    }, [debouncedSearch])

    const handleHideResult = () => {
        const value = 'path_with_type' in searchResult[0] ? searchResult[0]['path_with_type'] : searchResult[0]['name_with_type'];
        setSearchValue(value);
        setShowResult(false);
    };

    return (
        <div className="mb-5 relative">
            <label
                htmlFor="simple-search"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Khu vực
            </label>
            <HeadlessTippy
                placement="bottom"
                interactive
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div
                        className="w-full sm:w-[558px] md:w-[686px] lg:w-[758px] mx-auto 
            max-h-[250px] bg-white rounded-lg border overflow-y-scroll overscroll-contain"
                        tabIndex="-1"
                        {...attrs}
                    >
                        {searchResult.map((value) => (
                            <button
                                type='button'
                                key={value.code}
                                onClick={() => {
                                    const result = 'path_with_type' in value ? value.path_with_type : value.name_with_type;
                                    setSearchValue(result);
                                    setShowResult(false);
                                }}
                                className="hover:bg-gray-100 py-3 px-4 w-full text-left">
                                {/* {{ '' }} */}
                                {'path_with_type' in value ? value.path_with_type : value.name_with_type}
                            </button>

                        ))}
                    </div>
                )}
            >
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        // spellCheck={false}
                        value={searchValue}
                        onFocus={(e) => {
                            setShowResult(true);
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Thành phố, Tỉnh, Quận, Huyện, ..."
                    />
                </div>
            </HeadlessTippy>
        </div>

    );
}

export default LocationInput;