import config from '@/config';
import React, { useState } from 'react';

function Pagination({
    links = {
        first_page_url: null,
        last_page_url: null,
        next_page_url: null,
        prev_page_url: null,
    },
    meta = {
        per_page: 0,
        total: 0,
        count: 0,
        last_page: 0,
        current_page: 0,
    },
    setPath,
}) {
    return (
        <div className="flex flex-col items-center">
            {/* <!-- Help text --> */}
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {meta.per_page * (meta.current_page - 1) + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {meta.total >= meta.per_page * meta.current_page + 1
                        ? meta.per_page * meta.current_page + 1
                        : meta.total}
                </span>{' '}
                of <span className="font-semibold text-gray-900 dark:text-white">{meta.total}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                {/* <!-- Buttons --> */}
                <button
                    onClick={() => {
                        if (links.prev_page_url != null) {
                            setPath(links.prev_page_url);
                        }
                    }}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white rounded-l border-0  border-gray-700 hover:bg-gray-900 bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="mr-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Prev
                </button>
                <button
                    onClick={() => {
                        if (links.next_page_url != null) {
                            setPath(links.next_page_url);
                        }
                    }}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white rounded-r border-0 border-l border-gray-400  hover:bg-gray-900 bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                    <svg
                        aria-hidden="true"
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
export default Pagination;
