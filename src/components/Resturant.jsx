import { useEffect, useState } from "react";
import { Link } from "react-router";
import RestCard from "./RestCard";

export default function Restaurant() {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/restaurants?lat=22.5726&lng=88.3639');
                if (!response.ok) throw new Error(`Server error: ${response.status}`);
                const json = await response.json();
                setApiData(json?.data?.cards || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Parse sections from API
    let whatsOnYourMind = null;
    let topChains = null;
    let allRestaurants = [];

    for (const card of apiData) {
        const cardData = card?.card?.card;
        const styleType = cardData?.gridElements?.infoWithStyle?.['@type'] || '';
        const title = cardData?.header?.title || '';

        if (styleType.includes('ImageInfoLayoutCard')) {
            whatsOnYourMind = {
                title,
                items: cardData.gridElements.infoWithStyle.info || []
            };
        }
        if (styleType.includes('FavouriteRestaurantInfoWithStyle')) {
            topChains = {
                title,
                restaurants: cardData.gridElements.infoWithStyle.restaurants || []
            };
        }
        if (styleType.includes('FoodRestaurantGridListingInfo')) {
            allRestaurants = [
                ...allRestaurants,
                ...(cardData.gridElements.infoWithStyle.restaurants || [])
            ];
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* ===== Swiggy top navbar ===== */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-[80%] mx-auto flex items-center justify-between py-4">
                    {/* Left: Logo + Location */}
                    <div className="flex items-center gap-6">
                        <Link to="/">
                            <img
                                className="w-10 h-10"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                                alt="Swiggy"
                            />
                        </Link>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span className="font-bold text-sm border-b-2 border-black">Kolkata, Barasat</span>
                            <span className="text-gray-500 text-sm truncate max-w-[200px]">Kalikapur, Barasat, Kolkata</span>
                            <svg className="w-4 h-4 text-[#fc8019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Right: Nav links */}
                    <div className="flex items-center gap-10 text-[15px] font-medium text-gray-700">
                        <a href="https://www.swiggy.com/corporate/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            Swiggy Corporate
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            Search
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                            Offers <span className="text-[10px] text-[#fc8019] font-bold ml-[-4px]">NEW</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Help
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                            Sign In
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-[#fc8019]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
                            Cart
                        </a>
                    </div>
                </div>
            </nav>

            {/* ===== Page Content ===== */}
            <main className="max-w-[80%] mx-auto pt-8 pb-20">

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-pulse text-lg text-gray-400">Loading restaurants...</div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-lg p-6 bg-red-50 rounded-lg mt-4">
                        Failed to load — make sure the server is running (<code>node server.js</code>).
                        <br /><span className="text-sm text-red-400">{error}</span>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* ===== What's on your mind? ===== */}
                        {whatsOnYourMind && (
                            <section className="mb-8">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-2xl font-bold">{whatsOnYourMind.title}</h2>
                                    <div className="flex gap-3">
                                        <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                                        </button>
                                        <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
                                    {whatsOnYourMind.items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.action?.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-shrink-0 w-[150px] text-center hover:scale-95 transition-transform"
                                        >
                                            <img
                                                className="w-[150px] h-[180px] object-cover"
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                                                alt={item.action?.text}
                                            />
                                        </a>
                                    ))}
                                </div>
                                <hr className="mt-6 border-gray-100" />
                            </section>
                        )}

                        {/* ===== Top restaurant chains ===== */}
                        {topChains && (
                            <section className="mb-8">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-2xl font-bold">{topChains.title}</h2>
                                    <div className="flex gap-3">
                                        <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                                        </button>
                                        <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
                                    {topChains.restaurants.map((restInfo) => (
                                        <div key={restInfo?.info?.id} className="flex-shrink-0 w-[273px]">
                                            <RestCard restInfo={restInfo} />
                                        </div>
                                    ))}
                                </div>
                                <hr className="mt-6 border-gray-100" />
                            </section>
                        )}

                        {/* ===== Restaurants with online food delivery ===== */}
                        {allRestaurants.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-5">Restaurants with online food delivery</h2>
                                <div className="grid grid-cols-4 gap-8">
                                    {allRestaurants.map((restInfo) => (
                                        <RestCard
                                            key={restInfo?.info?.id}
                                            restInfo={restInfo}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}