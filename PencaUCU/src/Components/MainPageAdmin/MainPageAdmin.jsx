import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const MainPageAdmin = () => {
    return (
        <div>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'Mujer' },
                            { id: 1, value: 15, label: 'Hombre' },
                            { id: 2, value: 20, label: 'Otros' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    )
}

export default MainPageAdmin