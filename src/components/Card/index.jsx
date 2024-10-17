import Image from 'next/image';
import { useCard } from '../../context/CardContext';

const Card = () => {
    const { cardDetails } = useCard();
    const { name, number, expDate, cvc, cardType } = cardDetails;

    const cardLogos = {
        visa: '/images/visa-logo.png',
        mastercard: '/images/mastercard-logo.png',
        default: '/images/card-logo.svg',
    };
    const cardLogoSrc = cardLogos[cardType] || cardLogos.default;

    return (
        <div className="relative pb-[241px]">
            <div className="absolute top-24 lg:top-[100px] z-10 p-5 w-72 lg:w-[400px] lg:h-[220px]">
                <div className="text-white">
                    <Image src={cardLogoSrc} width={80} height={50} alt="Card logo" />
                    <div className="mt-6 text-base lg:text-3xl tracking-widest">
                        {number ? number : '0000 0000 0000 0000'}
                    </div>
                    <div className="flex justify-between mt-3 lg:mt-10 text-base lg:text-lg">
                        <div>{name ? name : 'Jane Appleseed'}</div>
                        <div>{expDate ? expDate : '00/00'}</div>
                    </div>
                </div>
            </div>
            <Image src="/images/bg-card-front.png" width={400} height={220} className="w-72 lg:w-[400px] lg:h-auto absolute z-[9] lg:z-[1] lg:relative top-24" alt="Card Front" />

            <div className="absolute right-0 top-0 lg:top-60 lg:left-20 w-72 lg:w-[400px] lg:h-[220px] lg:z-0">
                <Image src="/images/bg-card-back.png" width={400} height={220} className="w-72 lg:w-full lg:h-auto" alt="Card Back" />
                <div className="absolute top-[65px] right-8 lg:top-24 lg:right-10 text-white text-base lg:text-lg">
                    {cvc ? cvc : '000'}
                </div>
            </div>
        </div>
    );
};

export default Card;
