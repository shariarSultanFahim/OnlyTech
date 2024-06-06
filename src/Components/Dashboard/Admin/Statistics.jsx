import { useQuery } from '@tanstack/react-query';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import useDocumentTitle from "../../../CustomHooks/useDocumentTitle";

const Statistics = () => {
    useDocumentTitle('Statistics');
    const axiosSecure = useAxiosSecure();

    const {data:usersData, isPending:usersPending} = useQuery({
        queryKey:['users-type'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users/types');
            return res.data;
        }
    })
    const {data:productsData,isPending} = useQuery({
        queryKey:['products-type'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/products/types');
            return res.data;
        }
    })
    if(usersPending || isPending){
        return (
            <div className='flex justify-center items-center w-full h-full'>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
      ];

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
        };

    return (
        <div>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl">Statistics</h1>
            </div>
            <div className='flex flex-wrap py-10'>
            <div className='w-80 mx-auto'>
                <h1 className='text-center text-2xl'>Products</h1>
               <PieChart  width={320} height={320}>
                <Pie
                    data={productsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {productsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </div>
            <div className='w-80 mx-auto'>
            <h1 className='text-center text-2xl'>Reviews</h1>
               <PieChart  width={320} height={320}>
               <Pie
                    data={data01}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </div>
            <div className='w-80 mx-auto'>
                <h1 className='text-center text-2xl'>Users</h1>
               <PieChart  width={320} height={320}>
               <Pie
                    data={usersData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {usersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </div>
            </div>
        </div>
    );
};

export default Statistics;