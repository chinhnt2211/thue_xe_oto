import { Accordion } from 'flowbite-react';
import miku from '@/assets/images/miku.jpg';
import { SearchVehicles } from '@/components/User/Search';
// import {} from hanhchinhvn;
function Search() {

    const keyat = ()=>{
        ['Ha', 'Noi', 'Thanh'].map((value)=>{ 
            if(!'Thanh Pho Hai Phong, Ha Noi'.includes(value)){ 
                console.log(false)
            }else{
                console.log(true)
            }
        })
    };
	
    return (
        <div>
            <div className="mb-10">
                <img src={miku} className=" object-cover w-full max-h-[500px]" loading="lazy" />
            </div>
            {/* SearchVehicles */}
            <SearchVehicles></SearchVehicles>
        
            {/* Item */}
            <div>
                <div className="container mx-auto lg:max-w-[840px] mb-6">
                    <Accordion alwaysOpen={true}>
                        <Accordion.Panel>
                            <Accordion.Title>What is Flowbite?</Accordion.Title>
                            <Accordion.Content>
                                <a
                                    href="#"
                                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={
                                            'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'
                                        }
                                        alt=""
                                    />
                                    <div className="grid md:grid-cols-4 h-full">
                                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Noteworthy technology acquisitions 2021
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Here are the biggest enterprise technology acquisitions of 2021 so far,
                                                in reverse chronological order.
                                            </p>
                                        </div>
                                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                                1.168.750
                                                <br />
                                                <span className="italic font-normal text-base text-gray-700">
                                                    VND/ngày
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={
                                            'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'
                                        }
                                        alt=""
                                    />
                                    <div className="grid md:grid-cols-4 h-full">
                                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Noteworthy technology acquisitions 2021
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Here are the biggest enterprise technology acquisitions of 2021 so far,
                                                in reverse chronological order.
                                            </p>
                                        </div>
                                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                                1.168.750
                                                <br />
                                                <span className="italic font-normal text-base text-gray-700">
                                                    VND/ngày
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
                <div className="container mx-auto lg:max-w-[840px] mb-6">
                    <Accordion alwaysOpen={true}>
                        <Accordion.Panel>
                            <Accordion.Title>What is Flowbite?</Accordion.Title>
                            <Accordion.Content>
                                <a
                                    href="#"
                                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={
                                            'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'
                                        }
                                        alt=""
                                    />
                                    <div className="grid md:grid-cols-4 h-full">
                                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Noteworthy technology acquisitions 2021
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Here are the biggest enterprise technology acquisitions of 2021 so far,
                                                in reverse chronological order.
                                            </p>
                                        </div>
                                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                                1.168.750
                                                <br />
                                                <span className="italic font-normal text-base text-gray-700">
                                                    VND/ngày
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:h-[150px] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full h-64 rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-l-lg"
                                        src={
                                            'https://i.pinimg.com/originals/a2/d6/f4/a2d6f47442da99d99b5b5d37b5a97cfd.jpg'
                                        }
                                        alt=""
                                    />
                                    <div className="grid md:grid-cols-4 h-full">
                                        <div className="flex flex-col justify-between p-4 leading-normal col-span-3">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Noteworthy technology acquisitions 2021
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Here are the biggest enterprise technology acquisitions of 2021 so far,
                                                in reverse chronological order.
                                            </p>
                                        </div>
                                        <div className="flex p-5 leading-normal col-span-1 items-end justify-end md:text-end">
                                            <p className="mb-2 text-2xl font-bold tracking-tight text-[#f96d01] dark:text-white w-fit">
                                                1.168.750
                                                <br />
                                                <span className="italic font-normal text-base text-gray-700">
                                                    VND/ngày
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Search;
