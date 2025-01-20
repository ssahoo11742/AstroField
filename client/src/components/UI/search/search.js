import React, { useState, useEffect, useRef } from 'react';
import { items, cometData, asteroidData, pha} from '../../Three-JS-Render/data/AsteroidData';
import { addLabel, removeLabel } from '../../Three-JS-Render/utils/label';
import { celestials } from '../../Three-JS-Render/AsteroidTracker';

export const Search = ({setLabeledBodies}) => {
    const [searchInput, setSearchInput] = useState(''); // State for search input
    const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
    const [isFocused, setIsFocused] = useState(false); // Track whether the search bar is focused
    const dropdownRef = useRef(null); // Ref for the dropdown

    // Update filtered items whenever the search input changes
    useEffect(() => {
        setFilteredItems(
            items.filter(item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [searchInput]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value); // Update the search input state
    };
    
    const addItem = (item) => {
        if(item.checked){
            item.checked = false;
            removeLabel(item.name, celestials, setLabeledBodies)
        }else{
            var data;
            item.checked = true;
            if(item.type === "PHA"){
                data = pha;
            }else if(item.type === "Comet"){
                data = cometData;
            }else{
                data = asteroidData;
            }
            
            addLabel(item.name, data, celestials, setLabeledBodies)
        }
    }

    const handleFocus = () => {
        setIsFocused(true); // Set focus state to true when the search bar is focused
    };

    const handleBlur = (e) => {
        // Check if the focus is still inside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
            setIsFocused(false); // Set focus state to false if focus is lost and not within the dropdown
        }
    };

    const handleMouseDown = () => {
        // Prevent blur from hiding the dropdown when clicking on it
        setIsFocused(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submit, if needed (e.g., trigger an API call or another action)
    };

    // Limit the number of displayed items to 10
    const visibleItems = filteredItems.slice(0, 10);

    return (
        <div className="relative max-w-md mx-auto w-full">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit} autoComplete='off'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-white border border-white rounded-lg bg-black bg-opacity-50 focus:ring-white focus:border-white placeholder-white" 
                        placeholder="Search Asteroids, Comets, PHAs" 
                        value={searchInput} 
                        onChange={handleSearchChange} // Handle input change
                        onFocus={handleFocus} // Show the list when the search bar is focused
                        onBlur={handleBlur} // Hide the list when the search bar loses focus
                        required 
                    />
                </div>
            </form>

            {/* Display filtered items only when the search bar is focused and there are filtered items */}
            {isFocused && visibleItems.length > 0 && (
                <ul 
                    ref={dropdownRef} 
                    className="absolute w-full mt-2 max-h-40 overflow-y-auto bg-black bg-opacity-70 text-white text-sm rounded-lg shadow-lg"
                    onMouseDown={handleMouseDown} // Handle mouse down on the dropdown
                >
                    {visibleItems.map((item, index) => (
                        <li key={index} className="p-2 border-b border-white hover:bg-blue-600 cursor-pointer flex justify-between items-center">
                            <span>{item.name}</span>
                            {/* Enabled or not button */}
                            <div className="flex items-center">
                                <input 
                                    id={`checked-checkbox-${index}`} 
                                    type="checkbox" 
                                    checked={item.checked}
                                    onClick={() => addItem(item)} 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                />
                                <label 
                                    htmlFor={`checked-checkbox-${index}`} 
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Add Label
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
