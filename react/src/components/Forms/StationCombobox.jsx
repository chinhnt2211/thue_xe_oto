import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';
import { useDebounce } from '@/hooks';

export default function StationCombobox({
    setDefaultStationId = null,
    getStationId,
    isEdit = true,
}) {
    const [path, setPath] = useState(import.meta.env.VITE_API_VERSION + '/stations');
    const [selected, setSelected] = useState({});
    const [query, setQuery] = useState('');
    const debouncedSearch = useDebounce(query, 300);
    const [filteredStations, setFilteredStations] = useState([]);

    useEffect(() => {
        if (setDefaultStationId != null) {
            httpRequest.get(path + '/' + setDefaultStationId.toString()).then((response) => {
                setSelected(response.data);
            });
        }
    }, [setDefaultStationId]);

    useEffect(() => {
        if (debouncedSearch == '') {
            setPath(import.meta.env.VITE_API_VERSION + '/stations');
        } else {
            setPath(import.meta.env.VITE_API_VERSION + '/stations?name=' + debouncedSearch);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        const fetchApi = async (path) => {
            try {
                const result = await httpRequest.get(path);
                if (setDefaultStationId == null && result.data[0]) {
                    setSelected(result.data[0]);
                }
                setFilteredStations(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi(path);
    }, [path]);
    useEffect(() => {
        getStationId(selected);
    }, [selected]);
    return (
        <div className="w-full lg:w-7/12 px-4 ">
            <Combobox value={selected} onChange={setSelected} disabled={!isEdit}>
                <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Trạm xe</span>
                <div className="flex">
                    <div className="relative w-full mb-3">
                        <div
                            className={
                                (isEdit ? 'border-gray-300' : 'bg-blueGray-100 border-blueGray-100') +
                                ' border px-2 py-2  text-black bg-white rounded-md focus:ring w-full ease-linear transition-all duration-150'
                            }
                        >
                            <Combobox.Input
                                className="disabled:bg-blueGray-100 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(station) => station.name}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            {isEdit && (
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Combobox.Button>
                            )}
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="z-50 absolute mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredStations.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredStations.map((station) => (
                                        <Combobox.Option
                                            key={station.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                                    active ? 'bg-lightBlue-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            value={station}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                    >
                                                        {station.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? 'text-white' : 'text-lightBlue-600'
                                                            }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </div>
            </Combobox>
        </div>
    );
}
