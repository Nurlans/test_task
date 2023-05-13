import axios from "axios";

const baseUrl = 'https://dummyjson.com'


export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/products?select=id,title,price,discountPercentage,thumbnail,images,brand,category,stock,rating`);
        if (response.data?.products.length) return response.data.products

    } catch (error) {
        console.log(error);
    }

}
// export const fetchProductByFilter = async (selectedBrand: string, selectedPrice: number, selectedRating: number) => {
//     try {
//         const response = await axios.get(`${baseUrl}/products?brand&select=${selectedBrand || "brand"},${selectedPrice || "price"},${selectedRating || "rating"},discountPercentage,thumbnail,images,brand,category,stock`);
//         if (response.data?.products.length) return response.data.products
//
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const fetchBrands = async () => {
//     try {
//         const response = await axios.get(`${baseUrl}/products/brand`);
//         console.log(response);
//         if(response.data?.length) return response.data
//
//     } catch (error) {
//         console.log(error);
//     }
// }

