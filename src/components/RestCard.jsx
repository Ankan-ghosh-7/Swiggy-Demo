export default function RestCard({ restInfo }) {
    const {
        name,
        cloudinaryImageId,
        cuisines,
        avgRating,
        sla,
        costForTwo,
        areaName,
        aggregatedDiscountInfoV3
    } = restInfo?.info || {};

    const discountHeader = aggregatedDiscountInfoV3?.header;
    const discountSub = aggregatedDiscountInfoV3?.subHeader;

    return (
        <div className="hover:scale-[0.96] transition-transform duration-200 cursor-pointer">
            <div className="relative">
                <img
                    className="w-full h-[182px] object-cover rounded-2xl"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                    alt={name}
                />
                {/* Gradient overlay + offer text at bottom of image */}
                {discountHeader && (
                    <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-2xl flex items-end px-3 pb-2">
                        <span className="text-white font-extrabold text-xl drop-shadow-lg">
                            {discountHeader} {discountSub}
                        </span>
                    </div>
                )}
            </div>
            <div className="mt-3 px-1">
                <div className="font-bold text-[17px] leading-tight truncate">{name}</div>
                <div className="flex items-center gap-1 mt-1">
                    <span className="bg-green-600 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[11px] font-bold">★</span>
                    <span className="text-[15px] font-semibold text-gray-800">{avgRating}</span>
                    <span className="text-gray-800 font-bold">·</span>
                    <span className="text-[15px] font-semibold text-gray-800">{sla?.slaString}</span>
                </div>
                <div className="text-gray-500 text-[14px] mt-0.5 truncate leading-snug">
                    {cuisines?.join(', ')}
                </div>
                {areaName && (
                    <div className="text-gray-500 text-[14px] truncate leading-snug">{areaName}</div>
                )}
            </div>
        </div>
    );
}