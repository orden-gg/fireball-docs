import Image from "next/image";

import { Rarity, getItemById } from "@fireballgg/sdk";

import { cn } from "@/lib/utils";

interface UpscaleIconProps {
    itemId: number;
    className?: string;
    size?: number;
    quality?: number;
    blurDataURL?: string;
    isIcon?: boolean;
    showRarityBackground?: boolean;
}

const RARITY_CSS_VARS: Record<Rarity, string> = {
    [Rarity.COMMON]: "--common",
    [Rarity.UNCOMMON]: "--uncommon",
    [Rarity.RARE]: "--rare",
    [Rarity.EPIC]: "--epic",
    [Rarity.LEGENDARY]: "--legendary",
    [Rarity.RELIC]: "--relic",
    [Rarity.GIGA]: "--giga",
};

const DEFAULT_BLUR_DATA_URL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMmEyYTJhIi8+PC9zdmc+";

export function UpscaleIcon({
    itemId,
    className,
    size = 32,
    quality = 100,
    blurDataURL = DEFAULT_BLUR_DATA_URL,
    isIcon = true,
    showRarityBackground = false,
}: UpscaleIconProps) {
    const item = getItemById(itemId);

    if (!item?.ICON_URL_CID) return null;

    const srcUrl = isIcon ? item.ICON_URL_CID : item.IMG_URL_CID;
    const rarity = (item.RARITY_CID ?? 0) as Rarity;
    const rarityCssVar = RARITY_CSS_VARS[rarity] ?? RARITY_CSS_VARS[Rarity.COMMON];

    const image = (
        <Image
            src={srcUrl}
            width={size}
            height={size}
            alt={item.NAME_CID}
            quality={quality}
            className={cn("pixelated relative object-contain", className)}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                minWidth: `${size}px`,
                minHeight: `${size}px`,
            }}
            placeholder="blur"
            blurDataURL={blurDataURL}
            unoptimized={true}
            priority={false}
            sizes={`${size}px`}
        />
    );

    if (showRarityBackground) {
        return (
            <div
                className="relative flex items-center justify-center rounded-sm"
                style={{
                    background: `linear-gradient(to top, color-mix(in oklch, var(${rarityCssVar}) 20%, transparent) 0%, transparent 70%)`,
                }}
            >
                {image}
            </div>
        );
    }

    return image;
}
