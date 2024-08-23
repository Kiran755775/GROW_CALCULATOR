import SIPcalculator from "../SIPcalculator";
import { useState } from "react";
import Lumpsum from "../Lumpsum";
const featuresList = [
    {
        id: 1,
        name: "SIP",
        description: <SIPcalculator />
    },
    {
        id: 2,
        name: "Lumpsum",
        description: <Lumpsum/>
    }
];

export default function Calculators() {
    const [selectedId, setSelectedId] = useState(featuresList[0].id);

    return (
        <>
            
           
            
            <div className="flex p-7">
                {featuresList.map((eachItem) => (
                    

                    <h1
                        key={eachItem.id}
                        className={`text-gray-500 font-semibold ml-4 rounded-md h-6 cursor-pointer mr-5   ${eachItem.id === selectedId ? 'text-green-500' : ''} ${eachItem.id === selectedId ? 'bg-green-100' : ''}`}
                        onClick={() => setSelectedId(eachItem.id)}
                    >
                        {eachItem.name}
                    </h1>
                    
                ))}
            </div>
            <div>
                {featuresList.map((eachItem) =>
                    eachItem.id === selectedId ? (
                        <div key={eachItem.id} className="p-4">
                            {eachItem.description}
                        </div>
                    ) : null
                )}
            </div>
            
            
            
        </>
    );
}

