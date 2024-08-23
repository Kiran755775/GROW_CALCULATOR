import { useState,useMemo,useEffect} from "react"
import {Pie,PieChart,ResponsiveContainer,Cell,Legend} from "recharts"



export default function SIPcalculator(){
    const [investment,setInvestment]= useState(25000)
    const [interest,setInterest]= useState(12)
    const [time,setTime]= useState(10)
    const [totalInvestment,setTotalInvestment]= useState(3000000)
    const [estReturns,setEstREturns]= useState(2808477)
    const [total,setTotal]= useState(5808477)
    
    const handleChange=(event)=>{
        setInvestment(event.target.value);
    }
    const handleInterest=(event)=>{
        setInterest(event.target.value);
    }
    const handleTime=(event)=>{
        setTime(event.target.value)
    }
    useEffect(() => {
        const rDecimal = interest / 100; 
        const rMonthly = rDecimal / 12; 
        const months = time * 12; // Total number of months
        
        const powerTerm = Math.pow(1 + rMonthly, months);
        const value = investment * ((powerTerm - 1) / rMonthly) * (1 + rMonthly);
        
        const totalInvestment = investment * months;
        const returns = value - totalInvestment;
    
        setEstREturns(Math.ceil(parseFloat(returns.toFixed(2)))); 
      }, [investment, interest, time]);

    useEffect(()=>{
        const investmentNum = parseFloat(investment);
        const timeNum= parseFloat(time);
        setTotalInvestment((investmentNum*12*timeNum))
    },[investment,time])
    useEffect(()=>{
        const investmentNum = parseFloat(investment);
        const timeNum= parseFloat(time);
        const totalInvestment=((investmentNum*12*timeNum))
        const rDecimal = interest / 100; 
        const rMonthly = rDecimal / 12; 
        const months = time * 12; // Total number of months
        
        const powerTerm = Math.pow(1 + rMonthly, months);
        const value = investment * ((powerTerm - 1) / rMonthly) * (1 + rMonthly);
        
        const totalInvestment1 = investment * months;
        const returns = value - totalInvestment1;
    
        const est=(Math.ceil(parseFloat(returns.toFixed(2))));
        setTotal(totalInvestment+est)
    },[time,investment,interest])

    const data = useMemo(() => [
        {
            name: "Investment",
            value: parseFloat(totalInvestment),
            fill: "#e6e6f0"
        },
        {
            name: "Estimated Returns",
            value: parseFloat(estReturns),
            fill: "#353be8"
        }
    ], [totalInvestment, estReturns]);
    
    const Chart = () => {
        return (<div className="sm:absolute sm:inset-0 sm:flex sm:items-center sm:justify-center ">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                startAngle={0}
                endAngle={360}
                innerRadius="50%"
                outerRadius="80%"
                dataKey="value"
                animationDuration={0}
              >
                {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} /> // Fill color for each cell
                    ))}
                
              </Pie>
              
            </PieChart>
          </ResponsiveContainer>
          </div>
        )
      }
      return(<div className="relative">
        
        <div className="pb-5 sm:border-gray-500  border-1 sm:w-[30vw] ">
            <div>   
                <div >
                    <div className="flex justify-between">
                        <h1 className=" text-gray-500 font-semibold">Monthly investment</h1>
                        <div className="">
                            <p className="font-semibold text-green-600  bg-green-100 w-28 p-1 pl-2"><span className="mr-10">₹</span><span>{investment}</span></p>
                        </div>
                        {/*<div className="flex ml-96">
                            <div className="flex items-center pl-20">
                                <div className="bg-slate-200 h-2 w-5 rounded-lg">   
                                </div>
                                <p className="text-gray-600 text-[10px] pl-1">Invested amounts</p>
                            </div>
                            <div className="flex items-center pl-28">
                                <div className="bg-blue-600 h-2 w-5 rounded-lg">   
                                </div>
                                <p className="text-gray-600 text-[10px] pl-1">Est returns</p>
                            </div>
                        </div>*/}
                        
                    </div>
                        <input type="range" className=" py-7  w-full" min="500" max="1000000" value={investment} onChange={handleChange}/>
                </div>
            
               <div className="flex flex-col">
                    <div>
                        <div className="flex justify-between">
                            <h1 className=" text-gray-500 font-semibold">Expected return rate (p.a)</h1>
                           
                                <p className="font-semibold text-green-600  bg-green-100 w-28 p-1 pl-16 "><span>{interest}</span><span>%</span></p>
                            
                            
                            
                        </div>
                            <input type="range" className=" text-green-500  py-7  w-full" min="1" max="30" step={0.1} value={interest} onChange={handleInterest}/>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <h1 className=" text-gray-500 font-semibold">Time period</h1>
                            
                                <p className="font-semibold text-green-600  bg-green-100 w-28 p-1 pl-16"><span>{time}</span><span>yr</span></p>
                             
                            
                            
                        </div>
                            <input type="range" className=" text-green-500  py-7  w-full" min="1" max="40" value={time} onChange={handleTime}/>
                    </div>

               
               
            </div>
            <div className="py-6">
                    <div className="flex justify-between items-baseline">
                        <p className="text-gray-400 text-[14px] pt-7 ">Invested amount</p>
                        <p className="font-semibold text-black text-lg ">₹{totalInvestment}</p>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <p className="text-gray-400 text-[14px] pt-7 ">Est. returns</p>
                        <p className="font-semibold text-black text-lg ">₹{estReturns}</p>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <p className="text-gray-400 text-[14px] pt-7 ">Total</p>
                        <p className="font-semibold text-black text-lg ">₹{total}</p>
                    </div>
                    
                   
                </div>
            </div>
        </div>
            <Chart/>
            
       
        
    
    </div>
)
}