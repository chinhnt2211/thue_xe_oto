import { CardVehicles } from '@/components/Cards';

export default function Vehicles() {
    return (
        <div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardVehicles />
                </div>
            </div>
        </div>
    );
}
