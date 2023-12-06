import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductList from '../../src/components/ProductList';
import store from '../../src/utils/store'
import { fetchProducts } from '../../src/utils/productSlice'
import { BrowserRouter } from 'react-router-dom';



describe('ProductList Component', () => {

    const MockedStateData = {
        allproducts: {
            allproducts: [
                {
                    categoryId: "vxxbw52EaQnb6aCDwJAd",
                    img: "img/product-4.png",
                    price: 18,
                    count: 0,
                    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    inCart: false,
                    total: 0,
                    title: "HTC 10 - White",
                    company: "htc",
                    inWishlist: false,
                    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
                    id: "AIpOM6VRVzk7Ani1JuQW"
                },
                {
                    price: 15,
                    title: "Godrej-Sofa",
                    count: 0,
                    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
                    total: 0,
                    productId: "CkEUN99G13fD8ut8WZyR",
                    img: "img/product-12.jpg",
                    inCart: false,
                    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    company: "Godrej",
                    categoryId: "tbdBvmy8IxenNNBcNwmx",
                    id: "CkEUN99G13fD8ut8WZyR"

                }
            ],
        },
    };

    jest.mock('../../src/utils/productSlice', () => ({
        ...jest.requireActual('../../src/utils/productSlice'),
        fetchProducts: jest.fn(),
    }));

    it('renders ProductList component', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>

                    <ProductList allProducts={MockedStateData} />

                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByText('All Category')).toBeInTheDocument();
    });

    it('Able to select the category from the dropdown', async () => {
        const { container } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductList />
                </Provider>
            </BrowserRouter>
        );

        // Mock the response from the getCategoryService function
        const mockCategoryList = [
            { id: 'bzolv9xdDoqZwEIjl78z', Category: "All Category" },
            { id: 'swoxKYVH3rbzPfeC1lhq', Category: 'Clothing' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockCategoryList),
        });


        const dropdownButton = screen.getByRole('button', { name: 'All Category' });
        fireEvent.click(dropdownButton);

        const dropdownMenu = container.getElementsByClassName('dropdown-menu show')[0];
        const allcategoryItem = within(dropdownMenu).getByText('All Category');

        expect(allcategoryItem.textContent).toEqual('All Category');
    });

    it('fetches products when a category is selected', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductList />
                </Provider>
            </BrowserRouter>
        );

        try {
            const dropdownButton = screen.getByText('All Category');

            // Open the dropdown by clicking the button
            fireEvent.click(dropdownButton);

            const allCategoryItem = screen.getByText('All Category');
            const sportsItem = screen.getByText('Sports');
            const clothingItem = screen.getByText('Clothing');

            // Your assertions...
            expect(allCategoryItem).toBeInTheDocument();
            expect(sportsItem).toBeInTheDocument();
            expect(clothingItem).toBeInTheDocument()
            fireEvent.click(sportsItem);

            // Check if fetchProducts action is called with the correct argument
            await waitFor(() => {
                expect(fetchProducts).toHaveBeenCalledWith('1');
            });

        } catch (error) {
            console.error('Error in test:', error);
        }

    })

})
