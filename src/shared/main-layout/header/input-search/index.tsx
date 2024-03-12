import { Search } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

const InputSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // Sample data array
    const data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
        // Add more items as needed
    ];
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='relative'>
            <div className="flex items-center">
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-sm border-r-0 rounded-r-none"
                />
                <Button className="bg-primary border-primary border-l-0 rounded-l-none">
                    <Search className='text-white' />
                </Button>
            </div>
            {
                searchTerm && filteredData &&
                <div className='absolute bg-white w-full shadow p-3'>
                    {filteredData.map((item: any) => (
                        <p className='mb-3 first:mb-0' key={item.id}>{item.name}</p>
                    ))}
                </div>
            }
        </div>
    )
}

export default InputSearch