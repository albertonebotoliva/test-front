import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DoctorList from '../doctorList';
import mockDoctors from '../../services/mockDoctors.json';

const props = {
    isOpen: false,
    openItems: [],
    filteredItems: [],
    selectedItems: [],
    handleSetSelectedItem: () => { },
    handleOpenItems: () => { },
    setFilter: () => { },
    setIsOpen: () => { },
}
describe('Components', () => {
    test('DoctorList - Renders', () => {
        render(<DoctorList {...props} />);
        const element = screen.getByPlaceholderText(/search/i);
        expect(element).toBeInTheDocument();
    });
    test('DoctorList - Search', async () => {
        const handleChange = jest.fn();
        render(<DoctorList
            {...props}
            setFilter={handleChange}
            isOpen={true}
            filteredItems={mockDoctors.slice(0, 2)}
        />);
        const element = screen.getByPlaceholderText(/search/i);
        fireEvent.change(element, { target: { value: 'Dr. Joanny Marie' } });
        await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1), { timeout: 350 });
    });
    test('DoctorList - Display Items', () => {
        render(<DoctorList
            {...props}
            isOpen={true}
            filteredItems={mockDoctors}
        />);
        const element = screen.getByText(/Dr. Joanny Marie/i);
        expect(element).toBeInTheDocument();
    });
    test('DoctorList - Select Item', () => {
        const handleClick = jest.fn();
        render(<DoctorList
            {...props}
            handleSetSelectedItem={handleClick}
            isOpen={true}
            filteredItems={mockDoctors.slice(0, 1)}
        />);
        const element = screen.getByRole("selector");
        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('DoctorList - Open Item', () => {
        const handleClick = jest.fn();
        render(<DoctorList
            {...props}
            handleOpenItems={handleClick}
            isOpen={true}
            filteredItems={mockDoctors.slice(0, 1)}
        />);
        const element = screen.getByRole("expand");
        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
})



