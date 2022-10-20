import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';

import { CardStats } from '@/components/Cards';

export default function HeaderStats() {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const [contracts, setContracts] = useState([]);
    const [lastMonthContracts, setLastMonthContracts] = useState([]);
    const [bills, setBills] = useState([]);
    const [lastMonthBills, setLastMonthBills] = useState([]);

    let [revenue, setRevenue] = useState(0);
    let [lastMonthRevenue, setLastMonthRevenue] = useState(0);
    useEffect(() => {
        const fetchContractApi = async () => {
            let now = new Date();
            let lastMonth = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
            let twoMonthAgo = now.getFullYear() - 1 + '-' + now.getMonth() + '-' + now.getDate();

            let path = import.meta.env.VITE_API_VERSION + '/contracts?';

            const options = {
                headers: {
                    Authorization: typeToken + ' ' + accessToken,
                },
            };

            let result = await httpRequest.get(path + 'min_date=' + lastMonth, options);
            setContracts(result.data);

            let resultLastMonth = await httpRequest.get(
                path + 'max_date=' + lastMonth + '&min_date=' + twoMonthAgo,
                options,
            );

            setLastMonthContracts(resultLastMonth.data);
        };

        const fetchBillApi = async () => {
            let now = new Date();
            let lastMonth = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
            let twoMonthAgo = now.getFullYear() - 1 + '-' + now.getMonth() + '-' + now.getDate();
            let path = import.meta.env.VITE_API_VERSION + '/bills?';

            const options = {
                headers: {
                    Authorization: typeToken + ' ' + accessToken,
                },
            };

            let result = await httpRequest.get(path + 'start_date=' + lastMonth, options);
            let resultLastMonth = await httpRequest.get(
                path + 'end_date=' + lastMonth + '&start_date=' + twoMonthAgo,
                options,
            );

            console.log(result.data);

            let totalPay = 0;
            let totalRefund = 0;
            let totalPayLastMonth = 0;
            let totalRefundLastMonth = 0;

            result.data.forEach((value) => {
                if (value.type === config.enums.exchange.pay) {
                    totalPay += value.total;
                } else {
                    totalRefund += value.total;
                }
            });
            resultLastMonth.data.forEach((value) => {
                if (value.type === config.enums.exchange.pay) {
                    totalPayLastMonth += value.total;
                } else {
                    totalRefundLastMonth += value.total;
                }
            });

            setRevenue(totalPay - totalRefund);
            setLastMonthRevenue(totalPayLastMonth - totalRefundLastMonth);
            setBills(result.data);
            setLastMonthBills(resultLastMonth.data);
        };

        fetchBillApi();
        fetchContractApi();
    }, []);
    return (
        <div>
            {/* Header */}
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Hợp đồng"
                                    statTitle={contracts.length.toString()}
                                    statArrow={contracts.length >= lastMonthContracts.length ? 'up' : 'down'}
                                    statPercent={
                                        lastMonthContracts.length == 0
                                            ? '100'
                                            : (contracts.length / lastMonthContracts.length - 1).toFixed(2).toString()
                                    }
                                    statPercentColor={
                                        contracts.length >= lastMonthContracts.length
                                            ? 'text-emerald-500'
                                            : 'text-red-500'
                                    }
                                    statDescripiron="So với tháng trước"
                                    statIconName="fa-solid fa-file-contract"
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Doanh thu"
                                    statTitle={revenue.toString()}
                                    statArrow={revenue >= lastMonthRevenue ? 'up' : 'down'}
                                    statPercent={
                                        lastMonthRevenue == 0
                                            ? '100'
                                            : (1 - revenue / lastMonthRevenue).toFixed(2).toString()
                                    }
                                    statPercentColor={revenue >= lastMonthRevenue ? 'text-emerald-500' : 'text-red-500'}
                                    statDescripiron="So với tháng trước"
                                    statIconName="fa-solid fa-money-bill"
                                    statIconColor="bg-green-500"
                                />
                            </div>
                            {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="SALES"
                                    statTitle="924"
                                    statArrow="down"
                                    statPercent="1.10"
                                    statPercentColor="text-orange-500"
                                    statDescripiron="Since yesterday"
                                    statIconName="fas fa-users"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="PERFORMANCE"
                                    statTitle="49,65%"
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
