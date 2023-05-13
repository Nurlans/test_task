import React, {FC, useEffect, useState} from 'react';
import {IProduct} from "../types";
import {fetchProducts} from "../api";

const Main: FC = () => {

        const [isLoading, setIsLoading] = useState<boolean>(false)
        const [allProducts, setAllProducts] = useState<IProduct[]>([])
        const [defProducts, setDefProducts] = useState<IProduct[]>([])
        const [prices, setPrices] = useState<number[]>([])
        const [ratings, setRatings] = useState<number[]>([])
        const [brands, setBrands] = useState<string[]>([])
        const [selectedRating, setSelectedRating] = useState<number>(0)
        const [selectedPrice, setSelectedPrice] = useState<number>(0)
        const [selectedBrand, setSelectedBrand] = useState<string>("")
        const [sort, setSort] = useState<string>("")

        useEffect(() => {
            (async () => {
                    setIsLoading(true)
                    const products = await fetchProducts()
                    const brands: string[] = Array.from(new Set(products.map((product: IProduct) => {
                        return product.brand
                    })))
                    const ratings: number[] = Array.from(new Set(products.map((product: IProduct) => {
                        return product.rating
                    })))
                    const prices: number[] = Array.from(new Set(products.map((product: IProduct) => {
                        return product.price

                    })))
                    setDefProducts(products)
                    setAllProducts(products)
                    setBrands(brands)
                    setRatings(ratings)
                    setPrices(prices)
                }
            )()
            setIsLoading(false)

        }, [])

        const selectHandlerBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedBrand(e.target.value)
        }
        const selectHandlerRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedRating(Number(e.target.value))
        }
        const selectHandlerPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedPrice(Number(e.target.value))
        }
        useEffect(() => {
            if (sort === 'title') {
                setAllProducts([...allProducts].sort((a, b) => {
                    if (a.title > b.title) {
                        return 1
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    return 0
                }))
            } else if (sort === 'price') {
                setAllProducts([...allProducts].sort((a, b) => {
                    if (a.price > b.price) {
                        return 1
                    }
                    if (a.price < b.price) {
                        return -1
                    }
                    return 0
                }))
            } else {
                setAllProducts([...allProducts].sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1
                    }
                    if (a.rating < b.rating) {
                        return -1
                    }
                    return 0
                }))
            }
        }, [sort])
        const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSort(e.target.value)

        }
        useEffect(() => {
            setAllProducts([...defProducts].filter((product) => {
                return product.brand === selectedBrand || product.price === selectedPrice || product.rating === selectedRating

            }))
        }, [selectedBrand, selectedPrice, selectedRating])
        return (
            <div>
                {isLoading ? <h1>Loading...</h1> :
                    <>
                        <div>
                            Brand:
                            <select onChange={selectHandlerBrand} name="brand" id="">
                                {brands.map((brands) => {
                                    return (
                                        <option key={brands} value={brands}>{brands}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            rating:
                            <select onChange={selectHandlerRating} name="rating" id="">
                                {ratings.map((rating) => {
                                    return (
                                        <option key={rating} value={rating}>{rating}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            price:
                            <select onChange={selectHandlerPrice} name="price" id="">
                                {prices.map((price) => {
                                    return (
                                        <option key={price} value={price}>{price}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            Sort by:
                            <select name="sort" onChange={sortHandler} id="">
                                <option value="title">Title</option>
                                <option value="price">Price</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        {allProducts.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <h1>title:{product.title}</h1>
                                        <h2>price:{product.price}</h2>
                                        <h2>rating:{product.rating}</h2>
                                        <img src={product.images?.[0]} alt={product.title}/>
                                    </div>
                                )
                            }
                        )}
                    </>
                }
            </div>
        );
    }
;

export default Main;