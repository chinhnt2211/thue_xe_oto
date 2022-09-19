import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useDebounce } from '@/hooks';

function BrandInput() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([1,2]);
    const [showResult, setShowResult] = useState(true);
    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        
    }, [debouncedSearch]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className="md:col-span-1 relative">
            <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Hang Xe
            </label>
            <HeadlessTippy
                placement="bottom"
                interactive
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div
                        {...attrs}
                        className="w-auto mx-auto md:w-[94px] lg:w-[106px] sm:w-[558px]
                            max-h-[250px] bg-white rounded-lg border overflow-y-scroll overscroll-contain"
                        tabIndex="-1"
                    >
                        <button
                            type='button'
                            className="hover:bg-gray-100 py-3 px-4 text-left">
                            Chinh
                        </button>
                    </div>
                )}
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        id="first_name"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                    />
                </div>

            </HeadlessTippy>
        </div>
    );
}

export default BrandInput;